/* MarkEconly Chinese-first localization, preserves original English as the source. */
(function(){'use strict';
const dictionary=window.MARKECONLY_ZH||{};
const dictionaryTW=window.MARKECONLY_ZH_TW||{};
const source=new WeakMap();
const NAV={'Home':'首页','Services':'服务','Portfolio':'研究作品','Sample Report':'示例报告','Insights':'洞察文章','Tools':'工具','Contact':'联系','About':'关于'};
const langKey='markeconly-language';
function getLang(){try{const v=localStorage.getItem(langKey)||localStorage.getItem('markeconly-lang')||'en';return v==='zh'?'zh-CN':v}catch(e){return 'en'}}
function saveLang(v){try{localStorage.setItem(langKey,v);localStorage.setItem('markeconly-lang',v==='zh-CN'?'zh':v)}catch(e){}}
function translate(raw){const v=raw.trim();if(!v)return raw;let result=dictionary[v];
 if(!result){let m=v.match(/^Among (\d+) respondents who answered "(.*?)", (\d+) \(([\d.]+)%\) selected "(.*?)"\.$/);if(m)result=`在回答“${m[2]}”的 ${m[1]} 位受访者中，有 ${m[3]} 位（${m[4]}%）选择了“${m[5]}”。`;}
 if(!result){let m=v.match(/^(\d+) blank responses were excluded from this question denominator\.$/);if(m)result=`该题有 ${m[1]} 个空白回答未计入分母。`;}
 if(!result){let m=v.match(/^Enter both range bounds for (.*)$/);if(m)result=`请填写“${m[1]}”的最小值和最大值`;}
 if(!result){let m=v.match(/^Invalid range for (.*)$/);if(m)result=`“${m[1]}”的范围设置无效`;}
 if(!result){let m=v.match(/^(.+) minimum$/);if(m)result=`${m[1]} 最小值`;}
 if(!result){let m=v.match(/^(.+) maximum$/);if(m)result=`${m[1]} 最大值`;}
 if(!result){let m=v.match(/^Revenue-based return: ([\d.]+)%\. Excludes product and operating costs\.$/);if(m)result=`基于收入的回报率：${m[1]}%。不包括产品成本和运营成本。`;}
 if(!result){let m=v.match(/^Estimated break-even: ([\d,]+) units\.$/);if(m)result=`预计盈亏平衡销量：${m[1]} 件。`;}
 if(!result){const patterns=[
 [/^Uploaded: (\d+); valid: (\d+); missing: (\d+); invalid: (\d+)$/,m=>`已上传：${m[1]}；有效：${m[2]}；缺失：${m[3]}；无效：${m[4]}`],
 [/^Original mean: ([\d.]+); preview mean: ([\d.]+)$/,m=>`原始均值：${m[1]}；预览均值：${m[2]}`],
 [/^Transformation: (.*)$/,m=>`转换方式：${m[1]==='no transformation'?'不进行转换':m[1]==='min + max − original'?'最小值 + 最大值 − 原值':m[1]}`],
 [/^Invalid CSV rows: (.*)$/,m=>`无效 CSV 行号：${m[1]}`],
 [/^Partially missing CSV rows: (.*)$/,m=>`部分缺失的 CSV 行号：${m[1]}`],
 [/^Uploaded rows: (\d+); complete valid respondents: (\d+); total selections: (\d+); denominator: (\d+) \((.*?)\)\.$/,m=>`上传记录：${m[1]}；完整有效受访者：${m[2]}；总选择次数：${m[3]}；分母：${m[4]}（${m[5]==='complete'?'完整记录':m[5]==='all'?'全部记录':m[5]}）。`],
 [/^Fully blank sets: (\d+); partially missing sets: (\d+); invalid rows: (\d+)\. CSV row numbers start at 2\.$/,m=>`完全空白：${m[1]}；部分缺失：${m[2]}；无效记录：${m[3]}。CSV 数据从第 2 行开始。`],
 [/^Source: (.*) · (\d+) rows · (\d+) columns$/,m=>`来源：${m[1]} · ${m[2]} 行 · ${m[3]} 列`],
 [/^Generated: (.*)$/,m=>`生成时间：${m[1]}`],
 [/^(.+?) — Not assessed$/,m=>`${dictionary[m[1]]||m[1]} — 尚未评估`],
 [/^(.+?) — Captured — requires review$/,m=>`${dictionary[m[1]]||m[1]} — 已收集 · 需要复核`],
 [/^Positive responses \(score ≥ (\d+)\): (\d+)$/,m=>`正向回答（评分 ≥ ${m[1]}）：${m[2]}`],
 [/^Calculated proportion: (.*)$/,m=>`计算比例：${m[1]}`],
 ];for(const [re,fn] of patterns){const m=v.match(re);if(m){result=fn(m);break;}}}
 return result===undefined?raw:raw.replace(v,result);
}
function convertFallback(s){const article=window.MARKECONLY_ARTICLE_TW||{};const v=s.trim();return article[v]===undefined?s:s.replace(v,article[v]);}
function textNodes(root){const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const list=[];while(walk.nextNode())list.push(walk.currentNode);return list;}
function render(){const lang=getLang();const tw=lang==='zh-TW';const zh=lang==='zh-CN'||lang==='zh'||tw;document.documentElement.lang=lang;
 const dict=tw?dictionaryTW:dictionary;
 document.querySelectorAll('article [data-lang]').forEach(el=>{el.hidden=el.getAttribute('data-lang')!==(zh?'zh':'en');el.style.display=el.hidden?'none':'block';});
 for(const node of textNodes(document.body)){
  const el=node.parentElement;if(!el||el.closest('script,style,select#language-select,select#site-language-select,[data-claim-i18n]'))continue;
  const articleZh=el.closest('[data-lang="zh"]');if(articleZh){if(!source.has(node))source.set(node,node.nodeValue);const original=source.get(node);const next=tw?convertFallback(original):original;if(node.nodeValue!==next)node.nodeValue=next;continue;}
  if(el.closest('[data-i18n]') && document.getElementById('language-select'))continue;
  if(!source.has(node)){const key=el.dataset&&el.dataset.i18n;const base=key&&window.translations&&window.translations.en&&window.translations.en[key];source.set(node,base||node.nodeValue);}
  const en=source.get(node);const val=tw?(dict[en.trim()]!==undefined?en.replace(en.trim(),dict[en.trim()]):convertFallback(translate(en))):(zh?translate(en):en);
  if(node.nodeValue!==val)node.nodeValue=val;
 }
 document.querySelectorAll('input[aria-label]').forEach(el=>{if(!el.dataset.enAria)el.dataset.enAria=el.getAttribute('aria-label');el.setAttribute('aria-label',tw?convertFallback(translate(el.dataset.enAria)):(zh?translate(el.dataset.enAria):el.dataset.enAria))});
 if(!document.documentElement.dataset.originalTitle)document.documentElement.dataset.originalTitle=document.title;
 document.title=zh?(dict[document.documentElement.dataset.originalTitle]||document.documentElement.dataset.originalTitle):document.documentElement.dataset.originalTitle;
 const notice=document.getElementById('translation-coverage-notice');if(notice)notice.hidden=true;
}
function setup(){
 // Preserve the homepage's original selector; create one on other pages.
 let select=document.getElementById('language-select')||document.getElementById('site-language-select');
 if(!select){select=document.createElement('select');select.id='site-language-select';select.setAttribute('aria-label','选择网站语言');select.style.cssText='padding:7px;border:1px solid #b6c4d0;border-radius:7px;background:white;color:#183047;max-width:140px';for(const [v,label] of [['en','English'],['zh-CN','简体中文'],['zh-TW','繁體中文'],['fr','Français'],['de','Deutsch'],['es','Español'],['pt','Português'],['ja','日本語'],['ko','한국어']]){const option=document.createElement('option');option.value=v;option.textContent=label;select.appendChild(option)};(document.querySelector('.nav-right')||document.querySelector('header nav')||document.querySelector('header')||document.body).appendChild(select)}
 const old=document.getElementById('lang-toggle');if(old)old.hidden=true;
 select.value=getLang();select.addEventListener('change',()=>{saveLang(select.value);render()});
 render();
 // Dynamic results: capture original English before localizing; avoid recursive observer calls.
 let busy=false;const observer=new MutationObserver(()=>{if(busy)return;busy=true;observer.disconnect();try{render()}finally{observer.observe(document.body,{childList:true,subtree:true,characterData:true});busy=false}});
 observer.observe(document.body,{childList:true,subtree:true,characterData:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
