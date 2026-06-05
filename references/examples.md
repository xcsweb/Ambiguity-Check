# 详细示例库

> **用途**：本文件提供各类歧义场景的详细示例，帮助理解和应用歧义检测流程，可作为训练参考和调试对照。
>
> **何时查阅**：遇到不确定如何判定歧义类型、需要参考类似场景的处理方式、或编写新的检测规则时参考此文件。

---

## 一、前端模糊需求示例

### 示例 1：搜索功能的歧义（场景 A - 模块归属不明）

**用户输入**：
> "帮我在搜索功能上加一个历史记录"

**歧义类型**：场景 A - 模块/服务归属不明

**项目上下文**：Vue 3 + Element Plus 前端项目

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 帮我在搜索功能上加一个历史记录

**项目类型**: Vue 3 前端项目 (Monorepo - apps/web)

**检测到的歧义类型**: 场景 A - 模块/服务归属不明

**候选选项**:

1. **全局搜索组件** - `components/SearchBar.vue` - 顶部导航栏的全局搜索入口，带下拉建议
2. **商品搜索页** - `views/product/SearchResult.vue` - 商品列表搜索结果页面，含筛选条件
3. **订单搜索** - `views/order/OrderList.vue` - 订单列表顶部的筛选搜索区域
4. **高级搜索弹窗** - `components/AdvancedSearchDialog.vue` - 支持多条件组合的高级搜索
5. **API 搜索封装** - `api/search.ts` - 后端搜索接口的请求封装层

**需要您确认**: 请问您要在哪个位置的搜索功能上添加历史记录？是顶部导航栏的搜索框，还是某个特定业务页面的搜索？

💡 **推荐依据**: 根据您最近编辑了 `components/SearchBar.vue` 文件，推测您可能想修改的是选项 1（全局搜索组件）
```

---

### 示例 2：列表页优化的歧义（场景 D - 需求模糊性）

**用户输入**：
> "优化一下列表的性能"

**歧义类型**：场景 D - 需求模糊性

**项目上下文**：React + Ant Design 前端项目

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 优化一下列表的性能

**项目类型**: React 前端项目 (Next.js)

**检测到的歧义类型**: 场景 D - 需求模糊性

**缺失信息分析**:
- ❓ **WHAT**：优化哪方面的性能？（加载速度？渲染性能？内存占用？网络请求数？）
- ❓ **WHERE**：哪个列表？（商品列表？订单列表？用户列表？日志列表？）
- ❓ **HOW**：当前的性能问题是什么？（数据量大导致卡顿？接口响应慢？DOM 节点过多？）

**追问**:
1. 请问您指的是哪个列表页面？（目前项目中找到 6 个列表页）
2. 当前遇到的具体性能问题是什么？（例如：滚动卡顿、加载超过 3 秒、内存持续增长等）
3. 您期望达到什么效果？（例如：首屏 < 1秒、流畅滚动 60fps、支持虚拟滚动等）
4. 是否有具体的性能指标要求？（LCP < 2.5s？TBT < 200ms？）

**可选方向供参考**:
- 🅰️ 如果是大数据量列表 → 建议引入虚拟滚动（react-window / react-virtualized）
- 🅱️ 如果是接口慢 → 建议优化查询接口或增加缓存策略
- 🅲️ 如果是渲染慢 → 建议使用 React.memo / useMemo / useCallback 优化重渲染
- 🅳️ 如果是首屏加载慢 → 建议实现骨架屏 + 分页/懒加载
```

---

### 示例 3：弹窗组件的歧义（场景 B - 同名冲突）

**用户输入**：
> "修改确认弹窗的文案"

**歧义类型**：场景 B - 同名资源冲突

**项目上下文**：Vue 3 + Element Plus 项目（含多个弹窗组件）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 修改确认弹窗的文案

**项目类型**: Vue 3 前端项目

**检测到的歧义类型**: 场景 B - 同名资源冲突

**冲突资源列表**:

1. **全局确认弹窗** - `components/ConfirmDialog.vue` - 通用确认对话框，支持自定义标题和内容
   - 当前文案："确定要执行此操作吗？" / "取消" / "确定"
   
2. **删除确认弹窗** - `components/DeleteConfirmDialog.vue` - 专用删除确认，红色警告样式
   - 当前文案："确定要删除该数据吗？删除后无法恢复！" / "取消" / "删除"

3. **退出确认弹窗** - `components/LeaveConfirmDialog.vue` - 页面离开前的未保存提示
   - 当前文案："您有未保存的更改，确定要离开吗？" / "继续编辑" / "离开"

4. **提交确认弹窗** - `views/order/components/SubmitConfirmDialog.vue` - 订单提交流程专用
   - 当前文案："确定提交该订单吗？提交后将进入审核流程。" / "返回修改" / "确认提交"

5. **ElMessageBox 调用处** - `utils/dialog.ts` - Element Plus MessageBox 封装工具函数
   - 多处调用，文案各不相同

**需要您确认**: 请问您要修改以上哪个确认弹窗的文案？

💡 **推荐依据**: "确认弹窗"通常指通用的 `ConfirmDialog.vue`（选项 1），但如果您是在做删除相关功能，可能是选项 2。
```

---

### 示例 4：路由跳转的歧义（场景 A + C 混合）

**用户输入**：
> "点击后跳转到详情页"

**歧义类型**：场景 A（模块归属不明）+ 场景 C（术语歧义）

**项目上下文**：React + React Router 项目

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 点击后跳转到详情页

**项目类型**: React 前端项目 (UmiJS)

**检测到的歧义类型**: 场景 A + 场景 C（混合歧义）

**歧义分析**:

**维度 1 - 触发来源不明确**（场景 A）:
1. **商品列表项** - `pages/product/List/index.tsx` - 商品卡片点击 → 商品详情 `/product/:id`
2. **订单列表项** - `pages/order/List/index.tsx` - 订单行点击 → 订单详情 `/order/:orderId`
3. **用户列表项** - `pages/user/List/index.tsx` - 用户行点击 → 用户详情 `/user/:userId`
4. **文章列表项** - `pages/article/List/index.tsx` - 文章标题点击 → 文章详情 `/article/:articleId`
5. **通知列表项** - `pages/notification/List/index.tsx` - 通知项点击 → 通知详情 `/notification/:id`

**维度 2 - "详情页"含义可能不同**（场景 C）:
- **可能性 A**：跳转到独立的详情路由页面（新页面）
- **可能性 B**：打开详情侧边抽屉（Drawer/Sidebar）
- **可能性 C**：弹出详情弹窗（Modal/Dialog）
- **可能性 D**：展开行内详情（Expandable Row）

**需要您确认**:
1. 请问是从哪个列表触发的跳转？
2. "详情页"是指新页面、侧边抽屉、还是弹窗？
```

---

### 示例 5：表单验证的歧义（场景 A + D 混合）

**用户输入**：
> "给表单加上验证"

**歧义类型**：场景 A（模块归属不明）+ 场景 D（需求模糊）

**项目上下文**：Angular 项目（含多个表单模块）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 给表单加上验证

**项目类型**: Angular 前端项目

**检测到的歧义类型**: 场景 A + 场景 D（混合歧义）

**候选表单列表**:

