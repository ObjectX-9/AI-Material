# Text Editor Layer — 文本编辑器探测

## 激活条件
- `hasContentEditable = true` 或检测到 ProseMirror / Slate / Lexical

## 检测策略
1. 查全局变量：Quill / tinymce / CKEDITOR / monaco 等
2. 查 DOM 特征：`.ProseMirror` / `[data-slate-editor]` / `[data-lexical-editor]`
3. 检测协同编辑：Yjs / Automerge
4. 判断 Canvas 文本引擎可能性

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| editor | string | 编辑器引擎名称 |
| collaboration | string? | 协同编辑技术 |
| renderMode | string | DOM / Canvas / SVG |

## 对应报告章节
→ `templates/report-template.md` §11 文本编辑
