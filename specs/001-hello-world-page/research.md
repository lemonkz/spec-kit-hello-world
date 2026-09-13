# Phase 0 Research: Hello World 页面

**Branch**: `001-hello-world-page` | **Date**: 2026-09-13

Technical Context 中无 NEEDS CLARIFICATION 项（用户输入与宪章已完全锁定技术栈）。
以下为已做决策及其理由的记录。

## R-1: 状态建模方式

- **Decision**: 用字符串联合类型 `type DisplayState = "hello" | "clicked"` 表示页面唯一状态，切换逻辑为纯函数 `nextDisplayState(state: DisplayState): DisplayState`。
- **Rationale**: 只有两个互斥取值，联合类型让编译器穷尽检查两个分支，天然满足宪章禁 `any` 与严格类型要求；纯函数可直接被 Vitest 测试，无需 DOM。
- **Alternatives considered**: 布尔值 `isClicked`（可行但语义弱，分支不可穷举检查）；类 + 状态机库（对两值状态是过度设计）。

## R-2: 逻辑与 DOM 的分层

- **Decision**: `src/greeting.ts` 只含常量与纯函数，不 import 任何 DOM API；`src/main.ts` 负责查询元素、监听点击、写 `textContent`。
- **Rationale**: 宪章原则 II（TDD）与原则 V（逻辑与 DOM 分离可测试）共同要求核心逻辑不依赖浏览器环境；这样 Vitest 可用默认 node 环境跑测试，无需 jsdom。
- **Alternatives considered**: jsdom 环境 + 直接测 DOM 绑定（引入额外 dev 依赖且测试变脆）；E2E 浏览器测试（超出本功能边界）。

## R-3: 文本来源与精确匹配

- **Decision**: 两段文本定义为 `greeting.ts` 中的导出常量 `GREETING_TEXT = "Hello Spec-Kit World!"`、`CLICKED_TEXT = "You clicked me!"`，`main.ts` 渲染时直接引用，页面不再硬编码副本。
- **Rationale**: FR-001/FR-003/FR-004 要求精确匹配（含标点）；单一来源避免双处维护漂移，且常量可被测试断言引用。
- **Alternatives considered**: 文本写在 HTML 里、JS 只做替换（两处来源易漂移）；配置文件（单页面无需）。

## R-4: 持久化与生命周期

- **Decision**: 不使用 localStorage/sessionStorage/URL 状态；模块状态随页面刷新天然重置。
- **Rationale**: FR-006 与需求边界明确"刷新页面重置状态"，无持久化反而是需求本身。
- **Alternatives considered**: sessionStorage（违背 FR-006）。

## R-5: 测试文件布局

- **Decision**: 测试置于 `tests/greeting.test.ts`（宪章技术约束允许"就近或 `tests/`/`*.test.ts`"，单模块场景集中一处最简）。
- **Rationale**: 单一被测模块，集中式目录最省配置。
- **Alternatives considered**: 与源码同目录 `src/greeting.test.ts`（同样合规，仅风格差异，二选一即可）。

## R-6: 构建与脚本约定

- **Decision**: `package.json` 脚本：`dev` = `vite`、`build` = `vite build`（`tsc --noEmit` 先行做类型门禁）、`test` = `vitest run`。
- **Rationale**: 宪章开发工作流要求 `vitest run` 无失败 + `vite build` 成功且无类型错误后方可交付；`tsc --noEmit` 显式把类型检查纳入构建链。
- **Alternatives considered**: 仅依赖 esbuild 转译（不做类型检查，违反宪章原则 I 的"类型错误必须导致构建失败"）。
