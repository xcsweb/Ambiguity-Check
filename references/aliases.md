# 完整别名映射表

> **用途**：本文件提供中英文功能术语的完整别名映射，用于提升关键词匹配准确率和模糊需求理解能力。
>
> **何时查阅**：当用户使用中文/英文混合描述需求、出现同义词或多术语表达同一概念时参考此表。

---

## 1. 用户认证与权限

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 登录 | login, signin, sign-in, auth, authentication, 登入, 认证, 登陆 | 用户身份验证并建立会话 |
| 注册 | register, signup, sign-up, create account, 新用户注册, 注册账号 | 新用户创建账户流程 |
| 注销 | logout, signout, sign-out, 退出登录, 退出, 登出 | 终止用户会话状态 |
| 密码 | password, pwd, passwd, credential, 密码修改, 重置密码, 忘记密码 | 用户凭证/密码管理 |
| 权限 | permission, role, acl, rbac, authorization, privilege, access, 权限控制, 角色权限 | 访问控制与授权机制 |
| 角色 | role, user role, group, 用户角色, 角色管理 | 用户角色分类与管理 |
| Token | token, jwt, json web token, bearer token, access token, refresh token, 令牌 | 身份令牌/访问凭证 |
| Session | session, cookie, 会话, 会话管理, 保持登录 | 用户会话状态保持 |
| Cookie | cookie, browser cookie, local storage, session storage, 浏览器存储 | 客户端存储机制 |
| OAuth | oauth, oauth2, sso, single sign-on, 第三方登录, 社交登录, WeChat login, Google login | 第三方/单点登录集成 |
| SSO | sso, single sign-on, 统一认证, 联合登录 | 企业级单点登录系统 |
| 双因素认证 | 2fa, two-factor, mfa, multi-factor, totp, sms verification, 短信验证, 动态口令 | 多因素身份验证 |
| 验证码 | captcha, verification code, 验证码, 图形验证, 滑块验证, 人机验证 | 反机器人验证机制 |

---

## 2. 数据 CRUD 操作

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 搜索 | search, query, find, lookup, retrieve, 查找, 检索, 搜索框, 搜索栏 | 数据检索与查询功能 |
| 查询 | query, select, fetch, get, read, 查询接口, 详情查询, 列表查询 | 从数据源获取信息 |
| 列表 | list, table, grid, data list, index, 数据列表, 列表页, 表格 | 数据集合展示形式 |
| 详情 | detail, info, view, show, profile, 详情页, 详细信息, 查看 | 单条数据的完整展示 |
| 新增 | add, create, new, insert, post, 新增, 添加, 创建, 录入 | 数据记录创建操作 |
| 编辑 | edit, update, modify, change, alter, put, patch, 编辑, 修改, 更新, 改动 | 数据记录更新操作 |
| 删除 | delete, remove, del, destroy, drop, 删除, 移除, 作废 | 数据记录移除操作 |
| 批量操作 | batch, bulk, multi, 批量删除, 批量导入, 批量导出, 批量更新 | 多条数据的批量处理 |
| 导出 | export, download, dump, output, 导出Excel, 导出CSV, 下载, 导出报表 | 数据输出至外部文件 |
| 导入 | import, upload, batch insert, 导入Excel, 导入CSV, 上传, 批量录入 | 从外部文件批量导入数据 |
| 复制 | copy, clone, duplicate, replicate, 复制, 克隆, 拷贝 | 数据记录复制功能 |
| 排序 | sort, order by, ordering, 排序, 升序, 降序, 拖拽排序 | 数据排序规则 |
| 分页 | pagination, pager, page, limit offset, 分页, 翻页, 加载更多, 无限滚动 | 数据分批加载机制 |
| 筛选/过滤 | filter, where, condition, 筛选, 过滤, 条件查询, 高级筛选 | 数据条件过滤 |
| 撤销 | undo, revert, rollback, 撤销, 回滚, 恢复 | 操作撤销/回退机制 |
| 恢复 | restore, recover, undelete, resume, 恢复, 还原, 启用 | 数据/状态恢复功能 |

