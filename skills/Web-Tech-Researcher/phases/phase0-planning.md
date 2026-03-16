# Phase 0：需求确认与任务规划

**目标**：搞清楚用户要调研什么，生成任务清单，**必须等用户确认后**再动手。

> **Phase 0 是阻塞式的**：在用户明确回复"确认"/"开始"/"可以"等肯定词之前，禁止进入 Phase 1。

## 前置检查：MCP 依赖（最先执行）

在执行任何操作之前，必须先确认 `chrome-devtools` MCP 已配置且可用：

1. **读取 `.kiro/settings/mcp.json`**
2. **检查 `mcpServers` 中是否存在 `chrome-devtools`**
3. 如果不存在：
   - 读取现有配置内容
   - 在 `mcpServers` 对象中追加 `chrome-devtools` 配置（不覆盖已有服务器）
   - 写回文件
   - 输出提示，等待用户确认 MCP 已连接
4. 如果文件不存在：创建完整的 `.kiro/settings/mcp.json`，包含 `chrome-devtools` 配置
5. 如果已存在：直接继续

### 需要追加的配置

```json
"chrome-devtools": {
  "command": "npx",
  "args": ["-y", "chrome-devtools-mcp@latest", "--isolated"],
  "autoApprove": [
    "take_screenshot", "take_snapshot", "click", "press_key",
    "evaluate_script", "navigate_page", "wait_for", "new_page",
    "list_console_messages", "select_page", "list_pages",
    "list_network_requests", "lighthouse_audit",
    "get_network_request", "hover", "fill", "type_text"
  ]
}
```

### MCP 缺失时的输出

```
【调研skill🚀====>】Pre-check — MCP 依赖配置

检测到缺少 chrome-devtools MCP 配置，已自动添加到 .kiro/settings/mcp.json。
请等待 MCP 服务器连接成功（左侧面板 MCP Servers 显示绿色），然后告诉我"已连接"继续。
```

> **此步骤是阻塞式的**：MCP 未就绪时，禁止执行后续任何浏览器操作。

---

## 必须执行

1. **导航并截图**：先导航到目标 URL，截图记录当前页面状态
2. **登录状态检测**：执行下方登录检测脚本，检查是否需要登录
   - 如果需要登录：**立即暂停**，提示用户手动登录后再继续
3. **功能可达性确认**：确认目标功能是否可见/可访问
   - 如果功能不可达：提示用户需要的前置条件
4. **澄清需求**：如果用户意图不够明确，主动询问调研目标和重点技术层
5. **生成任务清单**：查询 `plugins/INDEX.md`，选取相关插件，输出任务清单
6. **等待用户确认**

## 登录检测脚本

```javascript
const detectLoginStatus = () => {
  const text = document.body.innerText || '';
  const hasLoginButton = !!(
    document.querySelector('[class*="login"]') ||
    /登录|注册|sign in|log in/i.test(text.slice(0, 500))
  );
  const hasLoginModal = !!(
    document.querySelector('[class*="login-modal"]') ||
    document.querySelector('[class*="auth-modal"]')
  );
  const hasUserInfo = !!(
    document.querySelector('[class*="avatar"]') ||
    document.querySelector('[class*="user-info"]') ||
    document.querySelector('[class*="username"]')
  );
  return {
    needsLogin: hasLoginButton && !hasUserInfo,
    hasLoginModal, hasUserInfo,
    signals: { hasLoginButton, hasLoginModal, hasUserInfo }
  };
};
```

## 输出格式

```
【调研skill====>】Phase 0 — 页面状态确认

截图已保存：{输出目录}/screenshots/00-landing.png

页面状态：
  - URL：{当前 URL}
  - 登录状态：{已登录 / 未登录，需要手动登录}
  - 功能可达性：{目标功能是否可见}

---

【调研skill====>】任务清单：

目标：{URL} — {调研目的}
输出目录：AIDocs/TechResearch/{网站名}-{日期}/

插件：
  1. [view_layer] 检测渲染框架
  2. [canvas_layer] 检测 Canvas 引擎
  ...

请确认是否开始调研？如需调整插件范围请告诉我。
```

**登录阻塞时**：

```
【调研skill====>】Phase 0 — 需要登录

检测到页面需要登录才能访问目标功能。
请在浏览器中手动完成登录，然后告诉我"已登录"，我将继续调研。
```

**功能不可达时**：

```
【调研skill====>】Phase 0 — 功能不可达

目标功能「{功能名}」当前不可见。
前置条件：{需要先生成图片 / 需要先上传素材 / ...}

请完成前置操作后告诉我，或者提供一个已有素材的页面 URL。
```
