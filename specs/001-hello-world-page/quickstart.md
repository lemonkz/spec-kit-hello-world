# Quickstart 验证指南: Hello World 页面

**Branch**: `001-hello-world-page` | **Date**: 2026-09-13

端到端验证本功能是否满足 spec.md 验收场景的 runnable 步骤。
接口细节见 [contracts/ui.md](./contracts/ui.md)，状态模型见 [data-model.md](./data-model.md)。

## 前置条件

- Node.js（含 npm）已安装
- 项目根目录已存在 `package.json`（含 `dev`/`build`/`test` 脚本，见 plan.md R-6）

## 命令

```powershell
npm install          # 安装 Vite / Vitest / TypeScript（dev 依赖）
npm run test         # Vitest：tests/greeting.test.ts 必须全部通过
npm run build        # tsc --noEmit 类型检查 + vite build，两步都必须成功
npm run dev          # 启动 Vite 开发服务器，按输出地址在浏览器打开页面
```

## 手动验收场景（对照 spec.md）

1. **初始加载**：浏览器打开页面 → 文本容器显示 `Hello Spec-Kit World!`（逐字符含标点）；页面上除该文本与一个按钮外无其他内容。
2. **首次点击**：点击按钮 → 文本变为 `You clicked me!`。
3. **再次点击**：再点按钮 → 文本恢复 `Hello Spec-Kit World!`。
4. **往返压测**：连续快速点击 20 次 → 文本严格随点击次数奇偶交替，无跳变。
5. **刷新重置**：任意状态下刷新页面 → 恢复初始 `Hello Spec-Kit World!`。

## 完成定义（宪章质量门槛）

- `npm run test`：0 失败
- `npm run build`：类型检查通过、构建产物生成
- 自查：源码无 `any`、无 `console.log`、无框架 import