---

## 3. 业务通用实体

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 订单 | order, purchase, booking, reservation, 订单管理, 交易订单, 预订 | 交易订单实体 |
| 商品/产品 | product, goods, item, merchandise, commodity, sku, spu, 商品管理, 产品目录 | 商品/产品信息管理 |
| 购物车 | cart, basket, trolley, shopping cart, 购物车, 购物篮 | 临时购物容器 |
| 支付 | pay, payment, checkout, settlement, transaction, 支付, 结算, 收银台, 付款 | 交易支付流程 |
| 库存 | inventory, stock, warehouse, storage, 库存管理, 出入库, 盘点 | 商品库存管理 |
| 物流 | logistics, shipping, delivery, express, tracking, 物流, 发货, 快递, 配送 | 物流配送管理 |
| 发票 | invoice, receipt, bill, fapiao, vat invoice, 发票管理, 电子发票, 开票 | 财务发票处理 |
| 合同 | contract, agreement, deal, 合同管理, 协议, 合同模板 | 商务合同管理 |
| 优惠券 | coupon, voucher, promo, discount code, 优惠券, 优惠码, 折扣券 | 营销优惠工具 |
| 促销 | promotion, campaign, sale, marketing, 促销活动, 营销活动, 秒杀, 拼团 | 营销促销管理 |
| 退款 | refund, return, reimburse, 退款, 退货, 售后 | 退款退货流程 |
| 价格 | price, pricing, rate, tariff, fee, cost, 价格管理, 定价, 调价 | 价格体系管理 |
| 分类 | category, classification, taxonomy, class, type, 分类, 类目, 品类 | 层级分类体系 |
| 标签 | tag, label, mark, hashtag, 标签管理, 标签云 | 标记/归类工具 |
| 地址 | address, location, shipping address, billing address, 地址簿, 收货地址 | 地理位置信息 |
| 评价/评论 | review, comment, rating, feedback, testimonial, 评价, 评论, 评分, 反馈 | 用户反馈内容 |

---

## 4. 用户与账户

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 用户 | user, member, account, customer, client, 用户, 会员, 客户 | 用户账户实体 |
| 个人中心 | profile, my account, dashboard, personal center, 个人中心, 我的, 用户面板 | 用户自助服务页面 |
| 头像 | avatar, profile picture, photo, icon, image, 头像, 用户头像, 照片 | 用户形象标识 |
| 昵称 | nickname, display name, username, alias, 昵称, 用户名, 显示名称 | 用户显示名称 |
| 手机号 | phone, mobile, cellphone, telephone, 手机号, 手机, 联系电话 | 联系手机号码 |
| 邮箱 | email, e-mail, mail, mailbox, 邮箱, 电子邮件, 邮件地址 | 电子邮件地址 |
| 实名认证 | real-name verification, id verification, kyc, identity, 实名, 身份证, KYC | 真实身份核验 |
| 会员等级 | membership level, tier, rank, vip, grade, 会员等级, VIP, 等级, 成长值 | 会员分层体系 |
| 积分 | points, credits, score, reward, loyalty, 积分, 积分商城, 积分兑换 | 积分奖励系统 |
| 余额 | balance, wallet, credit, deposit, 余额, 钱包, 充值, 提现 | 虚拟货币/余额管理 |
| 收藏 | favorite, bookmark, collection, wishlist, 收藏, 收藏夹, 愿望清单 | 用户收藏内容 |
| 关注 | follow, subscribe, watch, track, 关注, 订阅, 粉丝 | 社交关注关系 |
| 黑名单 | blacklist, blocklist, ban, block, mute, 黑名单, 拉黑, 屏蔽 | 用户限制机制 |

---

