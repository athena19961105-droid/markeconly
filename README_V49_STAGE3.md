# MarkEconly v4.9 — Stage 3: whole-site translation inventory

This is **not** a complete nine-language release. It adds an automated inventory of English-looking text in all HTML pages and translates the incomplete-translation notice itself into all eight non-English languages.

Run `python3 translation-audit-v49.py` from any working directory. Outputs:

- `translation-static-inventory.csv`: candidates with file, text and explicit translation-key status.
- `translation-static-summary.json`: per-page candidate counts.

**Important:** This is a heuristic static inventory, NOT a count of missing translations: legacy scripts may translate text without `data-i` keys; dynamic JS strings are not included. English proper nouns, user CSV field names, JSON keys, and technical abbreviations should not be translated blindly.

Next engineering tasks: (1) migrate legacy HTML to explicit translation keys; (2) extract JS-generated user-facing strings; (3) supply and review translations for each language; (4) browser test each language and exported reports. Existing research calculations are unchanged in this stage.

Do not deploy as a verified complete translation release.
