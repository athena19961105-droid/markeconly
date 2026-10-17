# Research Check 页面变空白：脚本循环修复

根因分析：`i18n-zh-runtime.js` 的 MutationObserver 会重写文本；`claim-enhancements-ui.js` 又监听语言变化并重写第 5 部分文本。两者可能互相触发，在部分浏览器和语言状态下造成页面持续重绘、卡顿或空白。

本次改动：全站翻译运行器跳过 `data-claim-i18n` 文本节点，由第 5 部分自己的 UI 脚本管理；删除第 5 部分的语言属性 MutationObserver，保留语言选择 change 监听。未改变 CSV 解析和统计逻辑。

部署：将 `markeconly-main` 内的文件上传到仓库根目录；Vercel 部署完成后用 Command+Shift+R 刷新。先在英文模式检查页面是否持续显示，再切换简体中文和繁体中文，并尝试点击 Choose file。

限制：完成代码静态检查，未在用户线上部署进行端到端验证。如果仍空白，请提供 Console 报错及 Vercel 部署提交号。