## 5. 内容与媒体

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 文章 | article, post, blog, content, news, 文章, 博客, 内容, 新闻, 帖子 | 文本内容管理 |
| 评论 | comment, reply, discussion, thread, 评论, 回复, 讨论, 留言 | 用户评论互动 |
| 点赞 | like, thumbs up, upvote, heart, 点赞, 喜欢, 顶 | 正向反馈交互 |
| 收藏 | favorite, bookmark, star, collect, save, 收藏, 星标, 保存 | 内容收藏功能 |
| 分享 | share, social share, forward, distribute, 分享, 转发, 社交分享 | 内容传播功能 |
| 上传 | upload, attach, file upload, image upload, 上传, 附件, 图片上传 | 文件上传功能 |
| 下载 | download, export, save as, 下载, 另存为, 导出下载 | 文件下载功能 |
| 图片 | image, picture, photo, picture, thumbnail, avatar, banner, 图片, 照片, 缩略图, 封面 | 图像资源管理 |
| 视频 | video, movie, clip, stream, live, 视频, 直播, 影片, 短视频 | 视频资源管理 |
| 音频 | audio, music, sound, voice, podcast, 音频, 音乐, 语音, 播客 | 音频资源管理 |
| 文件 | file, document, attachment, archive, 文件, 文档, 附件, 资源 | 通用文件管理 |
| 富文本 | rich text, editor, wysiwyg, markdown, html content, 富文本编辑器, Markdown, 所见即所得 | 富文本内容编辑 |
| 相册 | album, gallery, portfolio, media library, 相册, 图集, 媒体库 | 图片/媒体集合管理 |

---

## 6. 消息与通知

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 消息 | message, msg, chat, conversation, im, 消息, 聊天, 对话, 即时通讯 | 即时消息通信 |
| 通知 | notification, notice, alert, push notification, 通知, 提醒, 告警, 推送通知 | 通知提醒机制 |
| 公告 | announcement, broadcast, bulletin, news, 公告, 公示, 广播, 公告栏 | 系统公告发布 |
| 推送 | push, fcm, apns, push notification, 推送, 消息推送, 触达 | 主动消息推送 |
| 邮件 | email, e-mail, mail, newsletter, digest, 邮件, 电子邮件, 邮件订阅, 邮件营销 | 电子邮件通信 |
| 短信 | sms, text message, otp, verification code, 短信, 短信验证, 短信通知 | SMS 短信服务 |
| 站内信 | inbox, system message, internal message, notification center, 站内信, 系统消息, 消息中心 | 平台内部消息 |
| 订阅 | subscription, feed, rss, follow, subscribe, 订阅, RSS, 信息流, 关注动态 | 内容订阅机制 |
| 未读 | unread, badge, count, indicator, dot, 未读, 未读数, 红点, 角标 | 未读状态提示 |
| 模板消息 | template message, notification template, sms template, email template, 模板消息, 消息模板 | 预设消息模板 |

---

## 7. 系统管理

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 设置 | setting, configuration, config, preference, option, 设置, 配置, 选项, 偏好 | 系统/个人设置 |
| 配置 | config, configuration, setting, env, environment, 配置, 系统配置, 环境变量 | 系统参数配置 |
| 数据字典 | dictionary, dict, enum, data dictionary, constant, 数据字典, 枚举, 常量, 字典表 | 业务枚举值管理 |
| 菜单 | menu, navigation, sidebar, nav, sitemap, 菜单, 导航, 侧边栏, 站点地图 | 界面导航菜单 |
| 角色管理 | role management, rbac, role-based access control, role admin, 角色管理, 权限角色 | 角色权限分配 |
| 日志 | log, audit log, operation log, access log, error log, 日志, 审计日志, 操作日志, 运行日志 | 系统日志记录 |
| 审计 | audit, trail, compliance, monitoring, 审计, 审计追踪, 合规, 监控 | 安全审计跟踪 |
| 操作记录 | history, activity, timeline, changelog, 操作记录, 活动历史, 时间线, 变更日志 | 用户行为追溯 |
| 定时任务 | cron job, scheduled task, timer, scheduler, job queue, 定时任务, 计划任务, 调度器 | 定时执行任务 |
| 系统监控 | monitoring, health check, metrics, dashboard, alerting, 系统监控, 健康检查, 指标, 告警 | 运行状态监控 |
| 数据备份 | backup, snapshot, archive, restore, 数据备份, 快照, 归档, 恢复 | 数据安全备份 |
| 版本管理 | version, release, changelog, migration, upgrade, 版本, 发布, 更新日志, 升级, 迁移 | 版本迭代管理 |
| 多租户 | tenant, multi-tenant, organization, workspace, saas, 多租户, 组织, 工作空间, SaaS | 多租户隔离 |

