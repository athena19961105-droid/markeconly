# MarkEconly v4.1.1 中文验证指南

## 为什么有这一版
截图中的旧版 Section 6 标题为 `Evidence and interpretation`，而新版必须显示 `Unified evidence audit · v4.1.1`。此版本增加顶部明确版本标识和统一审计的排除规则/行号展示。

## 部署
1. 解压 ZIP，进入 `markeconly-main` 文件夹。
2. 将**文件夹内全部文件**上传至 GitHub 仓库根目录（不是只上传一个 HTML，也不是额外嵌套一层文件夹）。
3. 等待 Vercel 最新部署显示 Ready。
4. 在 Chrome 打开 `https://markeconly.vercel.app/research-check.html?v=411`，按 Command + Shift + R。
5. 页面顶部必须出现 `Research Check v4.1.1 · Unified Audit`。若没有，停止测试，发送顶部截图及 Vercel 部署截图。

## 测试文件和逐项设置
上传包内 `MarkEconly_synthetic_survey_test.csv`。
Section 2：ID 选择 `respondent_id`；只勾选 `price_sensitivity_1to5`、`brand_trust_1to5`、`purchase_intent_1to5`，范围均为 1 到 5；点击 Run data checks。预期：100 行，6 列，2 个缺失单元格，1 个完全重复行，1 个重复 ID。
Section 4：Survey question 选 `respondent_id`；Response option 选 `R001`；Percentage 填 `1`；Recruitment 选 `Unknown`；点击 Check claim percentage。预期 1/100 = 1.00%。这是技术计数测试，非真实问卷结论。
Section 5：三个排除复选框全部勾选，点击 Compare scenarios。预期排除 CSV 第 8、23、36、51、86 行，共 5 行；基准 1/100 = 1.00%，排除后 1/95 ≈ 1.05%。
Section 6：Proposed statement 填 `1% of all consumers bought sustainable products.`；Measurement 选 `Purchase intention / likelihood`；Statement asserts 选 `Actual past purchasing behavior`；Population 选 `All consumers / general population`；Denominator 选 `Nonempty answers to selected question`；点击 Audit claim evidence。预期：出现 `Unified evidence audit · v4.1.1`，基准 1/100=1.00%，排除后 1/95=1.05%，构念 mismatch、总体 scope unsupported，并展示排除行号。

请发三张截图：顶部版本标识；Section 5 结果；Section 6 结果。

## 注意
截图只能验证界面行为；并不等于完成浏览器兼容性、性能、统计效度或所有功能的测试。
