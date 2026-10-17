# MarkEconly Research Check · 排除记录审计更新

## 本版功能
在 Research Check 第 5 部分点击 Compare scenarios 后，显示每条被排除记录的 CSV 行号和原因。重叠原因单独计数，可导出排除审计 CSV。原始问卷数据不会被改写；报告仍是敏感性分析，不代表建议删除。支持英语、简体中文、繁体中文标签。

## 测试方法
1. 部署本 ZIP 的网站文件到 GitHub/Vercel；打开 research-check.html。
2. 上传 `test_exclusion_audit.csv`。第 4 部分选择 `satisfaction`，回答 `Satisfied`。原始比例应为 5/8=62.5%。
3. 第 2 部分选择 `respondent_id` 作为 ID，勾选 `score_1to5` 数值范围 1–5。
4. 第 5 部分勾选三项排除规则并点击 Compare scenarios。预期排除 CSV 第 5 行（重复 ID + 完全重复）、第 6 行（越界）、第 7 行（缺失）；共排除 3 行，保留 5 行；有效分母 5，分子 3，比例 60%。
5. 下载排除审计 CSV，核对 5、6、7 行及原因。

## 重要限制
- 目前仅支持 CSV；Excel xlsx 不支持。
- 不会自动判断某条记录是否应该被删除。
- 本次主要修复排除记录透明度；尚未实现复杂问卷跳题、多选题、权重、抽样代表性审计。
- 本地完成 JS 语法及计算单元测试，尚未在你的线上 Chrome/Vercel 环境端到端验证。
