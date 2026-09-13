需求：Hello World 页面
用户故事：
1. 用户打开网页，页面展示文字 "Hello Spec-Kit World!"
2. 页面包含一个按钮，点击按钮文字切换为 "You clicked me!"，再次点击切回 Hello 文本

验收标准：
1. 初始页面加载，显示 Hello Spec-Kit World!
2. 点击按钮：文本切换到 You clicked me!
3. 再次点击按钮，恢复原始 Hello 文本

边界：
- 页面只包含一段展示文本 + 一个按钮
- 无需持久化，刷新页面重置状态
- 无需样式美化，基础可用即可
