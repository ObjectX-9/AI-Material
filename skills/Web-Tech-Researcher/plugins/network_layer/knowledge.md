# 网络与部署指纹

> network_layer 插件知识库。涵盖部署平台、CDN 的识别签名。

---

## 部署平台指纹（HTTP 响应头）

| 平台 | 响应头特征 |
|:---|:---|
| Vercel | `X-Vercel-Id` / `Server: Vercel` |
| Cloudflare | `CF-Ray` / `Server: cloudflare` |
| Netlify | `X-NF-Request-ID` |
| AWS CloudFront | `X-Amz-Cf-Id` |
| Nginx | `Server: nginx` |
| Caddy | `Server: Caddy` |
| Google Cloud | `Alt-Svc` / `X-Cloud-Trace-Context` |
