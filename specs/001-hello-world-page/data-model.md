# Phase 1 Data Model: Hello World 页面

**Branch**: `001-hello-world-page` | **Date**: 2026-09-13

## 实体

### DisplayState（展示状态）

页面对话期间唯一的应用状态。

| 字段 | 类型 | 取值 | 说明 |
|------|------|------|------|
| `state` | `DisplayState`（字符串联合类型） | `"hello"` \| `"clicked"` | 当前应展示的文本标识 |

- **关联常量**:
  - `GREETING_TEXT = "Hello Spec-Kit World!"` — `"hello"` 状态对应文本（精确匹配，含标点）
  - `CLICKED_TEXT = "You clicked me!"` — `"clicked"` 状态对应文本（精确匹配，含标点）
- **持久化**: 无。状态仅存在于单次页面会话内存中，刷新/重开即重置为 `"hello"`（FR-006）。

## 校验规则（来自需求）

- 两段文本必须与需求给定字符串逐字符相等（含 `!` 标点与空格）。
- 页面 DOM 必须且仅有一个按钮、一个文本容器（FR-002、FR-007）。

## 状态转换

```text
            页面加载 / 刷新
                 │
                 ▼
             ┌───────┐   点击按钮   ┌─────────┐
             │ hello │ ──────────▶ │ clicked │
             │       │ ◀────────── │         │
             └───────┘   点击按钮   └─────────┘
```

- 唯一转换函数：`nextDisplayState`，`"hello" → "clicked"`、`"clicked" → "hello"`。
- 转换由唯一的按钮点击事件触发；无其他入口。
- 无终态、无死锁：任意点击次数下状态始终在两值间交替（FR-005，对应 SC-003 的奇偶一致性）。
