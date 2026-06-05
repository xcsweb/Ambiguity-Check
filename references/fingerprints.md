# 项目指纹详细表

> **用途**：本文件提供完整的项目类型自动识别规则，用于判断当前工作区的技术栈、语言、框架和架构模式。
>
> **何时查阅**：当需要识别项目类型、调整搜索策略或处理 Monorepo/微服务等复杂架构时参考此表。

---

## 1. 前端框架识别

### 1.1 Vue 生态

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `package.json` + `.vue` 文件存在 | Vue 项目 | 包括 Vue 2/3，支持 Options API 和 Composition API |
| `vite.config.*` + `@vue/*` 依赖 | Vite + Vue 项目 | 现代化构建工具的 Vue 项目 |
| `nuxt.config.*` | Nuxt.js 项目 | Vue 框架的 SSR/SSG 方案，支持 Nuxt 2/3 |
| `vue.config.js` | Vue CLI 项目 | 使用 @vue/cli 脚手架创建的项目 |
| `src/main.ts` + `createApp()` | Vue 3 项目 | 使用 Composition API 的 Vue 3 应用 |
| `src/main.js` + `new Vue()` | Vue 2 项目 | 使用 Options API 的 Vue 2 应用 |

### 1.2 React 生态

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `package.json` + `jsx`/`tsx` 文件 | React 项目 | 包括 Create React App、Vite + React 等 |
| `next.config.*` | Next.js 项目 | React 框架的 SSR/SSG 方案，支持 App Router / Pages Router |
| `umi.config.*` 或 `.umirc.ts` | UmiJS 项目 | 蚂蚁金服的企业级 React 应用框架 |
| `remix.config.*` | Remix 项目 | 全栈 React 框架，专注于 Web 标准 |
| `app.json` (Expo) | React Native (Expo) | 移动端跨平台 React Native 开发 |
| `metro.config.js` | React Native 项目 | 移动端 React Native 原生应用 |
| `package.json` + `preact` 依赖 | Preact 项目 | 轻量级 React 替代方案 (3KB) |

### 1.3 Angular 生态

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `angular.json` | Angular 项目 | Angular CLI 创建的标准项目结构 |
| `workspace.json` (Nx) + Angular | Nx + Angular 项目 | 使用 Nx monorepo 工具管理的 Angular 项目 |
| `nest-cli.json` | NestJS 项目 | 基于 Angular 架构风格的 Node.js 后端框架 |

### 1.4 其他前端框架

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `svelte.config.js` | Svelte 项目 | 编译时框架，高性能前端方案 |
| `rollup.config.js` + Svelte 依赖 | Svelte (Rollup) | 使用 Rollup 打包的 Svelte 项目 |
| `sveltekit.config.*` 或 `svelte.config.js` + `@sveltejs/kit` | SvelteKit 项目 | Svelte 的全栈框架 |
| `vite.config.*` + `solid-js` 依赖 | Solid 项目 | 细粒度响应式的前端框架 |
| `package.json` + `@solidjs/*` 依赖 | Solid 项目 | SolidJS 生态项目 |
| `index.html` (无框架依赖) | 原生 HTML/JS 项目 | 纯 HTML/CSS/JavaScript，可能使用 jQuery 等 |
| `package.json` + `jquery` 依赖 | jQuery 项目 | 传统 jQuery 开发模式 |

---

## 2. 后端语言/框架识别

### 2.1 Java/Spring 生态

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `pom.xml` | Maven + Java 项目 | Apache Maven 构建的 Java 项目 |
| `build.gradle` 或 `build.gradle.kts` | Gradle + Java 项目 | Gradle 构建的 Java/Kotlin 项目 |
| `application.yml` / `application.properties` / `application.yaml` | Spring Boot 项目 | Spring Boot 配置文件 |
| `settings.gradle` (多模块) | Gradle 多模块项目 | 包含多个子模块的 Gradle 工程 |
| `pom.xml` + Spring Cloud 依赖 | Spring Cloud 项目 | 微服务架构的 Spring 生态项目 |

