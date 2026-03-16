# 插件扩展指南与合约规范

> 参考文档，仅在需要新增或修改插件时阅读。

## 新增插件（3 步）

1. 创建 `plugins/{name}_layer/` 目录，包含 `README.md`、`detect.js` 和 `knowledge.md`
2. 在 `templates/report-template.md` 中新增对应章节
3. 在 `plugins/INDEX.md` 的插件清单表中添加一行

## 目录结构

```
plugins/{name}_layer/
├── README.md       # 插件声明（必须）
├── detect.js       # 检测脚本集合（必须）
└── knowledge.md    # 技术指纹知识库（必须）
```

## README.md 必须包含

```markdown
# {Layer Name}

## 激活条件
## 检测策略（按优先级：全局变量 → DOM 特征 → Network 资源）
## 输出字段
## 对应报告章节 → `templates/report-template.md` §N
```

## detect.js 规范

- 每个函数必须是纯函数，可直接通过 `evaluate_script` 注入
- 必须返回 JSON 可序列化对象
- 不得发起网络请求或修改 DOM
- 异常必须内部捕获

```javascript
// ✅ 正确示例
const detectXxx = () => {
  const r = {};
  try {
    if (window.SomeLib) r.someLib = { version: window.SomeLib.version };
  } catch (e) {
    r.error = e.message;
  }
  return r;
};
```
