# MarkEconly brand theme v1

Palette: deep purple-gray `#302B45`, secondary purple `#655A8A`, lime `#B8D76C`, paper `#F6F5F8`, ink `#292735`.

## Changes
- Added `brand-theme.css` loaded **after** original styles and inline page styles on every HTML page.
- Removed one homepage inline blue callout style, replaced with `.mk-research-entry`.
- No JavaScript, calculation, translations, datasets, or export handlers modified.
- Existing print styles preserved, with lightweight print overrides.

## QA before deployment
- Check all pages on mobile and desktop, especially tool pages and generated reports.
- Test CSV upload, every audit, claim checking, JSON downloads and PDF printing.
- Verify focus contrast and all nine language layouts; automated visual and accessibility audits were not performed.
- Keep a backup or deploy a preview branch before production.

## Design note
This is a conservative first-pass rebrand; deeper layout and typography changes should follow user testing. Status/error/warning semantics must remain distinct from decorative lime accents.
