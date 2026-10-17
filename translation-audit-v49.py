#!/usr/bin/env python3
"""Static inventory, not a claim of complete translation quality."""
from pathlib import Path
from html.parser import HTMLParser
import csv, re, json, sys
ROOT=Path(__file__).resolve().parent
LANGS=['en','zh','zh-TW','fr','de','es','pt','ja','ko']
class Inventory(HTMLParser):
 def __init__(self): super().__init__(convert_charrefs=True);self.stack=[];self.items=[];self.skip=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);self.stack.append((tag,a));
  if tag in ('script','style','svg'):self.skip+=1
  if tag in ('input','textarea'):
   for attr in ('placeholder','aria-label','title'):
    if a.get(attr):self.items.append((f'{tag}[{attr}]',a[attr].strip(),a.get('data-i','')))
 def handle_endtag(self,tag):
  if tag in ('script','style','svg'):self.skip=max(0,self.skip-1)
  if self.stack:self.stack.pop()
 def handle_data(self,data):
  t=' '.join(data.split());
  if self.skip or not t or not re.search('[A-Za-z]',t):return
  if not self.stack:return
  tag,attrs=self.stack[-1]
  if tag in ('option','button','label','h1','h2','h3','h4','p','span','a','li','strong','small','div','summary'):
   self.items.append((tag,t,attrs.get('data-i') or attrs.get('data-i18n') or ''))
rows=[]
for path in sorted(ROOT.rglob('*.html')):
 p=Inventory()
 try:p.feed(path.read_text(encoding='utf-8'))
 except Exception as e: print('PARSE ERROR',path,e,file=sys.stderr);continue
 for tag,t,key in p.items:
  rows.append({'file':str(path.relative_to(ROOT)),'element':tag,'translation_key':key,'source_text':t[:350], 'review_status':'mapped_key' if key else 'requires_review'})
with (ROOT/'translation-static-inventory.csv').open('w',newline='',encoding='utf-8-sig') as f:
 w=csv.DictWriter(f,fieldnames=['file','element','translation_key','source_text','review_status']);w.writeheader();w.writerows(rows)
summary={'html_pages':len(list(ROOT.rglob('*.html'))),'candidate_text_nodes':len(rows),'without_explicit_translation_key':sum(not r['translation_key'] for r in rows),'by_page':{p:sum(r['file']==p for r in rows) for p in sorted(set(r['file'] for r in rows))},'note':'Heuristic inventory. It can flag text that is translated by legacy JS and can miss dynamic JS output. Not a translation completion score.'}
(ROOT/'translation-static-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
