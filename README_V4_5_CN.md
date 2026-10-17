# MarkEconly v4.5 反向编码审计测试

解压后上传 markeconly-main 内的站点文件到 GitHub 仓库根目录。使用 v45_reverse_coding_test.csv 测试 Section 10。选择 reverse_item_1to5，min=1，max=5，勾选 reverse coding。

预期：上传9行，有效7行、缺失1行、无效1行（CSV第8行是6，第9行是2.5，所以实际有效6行、缺失1、无效2）。有效原始值 1,2,3,4,5,1；原始均值 2.667，反向均值 3.333。无效 CSV 行 8,9。

取消勾选后，预览均值应等于原始均值2.667。此功能不会更改上传的原始数据。