---

## 8. 数据分析与报表

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 报表 | report, statement, summary, 报表, 统计报表, 数据报告 | 数据汇总报告 |
| 统计 | statistics, stats, analytics, metrics, kpi, 统计, 数据统计, 指标, KPI | 数据统计分析 |
| 图表 | chart, graph, visualization, plot, diagram, 图表, 可视化, 图形, 图表库 | 数据可视化图表 |
| 仪表盘 | dashboard, overview, cockpit, home panel, 仪表盘, 驾驶舱, 总览, 首页看板 | 数据概览面板 |
| 导出 | export, download, output, print, pdf, excel, csv, 导出, 下载, 打印, PDF, Excel | 数据导出功能 |
| 看板 | board, kanban, status board, task board, 看板, 看板视图, Kanban | 状态可视化看板 |
| BI | bi, business intelligence, olap, pivot table, drill-down, BI, 商业智能, OLAP, 透视表, 下钻 | 商业智能分析 |
| 数据透视 | pivot, cross-tab, aggregation, group by, 数据透视, 交叉表, 汇总, 分组聚合 | 多维数据分析 |
| 趋势 | trend, time series, forecast, prediction, 趋势, 时序, 预测, 趋势图 | 时间趋势分析 |
| 对比 | comparison, benchmark, diff, delta, compare, 对比, 基准, 差异, 比较 | 数据对比分析 |
| 漏斗 | funnel, conversion rate, drop-off, 漏斗, 转化率, 流失 | 转化漏斗分析 |
| 热力图 | heatmap, hot zone, density map, 热力图, 热区图, 密度图 | 区域热度可视化 |

---

## 9. 工作流与审批

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 审批 | approval, review, authorize, sign-off, 审批, 审核, 审阅, 签批, 授权 | 业务审批流程 |
| 流程 | workflow, process, flow, pipeline, 流程, 工作流, 流水线, 管道 | 业务流程定义 |
| 流转 | transition, routing, handoff, escalate, delegate, 流转, 路由, 转交, 升级, 委派 | 流程节点流转 |
| 节点 | node, step, stage, phase, task, activity, 节点, 步骤, 阶段, 任务节点, 活动 | 流程组成单元 |
| 抄送 | cc, carbon copy, notify, inform, 抄送, 通知, 告知 | 流程知情人员 |
| 驳回 | reject, deny, decline, return, send back, 驳回, 拒绝, 否决, 退回, 打回 | 审批拒绝操作 |
| 撤回 | withdraw, cancel, recall, revoke, 撤回, 取消, 撤销, 作废 | 申请撤回操作 |
| 待办 | todo, pending, inbox, task list, action item, 待办, 待处理, 待办事项, 行动项 | 待处理任务 |
| 已办 | done, completed, finished, processed, approved, 已办, 已完成, 已处理, 已审批 | 已完成任务 |
| 加签 | countersign, add approver, joint sign, 加签, 会签, 加审批人 | 增加审批节点 |
| 转签 | reassign, transfer, redirect, delegate, 转签, 转办, 转交, 委派 | 责任转移 |
| 归档 | archive, close, complete, finalize, 归档, 结案, 完成, 定稿 | 流程结束归档 |
| 表单 | form, application, request, submission, 表单, 申请单, 提交, 报名表 | 业务申请表单 |

---

