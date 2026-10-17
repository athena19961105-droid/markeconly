(function(){'use strict';
const $=id=>document.getElementById(id);if(!$('urGenerate'))return;
const modules=[
{n:'Data quality',run:'run',output:'results'},
{n:'Numerical claim',run:'checkClaim',output:'claimOutput'},
{n:'Exclusion sensitivity',run:'compareScenario',output:'sensitivityOutput'},
{n:'Unified claim-to-evidence',run:'auditRunV4',output:'auditOutputV4'},
{n:'Likert Top-2 Box',run:'likertRun',output:'likertOutput'},
{n:'Claim–Question Mapping',run:'mapRun',output:'mapResult'},
{n:'Multiple-response',run:'mrRun',output:'mrResult'},
{n:'Reverse coding',run:'rcRun',output:'rcResult'}];
// Some earlier modules have different button identifiers; only an observed, successful
// user-initiated run may be included. No previous-file results are reused.
let generation=0,ready=false,marks=new Map(),report=null,filename='';
function reset(){generation++;ready=false;marks.clear();report=null;filename='';$('urOutput').textContent='Reading new CSV. Previous report invalidated.';$('urJson').disabled=true;$('urPrint').disabled=true;}
$('file').addEventListener('change',reset,true);
document.addEventListener('markeconly:csv-ready',()=>{ready=true;const f=$('file').files?.[0];filename=f?.name||'Unnamed CSV';$('urOutput').textContent='Current CSV: '+filename+'. Run the desired audits, then generate a report.';});
for(const m of modules){const btn=$(m.run);if(btn)btn.addEventListener('click',()=>{const epoch=generation;setTimeout(()=>{if(epoch!==generation||!ready)return;const el=$(m.output);if(!el)return;const value=(el.innerText||el.textContent||'').trim();if(value&&!/^cannot\b|^error\b|^upload a csv\b|^choose the item\b/i.test(value))marks.set(m.n,{epoch,text:value});},60);});}
function add(parent,tag,content){const el=document.createElement(tag);el.textContent=content;parent.append(el);return el;}
function collect(){const f=$('file').files?.[0];if(!ready||!f||typeof data==='undefined'||!data||!Array.isArray(data.rows))throw Error('Upload a CSV and wait until it is parsed.');
const sections=modules.map(m=>{const mark=marks.get(m.n);return {module:m.n,status:mark&&mark.epoch===generation?'Captured — requires review':'Not assessed',visibleEvidence:mark&&mark.epoch===generation?mark.text:null};});
return {schema:'markeconly-unified-report-v46',generatedAt:new Date().toISOString(),source:{fileName:f.name,fileSizeBytes:f.size,lastModified:f.lastModified,rows:data.rows.length,columns:data.headers.slice(),fingerprintNote:'Metadata only; not a cryptographic file hash'},limitations:['Results copied from visible module outputs after observed actions; not independent recalculation.','Not assessed does not mean passed.','User-declared constructs and recruitment methods are not independently verified.','Data is processed in the browser; downloaded report may contain survey-related values.','Changing a CSV invalidates the prior report.'],sections};}
$('urGenerate').addEventListener('click',()=>{try{report=collect();const out=$('urOutput');out.replaceChildren();add(out,'h3','Unified evidence summary');add(out,'p',`Source: ${report.source.fileName} · ${report.source.rows} rows · ${report.source.columns.length} columns`);add(out,'p','Generated: '+report.generatedAt);for(const s of report.sections){const div=add(out,'div','');div.className='ur-section';add(div,'h3',s.module+' — '+s.status);if(s.visibleEvidence){const pre=add(div,'pre',s.visibleEvidence);pre.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;font-size:13px;max-height:380px;overflow:auto;background:#f4f7fa;padding:12px;border-radius:8px';}else add(div,'p','No current-file result captured. Run this audit if it is relevant.');}add(out,'h3','Limitations');const ul=add(out,'ul','');for(const note of report.limitations)add(ul,'li',note);$('urJson').disabled=false;$('urPrint').disabled=false;}catch(e){report=null;$('urJson').disabled=true;$('urPrint').disabled=true;$('urOutput').textContent='Cannot generate: '+e.message;}});
$('urJson').addEventListener('click',()=>{if(!report)return;const blob=new Blob([JSON.stringify(report,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='markeconly_unified_evidence_v46.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);});
$('urPrint').addEventListener('click',()=>{if(!report)return;const style=document.createElement('style');style.id='urPrintStyle';style.textContent='@media print { body > header,main > :not(#unifiedReportPanel){display:none!important}main{padding:0;max-width:none}#unifiedReportPanel{box-shadow:none;border:0}#unifiedReportPanel button{display:none!important}.ur-section{break-inside:avoid}pre{max-height:none!important;overflow:visible!important} }';document.head.append(style);window.print();setTimeout(()=>style.remove(),1500);});
})();