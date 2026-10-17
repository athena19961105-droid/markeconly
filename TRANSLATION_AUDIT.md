# MarkEconly translation coverage audit

Source: script.js translations object; exact-string checks only.

| Language | Missing | Identical English strings | Other entries |
|---|---:|---:|---:|
| zh-CN | 0 | 0 | 48 |
| zh-TW | 0 | 23 | 25 |
| fr | 0 | 23 | 25 |
| de | 0 | 23 | 25 |
| es | 0 | 23 | 25 |
| pt | 0 | 23 | 25 |
| ja | 0 | 23 | 25 |
| ko | 0 | 23 | 25 |

## Scope and limitations
- Scanned 8 HTML files for translation coverage risks.
- Counts above cover ONLY the main homepage `script.js` dictionary. Other pages, dynamic module messages, article bodies and reports are NOT certified.
- Identical English text is a heuristic: brand names and technical terms may be legitimate.
- Missing data-i18n attributes and non-homepage translations require separate extraction and browser tests.
- Do not advertise any non-English language as fully localized until page-by-page and dynamic-output verification passes.

- `services.html`: 22 possible hard-coded English UI segments (heuristic).
- `articles.html`: 1 possible hard-coded English UI segments (heuristic).
- `sample-report.html`: 21 possible hard-coded English UI segments (heuristic).
- `claim-checker.html`: 37 possible hard-coded English UI segments (heuristic).
- `portfolio.html`: 19 possible hard-coded English UI segments (heuristic).
- `index.html`: 13 possible hard-coded English UI segments (heuristic).
- `contact.html`: 16 possible hard-coded English UI segments (heuristic).
- `research-check.html`: 117 possible hard-coded English UI segments (heuristic).
