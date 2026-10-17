# MarkEconly v4.6 — Unified evidence report (pilot)

1. Upload v45_reverse_coding_test.csv. Run Section 10 audit.
2. In Section 11 select Generate unified report. Confirm Reverse coding is Captured and unrelated modules are Not assessed.
3. Download JSON and verify `source.rows` = 9, and reverse-coding section has visibleEvidence.
4. Upload v44_multiple_response_test.csv. Without running Section 9, generate report. Confirm old reverse coding result is Not assessed and source.rows = 7.
5. Run Section 9, generate report again. Confirm Multiple-response is Captured.
6. Test Print / Save PDF.

Important: Captured means visible output copied, not independently verified. This is a pilot; full evidence-object integration is a later milestone.
