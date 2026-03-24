---
description: 启动长期任务编排（Anthropic long-running harness）
---

# 启动长期任务工作流

用于多会话、长周期编码任务。目标是让每次会话都能从结构化工件快速接力，并稳定推进。

## /slash-command

`/start-long-task [任务需求描述]`

## 执行流程

1. 读取技能定义
- 打开 `.agents/skills/long-running-harness/SKILL.md`。
- 明确当前应处于 `Initializer` 还是 `Coding` 模式。

2. 首轮进入 Initializer 模式
- 创建 `feature_list.json`（高优先级在前，全部 `passes: false`）。
- 创建 `init.bat`（Windows 优先；如有需要补充 `init.sh`）。
- 创建 `claude-progress.txt`（记录目标、当前状态、下一步）。
- 提交初始化基线 commit。
- 询问用户是否确认 feature 拆解后再进入 Coding。

3. 后续进入 Coding 模式
- 每次会话先做起步检查：`pwd`、`git log --oneline -20`、读取 `claude-progress.txt`、读取 `feature_list.json`、运行 `init` 脚本。
- 新增开发前先回归验证 1-2 个已通过的核心功能；若失败，先修复回归。
- 只实现一个最高优先级未通过项，并做端到端验证（优先浏览器自动化）。
- 仅在验证通过后把对应项改为 `passes: true`。
- 更新 `claude-progress.txt` 并提交 commit。
- 主动停下汇报，等待用户下一次“继续”。

## 关键约束

- 禁止在 Coding 阶段随意改动 `feature_list.json` 的描述、步骤、顺序。
- 禁止一次会话串行完成多个 feature。
- 禁止把仅后端 `curl`/单元测试当作完整验收。
- 若出现严重回归，优先使用安全回滚方式（`git restore`/定向 revert）。
