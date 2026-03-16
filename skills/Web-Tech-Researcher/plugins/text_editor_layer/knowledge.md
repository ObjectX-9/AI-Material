# 文本编辑器指纹

> 激活条件：`hasContentEditable = true` 或检测到 ProseMirror / Slate / Lexical

---

## 富文本编辑器

| 编辑器 | 全局变量 | DOM 特征 |
|:---|:---|:---|
| ProseMirror | — | `.ProseMirror` class |
| Tiptap | `window.tiptap` | `.ProseMirror` class（基于 ProseMirror） |
| Slate | — | `[data-slate-editor]` 属性 |
| Lexical | — | `[data-lexical-editor]` 属性 |
| Quill | `window.Quill` | `.ql-editor` class |
| TinyMCE | `window.tinymce` | `.tox` class |
| CKEditor | `window.CKEDITOR` | — |
| Draft.js | `window.Draft` | `[data-editor]` 属性 |

---

## 代码编辑器

| 编辑器 | 全局变量 | DOM 特征 |
|:---|:---|:---|
| Monaco | `window.monaco` | `.monaco-editor` class |
| CodeMirror | `window.CodeMirror` | `.CodeMirror` / `.cm-editor` class |
| Ace | `window.ace` | `.ace_editor` class |

---

## 协同编辑

| 技术 | 全局变量 | 类型 |
|:---|:---|:---|
| Yjs | `window.Y` | CRDT |
| Automerge | `window.Automerge` | CRDT |

---

## 关注点

- 文本渲染方式：DOM contentEditable / Canvas 自绘文本 / SVG
- 排版引擎：自研排版（Canvas 文本换行/段落布局）
- 字体技术：Web Fonts、可变字体 (Variable Fonts)、Fontkit / opentype.js
- 文本特效：描边/阴影/渐变填充/路径文字
- Canvas 文本引擎判断：排除已知 DOM 编辑器后仍有 canvas = 可能是 Canvas 文本渲染