### 2.2 Go 语言

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `go.mod` | Go Module 项目 | Go 语言标准模块化管理 (Go 1.11+) |
| `go.sum` | Go Module 项目 | Go 依赖锁定文件 |
| `main.go` + `gin` 依赖 | Gin 框架项目 | 高性能 HTTP Web 框架 |
| `main.go` + `echo` 依赖 | Echo 框架项目 | 轻量级、可扩展的 Go Web 框架 |
| `main.go` + `fiber` 依赖 | Fiber 框架项目 | 受 Express 启发的 Go Web 框架 |
| `Makefile` (Go 项目常见) | Go 项目辅助构建 | 常见于 Go 项目的构建自动化 |

### 2.3 Python 生态

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `requirements.txt` | Python 项目 (pip) | 传统 pip 依赖管理 |
| `pyproject.toml` | Python 现代 project | PEP 517/518 标准的项目配置 |
| `setup.py` / `setup.cfg` | Python setuptools 项目 | 传统 Python 包管理方式 |
| `Pipfile` | Python (pipenv) | Pipenv 虚拟环境管理 |
| `poetry.lock` | Python (Poetry) | Poetry 依赖管理与打包工具 |
| `manage.py` | Django 项目 | Django Web 框架命令行工具 |
| `app.py` + Flask 依赖 | Flask 项目 | 轻量级 Python Web 框架 |
| `main.py` + FastAPI 依赖 | FastAPI 项目 | 现代、高性能异步 Web 框架 |
| `tasks.py` (Celery) | Celery 任务队列 | 分布式任务处理系统 |

### 2.4 Node.js 后端

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `package.json` + `express` 依赖 | Express.js 项目 | 最流行的 Node.js Web 框架 |
| `package.json` + `koa` 依赖 | Koa 项目 | 由 Express 原班人马打造的新一代框架 |
| `package.json` + `fastify` 依赖 | Fastify 项目 | 高性能、低开销的 Node.js 框架 |
| `package.json` + `hapi` 依赖 | Hapi (@hapi/hapi) 项目 | 企业级的 Node.js 配置驱动框架 |
| `package.json` + `nestjs` 依赖 | NestJS 项目 | Angular 风格的 Node.js 企业级框架 |
| `package.json` + `socket.io` 依赖 | Socket.IO 项目 | 实时双向事件通信应用 |
| `server.js` / `app.js` / `index.js` (无显式框架) | Node.js 纯后端 | 可能是原生 http/https 模块实现 |
| `tsconfig.json` + Node.js 框架 | TypeScript 后端项目 | 使用 TypeScript 编写的 Node.js 服务 |

### 2.5 Rust 语言

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `Cargo.toml` | Rust 项目 | Rust 包管理和构建系统 |
| `Cargo.lock` | Rust 项目 | Rust 依赖版本锁定文件 |
| `src/main.rs` | Rust 二进制项目 | 可执行程序入口 |
| `src/lib.rs` | Rust 库项目 | 库 crate 入口文件 |
| `Cargo.toml` + `actix-web` 依赖 | Actix-Web 项目 | 高性能 Rust Web 框架 |
| `Cargo.toml` + `axum` 依赖 | Axum 项目 | Tokio 生态的异步 Web 框架 |
| `Cargo.toml` + `rocket` 依赖 | Rocket 项目 | 易用且类型安全的 Web 框架 |

### 2.6 PHP 语言

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `composer.json` | PHP 项目 | PHP 依赖管理工具 |
| `composer.lock` | PHP 项目 | Composer 依赖锁定文件 |
| `artisan` (Laravel) | Laravel 项目 | Laravel PHP 框架命令行工具 |
| `index.php` (Symfony 风格) | Symfony 项目 | 企业级 PHP 框架 |
| `codeception.yml` | Codeception 测试 | PHP 测试框架配置 |
| `phpunit.xml` | PHPUnit 测试 | PHP 单元测试配置 |

### 2.7 C#/.NET 生态

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `*.csproj` | .NET 项目 | .NET/C# 项目文件 |
| `*.sln` | Visual Studio 解决方案 | 多项目管理解决方案文件 |
| `Program.cs` (顶层语句风格) | .NET 6+ 项目 | 现代 .NET 控制台/Web 应用入口 |
| `Startup.cs` (传统 ASP.NET Core) | ASP.NET Core < 6 | 传统启动配置类 |
| `appsettings.json` | ASP.NET Core 项目 | .NET Core 应用配置文件 |
| `project.json` (旧版) | .NET Core 旧版项目 | 旧格式项目文件 (已弃用) |
| `Directory.Build.props` | .NET 解决方案级配置 | 共享的 MSBuild 属性 |