1. **用户注册表单** - `components/auth/register-form/register-form.component.ts` - 新用户注册，含手机号/密码/验证码
2. **用户登录表单** - `components/auth/login-form/login-form.component.ts` - 登录表单，含账号/密码
3. **个人信息表单** - `components/user/profile-form/profile-form.component.ts` - 用户资料编辑，含昵称/头像/简介
4. **商品新增表单** - `components/product/product-form/product-form.component.ts` - 商品CRUD表单，字段较多
5. **订单创建表单** - `components/order/order-form/order-form.component.ts` - 订单下单流程表单
6. **意见反馈表单** - `components/common/feedback-form/feedback-form.component.ts` - 通用反馈收集表单

**缺失信息分析**（场景 D）:
- ❓ **WHAT**：要加什么类型的验证？（必填？格式校验？异步唯一性？自定义业务规则？）
- ❓ **HOW**：验证时机？（实时输入时？失去焦点时？提交时？）
- ❓ **DETAILS**：具体哪些字段需要验证？验证规则是什么？（邮箱格式？手机号？密码强度？）

**需要您确认**:
1. 要给哪个表单添加验证？（以上 6 个候选）
2. 需要哪些验证规则？（必填、长度限制、格式校验、异步查重...）
3. 验证的触发时机？（blur / input / submit）
4. 是否需要自定义错误提示文案？
```

---

## 二、后端模糊需求示例

### 示例 6：接口修改的歧义（场景 A + B 混合）

**用户输入**：
> "修改用户接口"

**歧义类型**：场景 A（模块归属不明）+ 场景 B（同名冲突）

**项目上下文**：Java Spring Boot 后端项目

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 修改用户接口

**项目类型**: Java (Spring Boot) 后端项目

**检测到的歧义类型**: 场景 A + 场景 B（混合歧义）

**候选选项**:

1. **用户 REST 控制器** - `controllers/UserController.java`
   - 接口列表: GET /api/users, GET /api/users/{id}, POST /api/users, PUT /api/users/{id}, DELETE /api/users/{id}
   
2. **认证控制器** - `controllers/AuthController.java`
   - 接口列表: POST /api/auth/login, POST /api/auth/register, POST /api/auth/logout, POST /api/auth/refresh-token
   
3. **用户 Repository** - `repositories/UserRepository.java`
   - 方法: findByUsername(), findByEmail(), existsById(), 自定义 JPQL 查询
   
4. **用户 DTO** - `dto/UserDTO.java` / `dto/CreateUserRequest.java` / `dto/UpdateUserRequest.java`
   - 数据传输对象定义
   
5. **用户 Service** - `services/UserService.java`
   - 业务逻辑: createUser(), updateUser(), deleteUser(), getUserById()
   
6. **用户 VO (View Object)** - `vo/UserVO.java`
   - API 响应数据结构

**需要您确认**: 
1. 您要修改的是哪一层？（Controller / Service / Repository / DTO / VO）
2. 具体是哪个接口/方法？（如果知道的话）
3. 要修改什么内容？（新增字段？修改逻辑？调整权限？改变返回结构？）

💡 **推荐依据**: 通常说"修改用户接口"指的是 Controller 或 Service 层，建议从选项 1 或 5 开始确认。
```

---

### 示例 7：数据库变更的歧义（场景 A + C 混合）

**用户输入**：
> "给用户表加个字段"

**歧义类型**：场景 A（模块归属不明）+ 场景 C（术语歧义）

**项目上下文**：Python Django 后端项目

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 给用户表加个字段

**项目类型**: Python (Django) 后端项目

**检测到的歧义类型**: 场景 A + 场景 C（混合歧义）

**歧义分析**:

**维度 1 - "用户表"可能有多种指代**（场景 C）:
- **可能性 A**：Django 内置的 auth_user 表（django.contrib.auth.models.User）
- **可能性 B**：自定义的用户 Profile 表（models UserProfile）
- **可能性 C**：扩展的 AbstractUser 子类（models CustomUser）
- **可能性 D**：会员表 / 客户表（models Member / Customer）

**维度 2 - 涉及多层改动**（场景 A）:
找到以下需要同步修改的位置：

| 层级 | 文件路径 | 需要做的改动 |
|------|---------|------------|
| Model | `models.py` | 添加字段定义 |
| Serializer | `serializers.py` | 添加序列化字段 |
| View/ViewSet | `views.py` | 可能需要更新逻辑 |
| Admin | `admin.py` | 管理后台展示 |
| Migration | `migrations/` | 生成数据库迁移文件 |
| Frontend DTO | `types/user.ts` (如有前端) | TypeScript 类型定义 |
| API 文档 | `docs/` 或 swagger | 接口文档更新 |

**缺失信息**（场景 D）:
- ❓ **WHAT**：要添加什么字段？（字段名、类型、是否必填、默认值？）
- ❓ **WHICH USER TABLE**：是内置 User 还是自定义用户模型？

**需要您确认**:
1. 是给 Django 内置的 User 模型加字段，还是您的自定义用户模型？
2. 新字段的详细信息是什么？（名称、类型、是否允许为空、默认值、是否有 uniqueness 约束等）
3. 该字段是否需要在 Admin 后台、API 接口、前端表单中都体现？
```

---

### 示例 8：服务间调用的歧义（场景 A - 微服务环境）

**用户输入**：
> "修复调用用户服务的超时问题"

**歧义类型**：场景 A - 模块/服务归属不明（微服务环境）

**项目上下文**：Go 微服务项目（Docker Compose 编排）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 修复调用用户服务的超时问题

**项目类型**: Go 微服务项目 (Docker Compose)

**检测到的歧义类型**: 场景 A - 微服务调用链路不明

**服务拓扑分析**:

当前微服务架构中，以下服务都调用了"用户服务" (`user-service`)：

1. **订单服务 (order-service)** - `services/order/internal/client/user_client.go`
   - 调用场景: 下单时校验用户状态、获取用户等级
   - 当前超时配置: 3s
   
2. **支付服务 (payment-service)** - `services/payment/internal/client/user_client.go`
   - 调用场景: 支付时验证用户身份、查询用户钱包
   - 当前超时配置: 5s
   
3. **网关服务 (gateway-service)** - `services/gateway/middleware/auth.go`
   - 调用场景: 每次 API 请求的 Token 校验
   - 当前超时配置: 2s
   
4. **通知服务 (notification-service)** - `services/notification/internal/client/user_client.go`
   - 调用场景: 发送推送前获取用户偏好设置
   - 当前超时配置: 3s

**另外，"用户服务"本身也有多个版本/实例**:
- `user-service:v1.2.0` (当前生产)
- `user-service:v1.3.0-beta` (灰度测试中)

**需要您确认**:
1. 是哪个服务调用用户服务时出现了超时？（订单/支付/网关/通知）
2. 超时发生在什么场景下？（高峰期？特定接口？随机发生？）
3. 您希望怎么修？（增加超时时间？加重试机制？优化用户服务性能？加熔断降级？）
4. 是否有相关的错误日志或监控截图可以提供？

💡 **推荐依据**: 网关服务（选项 3）的超时配置最短（2s），且每次请求都会触发，是最容易出现超时的调用方。
```

---

### 示例 9：定时任务的歧义（场景 B - 同名冲突）

**用户输入**：
> "修改每天凌晨执行的定时任务"

**歧义类型**：场景 B - 同名资源冲突

**项目上下文**：Node.js + Bull Queue 项目

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 修改每天凌晨执行的定时任务

**项目类型**: Node.js 后端项目 (Express + Bull Queue)

**检测到的歧义类型**: 场景 B - 同名资源冲突

**冲突资源列表**:

