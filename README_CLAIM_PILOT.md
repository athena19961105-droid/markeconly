# Survey Claim Checker pilot / 问卷数字声明核对测试版

- Open `claim-checker.html` (works locally with `checker.js` and `claim-checker-pilot.js`).
- Existing `research-check.html` Section 1–11 is retained unchanged except for a link to the pilot.
- Homepage tool link points to the new primary workflow.
- Language switch: English / 简体中文.
- Single-choice exact text matching only. No automatic interpretation of claim text, probability-sampling verification, weighting, or legal determination.
- A claim with missing or unspecified information requires human review even if the percentage matches.
- Run `node test-claim-pilot.js` to verify the underlying parser/counts.
- Test with `claim_pilot_demo.csv`, which is synthetic.
- To verify: upload CSV, select `recommendation`, choose `Yes`, set claimed 85%, inspect 60% actual, export JSON. Then set 60% and verify numerical match warning.
