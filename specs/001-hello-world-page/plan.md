# Implementation Plan: Hello World 页面

**Branch**: `001-hello-world-page` | **Date**: 2026-09-13 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-hello-world-page/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command; its definition describes the execution workflow.

## Summary

单页面展示固定问候文本 "Hello Spec-Kit World!"，点击唯一按钮在 "Hello Spec-Kit World!" 与 "You clicked me!" 之间往返切换，无持久化（刷新重置）。技术方案：Vite + TypeScript（严格模式），切换逻辑抽为纯函数模块供 Vitest 先行测试，`index.html` + `src/main.ts` 做原生 DOM 绑定，零运行时依赖、零框架。

## Technical Context

**Language/Version**: TypeScript 5.x（`strict: true`，禁用 `any`）

**Primary Dependencies**: Vite（构建/开发服务器）、Vitest（单元测试）；无运行时依赖

**Storage**: N/A（状态不持久化）

**Testing**: Vitest（单元测试，先写测试后实现）

**Target Platform**: 现代常青浏览器（ES2020+），桌面与移动

**Project Type**: web（单页面静态站点）

**Performance Goals**: 页面加载后 2 秒内可见问候文本（SC-001）；点击后 1 秒内文本切换（SC-002）

**Constraints**: 宪章五原则——严格 TS 禁 `any`、TDD、Vite/Vitest、生产代码无 `console.log`、原生 HTML/CSS 禁框架

**Scale/Scope**: 单页面，一段文本 + 一个按钮；单会话两值状态

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原则 | 状态 | 说明 |
|------|------|------|
| I. 仅 TypeScript，严格类型（禁 `any`） | ✅ PASS | 全部源码为 TS；DOM API 使用 `lib.dom` 内建类型；状态用联合类型 `DisplayState` 表达 |
| II. 测试先行开发（不可协商） | ✅ PASS | 核心切换逻辑设计为纯函数模块，先写 Vitest 单元测试（红）再实现（绿）；DOM 绑定层为薄适配层 |
| III. Vite 与 Vitest 工具链 | ✅ PASS | 用户输入与宪章一致：Vite 构建 + Vitest 测试 |
| IV. 干净的生产代码（无 `console.log`） | ✅ PASS | 功能无需任何日志输出 |
| V. 原生 UI，禁止框架 | ✅ PASS | `index.html` + 原生 DOM 操作（`getElementById`/`textContent`/`addEventListener`），零框架零 UI 库 |

**Phase 1 复查**: 设计产物（data-model.md、contracts/ui.md、quickstart.md）均为纯逻辑 + 原生 DOM 分层，无新增依赖，五项原则维持 PASS，无违规项，Complexity Tracking 留空。

## Project Structure

### Documentation (this feature)

```text
specs/001-hello-world-page/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
index.html              # 单页面入口：一段展示文本 + 一个按钮
src/
├── main.ts             # 入口：原生 DOM 绑定（查询元素、监听点击、渲染文本）
└── greeting.ts         # 纯逻辑：文本常量与状态切换函数（可单元测试，不碰 DOM）
tests/
└── greeting.test.ts    # Vitest 单元测试（先于 greeting.ts 实现）
```

**Structure Decision**: 采用单项目结构（Option 1 的最小化变体）。项目仅为一个静态页面，无后端、无多页面，因此不需要 backend/frontend 或 monorepo 划分；`src/greeting.ts` 与 `src/main.ts` 的拆分唯一目的是满足宪章原则 II（逻辑可单元测试、与 DOM 访问分离）。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

（无违规项，留空）
