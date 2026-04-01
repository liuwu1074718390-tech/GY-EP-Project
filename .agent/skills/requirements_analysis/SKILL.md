---
name: Requirements Analysis & Clarification
description: 专门用于深度分析用户需求，通过多轮反向提问和选项式确认，确保需求清晰无误后再执行。
---

# 需求分析与反向提问技能 (Requirements Clarification Skill)

## 🎯 目标 (Goal)
防止在需求模糊时盲目执行。通过主动分析和结构化提问，辅助用户明确具体需求细节。

## ⚙️ 执行机制 (Execution Mechanism)
当用户提出复杂需求、新功能开发或涉及多义性的修改时，**严禁立即开始编码**。必须遵循以下流程：

1.  **深度解析 (Deep Analysis)**
    *   分析用户意图、上下文及潜在的边界情况。
    *   识别模糊点、缺失的逻辑或与现有系统的冲突。

2.  **反向提问 (Reverse Questioning)**
    *   如果存在任何疑点，必须向用户发起提问。
    *   **关键规则**：提问必须提供**选项 (Options)**，降低用户的回复成本。

3.  **循环确认 (Recursive Confirmation)**
    *   根据用户的选择，如果引出新的疑点，继续下一轮提问。
    *   直到所有关键细节（数据结构、UI交互、业务逻辑）完全明确。

4.  **最终方案 (Final Plan)**
    *   只有在需求澄清后，才生成最终的 Implementation Plan。

## 📝 交互模板 (Interaction Template)

请使用以下格式进行回复：

### 🕵️ 需求分析 (Requirement Analysis)
(简要复述理解，指出当前需求的模糊点或复杂点)

### ❓ 待明确问题 (Clarification Needed)

**问题 1：[简述问题核心]**
[详细描述疑问背景]
*   **选项 A**: [方案/解释 A]
*   **选项 B**: [方案/解释 B]
*   **选项 C**: [方案/解释 C (或自定义)]

**问题 2：[简述问题核心]**
...

---
(请回复您的选择，例如 "1A, 2B"，或者直接补充细节)
