# State Layer — 状态管理探测

## 激活条件
- 需要了解状态管理方案时选取

## 检测策略
1. 查全局变量：Redux DevTools / MobX / Pinia / Zustand
2. 从 view_layer 检测结果中提取状态管理相关发现

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| stateManager | string | Redux / MobX / Pinia / Zustand / Jotai |

## 对应报告章节
→ `templates/report-template.md` §2 技术栈总览
