# MarkEconly Claim Audit v3 (beta)

新增 Section 6: Claim-to-evidence audit。上传 CSV 后，先在 Section 4 选择问题、回答选项及可选的声明百分比，然后在 Section 6 输入拟发布的声明，手动选择“实际测量概念”和“声明概念”、样本范围及分母规则。

系统输出：分子/分母、缺失数、比例、数值差异、概念不一致提示、样本外推提示，并可导出 JSON。

**注意**：此版本不自动理解问卷题目含义；测量概念由用户填写，系统仅核对所声明的类别是否一致。没有自动证明效度、代表性、因果或法律合规。Section 5 原有排除审计仍独立运行；Section 6 当前不自动应用 Section 5 的排除情景。

测试：`node test-claim-audit-v3.js`。部署：将 `markeconly-main` 文件夹内全部文件上传到 GitHub 仓库根目录。