## 10. 技术组件概念

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 接口 | api, interface, endpoint, route, handler, controller, 接口, API, 端点, 路由, 处理器, 控制器 | API 接口定义 |
| 组件 | component, widget, module, control, element, block, 组件, 控件, 模块, 元素, 区块 | UI 组件单元 |
| 路由 | route, router, navigation, path, url, page, screen, 路由, 导航, 路径, 页面, 屏幕 | 页面路由导航 |
| 状态 | state, store, context, reducer, flux, observable, 状态, 状态管理, Store, Context | 应用状态管理 |
| 样式 | style, css, theme, ui, skin, appearance, design, 样式, CSS, 主题, 外观, 设计 | 视觉样式主题 |
| 表单 | form, input, field, validation, control, schema, 表单, 输入, 字段, 校验, 控件, Schema | 表单输入组件 |
| 弹窗 | dialog, modal, popup, overlay, lightbox, drawer, sidebar, 弹窗, 对话框, 弹出层, 抽屉, 侧边栏 | 弹出式界面元素 |
| 表格 | table, grid, datagrid, spreadsheet, list view, 表格, DataGrid, 电子表格, 列表视图 | 数据表格展示 |
| 图表 | chart, graph, plot, diagram, visualization, 图表, 图形, 可视化, 图表库 | 数据可视化组件 |
| 地图 | map, gis, location, geolocation, marker, pin, 地图, GIS, 地理位置, 标记, 定位 | 地图定位组件 |
| 富文本 | rich text, editor, wysiwyg, markdown, html editor, 富文本编辑器, 所见即所得, Markdown 编辑器 | 富文本编辑器 |
| 上传 | upload, uploader, file input, drag-drop, attachment, 上传, 文件上传, 拖拽上传, 附件 | 文件上传组件 |
| 树形 | tree, treeview, hierarchy, org chart, dendrogram, 树形, 树状图, 层级图, 组织架构图 | 树形层级组件 |
| 标签页 | tab, tabset, tabview, tabs, pane, 标签页, 选项卡, Tab, 面板 | 标签页切换组件 |
| 下拉选择 | dropdown, select, picker, combobox, autocomplete, suggest, 下拉框, 选择器, 自动完成, 建议 | 选择输入组件 |
| 日期时间 | datepicker, datetime, calendar, timepicker, daterange, 日期选择, 时间选择, 日历, 日期范围 | 日期时间选择器 |
| 开关 | switch, toggle, checkbox, radio, button group, 开关, 切换, 复选框, 单选按钮, 按钮组 | 状态切换控件 |
| 进度条 | progress bar, spinner, loader, skeleton, stepper, 进度条, 加载动画, 骨架屏, 步骤条 | 进度指示组件 |
| 虚拟滚动 | virtual scroll, virtualization, infinite scroll, lazy load, windowing, 虚拟滚动, 无限滚动, 懒加载, 窗口化 | 大数据列表优化 |
| 拖拽 | drag and drop, dnd, sortable, draggable, droppable, resizable, 拖拽, DnD, 排序, 可拖动, 可调整大小 | 拖拽交互功能 |
| 国际化 | i18n, internationalization, localization, l10n, translation, locale, language, 国际化, 本地化, 翻译, 语言, Locale | 多语言支持 |
| 主题 | theme, dark mode, light mode, color scheme, skin, 主题, 暗色模式, 亮色模式, 配色, 换肤 | 视觉主题切换 |

---

