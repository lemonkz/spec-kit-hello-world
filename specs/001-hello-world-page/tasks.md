# Tasks: Hello World 页面

**Input**: Design documents from `/specs/001-hello-world-page/`

**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ui.md ✅ | quickstart.md ✅

**Tests**: 宪章原则 II（TDD，不可协商）要求先写失败测试再实现——每个用户故事先有测试任务。

**Organization**: 按用户故事分组；每个故事可独立实现与测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行（不同文件、无未完成依赖）
- **[Story]**: 所属用户故事（US1 / US2）
- 描述含精确文件路径

## Path Conventions

单项目结构（plan.md）：根目录 `index.html`，`src/`，`tests/`。

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 项目初始化与工具链

- [x] T001 Create `package.json` with devDependencies `vite`, `vitest`, `typescript` and scripts: `dev` = `vite`, `build` = `tsc --noEmit && vite build`（宪章质量门槛：类型错误必须导致构建失败）, `test` = `vitest run`
- [x] T002 [P] Create `tsconfig.json` with `strict: true`（禁 `any`，宪章原则 I）, `target: ES2020`, `lib: ["ES2020", "DOM", "DOM.Iterable"]`, `moduleResolution: bundler`, `noEmit: true`
- [x] T003 [P] Create `index.html` per `specs/001-hello-world-page/contracts/ui.md`: 一个文本容器 `<p id="display-text">`（初始内容 `Hello Spec-Kit World!`）+ 一个按钮 `<button id="toggle-button">`（标签 `切换文本`），加载 `src/main.ts`，无其他页面元素、无框架引用（FR-002、FR-007）

**Checkpoint**: 工具链就绪，`npm install` 后三条脚本可用

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 本功能无跨故事共享基础设施（仅两值状态 + 单页面），此阶段不需要任务。

**Checkpoint**: N/A — 直接进入用户故事

---

## Phase 3: User Story 1 - 查看问候页面 (Priority: P1) 🎯 MVP

**Goal**: 打开页面即显示精确文本 `Hello Spec-Kit World!`，页面仅含该文本与一个按钮

**Independent Test**: `npm run dev` 打开页面，核对文本逐字符匹配、页面元素仅两项（spec.md US1 验收场景 1–2）

### Tests for User Story 1 (先写，确认失败)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T004 [P] [US1] Write failing unit tests in `tests/greeting.test.ts`: assert `GREETING_TEXT === "Hello Spec-Kit World!"`（逐字符含标点）且 `displayTextFor("hello")` 返回同值；运行 `npm run test` 确认编译失败/测试失败（红）

### Implementation for User Story 1

- [x] T005 [US1] Create `src/greeting.ts` per `specs/001-hello-world-page/contracts/ui.md`: 导出 `type DisplayState = "hello" | "clicked"`、常量 `GREETING_TEXT = "Hello Spec-Kit World!"`、`CLICKED_TEXT = "You clicked me!"`、纯函数 `displayTextFor(state: DisplayState): string`（仅本故事所需；禁 import DOM API、禁 `any`）；使 T004 通过（绿）
- [x] T006 [US1] Create `src/main.ts`: 页面加载时查询 `#display-text` 并用 `displayTextFor("hello")` 设置 `textContent`（初始渲染，无 console 输出）

**Checkpoint**: US1 独立可验——页面显示问候文本 + 一个按钮，MVP 达成

---

## Phase 4: User Story 2 - 点击按钮切换文本 (Priority: P2)

**Goal**: 每次点击按钮，文本在 `Hello Spec-Kit World!` ↔ `You clicked me!` 间交替；刷新重置

**Independent Test**: 加载页面后连续点击并核对文本交替与奇偶一致性；刷新后恢复初始文本（spec.md US2 验收场景 1–3）

### Tests for User Story 2 (先写，确认失败)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T007 [P] [US2] Add failing unit tests in `tests/greeting.test.ts`: assert `nextDisplayState("hello") === "clicked"`、`nextDisplayState("clicked") === "hello"`、连续 20 次复合调用与点击次数奇偶 100% 一致（SC-003）、`displayTextFor("clicked") === "You clicked me!"`（逐字符）；运行 `npm run test` 确认失败（红）

### Implementation for User Story 2

- [x] T008 [US2] Extend `src/greeting.ts` with pure function `nextDisplayState(state: DisplayState): DisplayState`（两值交替，无副作用，穷尽联合类型分支，禁 `any`）；使 T007 通过（绿）
- [x] T009 [US2] Extend `src/main.ts`: 为 `#toggle-button` 添加 `addEventListener("click", ...)`，读取当前状态 → `nextDisplayState` → 将 `displayTextFor(newState)` 写入 `#display-text` 的 `textContent`；状态仅存于内存（不用任何 storage，满足 FR-006），无 console 输出

**Checkpoint**: US1 + US2 均独立可用；刷新天然重置状态

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 宪章质量门槛终验

- [x] T010 Run full validation per `specs/001-hello-world-page/quickstart.md`: `npm run test` 0 失败、`npm run build` 类型检查+构建通过、手动执行 5 个验收场景、自查源码无 `any`、无 `console.log`、无框架 import（宪章五原则终检）

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖，立即开始；T002、T003 与 T001 并行（T001 完成 `npm install` 后二者才可被类型检查，但文件创建本身可并行）
- **Foundational (Phase 2)**: 空，跳过
- **US1 (Phase 3)**: 依赖 Phase 1（T001–T003）
- **US2 (Phase 4)**: 依赖 T005（`DisplayState` 类型与常量所在文件）；T007 测试可在 T006 后与 T008 前编写
- **Polish (Phase 5)**: 依赖全部故事完成

### User Story Dependencies

- **US1 (P1)**: 仅依赖 Setup → 可独立交付（MVP）
- **US2 (P2)**: 依赖 US1 的 `src/greeting.ts`（T005）与 `index.html` 中的按钮（T003）；行为通过 `src/main.ts` 追加，不破坏 US1

### Within Each User Story

- 测试先行（红）→ 实现（绿）→ 检查点验证
- US2 不得修改 T005 已交付的 `displayTextFor` 行为

### Parallel Opportunities

- T002 与 T003 相互并行（不同文件）
- T004（US1 测试）可在 T002/T003 完成后立即编写，与 T005 实现前的运行无关
- T007（US2 测试）与 T006 无文件冲突，可并行

---

## Parallel Example: User Story 2

```powershell
# 先行测试（红）——单文件任务：
Task: "Add failing unit tests for nextDisplayState in tests/greeting.test.ts"
# 实现依赖测试确认失败后串行执行（同一文件 src/greeting.ts、src/main.ts 顺序修改）：
Task: "Extend src/greeting.ts with nextDisplayState"
Task: "Extend src/main.ts with click handler"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1: Setup（T001–T003）
2. 完成 Phase 3: US1（T004–T006）
3. **STOP and VALIDATE**: `npm run dev` 核对 US1 独立测试标准
4. MVP 已可演示——静态问候页

### Incremental Delivery

1. Setup + US1 → 静态页面可演示（MVP）
2. + US2 → 完整交互（T007–T009），项目功能完结
3. + Phase 5（T010）→ 宪章质量门槛终验，准备交付

---

## Notes

- [P] = 不同文件、无未完成依赖
- 每个 US 故事独立可完成、可测试
- 实现前必须确认对应测试失败（红）
- 每个任务或逻辑组完成后提交
- 禁止：模糊任务、同文件并行冲突、破坏故事独立性的跨故事依赖
