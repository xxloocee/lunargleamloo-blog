# Spec: Long-Running Harness Skill 博客文章

## 问题定义

用户希望将 GitHub 仓库 `xxloocee/long-running-harness-skill` 的内容整理成一篇博客文章，并添加到现有博客系统中进行归档和分类。

## 范围与非目标

### 范围
- 创建一篇关于 long-running-harness skill 的博客文章
- 文章内容涵盖：项目背景、核心概念、工作流程、使用方法
- 按照博客现有格式进行归档和分类
- 为文章添加合适的分类和标签

### 非目标
- 不修改博客系统的其他配置
- 不创建新的分类页面（使用现有分类系统）
- 不修改博客的主题或样式

## 验收标准

1. 博客文章文件创建于 `src/content/blog/` 目录
2. 文章 frontmatter 包含：title、description、pubDate、categories、tags
3. 文章内容完整，包含以下章节：
   - 引言（背景介绍）
   - 核心概念（两阶段编排）
   - 工作流程详解（Initializer/Coding 模式）
   - 快速开始指南
   - 关键约束与最佳实践
   - 适用场景
4. 分类和标签设置合理
5. 文章格式符合现有博客风格（Markdown 格式）

## 文件级改动计划

### 新增文件
- `src/content/blog/long-running-harness-skill.md` - 主要博客文章

### 文件内容结构

```markdown
---
title: Long-Running Harness Skill：让 AI 代理跨越多个会话稳定推进复杂项目
description: 介绍基于 Anthropic 思路实现的长周期任务编排 Skill，帮助 AI 编码代理在多会话环境下稳定、可追踪地推进复杂项目。
pubDate: 2026-03-25
categories: [技术]
tags: [AI, 工程化, Agent, 最佳实践, Anthropic]
---

文章正文...
```

## 分类与标签设计

### 分类（categories）
- `技术` - 适合技术类文章

### 标签（tags）
- `AI` - 人工智能相关
- `工程化` - 工程实践
- `Agent` - AI 代理相关
- `最佳实践` - 最佳实践分享
- `Anthropic` - Anthropic 相关

## 测试与回滚策略

### 测试
1. 确认文章文件创建成功
2. 验证 frontmatter 格式正确
3. 检查文章内容完整性
4. 运行博客开发服务器确认文章能正常显示

### 回滚策略
- 删除创建的博客文章文件即可回滚

## 文章内容大纲

1. **引言**
   - AI 编码代理的挑战：上下文窗口限制
   - 解决方案：长周期任务编排

2. **核心概念**
   - 双阶段代理编排（Initializer + Coding）
   - 持久化工件驱动

3. **工作流程详解**
   - Initializer 模式
   - Coding 模式
   - 关键约束

4. **快速开始**
   - 安装步骤
   - 使用方法

5. **适用场景**
   - 中大型项目
   - 多会话协作

6. **总结与展望**