### 2.8 Ruby 语言

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `Gemfile` | Ruby 项目 | Ruby/Bundler 依赖管理 |
| `Gemfile.lock` | Ruby 项目 | Gem 版本锁定文件 |
| `Rakefile` | Ruby 项目 | Rake 任务自动化 |
| `config/application.rb` (Rails) | Ruby on Rails 项目 | Rails 全栈 Web 框架 |
| `config.ru` (Rack) | Rack 应用 | Ruby Web 服务器接口 |
| `*_spec.rb` (RSpec) | RSpec 测试 | Ruby BDD 测试框架 |
| `*.gemspec` | Ruby Gem 项目 | Ruby gem 包定义文件 |

### 2.9 Elixir/Erlang 生态

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `mix.exs` | Elixir 项目 | Elixir 构建工具 Mix 配置 |
| `mix.lock` | Elixir 项目 | Elixir 依赖版本锁定 |
| `rebar.config` | Erlang 项目 | Erlang 构建工具 Rebar 配置 |
| `erlang.mk` | Erlang 项目 | Erlang Makefile 构建 |
| `lib/*.ex` | Elixir 应用代码 | Elixir 源码目录 |
| `src/*.erl` | Erlang 应用代码 | Erlang 源码目录 |

---

## 3. 架构模式识别

### 3.1 Monorepo（单一代码仓库）

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `pnpm-workspace.yaml` | pnpm Monorepo | pnpm 工作区管理多个包 |
| `lerna.json` | Lerna Monorepo | Lerna 多包管理工具 |
| `turbo.json` | Turborepo | 高性能构建系统 for Monorepo |
| `nx.json` | Nx Monorepo | Nx 企业级 monorepo 工具 |
| `package.json` (根目录) + `workspaces` 字段 | npm workspaces | npm 原生 workspaces 支持 |
| `yarn-workspace.yml` 或根 `package.json` + yarn workspaces | Yarn Workspaces | Yarn 工作区管理 |
| `rush.json` | Rush (Microsoft) | 大规模 monorepo 管理 |
| `bazel WORKSPACE` 或 `WORKSPACE.bazel` | Bazel Monorepo | Google 构建工具的多项目管理 |
| `Makefile` (monorepo 常见) | Make 辅助构建 | 自定义构建脚本 |

**Monorepo 子项目识别策略**：
1. 必须先读取 workspace 配置文件确定子项目列表
2. 对每个子项目分别执行类型识别和搜索
3. 结果按子项目分组展示，避免跨项目混淆
4. 共享包（shared、common、utils、packages/shared）中的匹配需特殊标注
5. 结果展示时明确区分"直接匹配"和"依赖传递匹配"

### 3.2 微服务架构

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `docker-compose.yml` / `docker-compose.yaml` (多服务) | Docker Compose 微服务 | 容器化多服务编排 |
| `docker-compose.override.yml` | Docker Compose 覆盖配置 | 环境/开发差异化配置 |
| `helm/` 目录 | Helm Charts | Kubernetes 应用包管理器 |
| `k8s/` 或 `kubernetes/` 目录 | K8s Manifests | Kubernetes 部署清单 |
| `consul-config/` | Consul 配置 | 服务发现与配置中心 |
| `nacos/` 配置 | Nacos 配置 | 阿里巴巴服务发现与配置管理 |
| `envoy.yaml` | Envoy 配置 | 高性能代理/服务网格数据平面 |
| `istio/` 目录 | Istio 配置 | 服务网格控制平面 |
| `protobuf/*.proto` | Protobuf 定义 | 微服务间通信协议定义 |
| `api-gateway/` 或 `gateway/` 目录 | API 网关 | 统一入口网关服务 |