找到以下 **5 个** 都在"每天凌晨"执行的任务：

| # | 任务名称 | 文件路径 | 执行时间 | 功能说明 |
|---|---------|---------|---------|---------|
| 1 | **数据清理任务** | `jobs/cleanup-expired-data.js` | 每天 02:00 | 清理过期临时数据、过期Token |
| 2 | **报表生成任务** | `jobs/generate-daily-report.js` | 每天 03:00 | 生成前一天的业务统计报表 |
| 3 | **数据同步任务** | `jobs/sync-third-party-data.js` | 每天 01:00 | 从第三方系统同步数据 |
| 4 | **会员到期检查** | `jobs/check-membership-expiry.js` | 每天 00:30 | 检查并处理到期会员 |
| 5 | **缓存预热任务** | `jobs/warmup-cache.js` | 每天 04:00 | 预热热点数据到 Redis |

**需要您确认**: 请问您要修改以上哪个定时任务？

**补充追问**（如果用户选择了某个任务）:
- 要修改什么？（执行时间？业务逻辑？重试策略？并发配置？）
- 当前遇到了什么问题？（执行失败？耗时过长？漏执行？）
```

---

### 示例 10：中间件的歧义（场景 A + B 混合）

**用户输入**：
> "在中间件里加点日志"

**歧义类型**：场景 A（模块归属不明）+ 场景 B（同名冲突）

**项目上下文**：NestJS (Node.js/TypeScript) 后端项目

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 在中间件里加点日志

**项目类型**: Node.js (NestJS) 后端项目

**检测到的歧义类型**: 场景 A + 场景 B（混合歧义）

**中间件列表**:

1. **认证中间件** - `middlewares/auth.middleware.ts` - JWT Token 校验
2. **权限中间件** - `middlewares/role-check.middleware.ts` - RBAC 权限验证
3. **日志中间件** - `middlewares/logger.middleware.ts` - HTTP 请求日志（已有基础日志）
4. **限流中间件** - `middlewares/rate-limit.middleware.ts` - API 速率限制
5. **错误处理中间件** - `middlewares/error-handler.middleware.ts` - 全局异常捕获
6. **CORS 中间件** - `middlewares/cors.middleware.ts` - 跨域处理
7. **请求解析中间件** - `middlewares/body-parser.middleware.ts` - 请求体解析
8. **Guards (守卫)** - `guards/*.guard.ts` - NestJS 特有的 Guard 机制（类似中间件）
   - `guards/jwt-auth.guard.ts`
   - `guards/roles.guard.ts`
   - `guards/throttle.guard.ts`

**歧义说明**:
- NestJS 中 **Middleware** 和 **Guard** / **Interceptor** / **Pipe** 都是请求处理管道的不同环节
- "中间件"可能泛指整个请求生命周期中的任何拦截点

**可能的意图**（按概率排序）:
🅰️ 给现有的 Logger 中间件（选项 3）**增强**日志内容（最可能）
🅱️ 给 Auth 中间件（选项 1）**添加**认证失败日志
🅲️ 给某个 Guard 或 Interceptor **添加**日志
🅳️ 创建**全新的**日志中间件/拦截器

**需要您确认**:
1. 您说的是哪个中间件？（上面列出的 1-8，或者是 Guard/Interceptor？）
2. 要记录什么日志？（请求参数？响应时间？错误堆栈？业务关键节点？）
3. 日志输出到哪里？（控制台？文件？ELK？数据库？）
```

---

## 三、全栈同名冲突示例

### 示例 11：登录功能的全栈冲突（场景 B - 跨层同名）

**用户输入**：
> "修改登录的逻辑"

**歧义类型**：场景 B - 同名资源冲突（全栈跨层）

**项目上下文**：全栈项目（Vue 3 前端 + Spring Boot 后端）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 修改登录的逻辑

**项目类型**: 全栈项目 [Vue 3 前端 + Java Spring Boot 后端]

**检测到的歧义类型**: 场景 B - 跨层同名资源冲突

**冲突资源列表（按技术栈分层）**:

### 🔵 前端层 (apps/web/)
| # | 资源 | 路径 | 说明 |
|---|------|------|------|
| 1 | **登录页面** | `views/Login.vue` | 登录表单UI，含账号/密码/验证码/记住我 |
| 2 | **登录 API 封装** | `api/auth.ts` → `login()` | 前端HTTP请求封装，调后端接口 |
| 3 | **登录状态管理** | `stores/auth.ts` → `useAuthStore()` | Pinia Store，管理token/用户信息 |
| 4 | **登录路由守卫** | `router/guards/auth.ts` | 路由前置守卫，检查登录态 |
| 5 | **Token 工具** | `utils/token.ts` | Token 存取/刷新/清除 |
| 6 | **登录表单校验** | `rules/login.ts` | 表单验证规则（手机号/密码格式等） |

### 🟢 后端层 (apps/server/)
| # | 资源 | 路径 | 说明 |
|---|------|------|------|
| 7 | **登录接口** | `controllers/AuthController.login()` | REST API: POST /api/auth/login |
| 8 | **登录服务** | `services/AuthService.login()` | 核心业务逻辑：校验凭证→生成Token |
| 9 | **用户认证** | `services/UserAuthService` | 用户名/密码/手机号多种登录方式 |
| 10 | **第三方登录** | `services/OauthService` | 微信/支付宝/GitHub OAuth |
| 11 | **Security Config** | `config/SecurityConfig.java` | Spring Security 过滤链配置 |
| 12 | **JWT 工具** | `utils/JwtUtil.java` | Token 生成/解析/验签 |
| 13 | **登录事件监听** | `listener/LoginEventListener.java` | 登录成功/失败事件处理（审计日志） |

**需要您确认**:
1. 您要改的是**前端**还是**后端**？（还是两端都要改？）
2. 具体改哪一块？（页面UI？接口调用？状态管理？后端业务逻辑？认证方式？）
3. 修改的目标是什么？（加验证码？换OAuth？改错误处理？改Token策略？）

💡 **推荐依据**: 
- 如果是UI相关 → 前端选项 1/6
- 如果是接口报错 → 前端选项 2 或 后端选项 7
- 如果是安全问题 → 后端选项 8/11/12
- 如果是新功能（如短信登录）→ 可能涉及前后端多处
```

---

### 示例 12：用户概念的歧义（场景 C - 术语多义）

**用户输入**：
> "获取当前用户的信息"

**歧义类型**：场景 C - 术语歧义（"用户"的多义性）

**项目上下文**：React + Node.js 全栈项目

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 获取当前用户的信息

**项目类型**: 全栈项目 [React (Next.js) + Node.js (Express)]

**检测到的歧义类型**: 场景 C - 术语歧义

**歧义分析 - "用户"在此项目中的多重含义**:

| 含义 | 数据模型 | 典型字段 | 使用场景 |
|------|---------|---------|---------|
| **A. 登录用户 (Auth User)** | `User` (auth_users) | id, username, password_hash, email, phone | 登录认证、权限判断 |
| **B. 个人资料 (Profile)** | `UserProfile` | id, user_id, nickname, avatar, bio, gender | 个人中心展示 |
| **C. 会员信息 (Member)** | `Member` | id, user_id, level, points, expire_date | 会员权益、积分系统 |
| **D. 操作者 (Operator)** | 上下文中的 currentUser | id, name, role, department | 审计日志、操作记录 |
| **E. 第三方用户 (OAuth User)** | `OAuthAccount` | provider, provider_id, raw_data | 微信/GitHub 登录关联 |
| **F. 前端上下文 (React Context)** | `AuthContext.user` | { id, name, token, permissions } | 前端组件中使用 |

**"当前用户信息"可能的指代**:
- **可能性 1**：获取登录后的基本用户信息（ID、用户名、Token）→ 对应 A/F
- **可能性 2**：获取用户的详细个人资料（头像、昵称、简介）→ 对应 B
- **可能性 3**：获取用户的会员等级和积分 → 对应 C
- **可能性 4**：获取当前操作者的信息用于审计日志 → 对应 D

**代码层面也找到了多个获取"当前用户"的方式**:
1. 前端: `const { user } = useAuth()` (React Context Hook)
2. 前端: `const user = await api.getCurrentUser()` (API 调用)
3. 后端: `const user = req.user` (Express req 对象，由 auth middleware 注入)
4. 后端: `const user = await userService.findById(userId)` (手动查询)

**需要您确认**:
1. 您说的"当前用户信息"具体指哪些数据？（基本信息？个人资料？会员信息？）
2. 这个操作是在前端还是后端执行？
3. 用途是什么？（展示在页面上？传给后端接口？写入日志？）
```

---

## 四、术语歧义示例

### 示例 13：订单状态的歧义（场景 C - 术语多义）

**用户输入**：
> "修改订单状态"

**歧义类型**：场景 C - 术语歧义

**项目上下文**：电商系统（Vue 3 + Java Spring Boot）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 修改订单状态

**项目类型**: 电商全栈项目 [Vue 3 + Java Spring Boot + MySQL]

**检测到的歧义类型**: 场景 C - 术语多义

**歧义分析 - "订单状态"在不同层面的含义**:

### 层面 1: 数据库层面
```sql
-- orders 表的 status 字段
status ENUM('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED')
```
- **可能性 A**: 直接 UPDATE 数据库的 status 字段值

### 层面 2: 状态机层面
```java
// OrderStateMachine.java - 状态流转规则
PENDING --(pay)--> PAID --(ship)--> SHIPPED --(deliver)--> DELIVERED
                |--(cancel)--> CANCELLED
PAID      --(refund)--> REFUNDED
SHIPPED   --(refund)--> REFUNDED
```
- **可能性 B**: 修改状态机的流转规则（如：允许从 SHIPPED 直接到 DELIVERED 跳过某些状态）

### 层面 3: API/接口层面
```java
// PUT /api/orders/{id}/status
{ "status": "SHIPPED", "reason": "已发货", "trackingNo": "SF123456" }
```
- **可能性 C**: 调用状态变更的 API 接口

### 层面 4: 前端展示层面
```vue
<!-- OrderStatusTag.vue -->
<el-tag :type="statusMap[order.status].type">
  {{ statusMap[order.status].label }}
</el-tag>
```
- **可能性 D**: 修改前端状态的展示文案/颜色/图标

### 层面 5: 枚举定义层面
```typescript
// enums/order-status.ts
export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  // ...
}
```
- **可能性 E**: 修改枚举定义（增删状态值）

**当前项目的状态流转**:
```
待支付(PENDING) → 已支付(PAID) → 已发货(SHIPPED) → 已送达(DELIVERED) → 已完成(COMPLETED)
                              ↓                    ↓
                         已取消(CANCELLED)    退款中(REFUNDING) → 已退款(REFUNDED)
```

**需要您确认**:
1. 您是要**修改某个订单的状态值**（如将订单A从"待支付"改为"已支付"），还是要**修改状态流转规则**？
2. 如果是修改规则：要增加新状态？删除现有状态？改变流转条件？
3. 如果是修改单个订单状态：通过什么方式？（后台手动改？调接口？直接改数据库？）
4. 这个改动会影响前端展示吗？（状态标签的颜色/文案/图标）
```

---

### 示例 14：权限的歧义（场景 C - 术语多义）

**用户输入**：
> "加上权限控制"

**歧义类型**：场景 C - 术语歧义

**项目上下文**：企业级管理系统（React + NestJS + RBAC）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 加上权限控制

**项目类型**: 企业级管理系统 [React + NestJS + PostgreSQL]

**检测到的歧义类型**: 场景 C - 术语多义

**歧义分析 - "权限"在此系统中的多层次含义**:

### 类型 1: 菜单权限（功能权限）
- **含义**: 控制用户能看到/访问哪些菜单和页面
- **实现位置**: 前端路由守卫 + 后端菜单过滤
- **示例**: 普通用户看不到"系统管理"菜单

### 类型 2: 按钮权限（操作权限）
- **含义**: 控制用户在页面上能操作哪些按钮
- **实现位置**: 前端指令 `v-permission` / 自定义 Hook `usePermission()`
- **示例**: 只有管理员才能看到"删除"按钮

### 类型 3: 数据权限（数据范围）
- **含义**: 控制用户能看到哪些数据范围
- **实现位置**: 后端查询条件注入（WHERE 子句动态拼接）
- **示例**: 部门经理只能看到本部门的数据

### 类型 4: API 接口权限
- **含义**: 控制用户能否调用某个后端接口
- **实现位置**: 后端 Guard / Interceptor + RBAC 中间件
- **示例**: `/api/users` 需要 `user:read` 权限才能访问

### 类型 5: 字段权限（列权限）
- **含义**: 控制用户能看到/编辑数据表的哪些字段
- **实现位置**: 后端 DTO 动态字段过滤 + 前端表格列显隐
- **示例**: 普通员工看不到"薪资"字段

**当前系统的权限模型**:
```
角色(Role): 超级管理员 | 部门经理 | 普通员工 | 只读用户
权限(Permission): 
  - 菜单: user:list, user:create, order:* , system:*
  - 按钮: user:edit, user:delete, order:export
  - 数据: self_only, dept_only, all_data
  - 接口: GET:/api/users, POST:/api/users, DELETE:/api/users/{id}
```

**需要您确认**:
1. 您要加的是哪种类型的权限控制？（菜单权限？按钮权限？数据权限？接口权限？字段权限？）
2. 是针对**新建的功能/页面**，还是给**已有的功能**补加权限？
3. 权限控制的粒度是什么？（到页面？到按钮？到数据行？到字段？）
4. 是否需要可视化的权限配置界面？（还是硬编码在代码中？）
```

---

### 示例 15：缓存的歧义（场景 C - 术语多义）

**用户输入**：
> "清理一下缓存"

**歧义类型**：场景 C - 术语歧义

**项目上下文**：大型 Web 应用（Vue 3 + Go + Redis + CDN）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 清理一下缓存

**项目类型**: 大型 Web 应用 [Vue 3 SPA + Go API + Redis Cluster + CDN]

**检测到的歧义类型**: 场景 C - 术语多义

**歧义分析 - 此系统中存在的多种"缓存"**:

| 缓存类型 | 位置 | 存储介质 | 内容 | 清理方式 |
|---------|------|---------|------|---------|
| **浏览器缓存** | 用户浏览器 | Browser Cache / localStorage / sessionStorage | 静态资源(JS/CSS/图片)、Token、本地数据 | 用户 Ctrl+F5 / 清除浏览器数据 |
| **CDN 缓存** | CDN 节点 (阿里云CDN) | Edge Cache | 静态资源、HTML页面 | CDN 控制台刷新 / URL 版本号 |
| **Nginx 缓存** | 反向代理服务器 | Proxy Cache | API 响应、静态文件 | nginx -s reload / 清除 proxy_cache_path |
| **Redis 缓存** | Redis Cluster | Redis (内存) | 会话数据、热点数据、Token、验证码 | Redis CLI: FLUSHDB / DEL key |
| **应用内存缓存** | Go 应用进程 | sync.Map / cache lib (go-cache/ristretto) | 本地热点数据、配置信息 | 重启应用 / 调用清理接口 |
| **ORM 查询缓存** | GORM (Go ORM) | 内置缓存层 | 数据库查询结果 | GORM 清除缓存 / 重启 |
| **Service Worker 缓存** | 浏览器后台线程 | Cache Storage | 离线资源、PWA 缓存 | SW unregister / Cache.delete() |
| **模板缓存** | 前端构建产物 | 编译缓存(.vite/) | Vite/Webpack 构建缓存 | rm -rf node_modules/.vite |

**"清理缓存"可能的意图**:

🅰️ **前端开发调试** → 清除 Vite 缓存 + 浏览器硬刷新（最常见）
🅱️ **部署后用户看到旧页面** → CDN 缓存刷新 + Nginx 缓存清理
🅲️ **数据不一致问题** → Redis 缓存清理（某个 key 或全库）
🅳️ **PWA 离线资源异常** → Service Worker 缓存清理
🅴️ **接口返回旧数据** → Redis + 应用内存缓存清理

**需要您确认**:
1. 您遇到的缓存相关问题是什么？（页面没更新？数据不对？PWA 异常？）
2. 您想清理哪种/哪几种缓存？（可以多选）
3. 是开发环境的本地调试，还是生产环境的线上问题？
4. 如果是 Redis 缓存：是清理全部数据，还是特定的 key/pattern？

💡 **建议排查顺序**:
1. 先确认是否是浏览器缓存 → Ctrl+Shift+R 强刷
2. 再确认是否是构建缓存 → `rm -rf node_modules/.vite && pnpm dev`
3. 然后确认是否是 Redis 缓存 → 查看对应 key 的 TTL 和值
4. 最后确认是否是 CDN 缓存 → 检查响应头 Cache-Control / Age
```

---

### 示例 16：导出的歧义（场景 C + A 混合）

**用户输入**：
> "实现导出功能"

**歧义类型**：场景 C（术语歧义）+ 场景 A（模块归属不明）

**项目上下文**：企业级后台管理系统（Angular + Spring Boot）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 实现导出功能

**项目类型**: 企业级后台管理系统 [Angular + Java Spring Boot]

**检测到的歧义类型**: 场景 C + 场景 A（混合歧义）

**歧义分析 - "导出"的多种含义**:

### 维度 1: 导出格式（场景 C）
| 格式 | 文件扩展名 | 典型场景 | 技术方案 |
|------|-----------|---------|---------|
| Excel (.xlsx) | .xlsx | 数据报表导出 | Apache POI / EasyExcel (Java), ExcelJS (前端) |
| CSV (.csv) | .csv | 大批量数据导出 | 手动拼接 CSV / PapaParse (前端) |
| PDF (.pdf) | .pdf | 打印/归档 | iText / Flying Saucer (Java), jsPDF / html2canvas (前端) |
| Word (.docx) | .docx | 合同/公文导出 | Apache POI (Java), docx (前端) |
| JSON (.json) | .json | API 数据交换 | JSON.stringify / Jackson |
| ZIP (.zip) | .zip | 批量文件打包 | ZipOutputStream (Java), JSZip (前端) |

### 维度 2: 导出位置（场景 A）
找到以下 **8 个列表页面**都可能需要导出功能：

1. **用户列表** - `views/user/user-list.component.ts` - 导出用户数据
2. **订单列表** - `views/order/order-list.component.ts` - 导出订单明细
3. **商品列表** - `views/product/product-list.component.ts` - 导出商品信息
4. **日志列表** - `views/system/log-list.component.ts` - 导出操作日志
5. **财务报表** - `views/finance/report.component.ts` - 导出财务报表
6. **数据统计** - `views/analytics/dashboard.component.ts` - 导出图表数据
7. **库存列表** - `views/inventory/inventory-list.component.ts` - 导出库存数据
8. **客户列表** - `views/customer/customer-list.component.ts` - 导出客户资料

### 维度 3: 导出方式（场景 C）
- **前端导出**：在前端生成文件（适合小数据量 < 1万行）
- **后端导出**：后端生成文件并提供下载链接（适合大数据量 / 复杂格式）
- **异步导出**：后端异步生成 → 通知/轮询下载（适合超大文件 > 10万行）

**需要您确认**:
1. 要给哪个列表/页面添加导出功能？（以上 8 个候选）
2. 导出什么格式？（Excel / CSV / PDF / Word / 其他）
3. 数据量大吗？（预计多少行？<1万 / 1万~10万 / >10万）
4. 是前端直接生成，还是后端生成后下载？
5. 是否需要导出模板（表头样式、合并单元格、图表等）？
6. 是否需要支持"导出当前页"和"导出全部"两种模式？
```

---

## 五、需求模糊性示例

### 示例 17：优化性能的极端模糊（场景 D - 需求高度模糊）

**用户输入**：
> "优化一下"

**歧义类型**：场景 D - 需求极度模糊

**项目上下文**：未知（需要先识别）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 优化一下

**项目类型**: [正在识别...]

**检测到的歧义类型**: 场景 D - 需求极度模糊（缺少 WHAT / WHERE / HOW 所有维度）

**缺失信息分析**:

❓ **WHAT（做什么）** - 完全未知
- 优化性能？优化代码质量？优化用户体验？优化安全性？优化 SEO？
- 优化哪个方面？加载速度？渲染？内存？包体积？数据库查询？API 响应？

❓ **WHERE（在哪里）** - 完全未知
- 整个项目？某个页面？某个接口？某个组件？某段代码？
- 前端？后端？数据库？基础设施？

❓ **HOW（怎么做/目标）** - 完全未知
- 当前有什么问题？期望达到什么效果？
- 有性能基准数据吗？（Lighthouse 分数？接口响应时间？内存占用？）
- 有具体的优化指标吗？（加载时间 < 2s？LCP < 2.5s？FPS > 55？）

**引导性问题**（帮助用户逐步明确需求）:

为了更好地帮您优化，请您尽量回答以下问题：

**第一步 - 确定范围**
1. 您最近在做/看的哪个功能或页面遇到了问题？
2. 能告诉我具体的文件路径或页面名称吗？

**第二步 - 确定问题**
3. 您感受到的具体问题是什么？（慢？卡？报错？丑？难用？）
4. 问题是什么时候出现的？（一直存在？最近才出现？某个操作后？）
5. 有没有错误信息或截图可以分享？

**第三步 - 确定目标**
6. 您期望优化后达到什么效果？
7. 有没有对竞品或参考系统的预期？

**第四步 - 确定约束**
8. 这个优化的紧急程度如何？（立即需要？本周内？下个版本？）
9. 可以投入多少时间/精力？（快速修复？全面重构？）

**当前我能做的**:
✅ 帮您分析项目结构和潜在的性能瓶颈点
✅ 运行 Lighthouse / 性能分析工具给出建议
✅ 检查代码中的常见反模式

**但需要您至少提供**:
- 一个具体的起点（页面/文件/功能名称）
- 或者一个具体的问题现象（"太慢了"、"报错了"...）
```

---

### 示例 18：调整逻辑的歧义（场景 D - 需求模糊）

**用户输入**：
> "调整一下业务的逻辑"

**歧义类型**：场景 D - 需求模糊

**项目上下文**：电商订单系统（Vue 3 + Java Spring Boot）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 调整一下业务的逻辑

**项目类型**: 电商订单系统 [Vue 3 + Java Spring Boot + MySQL + Redis]

**检测到的歧义类型**: 场景 D - 需求模糊

**缺失信息分析**:

❓ **WHAT** - "业务逻辑"范围极广：
- 订单创建逻辑？价格计算逻辑？库存扣减逻辑？促销规则逻辑？
- 支付流程逻辑？退款审核逻辑？物流分配逻辑？
- 会员积分逻辑？优惠券核销逻辑？权限校验逻辑？

❓ **WHERE** - 不清楚影响范围：
- 前端计算逻辑？后端 Service 层？数据库触发器？规则引擎？
- 哪个模块？订单？商品？支付？用户？营销？

❓ **HOW** - 不知道调整方向：
- 修复 Bug？新增规则？改变流程？优化性能？
- 调整条件？改变顺序？增加分支？简化复杂度？

**项目中的主要业务逻辑分布**:

| 业务域 | 核心逻辑文件 | 关键方法 | 复杂度 |
|-------|------------|---------|--------|
| **订单** | `OrderService.java` | createOrder(), cancelOrder(), refund() | ⭐⭐⭐⭐⭐ |
| **价格** | `PriceCalculator.java` | calculateFinalPrice(), applyDiscount() | ⭐⭐⭐⭐ |
| **库存** | `InventoryService.java` | deductStock(), reserveStock(), releaseStock() | ⭐⭐⭐⭐ |
| **促销** | `PromotionEngine.java` | matchPromotions(), calculateDiscount() | ⭐⭐⭐⭐⭐ |
| **支付** | `PaymentService.java` | createPayment(), handleCallback() | ⭐⭐⭐ |
| **退款** | `RefundService.java` | applyRefund(), approveRefund() | ⭐⭐⭐⭐ |
| **物流** | `ShippingService.java` | allocateCarrier(), trackShipment() | ⭐⭐⭐ |
| **会员** | `MembershipService.java` | calculatePoints(), checkLevel() | ⭐⭐⭐ |

**引导式追问**:

为了精准定位您要调整的业务逻辑，请问：

1. **业务域**：是订单、价格、库存、促销、支付、退款、物流、会员中的哪一个？（或者多个？）
2. **触发场景**：这个逻辑在什么操作时会执行？（下单？支付？退款？取消？）
3. **当前问题**：现在的逻辑有什么问题？（算错？太慢？不符合新需求？）
4. **期望变化**：您希望改成什么样的逻辑？（可以用自然语言描述，比如"满100减20变成满200减50"）
5. **影响评估**：这个调整会影响哪些地方？（仅后端？前端也要配合改？需要数据库迁移？）

**如果您不方便详细描述**，也可以：
- 📎 提供一份需求文档/产品原型截图
- 📎 描述一个具体的输入→期望输出的例子
- 📎 告诉我是哪个功能点的逻辑（如"购物车结算时的价格计算"）
```

---

### 示例 19：加一个功能的典型模糊（场景 D - 需求模糊）

**用户输入**：
> "加一个功能"

**歧义类型**：场景 D - 需求极度模糊

**项目上下文**：内容管理系统（CMS）（React + Node.js + MongoDB）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 加一个功能

**项目类型**: 内容管理系统 (CMS) [React + Node.js + MongoDB]

**检测到的歧义类型**: 场景 D - 需求极度模糊

**缺失信息分析**:

❓ **WHAT（加什么功能）** - 完全未知
- 内容类的？（文章/评论/标签/分类/搜索）
- 用户类的？（注册/登录/个人中心/权限）
- 系统类的？（设置/日志/备份/导入导出）
- 交互类的？（拖拽排序/批量操作/富文本/文件上传）
- 统计类的？（阅读量/点赞/收藏/分享）
- 其他？

❓ **WHERE（加在哪里）** - 完全未知
- 前端页面？后端接口？数据库？管理后台？用户前台？
- 新建独立页面？在现有页面追加？作为组件嵌入？

❓ **HOW（怎么加）** - 完全未知
- 从零开发？接入第三方服务？复制现有功能改造？
- 需要设计稿？有参考样例？自由发挥？

**当前 CMS 系统已有的功能模块**:

### 前端 (前台)
- ✅ 文章列表/详情/搜索
- ✅ 分类浏览
- ✅ 评论系统
- ✅ 用户登录/注册
- ✅ 个人中心
- ✅ 点赞/收藏/分享

### 前端 (管理后台)
- ✅ 文章 CRUD
- ✅ 分类管理
- ✅ 用户管理
- ✅ 评论审核
- ✅ 数据统计仪表盘
- ✅ 系统设置

### 后端
- ✅ RESTful API (文章/用户/评论/分类/文件上传)
- ✅ JWT 认证 + RBAC 权限
- ✅ 文件上传 (本地/OSS)
- ✅ 全文搜索 (MeiliSearch/Elasticsearch)

**引导式对话**:

我可以帮您梳理需求，请尝试回答：

**🔄 第一轮 - 方向确认**
> 这个功能大概属于哪个方向？
> - A. 内容相关的（文章/媒体/搜索...）
> - B. 用户相关的（社交/会员/消息...）
> - C. 管理相关的（运营/数据分析/系统...）
> - D. 交互/体验相关的（UI改进/动画/响应式...）
> - E. 其他（请简要描述）

**🔄 第二轮 - 场景描述**（根据第一轮答案深入）
> 能描述一下用户使用这个功能的典型场景吗？
> 例如："用户在阅读文章时，想要..."

**🔄 第三轮 - 具体细节**
> 这个功能的核心交互是什么？
> 例如："点击XX按钮 → 弹出XX → 选择XX → 完成XX"

**🔄 第四轮 - 参考与约束**
> - 有没有类似的参考产品/页面？（可以发链接或截图）
> - 有没有技术上的特殊要求？（兼容性/性能/安全性）
> - 希望什么时候完成？

**温馨提示** 💡:
哪怕只说一句"类似 XX 网站的 XX 功能"，也能帮我大幅缩小范围，给出更有针对性的方案。
```

---

## 六、架构特殊场景示例

### 示例 20：Monorepo 跨包修改（场景 A - Monorepo 环境）

**用户输入**：
> "修改用户相关的类型定义"

**歧义类型**：场景 A - Monorepo 跨包归属不明

**项目上下文**：pnpm Turborepo Monorepo（packages/ui + packages/api + packages/types + apps/web + apps/admin）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 修改用户相关的类型定义

**项目类型**: Monorepo (pnpm + Turborepo) [React + TypeScript]

**检测到的歧义类型**: 场景 A - Monorepo 跨包归属不明

**Workspace 结构分析**:

```
monorepo-root/
├── packages/
│   ├── types/          ← 共享类型定义包 (被所有包依赖)
│   │   └── src/
│   │       ├── user.ts        ← 用户基础类型 (User, CreateUser, UpdateUser)
│   │       ├── auth.ts        ← 认证相关类型 (LoginRequest, LoginResponse, TokenPayload)
│   │       ├── api.ts         ← API 通用类型 (ApiResponse, PaginatedResult)
│   │       └── index.ts       ← 统一导出
│   │
│   ├── ui/             ← 共享 UI 组件包
│   │   └── src/
│   │       ├── components/user/   ← 用户相关组件
│   │       │   ├── UserAvatar.tsx     ← 使用 User 类型
│   │       │   ├── UserCard.tsx       ← 使用 User 类型
│   │       │   └── UserSelect.tsx     ← 使用 User 类型
│   │       └── types/            ← UI 组件内部 Props 类型
│   │           └── user-props.ts  ← UserAvatarProps, UserCardProps 等
│   │
│   ├── api/            ← API 请求封装包
│   │   └── src/
│   │       ├── modules/
│   │       │   └── user.ts         ← 用户 API 函数 + 请求/响应类型
│   │       └── types/
│   │           └── api.types.ts    ← API 层特有类型定义
│   │
│   └── utils/          ← 工具函数包
│       └── src/
│           └── user.ts              ← 用户相关工具函数 + 类型
│
├── apps/
│   ├── web/           ← 前台应用
│   │   └── src/
│   │       ├── types/          ← 应用层类型（可能 extends packages/types）
│   │       │   └── user.ts     ← WebUser (扩展了基础 User)
│   │       └── stores/
│   │           └── user.ts      ← Zustand store (使用 User 类型)
│   │
│   └── admin/         ← 管理后台应用
│       └── src/
│           ├── types/
│           │   └── user.ts     ← AdminUser (管理视角的 User)
│           └── pages/
│               └── user/       ← 用户管理页面
│
└── turbo.json
```

**候选修改位置**:

| # | 包 | 文件 | 类型定义 | 被引用范围 |
|---|----|------|---------|-----------|
| 1 | **packages/types** | `src/user.ts` | `User`, `CreateUser`, `UpdateUser` (基础类型) | **全局被引用** (ui, api, apps/web, apps/admin) |
| 2 | **packages/types** | `src/auth.ts` | `LoginRequest`, `TokenPayload` (认证类型) | api, apps/web, apps/admin |
| 3 | **packages/ui** | `src/types/user-props.ts` | `UserAvatarProps`, `UserCardProps` (组件Props) | 仅 packages/ui 内部 |
| 4 | **packages/api** | `src/modules/user.ts` + `src/types/api.types.ts` | API 请求/响应类型 | apps/web, apps/admin |
| 5 | **apps/web** | `src/types/user.ts` | `WebUser` (扩展类型) | 仅 apps/web |
| 6 | **apps/admin** | `src/types/user.ts` | `AdminUser` (管理类型) | 仅 apps/admin |

**⚠️ Monorepo 影响分析**:

如果修改 **选项 1 (packages/types/src/user.ts)**:
- 🔴 **高风险** - 这是共享基础类型，修改会影响所有下游包
- 📦 需要同时检查: packages/ui, packages/api, apps/web, apps/admin
- 🔄 可能需要: 同步更新版本号 → 各包重新 install → 类型检查通过
- ⏱️ 预估影响范围: **全量**

如果修改 **选项 5 (apps/web/src/user.ts)**:
- 🟢 **低风险** - 仅影响 web 应用
- 📦 无需联动其他包
- ⏱️ 预估影响范围: **仅 apps/web**

**需要您确认**:
1. 您要修改的是**共享的基础类型**（影响所有包），还是**某个应用特有的类型**？
2. 修改的内容是什么？（新增字段？改字段名？改类型？删除字段？）
3. 是否需要保持向后兼容？（下游包是否都需要同步修改？）

💡 **推荐依据**:
- 如果是"给 User 加一个字段" → 很可能是选项 1（共享类型），但要注意兼容性
- 如果是"管理后台要多显示几个字段" → 可能是选项 6（AdminUser 扩展）
- 如果不确定 → 建议从选项 1 开始确认，因为它是上游源头
```

---

### 示例 21：微服务跨服务改动（场景 A - 微服务环境）

**用户输入**：
> "修改用户地址的校验规则"

**歧义类型**：场景 A - 微服务跨服务归属不明

**项目上下文**：微服务架构（用户服务 + 订单服务 + 支付服务 + 网关 + 前端）

**系统输出报告**：

```markdown
## ⚠️ 需求歧义检测报告

**原始需求**: 修改用户地址的校验规则

**项目类型**: 微服务架构 [Spring Cloud + Vue 3 + PostgreSQL + Redis + RabbitMQ]

**检测到的歧义类型**: 场景 A - 微服务跨服务归属不明

**服务拓扑与"用户地址"的分布**:

```
                    ┌─────────────┐
                    │   前端 (Vue)  │ ← 地址表单组件 + 校验规则
                    └──────┬───────┘
                           │ HTTP
                    ┌──────▼───────┐
                    │   API 网关    │ ← 路由转发 / 限流
                    └──────┬───────┘
              ┌────────────┼────────────┐
              │            │            │
     ┌────────▼──┐ ┌──────▼────┐ ┌────▼────────┐
     │ 用户服务   │ │ 订单服务   │ │  支付服务    │
     │ (user-svc) │ │(order-svc) │ │(payment-svc)│
     └─────┬──────┘ └─────┬──────┘ └─────────────┘
           │               │
    ┌──────▼──────┐ ┌──────▼──────┐
    │  用户数据库   │ │  订单数据库   │
    │ (PostgreSQL) │ │ (PostgreSQL) │
    └─────────────┘ └─────────────┘
```

**涉及"用户地址"的服务和位置**:

| 服务/层 | 文件/组件 | 地址相关逻辑 | 说明 |
|--------|----------|------------|------|
| **前端** | `components/address/AddressForm.vue` | 前端表单校验（必填、格式、长度） | 用户填写地址时的即时校验 |
| **前端** | `validators/address.ts` | 校验规则函数（省市区、邮编、手机号） | 可被多个表单复用 |
| **前端** | `api/address.ts` | 地址 CRUD API 调用 | 前端接口层 |
| **用户服务** | `controller/AddressController.java` | `@Valid` 注解校验 | 接收请求时的参数校验 |
| **用户服务** | `service/AddressService.java` | 业务规则校验（重复地址、数量上限） | 服务层业务校验 |
| **用户服务** | `dto/AddressDTO.java` | `@NotNull`, `@Size`, `@Pattern` | DTO 字段级校验 |
| **用户服务** | `entity/Address.java` | JPA 实体 + `@Column` 约束 | 数据库映射层 |
| **订单服务** | `service/OrderService.java` | 收货地址校验（配送范围、地址完整性） | 下单时校验地址可用性 |
| **用户数据库** | `addresses` 表 | `CHECK` 约束, `NOT NULL`, UNIQUE | 数据库层约束 |
| **配置中心** | `address-rules.yaml` | 地址校验规则配置（外部化） | 可热更新的规则配置 |

**可能的修改意图**:

🅰️ **前端校验增强** → 修改 `AddressForm.vue` 或 `validators/address.ts`
- 例：增加"详细地址不能少于5个字"的规则

🅱️ **后端 DTO 校验修改** → 修改 `AddressDTO.java`
- 例：手机号格式从 `@Pattern(regexp="^1\\d{10}$")` 改为支持国际号码

🅲️ **业务规则调整** → 修改 `AddressService.java`
- 例：每个用户最多保存 5 个地址改为 10 个

🅳️ **订单服务联动** → 修改 `OrderService.java`
- 例：新增"地址必须在配送范围内"的校验

🅴️ **数据库约束变更** → ALTER TABLE addresses
- 例：街道字段从 VARCHAR(100) 改为 VARCHAR(255)

🅵️ **配置中心规则更新** → 修改 `address-rules.yaml`
- 例：修改邮编正则表达式（支持新版邮编格式）

**需要您确认**:
1. **校验规则的修改是在前端、后端、还是两边都要改？**
2. **具体要修改什么规则？**（例如：手机号格式、地址长度限制、必填项变化、新增校验项...）
3. **这个改动是否会影响订单服务？**（下单时是否会用到地址校验？）
4. **是否需要兼容已有数据？**（存量地址是否符合新规则？是否需要数据迁移？）

💡 **微服务改动风险提示**:
⚠️ 如果修改了用户服务的地址 DTO 校验，**订单服务**在下单时也会受到影响（因为订单服务可能会复用用户服务的地址数据或 DTO）
⚠️ 建议确认下游服务（订单服务、支付服务）是否有地址相关的消费逻辑
⚠️ 微服务间的接口变更需要考虑**版本兼容性**（是否需要接口版本号升级）
```

---

## 七、特殊场景示例

### 示例 22：精确路径跳过检测（无需触发）

**用户输入**：
> "修改 `src/views/user/UserDetail.vue` 中的头像上传逻辑"

**系统输出**：

```markdown
✅ 需求已确认，无歧义检测到。

**确认的目标**: `src/views/user/UserDetail.vue` → 头像上传相关逻辑

**可以开始执行**: 分析 UserDetail.vue 中头像上传的实现代码，准备进行修改。

**跳过原因**: 用户提供了精确的文件路径 + 明确的功能描述（头像上传逻辑），满足"无需触发检测"的条件。
```

---

### 示例 23：新项目首次使用（项目识别 + 引导）

**用户输入**：（在一个空的新项目目录中）
> "帮我加个登录功能"

**项目上下文**：刚通过 `npm create vite@latest my-app` 创建的空项目

**系统输出报告**：

```markdown
## ℹ️ 项目初始化检测报告

**原始需求**: 帮我加个登录功能

**项目状态**: 🆕 **新项目 / 初始化阶段**

**项目识别结果**:
- ✅ 检测到: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`
- 📦 依赖: vue, typescript, vite (最小依赖)
- 🏷️ 项目类型: **Vue 3 + TypeScript + Vite** (全新项目)
- 📁 当前状态: 仅包含脚手架默认文件，无业务代码
- ⚠️ 未检测到: 路由、状态管理、UI 框架、HTTP 客户端、后端接口

**前置依赖分析**:

实现"登录功能"通常需要以下基础设施（当前项目**尚未具备**）:

| 依赖/模块 | 状态 | 推荐方案 | 说明 |
|----------|------|---------|------|
| 路由管理 | ❌ 缺失 | vue-router | 登录页/首页/受保护路由 |
| 状态管理 | ❌ 缺失 | pinia | 存储用户信息 / Token |
| HTTP 客户端 | ❌ 缺失 | axios | 调用后端登录接口 |
| UI 组件库 | ❌ 缺失 | element-plus / naive-ui | 表单 / 按钮 / 消息提示 |
| 后端接口 | ❌ 缺失 | 需要自行搭建或对接 | 登录认证 API |
| 表单校验 | ❌ 缺失 | vee-validate / 自定义 | 手机号/密码格式校验 |

**需要您确认的方向**:

**🔀 路径 A - 我帮你把基础设施一起搭好**
> 安装 vue-router + pinia + axios + element-plus，然后实现完整的登录功能（登录页、路由守卫、Token管理、用户状态）
> 
> 预计新增文件: ~10 个文件，安装 ~5 个依赖

**🔀 路径 B - 你已经有后端了，我只写前端部分**
> 请提供:
> 1. 后端登录接口的地址和参数格式（POST /api/login ? body: {username, password}?）
> 2. 登录成功后的响应格式（Token 在哪里？用户信息结构？）
> 3. 是否需要注册页？忘记密码页？

**🔀 路径 C - 先搭最小可行版本**
> 仅实现最基本的登录表单 + mock 数据，后续再对接真实接口

**🔀 路径 D - 你有指定的技术栈要求吗？**
> 比如：必须用 XXX UI 库 / 必须用 OAuth / 必须支持短信登录等

**请问您想走哪条路线？** (A / B / C / D / 其他说明)
```

---

## 八、歧义检测决策速查表

### 快速判定流程

```
用户输入
    ↓
包含精确文件路径? ──YES──→ ✅ 直接执行，跳过检测
    ↓ NO
包含模糊词汇? ──YES──→ ⚠️ 进入场景 D（需求模糊性）
    ↓ NO
搜索匹配数 ≥ 2? ──YES──→ ⚠️ 进入场景 A/B/C
    ↓ NO
搜索匹配数 = 1?  ──YES──→ ✅ 确认唯一目标
    ↓ NO
搜索匹配数 = 0?  ──YES──→ ℹ️ 扩大搜索范围或提示手动指定
```

### 四种场景快速对照

| 场景 | 触发条件 | 典型关键词 | 处理方式 | 输出模板 |
|------|---------|-----------|---------|---------|
| **A. 模块归属不明** | 搜索 ≥2 个位置分布在不同模块 | "修改XX功能"、"加个XX" | 列出候选位置 + 推荐排序 | 候选选项列表 |
| **B. 同名冲突** | 同名资源 ≥2 个在不同位置 | "修改XX"（XX名称通用） | 列出同名资源 + 类型标注 | 冲突资源列表 |
| **C. 术语歧义** | 同一术语多含义 | "订单状态"、"权限"、"配置"、"缓存" | 分析多种含义 + 上下文列举 | 歧义分析报告 |
| **D. 需求模糊** | 缺少 WHAT/WHERE/HOW | "优化一下"、"调整"、"加一个功能"、"改一下" | 追问清单 + 引导式对话 | 缺失信息分析 |

### 常见需求模式 → 场景映射

| 用户输入模式 | 最可能场景 | 推荐处理策略 |
|------------|----------|------------|
| "修改/调整/优化 [具体功能名]" | A 或 B | 先搜索该功能名的所有匹配，按数量判断 |
| "给 [页面/模块] 加 [功能]" | A 或 D | 如果功能明确 → A；如果功能模糊 → D |
| "修改 [多义词] 的 XX" | C | 该多义词触发术语歧义分析 |
| "修复/解决 [问题现象]" | A 或 D | 问题现象可能对应多个位置 |
| "实现/添加 [通用功能]" | A | 通用功能（如导出、搜索）通常有多处候选 |
| "整体/全部/都 XX" | 可能涉及多处 | 需要列出所有受影响的位置 |
| "像 XX 网站/系统那样" | D | 参考描述但缺少具体实现细节 |

### 报告输出质量检查清单

生成歧义检测报告后，自查以下项：

- [ ] **是否回显了用户的原始输入**？（让用户知道你理解正确）
- [ ] **是否标注了项目类型和架构信息**？（Monorepo/微服务等特殊标注）
- [ ] **是否列出了具体的文件路径**？（而非模糊的"某个地方"）
- [ ] **每个选项是否有简短说明**？（≤20 字，说明该选项是什么）
- [ ] **是否按相关度排序**？（最可能的排在前面）
- [ ] **是否有推荐依据**？（基于上下文的智能推荐）
- [ ] **确认问题是否清晰具体**？（避免"您要修改哪个？"这种笼统问法）
- [ ] **对于场景 D 是否提供了引导式追问**？（而非一次性抛出大量问题）

---

*最后更新：2026-06-05*