## 11. 性能与优化

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 性能 | performance, speed, optimization, perf, 性能, 速度, 优化, 性能优化 | 系统运行效率 |
| 缓存 | cache, caching, redis, memcached, cdn, browser cache, 缓存, Redis, CDN, 浏览器缓存 | 数据缓存加速 |
| 懒加载 | lazy loading, lazy load, on-demand, defer, async, 懒加载, 按需加载, 延迟加载, 异步加载 | 延迟加载策略 |
| 虚拟滚动 | virtual scroll, virtualization, windowing, recycling, 虚拟滚动, 虚拟化, 窗口化, 循环复用 | 大列表渲染优化 |
| 压缩 | compression, minification, gzip, brotli, shrink, 压缩, 压缩传输, Gzip, Brotli, 体积压缩 | 资源压缩减小 |
| CDN | cdn, content delivery network, edge, distribution, CDN, 边缘网络, 内容分发 | 内容分发加速 |
| 分页 | pagination, paging, cursor, offset, infinite scroll, 分页, 游标分页, 偏移分页, 无限滚动 | 数据分批加载 |
| 异步 | async, asynchronous, promise, await, callback, event-driven, queue, 异步, Promise, 回调, 事件驱动, 队列 | 异步编程模式 |
| 防抖 | debounce, 防抖, 延迟执行 | 输入防抖优化 |
| 节流 | throttle, 节流, 频率限制 | 执行频率控制 |
| 预加载 | prefetch, preload, preconnect, dns-prefetch, 预加载, 预取, 预连接, DNS预解析 | 资源预先加载 |
| 代码分割 | code splitting, chunking, lazy bundle, dynamic import, 代码分割, 分块, 动态导入, 懒加载包 | 代码按需加载 |
| Tree Shaking | tree shaking, dead code elimination, unused code, Tree Shaking, 死代码消除, 未使用代码 | 无用代码消除 |
| SSR/SSG | ssr, ssg, server-side rendering, static site generation, SSR, SSG, 服务端渲染, 静态生成 | 渲染策略优化 |
| PWA | pwa, progressive web app, service worker, manifest, offline, PWA, 渐进式Web应用, Service Worker, 离线 | 离线/类原生体验 |
| 骨架屏 | skeleton, shimmer, placeholder, loading state, 骨架屏, 闪烁屏, 占位符, 加载态 | 加载占位优化 |
| 图片优化 | image optimization, webp, avif, responsive images, lazy image, srcset, 图片优化, WebP, AVIF, 响应式图片, SrcSet | 图片资源优化 |
| Bundle 分析 | bundle analyzer, source map, chunk, bundle size, Bundle分析, Source Map, 包体积 | 打包产物分析 |

---

## 12. 测试与质量

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 测试 | test, testing, spec, check, verify, validate, 测试, 测试用例, 验证, 校验 | 软件测试活动 |
| 单元测试 | unit test, ut, unit testing, jest, mocha, vitest, pytest, junit, 单元测试, UT, Jest, Mocha, PyTest, JUnit | 函数/方法级别测试 |
| 集成测试 | integration test, it, integration testing, e2e, end-to-end, 集成测试, IT, E2E, 端到端测试 | 多组件联合测试 |
| E2E 测试 | e2e, end-to-end, cypress, playwright, puppeteer, selenium, E2E测试, Cypress, Playwright, Puppeteer, Selenium | 全流程自动化测试 |
| Mock | mock, stub, spy, fake, double, fixture, Mock, 桩, 替身, 测试替身, Fixtures | 测试替身对象 |
| 覆盖率 | coverage, code coverage, test coverage, line coverage, branch coverage, 覆盖率, 代码覆盖率, 行覆盖率, 分支覆盖率 | 测试充分性度量 |
| Lint | lint, linter, eslint, prettier, stylelint, sonarqube, Lint, ESLint, Prettier, StyleLint, SonarQube | 代码质量检查 |
| 类型检查 | type checking, typescript strict, flow, type guard, 类型检查, TypeScript严格模式, Flow, 类型守卫 | 静态类型校验 |
| 性能测试 | performance test, load test, stress test, benchmark, lighthouse, 性能测试, 压力测试, 基准测试, Lighthouse | 性能基准测试 |
| 安全测试 | security test, vulnerability scan, penetration test, owasp, sast, dast, 安全测试, 漏洞扫描, 渗透测试, SAST, DAST | 安全漏洞检测 |
| A/B 测试 | ab test, split test, experiment, variant, A/B测试, 对照实验, 灰度实验 | 在线对比实验 |
| 回归测试 | regression test, smoke test, sanity test, 回归测试, 冒烟测试, 验收测试 | 变更回归验证 |
| TDD/BDD | tdd, bdd, test driven development, behavior driven development, TDD, BDD, 测试驱动开发, 行为驱动开发 | 测试驱动方法论 |

