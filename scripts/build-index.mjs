/**
 * 项目索引生成脚本
 *
 * 功能：扫描项目目录结构，生成轻量级的文件索引 JSON 文件
 * 用途：为 ambiguity-detector skill 提供预生成的快速匹配索引，避免每次调用时实时扫描文件系统
 * 使用方式：node build-index.mjs [目录路径] [选项]
 */

import { readdir, stat, readFile, writeFile, access } from 'fs/promises';
import { join, relative, resolve, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

// ==================== 配置常量 ====================

/** 默认排除的目录列表 */
const DEFAULT_EXCLUDE_DIRS = [
  'node_modules', '.git', 'dist', 'build',
  '__pycache__', '.cache', '.next', '.nuxt',
  'coverage', 'target', 'vendor', '.output',
  '.turbo', '.idea', '.vscode'
];

/** 默认排除的文件模式（glob 风格） */
const DEFAULT_EXCLUDE_PATTERNS = [
  '*.min.js', '*.min.css', '*.map'
];

/** 最大递归深度，防止符号链接循环引用 */
const MAX_DEPTH = 20;

/** 大文件阈值（bytes），超过此大小只记录元信息不读取内容 */
const LARGE_FILE_THRESHOLD = 1024 * 1024; // 1MB

// ==================== 前端框架检测规则 ====================
const frameworkChecks = [
  { id: 'angular', files: ['angular.json'] },
  { id: 'next', files: ['next.config.*'] },
  { id: 'nuxt', files: ['nuxt.config.*'] },
  { id: 'vue', patterns: ['*.vue'], fallback: true },
  { id: 'react', patterns: ['*.jsx', '*.tsx'], hasNoVue: true },
  { id: 'svelte', files: ['svelte.config.js'] },
  { id: 'solid', deps: ['solid-js'] },
];

// ==================== 后端语言检测规则 ====================
const backendChecks = [
  { id: 'java', files: ['pom.xml', 'build.gradle'] },
  { id: 'go', files: ['go.mod'] },
  { id: 'python', files: ['requirements.txt', 'pyproject.toml', 'setup.py', 'manage.py'] },
  { id: 'rust', files: ['Cargo.toml'] },
  { id: 'php', files: ['composer.json'] },
  { id: 'csharp', files: ['*.csproj', 'Program.cs'] },
  { id: 'ruby', files: ['Gemfile'] },
  { id: 'elixir', files: ['mix.exs'] },
  { id: 'nodejs-backend', deps: ['express', 'koa', 'fastify', 'hapi', 'nest'] },
];

// ==================== Monorepo 检测规则 ====================
const monorepoChecks = [
  { tool: 'pnpm-workspaces', file: 'pnpm-workspace.yaml' },
  { tool: 'lerna', file: 'lerna.json' },
  { tool: 'turbo', file: 'turbo.json' },
  { tool: 'nx', file: 'nx.json' },
  { tool: 'npm-workspaces', check: (pkg) => pkg?.workspaces },
];

// ==================== 代码层推断规则 ====================
const layerPatterns = [
  // 前端层级
  { layer: 'view', patterns: [/views?\//i, /pages?\//i, /screens?\//i] },
  { layer: 'component', patterns: [/components?\//i] },
  { layer: 'route', patterns: [/router[s]?\//i, /routes?\//i] },
  { layer: 'store', patterns: [/store[s]?\//i, /states?\//i] },
  { layer: 'api', patterns: [/\/api\//i, /services?\//i] },
  { layer: 'style', patterns: [/styles?\//i, /css\//i] },
  // 后端层级
  { layer: 'controller', patterns: [/controller[s]?\//i, /handler[s]?\//i] },
  { layer: 'service', patterns: [/service[s]?\//i] },
  { layer: 'model', patterns: [/model[s]?\//i, /entity\//i, /entities\//i] },
  { layer: 'repository', patterns: [/repo[s]?\//i, /dao\//i] },
  // 通用层级
  { layer: 'config', patterns: [/config[s]?\//i] },
  { layer: 'util', patterns: [/utils?\//i, /lib\//i, /helper[s]?\//i, /common\//i] },
  { layer: 'test', patterns: [/__tests__\//i, /\.spec\./, /\.test\./, /tests?\//i] },
  { layer: 'doc', patterns: [/docs?\//i, /readme/i, /change/i] },
];

// ==================== 工具函数 ====================

/**
 * 解析命令行参数
 * @param {string[]} args - 命令行参数数组
 * @returns {Object} 解析后的参数对象
 */
function parseArgs(args) {
  const parsed = {
    targetDir: '.',
    exclude: [],
    output: null,
    verbose: false,
    dryRun: false,
    help: false
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    switch (arg) {
      case '--exclude':
        parsed.exclude = [...parsed.exclude, ...(args[++i] || '').split(',')];
        break;
      case '--output':
        parsed.output = args[++i];
        break;
      case '--verbose':
        parsed.verbose = true;
        break;
      case '--dry-run':
        parsed.dryRun = true;
        break;
      case '--help':
      case '-h':
        parsed.help = true;
        break;
      default:
        if (!arg.startsWith('--')) {
          parsed.targetDir = arg;
        }
        break;
    }
    i++;
  }

  return parsed;
}

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log(`
📁 项目索引生成工具 (build-index)

用法:
  node build-index.mjs [目录路径] [选项]

参数:
  目录路径                  要扫描的目标目录（默认为当前目录 .）

选项:
  --exclude <目录列表>       额外排除的目录（逗号分隔），例如: "dist,temp,.env"
  --output <输出路径>        自定义输出路径（默认: .trae/skills/ambiguity-detector/index.json）
  --verbose                 显示详细扫描过程
  --dry-run                 仅分析不写入文件
  --help, -h                显示帮助信息

示例:
  # 扫描当前目录
  node build-index.mjs

  # 指定目录并排除额外文件夹
  node build-index.mjs ./my-project --exclude "dist,temp,.env"

  # 自定义输出位置并显示详细信息
  node build-index.mjs --output ./custom-index.json --verbose

  # 仅查看分析结果不生成文件
  node build-index.mjs --dry-run
`);
}

/**
 * 检查文件是否应该被排除
 * @param {string} fileName - 文件名
 * @param {string} filePath - 相对路径
 * @param {string[]} extraExcludes - 额外的排除规则
 * @returns {boolean} 是否应该排除
 */
function shouldExclude(fileName, filePath, extraExcludes) {
  // 检查目录排除
  const allExcludes = [...DEFAULT_EXCLUDE_DIRS, ...extraExcludes];
  const pathParts = filePath.split(/[/\\]/);

  for (const part of pathParts) {
    if (allExcludes.includes(part)) {
      return true;
    }
  }

  // 检查文件模式排除
  for (const pattern of DEFAULT_EXCLUDE_PATTERNS) {
    const regex = new RegExp(
      '^' + pattern.replace(/\*/g, '.*').replace(/\?/g, '.') + '$',
      'i'
    );
    if (regex.test(fileName)) {
      return true;
    }
  }

  return false;
}

/**
 * 根据文件路径推断代码层
 * @param {string} filePath - 文件相对路径
 * @returns {string} 推断的代码层名称
 */
function inferLayer(filePath) {
  for (const { layer, patterns } of layerPatterns) {
    for (const pattern of patterns) {
      if (pattern.test(filePath)) {
        return layer;
      }
    }
  }
  return 'other';
}

/**
 * 推断文件所属模块（顶层子项目）
 * @param {string} filePath - 文件相对路径
 * @param {string[]} topLevelDirs - 顶层目录列表
 * @returns {string} 模块标识
 */
function inferModule(filePath, topLevelDirs) {
  const firstDir = filePath.split(/[/\\]/)[0];
  if (topLevelDirs.includes(firstDir) && firstDir !== 'src') {
    return firstDir;
  }
  return 'root';
}

/**
 * 递归扫描目录
 * @param {string} dirPath - 要扫描的目录绝对路径
 * @param {string} basePath - 项目根目录绝对路径
 * @param {Object} options - 扫描选项
 * @param {number} currentDepth - 当前递归深度
 * @returns {Promise<Array>} 文件信息数组
 */
async function scanDirectory(dirPath, basePath, options, currentDepth = 0) {
  const results = [];

  // 防止过深递归（可能存在符号链接循环）
  if (currentDepth > MAX_DEPTH) {
    if (options.verbose) {
      console.warn(`⚠️  达到最大深度限制 (${MAX_DEPTH})，跳过: ${relative(basePath, dirPath)}`);
    }
    return results;
  }

  try {
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);
      const relPath = relative(basePath, fullPath);

      try {
        // 跳过排除项
        if (shouldExclude(entry.name, relPath, options.exclude)) {
          if (options.verbose && entry.isDirectory()) {
            console.log(`📂 跳过目录: ${relPath}`);
          }
          continue;
        }

        if (entry.isDirectory()) {
          // 递归扫描子目录
          const subResults = await scanDirectory(fullPath, basePath, options, currentDepth + 1);
          results.push(...subResults);
        } else if (entry.isFile()) {
          // 处理文件
          const fileStat = await stat(fullPath);
          const ext = extname(entry.name).slice(1).toLowerCase();

          results.push({
            path: relPath.replace(/\\/g, '/'), // 统一使用正斜杠
            name: entry.name,
            ext: ext || 'unknown',
            size: fileStat.size,
            module: null, // 稍后填充
            layer: null   // 稍后填充
          });

          if (options.verbose && results.length % 500 === 0) {
            console.log(`📄 已扫描 ${results.length} 个文件...`);
          }
        } else if (entry.isSymbolicLink()) {
          // 符号链接：尝试解析真实路径后处理
          try {
            const realStat = await stat(fullPath);
            if (realStat.isDirectory()) {
              const subResults = await scanDirectory(fullPath, basePath, options, currentDepth + 1);
              results.push(...subResults);
            } else if (realStat.isFile()) {
              const fileStat = await stat(fullPath);
              const ext = extname(entry.name).slice(1).toLowerCase();
              results.push({
                path: relPath.replace(/\\/g, '/'),
                name: entry.name,
                ext: ext || 'unknown',
                size: fileStat.size,
                module: null,
                layer: null
              });
            }
          } catch (linkError) {
            if (options.verbose) {
              console.warn(`⚠️  无法解析符号链接: ${relPath}`);
            }
          }
        }
      } catch (error) {
        // 单个条目出错不影响整体扫描
        if (options.verbose) {
          console.warn(`⚠️  处理失败: ${relPath} - ${error.message}`);
        }
      }
    }
  } catch (error) {
    if (error.code === 'EACCES') {
      console.warn(`⚠️  权限不足，跳过目录: ${relative(basePath, dirPath)}`);
    } else if (options.verbose) {
      console.warn(`⚠️  读取目录失败: ${relative(basePath, dirPath)} - ${error.message}`);
    }
  }

  return results;
}

/**
 * 检测项目使用的框架
 * @param {string} projectRoot - 项目根目录
 * @param {Array} scannedFiles - 已扫描的文件列表
 * @param {Object|null} packageJson - package.json 内容
 * @returns {string[]} 检测到的框架列表
 */
function detectFrameworks(projectRoot, scannedFiles, packageJson) {
  const detected = [];
  const fileNames = scannedFiles.map(f => f.name.toLowerCase());
  const filePaths = scannedFiles.map(f => f.path.toLowerCase());

  // 收集依赖列表用于依赖检查
  const allDeps = [
    ...(packageJson?.dependencies ? Object.keys(packageJson.dependencies) : []),
    ...(packageJson?.devDependencies ? Object.keys(packageJson.devDependencies) : [])
  ];

  for (const check of frameworkChecks) {
    let matched = false;

    // 检查特定文件
    if (check.files) {
      for (const pattern of check.files) {
        if (pattern.includes('*')) {
          // 通配符匹配
          const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
          if (fileNames.some(f => regex.test(f))) {
            matched = true;
            break;
          }
        } else {
          if (fileNames.includes(pattern.toLowerCase()) ||
              existsSync(join(projectRoot, pattern))) {
            matched = true;
            break;
          }
        }
      }
    }

    // 检查文件扩展名模式
    if (!matched && check.patterns) {
      for (const pattern of check.patterns) {
        const ext = pattern.replace('*', '');
        if (scannedFiles.some(f => f.ext === ext)) {
          // 对于 react，需要确保没有 vue 文件
          if (check.hasNoVue && scannedFiles.some(f => f.ext === 'vue')) {
            continue;
          }
          matched = true;
          break;
        }
      }
    }

    // 检查依赖
    if (!matched && check.deps) {
      if (check.deps.some(dep => allDeps.includes(dep))) {
        matched = true;
      }
    }

    if (matched) {
      // 如果是 fallback 类型且已经检测到其他框架，则跳过
      if (check.fallback && detected.length > 0) {
        continue;
      }
      detected.push(check.id);
    }
  }

  return detected;
}

/**
 * 检测后端语言/运行时
 * @param {string} projectRoot - 项目根目录
 * @param {Array} scannedFiles - 已扫描的文件列表
 * @param {Object|null} packageJson - package.json 内容
 * @returns {string[]} 检测到的后端类型列表
 */
function detectBackend(projectRoot, scannedFiles, packageJson) {
  const detected = [];
  const fileNames = scannedFiles.map(f => f.name.toLowerCase());

  const allDeps = [
    ...(packageJson?.dependencies ? Object.keys(packageJson.dependencies) : []),
    ...(packageJson?.devDependencies ? Object.keys(packageJson.devDependencies) : [])
  ];

  for (const check of backendChecks) {
    let matched = false;

    if (check.files) {
      for (const pattern of check.files) {
        if (pattern.includes('*')) {
          const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
          if (fileNames.some(f => regex.test(f)) || existsSync(join(projectRoot, pattern))) {
            matched = true;
            break;
          }
        } else {
          if (fileNames.includes(pattern.toLowerCase()) ||
              existsSync(join(projectRoot, pattern))) {
            matched = true;
            break;
          }
        }
      }
    }

    if (!matched && check.deps) {
      if (check.deps.some(dep => allDeps.includes(dep))) {
        matched = true;
      }
    }

    if (matched) {
      detected.push(check.id);
    }
  }

  return detected;
}

/**
 * 检测 Monorepo 配置
 * @param {string} projectRoot - 项目根目录
 * @param {Object|null} packageJson - package.json 内容
 * @returns {{tool: string, architecture: string}} 检测结果
 */
function detectMonorepo(projectRoot, packageJson) {
  for (const check of monorepoChecks) {
    if (check.file && existsSync(join(projectRoot, check.file))) {
      return {
        tool: check.tool,
        architecture: 'monorepo'
      };
    }

    if (check.check && check.check(packageJson)) {
      return {
        tool: check.tool,
        architecture: 'monorepo'
      };
    }
  }

  return {
    tool: null,
    architecture: 'standard'
  };
}

/**
 * 检测包管理器
 * @param {string} projectRoot - 项目根目录
 * @returns {string} 包管理器名称
 */
function detectPackageManager(projectRoot) {
  if (existsSync(join(projectRoot, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(projectRoot, 'yarn.lock'))) return 'yarn';
  if (existsSync(join(projectRoot, 'package-lock.json'))) return 'npm';
  return 'unknown';
}

/**
 * 检测构建工具
 * @param {string} projectRoot - 项目根目录
 * @param {Object|null} packageJson - package.json 内容
 * @returns {string[]} 构建工具列表
 */
function detectBuildTools(projectRoot, packageJson) {
  const tools = [];
  const allDeps = [
    ...(packageJson?.dependencies ? Object.keys(packageJson.dependencies) : []),
    ...(packageJson?.devDependencies ? Object.keys(packageJson.devDependencies) : [])
  ];

  // 通过配置文件检测
  const configFiles = {
    'vite': ['vite.config.*'],
    'webpack': ['webpack.config.*'],
    'rollup': ['rollup.config.*'],
    'esbuild': ['esbuild.config.*', 'build.ts', 'build.js'],
    'parcel': ['.parcelrc'],
    'tsup': ['tsup.config.*']
  };

  for (const [tool, patterns] of Object.entries(configFiles)) {
    for (const pattern of patterns) {
      if (existsSync(join(projectRoot, pattern.replace('.*', '.js'))) ||
          existsSync(join(projectRoot, pattern.replace('.*', '.ts'))) ||
          existsSync(join(projectRoot, pattern.replace('.*', '.mjs')))) {
        if (!tools.includes(tool)) {
          tools.push(tool);
        }
        break;
      }
    }
  }

  // 通过依赖检测
  const depTools = {
    'vite': 'vite',
    'webpack': 'webpack',
    'rollup': 'rollup',
    'esbuild': 'esbuild',
    'parcel': 'parcel',
    'tsup': 'tsup'
  };

  for (const [dep, tool] of Object.entries(depTools)) {
    if (allDeps.includes(dep) && !tools.includes(tool)) {
      tools.push(tool);
    }
  }

  return tools;
}

/**
 * 检测使用的编程语言
 * @param {Array} scannedFiles - 已扫描的文件列表
 * @returns {string[]}
 */
function detectLanguages(scannedFiles) {
  const extMap = {
    'js': 'javascript',
    'jsx': 'javascript',
    'mjs': 'javascript',
    'cjs': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'vue': 'vue',
    'svelte': 'svelte',
    'py': 'python',
    'java': 'java',
    'go': 'go',
    'rs': 'rust',
    'rb': 'ruby',
    'php': 'php',
    'cs': 'csharp',
    'ex': 'elixir',
    'exs': 'elixir',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'less': 'less',
    'json': 'json',
    'yaml': 'yaml',
    'yml': 'yaml',
    'md': 'markdown',
    'sql': 'sql',
    'sh': 'shell',
    'bat': 'batch',
    'xml': 'xml',
    'graphql': 'graphql',
    'gql': 'graphql'
  };

  const languages = new Set();
  for (const file of scannedFiles) {
    const lang = extMap[file.ext];
    if (lang) {
      languages.add(lang);
    }
  }

  return Array.from(languages).sort();
}

/**
 * 识别模块分组并统计关键信息
 * @param {Array} files - 文件列表（已填充 module 和 layer）
 * @returns {Object} 模块分组信息
 */
function groupByModules(files) {
  const modules = {};

  for (const file of files) {
    const mod = file.module || 'root';

    if (!modules[mod]) {
      modules[mod] = {
        type: inferModuleType(mod, files.filter(f => f.module === mod)),
        fileCount: 0,
        keyFiles: [],
        layers: {}
      };
    }

    modules[mod].fileCount++;

    // 统计层级分布
    const layer = file.layer || 'other';
    modules[mod].layers[layer] = (modules[mod].layers[layer] || 0) + 1;

    // 识别关键入口文件
    if (isKeyFile(file)) {
      modules[mod].keyFiles.push(file.path);
    }
  }

  return modules;
}

/**
 * 推断模块类型
 * @param {string} moduleName - 模块名称
 * @param {Array} moduleFiles - 该模块的文件列表
 * @returns {string} 模块类型标识
 */
function inferModuleType(moduleName, moduleFiles) {
  const hasVue = moduleFiles.some(f => f.ext === 'vue');
  const hasTsx = moduleFiles.some(f => f.ext === 'tsx' || f.ext === 'jsx');
  const hasTs = moduleFiles.some(f => f.ext === 'ts');
  const hasPy = moduleFiles.some(f => f.ext === 'py');
  const hasGo = moduleFiles.some(f => f.ext === 'go');
  const hasJava = moduleFiles.some(f => f.ext === 'java');

  if (hasVue) return 'frontend-vue';
  if (hasTsx) return 'frontend-react';
  if (hasPy) return 'backend-python';
  if (hasGo) return 'backend-go';
  if (hasJava) return 'backend-java';
  if (hasTs) return 'library-typescript';
  return 'unknown';
}

/**
 * 判断是否是关键入口文件
 * @param {Object} file - 文件信息对象
 * @returns {boolean}
 */
function isKeyFile(file) {
  const keyPatterns = [
    /^package\.json$/,
    /^(main|index|app)\.(ts|js|tsx|jsx)$/,
    /^vite\.config\.(ts|js)$/,
    /^webpack\.config\.(ts|js)$/,
    /^tsconfig\.json$/,
    /^(next|nuxt|angular)\.config\.(ts|js)$/,
    /^README\.md$/i,
    /^(Dockerfile|docker-compose)\.(yml|yaml)?$/
  ];

  return keyPatterns.some(p => p.test(file.name));
}

/**
 * 生成项目类型描述字符串
 * @param {Object} detection - 项目检测结果
 * @returns {string} 可读的项目类型描述
 */
function generateProjectTypeDescription(detection) {
  const parts = [];

  // 框架部分
  if (detection.frameworks.length > 0) {
    const frameworkNames = {
      'vue': 'Vue',
      'react': 'React',
      'angular': 'Angular',
      'next': 'Next.js',
      'nuxt': 'Nuxt.js',
      'svelte': 'Svelte',
      'solid': 'SolidJS'
    };

    const names = detection.frameworks.map(f => frameworkNames[f] || f);
    parts.push(names.join('/'));
  }

  // 后端部分
  if (detection.backends.length > 0) {
    parts.push('后端');
  }

  // 架构部分
  if (detection.monorepo.architecture === 'monorepo') {
    parts.push('(Monorepo)');
  }

  return parts.length > 0 ? `${parts.join(' ')} 项目` : '通用项目';
}

// ==================== 主函数 ====================

/**
 * 主执行函数：扫描项目并生成索引
 * @param {Object} options - 命令行选项
 */
async function main(options) {
  const startTime = Date.now();

  // 解析目标目录
  const targetDir = resolve(options.targetDir || '.');

  // 检查目录是否存在
  try {
    await access(targetDir);
  } catch {
    console.error(`❌ 错误: 目录不存在 - ${targetDir}`);
    process.exit(1);
  }

  // 读取 package.json（如果存在）
  let packageJson = null;
  try {
    const pkgContent = await readFile(join(targetDir, 'package.json'), 'utf-8');
    packageJson = JSON.parse(pkgContent);
  } catch {
    // 没有 package.json 也继续执行
  }

  if (options.verbose) {
    console.log(`🎯 开始扫描项目: ${targetDir}`);
    console.log(`📋 排除目录: ${[...DEFAULT_EXCLUDE_DIRS, ...options.exclude].join(', ')}`);
    console.log('');
  }

  // 步骤 1: 扫描文件系统
  const scannedFiles = await scanDirectory(targetDir, targetDir, options);

  if (options.verbose) {
    console.log(`\n📊 扫描完成，共发现 ${scannedFiles.length} 个文件\n`);
  }

  // 获取顶层目录列表（用于模块推断）
  const topLevelDirs = [...new Set(
    scannedFiles
      .map(f => f.path.split('/')[0])
      .filter(d => d && !d.startsWith('.'))
  )];

  // 步骤 2: 为每个文件补充模块和层级信息
  for (const file of scannedFiles) {
    file.module = inferModule(file.path, topLevelDirs);
    file.layer = inferLayer(file.path);
  }

  // 步骤 3: 检测项目特征
  const frameworks = detectFrameworks(targetDir, scannedFiles, packageJson);
  const backends = detectBackend(targetDir, scannedFiles, packageJson);
  const monorepoInfo = detectMonorepo(targetDir, packageJson);
  const packageManager = detectPackageManager(targetDir);
  const buildTools = detectBuildTools(targetDir, packageJson);
  const languages = detectLanguages(scannedFiles);

  // 步骤 4: 按"文件名（不含扩展名）"分组建立索引
  const filesByName = {};
  for (const file of scannedFiles) {
    const nameKey = basename(file.name, extname(file.name)).toLowerCase();

    if (!filesByName[nameKey]) {
      filesByName[nameKey] = [];
    }

    filesByName[nameKey].push({
      path: file.path,
      ext: file.ext,
      module: file.module,
      layer: file.layer,
      size: file.size
    });
  }

  // 步骤 5: 分组模块信息
  const modules = groupByModules(scannedFiles);

  // 步骤 6: 组装最终索引结构
  const scanDurationMs = Date.now() - startTime;
  const projectDetection = {
    frameworks,
    backends,
    languages,
    buildTools,
    packageManager,
    monorepoTool: monorepoInfo.tool,
    monorepo: monorepoInfo
  };

  const indexData = {
    meta: {
      generatedAt: new Date().toISOString(),
      projectRoot: targetDir,
      projectType: generateProjectTypeDescription(projectDetection),
      architecture: monorepoInfo.architecture,
      totalFiles: scannedFiles.length,
      excludedDirs: [...DEFAULT_EXCLUDE_DIRS, ...options.exclude],
      scanDurationMs
    },
    filesByName,
    modules,
    projectDetection
  };

  // 输出摘要信息
  const uniqueNames = Object.keys(filesByName).length;
  const moduleCount = Object.keys(modules).length;
  const moduleNames = Object.keys(modules)
    .filter(m => m !== 'root')
    .sort()
    .join(', ');

  console.log('\n✅ 项目索引生成完成');
  console.log(`   项目类型: ${indexData.meta.projectType}`);
  console.log(`   架构模式: ${monorepoInfo.tool || '标准项目'}`);
  console.log(`   总文件数: ${scannedFiles.length.toLocaleString()}`);
  console.log(`   索引条目: ${uniqueNames.toLocaleString()} (去重文件名)`);
  if (moduleCount > 1) {
    console.log(`   子项目数: ${moduleCount - 1} (${moduleNames || '无'})`);
  }
  console.log(`   扫描耗时: ${(scanDurationMs / 1000).toFixed(2)}s`);

  // 写入文件（除非是 dry-run 模式）
  if (!options.dryRun) {
    const outputPath = options.output ||
      join(targetDir, '.trae', 'skills', 'ambiguity-detector', 'index.json');

    // 确保输出目录存在
    const outputDir = dirname(outputPath);
    // 注意：这里简化处理，实际使用时可能需要创建目录

    try {
      await writeFile(outputPath, JSON.stringify(indexData, null, 2), 'utf-8');
      console.log(`   输出位置: ${relative(targetDir, outputPath)}`);
    } catch (writeError) {
      console.error(`\n❌ 写入文件失败: ${writeError.message}`);
      console.error(`   目标路径: ${outputPath}`);
      process.exit(1);
    }
  } else {
    console.log('   🏃‍♂️ Dry-run 模式：未写入文件');
  }

  console.log('\n💡 提示: 当项目结构发生变化后，请重新运行此脚本更新索引');

  // 如果是 verbose 模式，显示详细统计
  if (options.verbose) {
    console.log('\n📈 详细统计:');
    console.log(`   - 前端框架: ${frameworks.join(', ') || '未检测到'}`);
    console.log(`   - 后端类型: ${backends.join(', ') || '未检测到'}`);
    console.log(`   - 编程语言: ${languages.join(', ')}`);
    console.log(`   - 构建工具: ${buildTools.join(', ') || '未检测到'}`);
    console.log(`   - 包管理器: ${packageManager}`);

    // 显示最大的文件名组（可能有歧义的文件）
    const ambiguousNames = Object.entries(filesByName)
      .filter(([_, files]) => files.length > 3)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10);

    if (ambiguousNames.length > 0) {
      console.log('\n⚠️  可能存在歧义的文件名（同名文件较多）:');
      for (const [name, files] of ambiguousNames) {
        console.log(`   - "${name}": ${files.length} 个文件`);
      }
    }
  }

  return indexData;
}

// ==================== 入口点 ====================

// 获取命令行参数（去掉前两个元素：node 和脚本路径）
const args = process.argv.slice(2);
const options = parseArgs(args);

// 显示帮助或执行主程序
if (options.help) {
  showHelp();
  process.exit(0);
}

// 执行主函数
main(options).catch((error) => {
  console.error('\n❌ 执行失败:', error.message);
  if (process.env.DEBUG) {
    console.error(error.stack);
  }
  process.exit(1);
});