### 3.3 多模块项目

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `apps/` 目录 (含多个子目录) | Apps 多模块 | 应用程序分离的模块化结构 |
| `packages/` 目录 (含多个子目录) | Packages 多模块 | 可复用包分离的结构 |
| `modules/` 目录 | Modules 多模块 | 功能模块化组织方式 |
| `services/` 目录 | Services 多模块 | 按服务拆分的目录结构 |
| `libs/` 目录 | Libraries 共享库 | 公共库/工具函数集合 |
| `shared/` 或 `common/` 目录 | 共享代码 | 跨模块共享的业务逻辑 |
| `internal/` 目录 (Go 常见) | Go Internal 包 | Go 私有包约定 (Go 1.4+) |

### 3.4 单模块项目

| 特征说明 | 识别结果 |
|---------|---------|
| 以上所有特征均不存在 | 传统单体应用 (Monolith) |
| 仅存在单一入口点 (如 main.py, index.ts, src/main.go) | 单体应用 |

---

## 4. 移动端开发识别

### 4.1 Android 原生开发

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `build.gradle` (项目级, Project root) | Android Gradle 项目 | Android Studio 标准 Gradle 构建 |
| `app/build.gradle` (模块级) | Android app 模块 | Android 应用主模块配置 |
| `build.gradle.kts` (Kotlin DSL) | Android Kotlin 项目 | 使用 Kotlin DSL 的 Gradle 配置 |
| `AndroidManifest.xml` | Android 应用清单 | Android 应用声明文件 |
| `gradle.properties` | Gradle 属性配置 | Gradle/JVM 属性设置 |
| `settings.gradle` 或 `settings.gradle.kts` | Gradle 设置 | 模块包含配置 |
| `proguard-rules.pro` | ProGuard/R8 混淆 | 代码混淆规则 |
| `local.properties` | 本地 SDK 路径 | Android SDK 本地路径配置 |

### 4.2 iOS 原生开发

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `Podfile` | CocoaPods 项目 | iOS/macOS 依赖管理 |
| `Podfile.lock` | CocoaPods 锁定 | Pod 版本锁定文件 |
| `Package.swift` | Swift Package Manager | Apple 官方包管理工具 |
| `*.xcodeproj` | Xcode 项目 | Xcode 传统项目文件 |
| `*.xcworkspace` | Xcode Workspace | Xcode 工作区 (CocoaPods 常生成) |
| `Cartfile` (已弃用) | Carthage 项目 | 已弃用的 iOS 依赖管理 |
| `project.pbxproj` | Xcode 项目内部 | Xcode 项目核心配置 (JSON 格式) |
| `Info.plist` | iOS 应用属性 | iOS 应用元数据配置 |

### 4.3 跨平台移动开发

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `pubspec.yaml` | Flutter 项目 | Google UI 工具包，Dart 语言 |
| `pubspec.lock` | Flutter 项目 | Flutter/Pub 依赖锁定 |
| `ios/` + `android/` + Dart 文件 | Flutter 全平台 | Flutter 标准项目结构 |
| `lib/main.dart` | Flutter 入口 | Flutter 应用入口文件 |
| `app.json` (Expo) | React Native (Expo) | Expo 托管的 RN 开发 |
| `metro.config.js` | React Native 项目 | Metro bundler 配置 |
| `android/app/build.gradle` + JS/TS | React Native 原生混合 | RN Android 原生模块 |
| `ios/Podfile` + JS/TS | React Native 原生混合 | RN iOS 原生模块 |
| ` Capacitor.config.ts` | Ionic/Capacitor 项目 | Web 技术转原生应用 |

---

## 5. 桌面应用识别

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `package.json` + `electron` 依赖 | Electron 项目 | 基于 Chromium + Node.js 的桌面应用 |
| `electron-builder.yml` 或 `electron-builder.json` | Electron 打包配置 | Electron 应用打包发布配置 |
| `electron/main.ts` 或 `electron/main.js` | Electron 主进程 | Electron 主进程入口 |
| `src-tauri/Cargo.toml` | Tauri 项目 | Rust 内核的轻量桌面应用 |
| `src-tauri/tauri.conf.json` | Tauri 配置 | Tauri 应用配置文件 |
| `tauri.conf.json` | Tauri 项目 (根目录) | Tauri v2 配置位置变更 |
| `App.xaml` (WPF) | WPF 应用 | Windows Presentation Foundation |
| `MainWindow.xaml` (WPF/WF) | Windows Forms/WPF | Windows 桌面 GUI 应用 |
| `*.pro` 文件 (Qt) | Qt 项目 | C++ 跨平台 GUI 框架 |
| `CMakeLists.txt` + Qt 依赖 | Qt (CMake) 项目 | 使用 CMake 构建的 Qt 应用 |
| `pyproject.toml` + `pyqt` / `pyside` 依赖 | PyQt/PySide 项目 | Python Qt 绑定的桌面应用 |
| `setup.py` + `pyinstaller` 配置 | PyInstaller 打包 | Python 转 exe/app 打包 |

