# MarkEconly v4.1 — 统一声明审计（测试版）

本版在上传的当前 GitHub ZIP 基础上修改。第 6 部分现在使用与第 5 部分相同的 `MarkEconlyClaims.evaluate` 计算引擎，展示原始情景与所选排除情景的分子、分母、比例及差值。第 6 部分读取第 5 部分的排除勾选项、第 2 部分的 ID 和数值范围配置；并允许有效回答 / 全部保留记录两种分母。导出 JSON 包含排除行号与原因。原第 4、5 部分保持不变。

部署：解压后，将 `markeconly-main` 文件夹中的网站文件上传到 GitHub 仓库根目录，等待 Vercel 构建完成。浏览器强制刷新。

测试：上传 `test_exclusion_audit.csv`，在第 4 部分选好字段及选项，第 5 部分勾选排除规则，再到第 6 部分点击 Audit claim evidence。改变分母规则或排除选项后再次点击，结果应相应变化。可以下载 JSON 核对 `baseline`、`selected` 和 `exclusionAudit`。

已运行：`node test-unified-v4.js`、`node test.js`、`node test-claim-enhancements.js`、`node test-claim-audit-v3.js`，均通过。未完成线上 Vercel / Chrome 端到端验证。

限制：本版尚不支持多选题、Likert 合并、Excel xlsx、加权推断或自动问卷语义理解。第 4、5 部分仍有独立的界面流程，统一的是第 6 部分所使用的底层敏感性计算逻辑，而非完整界面重构。
