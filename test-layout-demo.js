'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const {harness,Evt}=require('./test-ui-lifecycle.js');
const csv=fs.readFileSync(__dirname+'/claim_pilot_demo.csv','utf8');
async function main(){
 const h=harness(fs.readFileSync(__dirname+'/claim-checker.html','utf8'));
 Object.assign(h.c,{location:{search:'',hash:''},URLSearchParams,File:class{constructor(parts,name){this.name=name;this.source=parts.join('');this.size=this.source.length;}async text(){return this.source;}},DataTransfer:class{constructor(){this.files=[];this.items={add:f=>this.files.push(f)};}},fetch:async()=>({ok:true,text:async()=>csv})});
 for(const [id,val] of Object.entries({pct:'',scope:'respondents',recruitment:'unknown',measure:'unknown',assert:'unknown'}))h.ids[id].value=val;
 h.load('checker.js');h.load('claim-checker-pilot.js');h.load('demo-loader.js');
 await h.fire('loadDemo','click');await new Promise(r=>setImmediate(r));
 assert.equal(h.ids.column.value,'recommendation');assert.equal(h.ids.option.value,'Yes');assert.equal(h.ids.pct.value,'85');
 await h.fire('run','click');assert.match(h.ids.metrics.textContent,/66.67%/);assert.match(h.ids.metrics.textContent,/9/);assert.equal(h.ids.report.hidden,false);
 // Demo loading must never overwrite a real file selected while a demo fetch is pending.
 let fetchDone;h.c.fetch=()=>new Promise(r=>fetchDone=r);const loading=h.fire('loadDemo','click');
 h.ids.file.files=[{name:'real.csv',size:10,text:async()=> 'answer\nReal\n'}];await h.fire('file','change');
 fetchDone({ok:true,text:async()=>csv});await loading;
 assert.equal(h.ids.file.files[0].name,'real.csv');assert.equal(h.ids.column.value,'answer');
 const home=fs.readFileSync(__dirname+'/index.html','utf8');
 assert(home.includes('6 ÷ 9')&&home.includes('6 ÷ 10'));
 assert(!home.includes('$49–99'),'Pilot pricing should not compete with the core tool entry');
 for(const href of ['claim-checker.html','research-check.html','claim-checker.html?demo=1'])assert(home.includes(href));
 const research=fs.readFileSync(__dirname+'/research-check.html','utf8');
 assert.equal((research.match(/class="workflow-group"/g)||[]).length,3);
 for(const id of ['file','settings','results','claimPanel','evidencePanel','claimAuditV3','likertPanel','claimQuestionMapping','multipleResponsePanel','reverseCodingPanel','unifiedReportPanel'])assert(research.includes(`id="${id}"`),`Original section missing: ${id}`);
 console.log('PASS layout/demo: 6/9 result, upload race protection, focused homepage and all eleven advanced sections retained');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
