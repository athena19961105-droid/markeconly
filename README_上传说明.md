# MarkEconly Research Check — GitHub 更新包

## 文件说明
- `research-check.html`：原有网页 + 新增 Survey Claim Checker 区块
- `checker.js`：CSV 检查和数字声明计算逻辑
- `test.js`：Node.js 自动测试（不会部署成用户功能）
- `synthetic_survey.csv` / `expected_results.json`：纯合成测试样本与预期值

## 最简单的上传方式
1. 在 GitHub 打开你**现有网站对应的仓库**，先确认仓库中确实有 `research-check.html` 和 `checker.js`。
2. 建议先新建一个分支（例如 `research-check-update`），或至少保存原文件备份。
3. 将本包的 `research-check.html` 和 `checker.js` 上传到**与旧文件相同的目录**，覆盖同名文件。不要覆盖 `index.html`，也不要删除其他文件。
4. 可将 `test.js` 和两份测试数据上传到仓库作为测试资产，但这三份文件不是网页运行必需品。
5. 如你的网站是 Vercel 从 GitHub 自动部署，请在部署成功后打开网站的 Research Check 页面，上传合成 CSV 检查功能。请确认 Vercel 项目指向的是这个仓库和分支。
6. 测试新增声明核对：选择 `segment` 列和其中一个实际存在的回答选项，运行计算；检查分子+其他非空回答数=有效分母。

## 本地测试（如果电脑有 Node.js）
在本包目录运行 `node test.js`，预期输出 `PASS: baseline, parser edge cases, range validation, claim checks`。

## 产品限制（重要）
- 这是**数值声明核对工具**，不是能理解任意自然语言声明的 AI 系统，也不是法律或广告合规认证。
- 仅按一个 CSV 列中的**单一文本选项精确匹配**计数；不支持多选题、权重、复杂跳题、加权总体推断。
- 不自动删除记录；重复和异常必须人工核查。对重复 ID 的警告不会自动改变声明计算的分母。
- 对非概率抽样不能推断所有客户；即使是概率抽样，也必须检查抽样框、非响应和权重。
- 数据在浏览器处理，但不要因此声称设备或浏览器绝对安全；先用合成数据测试。
- 未添加付费 AI API、数据库、用户登录或支付功能。
- 上传后请人工测试移动端、不同浏览器、CSV 导出以及 Vercel 部署路径；自动测试不等于线上验收。

## 不要做的事
- 不要把 ZIP 中所有文件直接覆盖网站根目录的全部文件。
- 不要修改 `index.html`，除非你确认需要添加工具导航入口。
- 不要直接使用真实敏感问卷数据做首次公开测试。