---

## 6. DevOps/基础设施识别

### 6.1 基础设施即代码 (IaC)

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `*.tf` (Terraform) | Terraform 项目 | HashiCorp 基础设施编排工具 |
| `terraform.tfstate` | Terraform 状态 | Terraform 远程状态文件 |
| `versions.tf` | Terraform 版本约束 | Provider 版本锁定 |
| `providers.tf` | Terraform Provider | 云服务商 Provider 配置 |
| `*.hcl` (通用) | HCL 配置文件 | HashiCorp Configuration Language |
| `Pulumi.yaml` | Pulumi 项目 | 多语言 IaC 工具 (Go/TS/Python等) |
| `CDK.*` (AWS CDK) | AWS CDK 项目 | AWS Cloud Development Kit |
| `serverless.yml` | Serverless Framework | 无服务器应用部署配置 |
| `now.json` 或 `vercel.json` | Vercel/Zeit Now | Serverless 前端部署 |
| `netlify.toml` | Netlify 配置 | 静态站点/Serverless 部署 |

### 6.2 容器化与编排

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `Dockerfile` | Docker 项目 | 容器镜像构建文件 |
| `docker-compose.yml/yaml` | Docker Compose | 多容器应用编排 |
| `.dockerignore` | Docker 忽略规则 | 类似 .gitignore 的 Docker 规则 |
| `Containerfile` (Podman) | Podman/Buildah | Red Hat 系容器工具 |
| `Jenkinsfile` | Jenkins CI/CD | Jenkins 流水线定义 |
| `Jenkinsfile.groovy` | Jenkins Pipeline | Jenkins Groovy DSL 流水线 |
| `.gitlab-ci.yml` | GitLab CI/CD | GitLab 内置 CI/CD 配置 |
| `.github/workflows/*.yml` | GitHub Actions | GitHub 原生 CI/CD 平台 |
| `azure-pipelines.yml` | Azure DevOps Pipelines | Microsoft CI/CD 平台 |
| `circleci/config.yml` | CircleCI | 云端 CI/CD 服务 |
| `bitbucket-pipelines.yml` | Bitbucket Pipelines | Atlassian CI/CD 服务 |
| `Dronefile` 或 `.drone.yml` | Drone CI | 容器化 CI/CD 平台 |

---

## 7. 数据库/ETL 识别

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `migrations/` 目录 (SQL 文件) | 数据库迁移项目 | 版本化数据库 Schema 变更 |
| `schema.sql` 或 `init.sql` | SQL 初始化脚本 | 数据库初始化/Schema 定义 |
| `seed.sql` 或 `seeds/` 目录 | 种子数据 | 测试/初始数据填充 |
| `prisma/schema.prisma` | Prisma ORM | 现代 Node.js/TypeScript 数据库工具 |
| `drizzle.config.ts` | Drizzle ORM | 轻量级 TypeScript SQL Toolkit |
| `knexfile.js` / `knexfile.ts` | Knex.js Query Builder | SQL Query Builder & Migration |
| `TypeORM config` (ormconfig.json 等) | TypeORM ORM | TypeScript ORM 框架 |
| `sequelize.config.js` | Sequelize ORM | Node.js 经典 ORM |
| `dbt_project.yml` | dbt (data build tool) | 数据转换/分析工程工具 |
| `models/` (SQLAlchemy 风格) | SQLAlchemy ORM | Python ORM 框架 |
| `airflow_dags/` 或 `dags/` 目录 | Apache Airflow DAGs | 工作流调度/ETL 管道 |
| `prefect.yaml` 或 `flows/` 目录 | Prefect | 现代数据工作流编排 |
| `dagster.yaml` | Dagster | 数据资产编排平台 |
| `*.rq` (RedisQuery) 或 `redis.conf` | Redis 相关 | 缓存/数据库相关配置 |

