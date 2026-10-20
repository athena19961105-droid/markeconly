/* Current-file and configuration provenance for Research Check. */
(function(){'use strict';
const $=id=>document.getElementById(id);
const modules=[
 {name:'Data quality',run:'run',output:'results',downloads:['json','csv'],inputs:['#settings']},
 {name:'Numerical claim',run:'checkClaim',output:'claimOutput',downloads:['claimJson'],inputs:['#claimPanel']},
 {name:'Exclusion sensitivity',run:'compareScenario',output:'sensitivityOutput',downloads:['evidenceDownload','evidencePrint','auditCsv'],inputs:['#claimPanel','#settings','#excludeExact','#excludeIds','#excludeInvalid']},
 {name:'Unified claim-to-evidence',run:'runClaimAudit',output:'claimAuditOutput',downloads:['downloadClaimAudit'],inputs:['#claimPanel','#settings','#claimAuditV3','#excludeExact','#excludeIds','#excludeInvalid']},
 {name:'Likert Top-2 Box',run:'likertRun',output:'likertOutput',downloads:['likertDownload'],inputs:['#likertPanel']},
 {name:'Claim–Question Mapping',run:'mapRun',output:'mapResult',downloads:['mapDownload'],inputs:['#claimQuestionMapping']},
 {name:'Multiple-response',run:'mrRun',output:'mrResult',downloads:['mrDownload'],inputs:['#multipleResponsePanel']},
 {name:'Reverse coding',run:'rcRun',output:'rcResult',downloads:['rcDownload'],inputs:['#reverseCodingPanel']}
];
let epoch=0,ready=false;
function invalidate(m){m.downloads.forEach(id=>{if($(id))$(id).disabled=true;});const out=$(m.output);if(out){if(m.output==='results')out.style.display='none';else out.textContent='Not assessed for the current file and settings. Run this audit to update.';}if(m.name==='Exclusion sensitivity'&&$('auditDetail'))$('auditDetail').hidden=true;document.dispatchEvent(new CustomEvent('markeconly:audit-invalidated',{detail:{module:m.name,epoch}}));}
$('file').addEventListener('change',()=>{epoch++;ready=false;modules.forEach(invalidate);},true);
document.addEventListener('markeconly:csv-ready',()=>{ready=true;});
for(const m of modules){$(m.run)?.addEventListener('click',()=>invalidate(m),true);}for(const [id,name] of [['mapRefresh','Claim–Question Mapping'],['mrRefresh','Multiple-response'],['rcRefresh','Reverse coding']])$(id)?.addEventListener('click',()=>invalidate(modules.find(m=>m.name===name)),true);
function changed(e){for(const m of modules){if(m.inputs.some(sel=>e.target.closest(sel)))invalidate(m);}}
document.addEventListener('input',changed);document.addEventListener('change',e=>{if(e.target.id!=='file')changed(e);});
window.MarkEconlyEvidence={get epoch(){return epoch;},get ready(){return ready;},complete(module,result){if(!ready)return;document.dispatchEvent(new CustomEvent('markeconly:audit-completed',{detail:{module,result,epoch}}));}};
})();
