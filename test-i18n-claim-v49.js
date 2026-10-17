const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(__dirname+'/claim-checker-pilot.js','utf8');
const html=fs.readFileSync(__dirname+'/claim-checker.html','utf8');
const languages=['en','zh','zh-TW','fr','de','es','pt','ja','ko'];
const start=source.indexOf('const T=');const end=source.indexOf(';let lang=',start);
assert(start>=0&&end>start,'Translation dictionary not found');
const dict=vm.runInNewContext(source.slice(start,end)+';T');
const baseline=Object.keys(dict.en);
for(const l of languages){
 assert(html.includes('value="'+l+'"'),'Missing option '+l);
 assert(dict[l],'Missing dictionary '+l);
 for(const key of baseline){
  assert(typeof dict[l][key]==='string'&&dict[l][key].trim(),'Missing '+l+'.'+key);
  const params=(v)=>[...v.matchAll(/\{[a-z]+\}/g)].map(x=>x[0]).sort().join(',');
  assert.equal(params(dict[l][key]),params(dict.en[key]),'Template parameters mismatch '+l+'.'+key);
 }
}
console.log('PASS claim checker: '+languages.length+' languages × '+baseline.length+' translation keys; all placeholders preserved');