---

## 8. 嵌入式/IoT 识别

| 特征文件 | 识别结果 | 说明 |
|---------|---------|------|
| `platformio.ini` | PlatformIO 项目 | IoT 嵌入式开发框架 (Arduino/ESP32等) |
| `platformio.ini` + `lib_deps` | PlatformIO 库依赖 | PIO 第三方库管理 |
| `CMakeLists.txt` (嵌入式场景) | CMake 嵌入式项目 | C/C++ 嵌入式构建系统 |
| `Makefile` (嵌入式常见) | 嵌入式 Make 构建 | 裸机/RTOS 项目常用 |
| `*.ld` (链接脚本) | 链接脚本文件 | 嵌入式内存布局配置 |
| `startup.s` 或 `vector.s` | 启动汇编代码 | MCU 启动代码 (ARM等) |
| `FreeRTOSConfig.h` | FreeRTOS 项目 | 实时操作系统配置 |
| `Zephyr/Kconfig` | Zephyr RTOS | Linux 基金会 IoT RTOS |
| `arduino sketch (.ino)` | Arduino 项目 | Arduino IDE 原生项目 |
| `esphome.yaml` | ESPHome 项目 | ESP8266/ESP32 固件配置 |
| `micropython/` 或 `boot.py` | MicroPython 项目 | 微控制器 Python 固件 |
| `rust-toolchain.toml` (embedded) | Rust 嵌入式项目 | `no_std` Rust 嵌入式开发 |
| `memory.x` / `link.x` | Rust 嵌入式链接 | embedded Rust 内存布局 |

---

## 9. 识别优先级策略

### 9.1 多层检测顺序

```
第一层：显式配置文件（最高优先级）
  ├── angular.json → Angular
  ├── next.config.* → Next.js
  ├── nuxt.config.* → Nuxt.js
  ├── Cargo.toml → Rust
  ├── go.mod → Go
  ├── pom.xml / build.gradle → Java
  ├── composer.json → PHP
  ├── Gemfile → Ruby
  └── mix.exs → Elixir

第二层：构建工具配置
  ├── vite.config.* → Vite (Vue/React/Solid)
  ├── webpack.config.* → Webpack (需结合其他特征)
  ├── rollup.config.* → Rollup (Svelte/库)
  ├── tsconfig.json → TypeScript 项目
  ├── esbuild 配置 → esbuild 构建
  └── Makefile / CMakeLists.txt → 自定义构建

第三层：源码文件扩展名
  ├── *.vue → Vue
  ├── *.jsx / *.tsx → React/TypeScript
  ├── *.svelte → Svelte
  ├── *.go → Go
  ├── *.rs → Rust
  ├── *.java → Java
  ├── *.py → Python
  ├── *.rb → Ruby
  ├── *.ex / *.exs → Elixir
  ├── *.erl → Erlang
  ├── *.php → PHP
  ├── *.cs → C#
  └── index.html (无框架) → 原生 HTML/JS

第四层：依赖分析（最低优先级）
  ├── package.json dependencies 字段分析
  ├── requirements.txt / pyproject.toml 分析
  └── 其他包管理器的依赖列表扫描
```

### 9.2 混合项目处理

当检测到多种技术栈特征时：

| 组合情况 | 处理策略 |
|---------|---------|
| 前端 + 后端共存 (如 Vue + Express) | 标注为**全栈项目**，分别识别前后端部分 |
| Monorepo + 多框架 | 按**子项目分组**，各自独立识别 |
| 移动端 + Web 共享代码 | 标注为**跨平台项目**，识别共享层和平台层 |
| 嵌入式 + 上位机软件 | 分别标注**固件端**和**主机端** |
| IaC + 应用代码 | 标注为**基础设施 + 应用**复合项目 |

### 9.3 特殊标记

在歧义检测报告中应包含以下项目特征标签：

```markdown
**项目特征标签**: [Vue 3] [TypeScript] [Vite] [Pinia] [Element Plus] [Monorepo] [pnpm]
**搜索范围限定**: apps/web/src/, packages/shared/
**注意事项**: 当前位于 web 子项目内，共享组件位于 packages/shared/components/
```

---

*最后更新：2026-06-05*