---

## 13. 构建与部署

| 中文术语 | 英文别名列表 | 简要说明 |
|---------|------------|---------|
| 构建 | build, compile, make, assemble, package, 构建, 编译, 打包, 组装 | 代码编译构建 |
| 打包 | pack, package, bundle, bundle, dist, output, artifact, 打包, 打包产物, Dist, Artifact | 产出物生成 |
| 发布 | release, publish, deploy, ship, rollout, 发布, 部署, 上线, 推送, 灰度发布 | 产品发布上线 |
| Docker | docker, container, containerize, image, dockerize, Docker, 容器, 容器化, 镜像 | 容器化技术 |
| CI/CD | ci/cd, continuous integration, continuous deployment, pipeline, automation, CI/CD, 持续集成, 持续部署, 流水线, 自动化 | 自动化交付流水线 |
| 环境变量 | environment variable, env, config, .env, dotenv, 环境变量, ENV, DotEnv | 环境配置管理 |
| 版本控制 | version control, git, svn, commit, branch, merge, pr, mr, 版本控制, Git, SVN, 提交, 分支, 合并, PR/MR | 代码版本管理 |
| 语义化版本 | semver, semantic versioning, major, minor, patch, 语义化版本, SemVer, Major/Minor/Patch | 版本号规范 |
| Changelog | changelog, release notes, what's new, migration guide, 变更日志, 发布说明, 更新内容, 迁移指南 | 版本变更文档 |
| 回滚 | rollback, revert, downgrade, backout, 回滚, 回退, 降级, 撤销发布 | 版本回退操作 |
| 灰度发布 | canary, phased rollout, blue-green, feature flag, 灰度发布, 金丝雀发布, 蓝绿部署, Feature Flag | 渐进式发布策略 |
| 监控告警 | monitoring, alerting, observability, tracing, apm, sentry, datadog, 监控, 告警, 可观测性, 链路追踪, APM, Sentry, Datadog | 运行时监控体系 |
| 日志收集 | logging, log aggregation, elk, efk, splunk, fluentd, 日志收集, ELK, EFK, Splunk, Fluentd | 日志集中管理 |
| 配置管理 | config management, consul, etcd, zookeeper, nacos, apollo, 配置管理, Consul, Etcd, ZooKeeper, Nacos, Apollo | 分布式配置中心 |

---

## 匹配规则

### 通用匹配原则

1. **不区分大小写**：Login ≡ login ≡ LOGIN ≈ LogIn
2. **支持部分匹配**：
   - 完全匹配优先：`login` == `login`
   - 前缀匹配次之：`login` 匹配 `LoginComponent`, `loginPage`
   - 包含匹配兜底：`user` 匹配 `currentUser`, `userManager`
3. **中英互译**：中文术语 ↔ 英文别名双向匹配
4. **上下文加权**：根据邻近词/路径上下文调整匹配权重
5. **领域自适应**：根据项目类型（前端/后端/移动端）调整候选优先级

### 匹配优先级矩阵

| 匹配类型 | 权重 | 说明 |
|---------|------|------|
| 文件名完全匹配 | ⭐⭐⭐⭐⭐ | 最高置信度 |
| 路径关键词匹配 | ⭐⭐⭐⭐ | 目录名/路径片段匹配 |
| 代码符号完全匹配 | ⭐⭐⭐⭐ | 函数名/类名/变量名精确匹配 |
| 代码符号前缀匹配 | ⭐⭐⭐ | 符号名前缀一致 |
| 代码符号包含匹配 | ⭐⭐ | 符号名中包含关键词 |
| 注释/文档字符串匹配 | ⭐ | 低权重辅助依据 |

### 扩展机制

用户可通过以下方式扩展别名映射：

```jsonc
// config.json 中添加 customAliases 字段
{
  "customAliases": {
    "公司内部术语": ["internal-term-alias1", "alias2"],
    "业务专有名词": ["business-specific-alias"]
  }
}
```

---

*最后更新：2026-06-05*
