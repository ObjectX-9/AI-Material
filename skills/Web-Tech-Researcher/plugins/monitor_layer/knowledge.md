# 监控与分析指纹

> monitor_layer 插件知识库。涵盖主流监控埋点服务的识别签名。

---

| 服务 | 全局变量 |
|:---|:---|
| Sentry | `window.Sentry` / `window.__SENTRY__` |
| LogRocket | `window.LogRocket` |
| Google Tag Manager | `window.dataLayer` |
| Google Analytics | `window.ga` / `window.gtag` |
| Hotjar | `window.hj` |
| PostHog | `window.posthog` |
| Statsig | `window.statsig` |
| Mixpanel | `window.mixpanel` |
| Amplitude | `window.amplitude` |
