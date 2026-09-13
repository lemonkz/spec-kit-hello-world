# spec-kit-hello-world

基于 [GitHub Spec Kit](https://github.com/github/spec-kit) 规格驱动开发（Spec-Driven Development）流程构建的 Hello World 示例页面：打开网页即展示问候文本 **"Hello Spec-Kit World!"**，点击按钮可在它与 **"You clicked me!"** 之间来回切换。

## 功能

- 页面初始加载展示问候文本 "Hello Spec-Kit World!"
- 点击按钮切换为 "You clicked me!"，再次点击恢复问候文本
- 无状态持久化：刷新页面总是回到初始问候文本

## 技术栈

- [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) 单元测试（零运行时依赖）

## 快速开始

```bash
npm install

npm run dev     # 启动开发服务器
npm run build   # 类型检查 + 生产构建（输出到 dist/）
npm test        # 运行 Vitest 单元测试
```

## 项目结构

```
├── index.html                          # 入口页面
├── src/
│   ├── main.ts                         # DOM 渲染与按钮交互
│   └── greeting.ts                     # 纯函数：状态机与文案映射
├── tests/
│   └── greeting.test.ts                # 单元测试（覆盖两个用户故事）
└── specs/
    └── 001-hello-world-page/           # Spec Kit 产物
        ├── spec.md                     # 功能规格（用户故事、验收场景）
        ├── plan.md                     # 实施计划
        ├── tasks.md                    # 任务拆解
        ├── data-model.md               # 数据模型
        ├── contracts/ui.md             # UI 契约
        └── ...
```

## Spec Kit 工作流

本项目演示了规格驱动开发的完整流程：先在 `specs/` 中编写规格、计划与任务清单，再按任务逐步实现代码，单元测试直接对应规格中的验收场景（如 "连续 20 次点击与奇偶性 100% 一致"）。
