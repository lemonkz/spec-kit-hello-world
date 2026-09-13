# Phase 1 Contracts: Hello World 页面

**Branch**: `001-hello-world-page` | **Date**: 2026-09-13

本功能为单页面应用，对外接口 = DOM 契约（页面结构）+ 模块契约（内部纯逻辑 API）。
无 HTTP API、无外部系统集成。

## DOM 契约（index.html ↔ src/main.ts）

页面加载完成后必须存在以下元素，`main.ts` 依赖这些 id 进行绑定：

| 元素 | id | 初始内容 | 职责 |
|------|----|----------|------|
| 文本容器 | `display-text` | `Hello Spec-Kit World!` | 唯一展示文本的元素，仅通过 `textContent` 更新 |
| 按钮 | `toggle-button` | `切换文本`（按钮自身标签，非展示状态文本） | 唯一交互入口，点击触发状态切换 |

行为契约：

1. `main.ts` 初始化时从 `greeting.ts` 导入常量渲染初始文本（`"hello"` 状态）。
2. 每次按钮点击：读取当前状态 → 调用 `nextDisplayState` → 将新状态对应文本写入 `#display-text` 的 `textContent`。
3. 除此之外不得有其他 DOM 修改；不得引入 `console.*` 输出（宪章原则 IV）。

## 模块契约（src/greeting.ts）

纯逻辑模块，禁止 import DOM API（保证 Vitest node 环境可测）。

```typescript
export type DisplayState = "hello" | "clicked";

export const GREETING_TEXT = "Hello Spec-Kit World!";
export const CLICKED_TEXT = "You clicked me!";

/** 返回点击按钮后的下一个展示状态（两值交替）。 */
export function nextDisplayState(state: DisplayState): DisplayState;

/** 返回某展示状态对应的展示文本（精确匹配需求字符串）。 */
export function displayTextFor(state: DisplayState): string;
```

行为规则：

- `nextDisplayState("hello") === "clicked"`；`nextDisplayState("clicked") === "hello"`；任意次数复合调用保持交替。
- `displayTextFor("hello")` 逐字符等于 `"Hello Spec-Kit World!"`；`displayTextFor("clicked")` 逐字符等于 `"You clicked me!"`。
- 函数必须为纯函数：无副作用、无全局可变状态。
