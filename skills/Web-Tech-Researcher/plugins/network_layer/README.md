# Network Layer — 网络、CDN 与部署探测

## 激活条件
- 需要了解网络架构与部署方案时选取

## 检测策略
1. HTTP 响应头分析：Server / X-Powered-By / CDN 指纹
2. Network 请求列表分析：API 架构（REST/GraphQL/WebSocket/gRPC-Web）
3. 资源优化分析：压缩方式、图片格式、懒加载

## 输出字段
| 字段 | 类型 | 说明 |
|:---|:---|:---|
| server | string | 服务器类型 |
| cdn | string | CDN 服务商 |
| deployPlatform | string | 部署平台 |
| apiArchitecture | string | REST / GraphQL / WebSocket |
| compression | string | gzip / brotli |

## 对应报告章节
→ `templates/report-template.md` §4 网络与部署
