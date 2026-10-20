'use strict';
// Execute actual UI scripts against a small DOM/event harness. This is not a visual browser test.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class Evt{constructor(type,opts={}){this.type=type;Object.assign(this,opts);}}
function harness(html){
 class El{
  constructor(tag='div',id=''){this.tagName=tag.toUpperCase();this.id=id;this.listeners={};this.children=[];this.dataset={};this.style={};this.hidden=false;this.disabled=false;this._value='';this._text='';this.files=[];this.className='';}
  addEventListener(type,fn,capture=false){(this.listeners[type]??=[]).push({fn,capture});}
  dispatchEvent(e){e.target??=this;const a=this.listeners[e.type]||[];e.pending=[...a.filter(x=>x.capture),...a.filter(x=>!x.capture)].map(x=>x.fn(e));return true;}
  append(...xs){for(const x of xs){this.children.push(x);x.parent=this;}}appendChild(x){this.append(x);return x;}
  replaceChildren(...xs){const hadOptions=this.options.length>0;this.children=[];this._text='';if(hadOptions)this._value='';this.append(...xs);}add(x){this.append(x);}setAttribute(k,v){this[k]=v;}
  get options(){return this.children.filter(x=>x.tagName==='OPTION');}
  get value(){return this._value||this.options[0]?.value||'';}set value(x){this._value=String(x);}
  get textContent(){return this._text+this.children.map(x=>x.textContent||'').join('');}set textContent(x){this._text=String(x);this.children=[];}
  get innerText(){return this.textContent;}set innerText(x){this.textContent=x;}
  querySelectorAll(sel){const all=[];for(const x of this.children){if(sel==='input:checked'&&x.tagName==='INPUT'&&x.checked)all.push(x);if(sel.startsWith('.')&&x.className?.split(' ').includes(sel.slice(1)))all.push(x);all.push(...(x.querySelectorAll?.(sel)||[]));}return all;}
  querySelector(sel){if(sel==='h3')return this.children.find(x=>x.tagName==='H3')||new El('h3');return this.querySelectorAll(sel)[0]||null;}
  closest(sel){let x=this;while(x){if(sel==='#'+x.id)return x;x=x.parent;}return null;}
  focus(){}scrollIntoView(){}click(){this.dispatchEvent(new Evt('click'));}
 }
 const ids={};for(const m of html.matchAll(/\bid="([^"]+)"/g))ids[m[1]]=new El('div',m[1]);
 const document=new El('document');document.documentElement=new El('html');document.documentElement.lang='en';document.getElementById=id=>ids[id]||null;document.createElement=tag=>new El(tag);document.createTextNode=text=>{const e=new El();e.textContent=text;return e;};
 document.querySelectorAll=sel=>sel==='.rule'?ids.rules?.querySelectorAll('.rule')||[]:[];
 const storage=new Map();const c={document,Event:Evt,CustomEvent:Evt,console,setTimeout,clearTimeout,Blob,URL,TextEncoder,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},Option:function(t,v){const e=new El('option');e.textContent=t;e.value=v;return e;}};c.window=c;c.globalThis=c;c.print=()=>{};vm.createContext(c);
 const load=f=>vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8'),c,{filename:f});
 const exec=s=>vm.runInContext(s,c);
 const fire=async(id,type)=>{const e=new Evt(type,{target:ids[id]});ids[id].dispatchEvent(e);await Promise.all(e.pending||[]);};
 return {c,ids,document,load,exec,fire,El};
}
async function research(){
 const html=fs.readFileSync(__dirname+'/research-check.html','utf8'),h=harness(html);
 for(const [id,val] of Object.entries({claimed:'',recruitment:'unknown'}))h.ids[id].value=val;
 h.load('checker.js');h.load('audit-state.js');
 const inline=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];h.exec(inline);
 h.load('unified-report-v47.js');
 let resolveOld;const old={name:'old.csv',size:20,text:()=>new Promise(r=>resolveOld=r)};const fresh={name:'fresh.csv',size:25,text:async()=> 'id,answer\n2,Yes\n3,No\n'};
 h.ids.file.files=[old];const p=h.fire('file','change');h.ids.file.files=[fresh];await h.fire('file','change');resolveOld('id,answer\n1,Old\n');await p;
 assert.equal(h.exec('data.rows[0][0]'),'2','Late old read overwrote current data');
 await h.fire('run','click');await h.fire('urGenerate','click');
 assert.equal(h.ids.urJson.disabled,false);assert.match(h.ids.urOutput.textContent,/Data quality — Captured/);
 assert.match(h.ids.urOutput.textContent,/Unified claim-to-evidence — Not assessed/);
 // An unsuccessful rerun must remove previous captured evidence, not pass by error-text heuristics.
 h.exec('data=null');await h.fire('run','click');await h.fire('urGenerate','click');
 assert.equal(h.ids.urJson.disabled,true);
 h.ids.file.files=[fresh];await h.fire('file','change');
 h.exec("MarkEconlyEvidence.complete('Unified claim-to-evidence',{selected:{percentage:50}})");await h.fire('urGenerate','click');
 assert.match(h.ids.urOutput.textContent,/Unified claim-to-evidence — Captured/);
 h.document.dispatchEvent(new Evt('markeconly:audit-invalidated',{detail:{module:'Unified claim-to-evidence'}}));assert.equal(h.ids.urJson.disabled,true);
 await h.fire('urGenerate','click');assert.match(h.ids.urOutput.textContent,/Unified claim-to-evidence — Not assessed/);
 h.ids.file.files=[{name:'bad.csv',size:10,text:async()=> 'a,b\n1\n'}];await h.fire('file','change');assert.equal(h.exec('data'),null);assert.equal(h.ids.urJson.disabled,true);
}
async function claim(){
 const h=harness(fs.readFileSync(__dirname+'/claim-checker.html','utf8'));
 for(const [id,val] of Object.entries({pct:'',scope:'respondents',recruitment:'unknown',measure:'unknown',assert:'unknown'}))h.ids[id].value=val;
 h.load('checker.js');h.load('claim-checker-pilot.js');
 let oldResolve;h.ids.file.files=[{name:'old.csv',size:10,text:()=>new Promise(r=>oldResolve=r)}];const first=h.fire('file','change');
 h.ids.file.files=[{name:'new.csv',size:10,text:async()=> 'a\nYes\nNo\n'}];await h.fire('file','change');oldResolve('a\nOld\n');await first;
 assert.equal(h.ids.option.options[0].value,'No');assert.match(h.ids.source.textContent,/new.csv/);
 await h.fire('run','click');assert.equal(h.ids.report.hidden,false);assert.match(h.ids.metrics.textContent,/50.00%/);
 h.document.dispatchEvent(new Evt('input',{target:h.ids.claim}));assert.equal(h.ids.report.hidden,true);
 // Slow hashing must not publish a report after the user changes its inputs.
 let finishHash;h.c.crypto={subtle:{digest:()=>new Promise(r=>finishHash=r)}};
 h.ids.file.files=[{name:'hash.csv',size:10,text:async()=> 'a\nYes\n',arrayBuffer:async()=>new ArrayBuffer(1)}];await h.fire('file','change');
 const pending=h.fire('run','click');await new Promise(r=>setImmediate(r));
 h.document.dispatchEvent(new Evt('input',{target:h.ids.question}));finishHash(new ArrayBuffer(32));await pending;assert.equal(h.ids.report.hidden,true);
}
if(require.main===module)(async()=>{await research();await claim();console.log('PASS UI lifecycle harness: late file reads, failed uploads, structured report capture, failed reruns, changed inputs and slow report hashing');})().catch(e=>{console.error(e);process.exitCode=1;});

module.exports={harness,Evt};
