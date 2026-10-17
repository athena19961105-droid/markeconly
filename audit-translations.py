#!/usr/bin/env python3
"""Read-only translation audit. Run: python3 audit-translations.py"""
import json,re,csv,pathlib,collections
root=pathlib.Path(__file__).resolve().parent
s=(root/'script.js').read_text()
marker='const translations = '
pos=s.index(marker)+len(marker)
decoder=json.JSONDecoder(); data,_=decoder.raw_decode(s[pos:])
en=data['en']; langs=[k for k in data if k!='en']
rows=[]
for lang in langs:
 for key,value in en.items():
  actual=data[lang].get(key)
  status='missing' if actual is None or not str(actual).strip() else 'english-fallback' if actual==value and len(re.findall('[A-Za-z]{3,}',value))>=2 else 'translated-or-neutral'
  rows.append([lang,key,status,value,actual or ''])
with (root/'translation-coverage.csv').open('w',newline='',encoding='utf-8-sig') as f:
 w=csv.writer(f);w.writerow(['language','key','status','english_reference','current_value']);w.writerows(rows)
counts=collections.Counter((r[0],r[2]) for r in rows)
lines=['# MarkEconly translation coverage audit','', 'Source: script.js translations object; exact-string checks only.','', '| Language | Missing | Identical English strings | Other entries |','|---|---:|---:|---:|']
for lang in langs:lines.append(f'| {lang} | {counts[lang,"missing"]} | {counts[lang,"english-fallback"]} | {counts[lang,"translated-or-neutral"]} |')
html=list(root.glob('*.html'))
lines.extend(['','## Scope and limitations',f'- Scanned {len(html)} HTML files for translation coverage risks.','- Counts above cover ONLY the main homepage `script.js` dictionary. Other pages, dynamic module messages, article bodies and reports are NOT certified.','- Identical English text is a heuristic: brand names and technical terms may be legitimate.','- Missing data-i18n attributes and non-homepage translations require separate extraction and browser tests.','- Do not advertise any non-English language as fully localized until page-by-page and dynamic-output verification passes.',''])
for p in html:
 t=p.read_text(errors='replace'); hardcoded=len(re.findall(r'<(?:h[1-6]|p|button|label|li|a|option)\b(?![^>]*data-i18n)[^>]*>\s*[A-Za-z][^<]{8,}',t,re.I))
 lines.append(f'- `{p.name}`: {hardcoded} possible hard-coded English UI segments (heuristic).')
(root/'TRANSLATION_AUDIT.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print('\n'.join(lines[:17]))
