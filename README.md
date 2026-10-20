# MarkEconly — survey evidence tools

Static HTML/CSS/JavaScript website for reviewing survey records and exact percentage claims. Release **4.9.2**, reviewed 20 October 2026. No build step, API key, account, database or paid service is needed for the tools. CSV contents are processed in the browser; exported reports can include user-supplied text and flagged values.

## Start

Serve the folder locally with `python3 -m http.server 8000`, then visit `http://localhost:8000/`. Use a local HTTP server rather than opening individual files if you need SHA-256 file hashes.

- `index.html`: homepage and simple business calculators.
- `claim-checker.html`: simplified exact-response percentage review, with nine language dictionaries.
- `research-check.html`: advanced workflow, presented in eleven numbered sections. Eight audit types feed a structured unified report.

## Supported analyses

- Missing cells, exact duplicate rows, repeated IDs, configured numeric ranges.
- Exact single-choice response percentages using a nonblank-answer denominator.
- Optional exclusion sensitivity, with original-file line references and overlapping reasons.
- User-declared claim/measurement mapping and all-row versus nonblank denominators.
- Integer-scale threshold proportions (Top-2 Box presets), binary-column multiple responses, reverse-coding previews.
- Unified JSON/print evidence report tied to the current CSV and current module settings.

No automatic statistical or semantic validation, population inference, causal inference, survey weights, scale reliability estimation or automatic record deletion is provided. Do not describe flags as proof of invalid respondents. The simplified Claim Checker does not automatically extract a percentage or meaning from a sentence; the user enters the comparison percentage and classifications.

## File handling

UTF-8 comma-separated `.csv`, including quoted commas and quoted multiline fields. Research Check accepts up to 50 MiB; under 10 MiB is recommended because parsing is synchronous and large files may pause the browser. The simplified tool is limited to 10 MiB. Excel files, semicolon-separated exports and multi-select choices in one cell are not supported. Entirely empty physical lines are ignored; comma-delimited records with all cells missing are retained. Reported CSV row references identify the first physical line of a record.

All-row and valid-answer denominators are explicitly distinguished. Numeric-range sensitivity excludes missing as well as invalid configured numeric values when requested. Repeated-row/ID simulations retain the first occurrence in source order; combined rules may also exclude that first occurrence for another reason. Review these policies before interpreting a sensitivity result.

## Tests

Requires Node.js 18 or newer, no npm install:

```
node run-tests.cjs
```

Eleven scripts cover existing numerical fixtures, nine Claim Checker dictionaries and interpolation tokens, parser/source-line regressions, strict scale codes, zero denominators, local asset/anchor targets, and UI lifecycle behaviour in a DOM/event harness. The harness executes the actual scripts but is **not a browser rendering or accessibility test**.

## Deploy to the existing GitHub/Vercel project

1. Keep a copy of the current deployed source.
2. Extract this archive. Upload the contents of `markeconly-main` to the root of the existing GitHub repository. Do not upload only the ZIP or accidentally add an extra nested folder.
3. Keep `index.html` at the deployment root. For a new static Vercel import, use Framework Preset `Other`, no build command, and serve the repository root.
4. Confirm the deployment completes, then use `RELEASE_REVIEW_ZH.md` for manual checks on the actual deployed URL. No live deployment was performed as part of this source review.

## Localization and verification boundaries

Nine dictionaries and selectors are available in the simplified Claim Checker. Original CSV headers, response values and JSON schema keys are intentionally not translated. Other pages, advanced Research Check outputs, article bodies and calculator outputs are not fully localized. Native-speaker review and real-browser desktop/mobile, download and print verification remain outstanding. This is a tested source revision of an experimental tool, not a certified complete nine-language release.

Historical READMEs describe earlier snapshots and may no longer reflect the active script wiring. See `RELEASE_REVIEW_ZH.md` for this revision.

## Layout update

Version 4.9.2 reorganizes the homepage around concrete survey questions, adds a synthetic demo entry and FAQ, and groups all eleven advanced sections by task. See `LAYOUT_UPDATE_ZH.md`. Existing numerical engines are unchanged. Browser rendering and complete localization remain to be verified.
