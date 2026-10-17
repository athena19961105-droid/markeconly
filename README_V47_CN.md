# MarkEconly v4.7 测试指南

## 本次升级
- CSV 原始字节 SHA-256：在 HTTPS / localhost 等安全上下文可计算；直接 file:// 打开时部分浏览器会禁用 Web Crypto，报告将明确标为 Unavailable，**不会伪造哈希**。
- Section 9 多选题、Section 10 反向编码的结构化数据写入统一 JSON，并在报告中渲染为表格。
- 其他旧模块仍采用文本快照，不能宣称全模块已结构化。
- 改善打印样式；打印/另存 PDF 仍依赖浏览器。
- 更换 CSV 时清空本次报告和当前模块的证据缓存。

## 测试 A（在线）
上传 v44_multiple_response_test.csv；Section 9 选择 social_media、friends、brand_website，完整有效记录分母，运行；Section 11 生成报告。预期 SHA-256 为 64 位十六进制；Multiple-response 表格 2/2/1、50%/50%/25%、40%/40%/20%。下载 JSON，检查 sections[].structuredEvidence 为对象而不是文字。

## 测试 B（反向编码）
上传 v45_reverse_coding_test.csv；Section 10 选择 reverse_item_1to5、1-5、开启反向预览，运行；Section 11 生成报告。预期原均值 2.667、反向均值 3.333，报告含逐行表格。

## 测试 C（离线）
将 markeconly-main 整个文件夹保存在电脑；断开网络，双击 research-check.html，用测试 CSV 运行 Section 9、11。离线时 SHA-256 可能显示 Unavailable（浏览器安全限制），其他纯本地分析功能应继续工作。不要只复制 HTML 文件，需保留同目录的 JS 文件。

## 注意
本版本为原型，未完成全模块自动化端到端测试；SHA-256 是来源一致性标识，不证明问卷真实、抽样可靠或分析有效。
