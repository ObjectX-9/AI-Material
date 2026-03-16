# Worker Layer — Web Worker 与并行计算探测

## 激活条件
- Network 中发现包含 `worker` 关键词的脚本

## 检测策略
1. 检查 Service Worker 注册状态
2. 通过 Performance API 收集 Worker 脚本资源
3. 检查 SharedArrayBuffer / crossOriginIsolated 支持

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| serviceWorker | boolean | 是否有 SW |
| workerScripts | object[] | Worker 脚本列表 |
| sharedArrayBuffer | boolean | SAB 支持 |

## 对应报告章节
→ `templates/report-template.md` §8 Worker 并行计算
