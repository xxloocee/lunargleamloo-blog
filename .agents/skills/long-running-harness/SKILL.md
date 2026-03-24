---
name: long-running-harness
description: 用于需要跨多个会话/上下文窗口的大型编码任务。采用两阶段编排（初始化代理 + 编码代理），并通过持久化工件（`feature_list.json`、`init.sh`/`init.bat`、`claude-progress.txt`、git 提交）实现稳定接力；要求严格增量交付（每会话一个功能）并在标记通过前完成端到端浏览器验证。
---

# 长周期任务编排

用于在多会话软件任务中落地 Anthropic 风格的长期运行代理编排。

## 模式选择

当以下任一工件缺失时，进入 `Initializer`（初始化）模式：
- `feature_list.json`
- `claude-progress.txt`
- `init.sh` 或 `init.bat`
- 初始化基线 git 提交

当上述工件均存在时，进入 `Coding`（编码）模式。

在首条回复中明确声明当前模式：
`已加载 long-running-harness。当前模式：[Initializer|Coding]。`

## 通用规则（所有会话）

1. 将每个会话视为全新上下文窗口，不假设记忆延续。
2. 会话结束前保持仓库处于可交接、可继续开发的干净状态。
3. 以 `feature_list.json` 作为范围与优先级的唯一事实来源。
4. 编码阶段不得擅自修改验收标准。

`feature_list.json` 约束：
- 按优先级排序（核心流程在前）。
- 单项结构固定为：`category`、`description`、`steps`、`passes`。
- 仅在完整验证后把 `passes: false` 改为 `true`。
- 除非用户明确变更需求，不得删除、改写、合并、重排条目。

## Initializer（初始化）模式

目标：搭建稳定脚手架，让后续会话能够可靠地增量推进。

按以下顺序执行：
1. 读取需求来源（`app_spec.txt`、README、issue 文本或用户提示）。
2. 参考 `templates/feature_list.example.json` 生成 `feature_list.json`：
   - 覆盖 `functional` 与 `style`（或 `ui`）类别；
   - 面向端到端验证，做尽可能完整覆盖（大型任务通常为数十到数百项）；
   - 所有条目初始 `passes` 必须为 `false`。
3. 创建启动脚本：
   - Windows 环境优先提供 `init.bat`；
   - 如项目支持 POSIX，可补充 `init.sh`；
   - 包含依赖安装、服务启动、访问地址/端口提示。
4. 创建 `claude-progress.txt`，至少包含：
   - 项目目标；
   - 已完成的初始化动作；
   - 建议优先实现的下一项功能。
5. 创建初始化基线 git 提交（干净起点）。
6. 在切换到 Coding 模式前，请用户确认功能拆解是否合理。

## Coding（编码）模式

目标：每个会话只完成一个最高优先级且未通过的功能，并严格验证。

### 步骤 1：会话起步（编码前强制执行）
1. 运行 `pwd`。
2. 查看最近历史：`git log --oneline -20`。
3. 读取 `claude-progress.txt`。
4. 读取 `feature_list.json`，定位最高优先级的 `passes: false` 条目。
5. 运行 `init.sh` 或 `init.bat` 启动环境。
6. 在开发新功能前，先回归验证 1-2 个已通过的核心功能。

若回归失败：
- 将受影响条目回退为 `passes: false`；
- 先修复回归；
- 核心流程恢复前不得开始新功能开发。

### 步骤 2：仅实现一个功能
1. 仅选择一个最高优先级未通过功能。
2. 只实现该功能所需的最小代码变更。
3. 使用浏览器自动化进行端到端验证（优先 Playwright/Puppeteer）。
4. 同时验证功能行为与 UI 质量（不能只做后端 `curl` 校验）。
5. 仅在验证证据充分后，将该条目标记为 `passes: true`。

### 步骤 3：会话收尾
1. 在 `claude-progress.txt` 追加简要记录：
   - 本次变更内容；
   - 已完成的验证；
   - 剩余数量与下一目标。
2. 使用语义清晰的提交信息进行 commit。
3. 主动停止并交接，不在同一轮串行处理多个功能。

## 异常处理

1. 若变更破坏核心流程，使用安全 git 操作恢复（`git restore`、定向 revert 或基于 commit 的回退策略）。
2. 未经用户明确要求，不使用破坏性命令。
3. 优先交付“较小但已验证”的单功能结果，不交付多功能半成品。
