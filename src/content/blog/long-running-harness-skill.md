---
title: Long-Running Harness Skill：让 AI 代理跨越多个会话稳定推进复杂项目
description: 介绍基于 Anthropic 思路实现的长周期任务编排 Skill，帮助 AI 编码代理在多会话环境下稳定、可追踪地推进复杂项目。
pubDate: 2026-03-25
categories: [技术]
tags: [AI, 工程化, Agent, 最佳实践, Anthropic]
---

## 引言

在使用 AI 编码代理（如 Claude、Cursor 等）时，你是否遇到过这些问题：

- 项目做到一半，代理突然"失忆"了
- 代理一次性做了太多事情，导致代码质量下降
- 难以追踪多轮对话中的进度
- 无法在长时间项目中保持代码一致性

这些问题的根源在于 **上下文窗口限制**。当项目复杂度超过单次会话的处理能力时，就需要一种机制来跨越多个会话稳定推进任务。

[Anthropic 在其工程博客中](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)提出了一个解决方案，而 `long-running-harness` 正是基于这一思路的实现。

## 核心概念

### 双阶段代理编排

`long-running-harness` 采用两阶段工作模式：

**阶段 1：Initializer（初始化）**

负责搭建项目基础框架，生成持久化工件：

- `feature_list.json` - 功能清单与验收状态
- `init.bat` / `init.sh` - 环境初始化脚本
- `claude-progress.txt` - 进度记录文件
- 基线 Git 提交 - 干净的起点

**阶段 2：Coding（编码）**

每个会话只完成一个功能点：

- 先回归验证已有功能
- 仅实现一个最高优先级的未完成功能
- 端到端验证通过后才标记完成
- 更新进度并提交，然后停止

### 持久化工件驱动

所有进度信息都存储在项目仓库中，而不是依赖代理的记忆：

```
your-project/
├── feature_list.json      # 功能清单
├── claude-progress.txt    # 进度记录
├── init.bat              # 初始化脚本
└── src/                  # 项目代码
```

## 工作流程详解

### Initializer 模式

当以下工件缺失时，自动进入初始化模式：

1. 读取需求来源（`app_spec.txt`、README、issue 或用户提示）
2. 生成完整的 `feature_list.json`，覆盖功能和 UI 类别
3. 创建启动脚本（Windows 优先 `init.bat`）
4. 创建 `claude-progress.txt` 记录初始化状态
5. 创建初始化基线 Git 提交
6. 等待用户确认功能拆解是否合理

### Coding 模式

当所有工件均存在时，进入编码模式：

**会话起步检查：**

```bash
pwd                          # 确认工作目录
git log --oneline -20        # 查看最近提交
cat claude-progress.txt      # 了解进度
```

**开发流程：**

1. 运行 `init.bat` 启动环境
2. 回归验证 1-2 个核心已通过功能
3. 选择一个最高优先级的未完成功能
4. 实现该功能所需的最小代码变更
5. 进行端到端验证（优先浏览器自动化）
6. 验证通过后将条目标记为 `passes: true`
7. 更新进度并提交
8. 停止并等待下一轮会话

## 关键约束

为了保证代码质量和可追溯性，`long-running-harness` 设定了以下硬约束：

| 约束 | 说明 |
|------|------|
| 单功能会话 | 每个会话仅实现一个功能 |
| 禁止修改标准 | 不得擅自修改验收标准 |
| 先修复再开发 | 回归失败时先修复，再开始新功能 |
| 端到端验证 | 不能只做后端 `curl` 或单元测试 |
| 禁止合并重排 | 不删除、改写、合并、重排功能条目 |

## 快速开始

### 安装

```bash
# 克隆仓库
git clone https://github.com/xxloocee/long-running-harness-skill.git

# 将 .agents 文件夹复制到你的项目根目录
cp -r long-running-harness-skill/.agents your-project/
```

### 使用

在 AI 代理会话中引用 Skill：

```
$long-running-harness
```

或显式引用路径：

```
D:\demo\my-project\.agents\skills\long-running-harness\SKILL.md
```

通过 workflow 启动长期任务：

```
/start-long-task [你的任务描述]
```

## 适用场景

这个 Skill 特别适合以下场景：

- **中大型项目**：需要多天、多会话持续推进
- **复杂功能开发**：代理容易"半途遗忘"或"一次性做太多"
- **团队协作**：强调可追踪、可回滚、可验收的工程化流程

## 总结

`long-running-harness` 通过强制的增量开发和持久化工件机制，解决了 AI 编码代理在长周期任务中的"失忆"问题。它的核心理念是：

> 与其让代理一次做完所有事情，不如让每个会话只做一件事，但做得扎实。

这种"小步快跑"的方式，不仅提高了代码质量，也让项目进度变得透明可控。

---

**项目地址**：[https://github.com/xxloocee/long-running-harness-skill](https://github.com/xxloocee/long-running-harness-skill)

**参考文章**：[Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
