# Research Check CSV 上传大小调整

- 原限制：2 MB；新限制：50 MB（CSV）。
- 超过 10 MB 时显示性能警告；超过 50 MB 时拒绝读取并提示拆分文件。
- Excel .xlsx / .xls **仍不支持**，请另存为 UTF-8 CSV。
- 本工具在浏览器本地一次性读取并解析 CSV，50 MB 只是上限，不保证大文件在所有设备正常运行。建议优先使用小于 10 MB 的文件。
- 本更新以此前“Research Check 空白页修复版”为基础，仅调整文件大小校验与说明。
- 不能凭静态检查确认 Chrome 文件选择窗口或页面空白问题已解决；请在 Vercel 预览环境验证。

## 部署
解压后将 markeconly-main 内文件上传到 GitHub 仓库根目录（建议测试分支），待 Vercel 预览完成后测试。
