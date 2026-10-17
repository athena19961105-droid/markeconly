/* Shared language selection. Does not claim untranslated article bodies are localized. */
(function(){'use strict';
const languages={en:'English',zh:'简体中文', 'zh-TW':'繁體中文',fr:'Français',de:'Deutsch',es:'Español',pt:'Português',ja:'日本語',ko:'한국어'};
const words={
en:['Home','Services','Portfolio','Sample Report','Insights','Tools','Contact','About','← Back to Insights'],
zh:['首页','服务','研究作品','示例报告','洞察文章','工具','联系','关于','← 返回文章'],
'zh-TW':['首頁','服務','研究作品','範例報告','洞察文章','工具','聯絡','關於','← 返回文章'],
fr:['Accueil','Services','Portfolio','Exemple de rapport','Articles','Outils','Contact','À propos','← Retour aux articles'],
de:['Startseite','Leistungen','Portfolio','Beispielbericht','Artikel','Werkzeuge','Kontakt','Über uns','← Zurück zu Artikeln'],
es:['Inicio','Servicios','Portafolio','Informe de muestra','Artículos','Herramientas','Contacto','Acerca de','← Volver a artículos'],
pt:['Início','Serviços','Portfólio','Relatório de exemplo','Artigos','Ferramentas','Contato','Sobre','← Voltar aos artigos'],
ja:['ホーム','サービス','研究実績','レポート例','記事','ツール','お問い合わせ','概要','← 記事一覧に戻る'],
ko:['홈','서비스','연구 실적','보고서 예시','인사이트','도구','문의','소개','← 글 목록으로']};
const paths=['index.html','services.html','portfolio.html','sample-report.html','articles.html','#tools','contact.html','#about'];
const root=document.currentScript&&document.currentScript.getAttribute('data-root')||'';
const norm=(v)=>languages[v]?v:(v==='zh-CN'?'zh':'en');
let lang=norm(localStorage.getItem('markeconly-language')||localStorage.getItem('markeconly-lang')||'en');
const select=document.createElement('select');select.id='site-language-select';select.setAttribute('aria-label','Select website language');select.style.cssText='padding:7px;border:1px solid #b6c4d0;border-radius:7px;background:white;color:#183047;max-width:140px';
Object.entries(languages).forEach(([k,v])=>{const opt=document.createElement('option');opt.value=k;opt.textContent=v;select.appendChild(opt)});
function update(){document.documentElement.lang=lang;select.value=lang;
 document.querySelectorAll('nav a').forEach(a=>{let href=a.getAttribute('href')||'';let normalized=href.replace(/^\.\.\//,'');let idx=paths.findIndex(p=>normalized===p || normalized.endsWith('/'+p));if(idx>=0)a.textContent=words[lang][idx];});
 document.querySelectorAll('[data-i18n="article.back"]').forEach(e=>e.textContent=words[lang][8]);
 document.querySelectorAll('[data-lang]').forEach(e=>{const l=e.getAttribute('data-lang');e.hidden=(l!==lang);});
 // Legacy bilingual article bodies: retain Chinese when selected; otherwise show original English
 if(document.querySelector('article [data-lang="en"]')){document.querySelectorAll('article [data-lang]').forEach(e=>{let l=e.getAttribute('data-lang');e.hidden=!(l===lang || (lang!=='zh' && lang!=='en' && l==='en'));});}
 let notice=document.getElementById('translation-coverage-notice');if(!notice){notice=document.createElement('p');notice.id='translation-coverage-notice';notice.style.cssText='background:#fff4d7;color:#553b00;padding:10px 18px;font-size:14px;margin:0;text-align:center';document.body.insertBefore(notice,document.body.firstChild.nextSibling)}
 const full=lang==='en';notice.hidden=full;notice.textContent=lang==='zh'?'提示：本页面部分正文尚未完成翻译；显示的英文为原始内容。':'Translation of this page is incomplete. Some original English content is shown.';
}
select.addEventListener('change',()=>{lang=norm(select.value);localStorage.setItem('markeconly-lang',lang);localStorage.setItem('markeconly-language',lang==='zh'?'zh-CN':lang);update();});
function init(){const host=document.querySelector('.nav-right')||document.querySelector('header nav')||document.querySelector('header');if(host){host.appendChild(select);}const legacy=document.getElementById('lang-toggle');if(legacy)legacy.hidden=true;update();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
