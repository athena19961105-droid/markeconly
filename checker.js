(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.ResearchCheck=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
function parseCSV(input){
 const s=String(input).replace(/^\uFEFF/,'');const rows=[];let row=[],field='',state='start';
 function pushRow(){row.push(field);if(row.some(x=>x!==''))rows.push(row);row=[];field='';state='start';}
 for(let i=0;i<s.length;i++){
  const c=s[i];
  if(state==='quoted'){if(c==='"'&&s[i+1]==='"'){field+='"';i++;}else if(c==='"')state='afterQuote';else field+=c;continue;}
  if(c===','||c==='\n'||c==='\r'){
   if(c===','){row.push(field);field='';state='start';}
   else{if(c==='\r'&&s[i+1]==='\n')i++;pushRow();}continue;
  }
  if(state==='afterQuote')throw Error('Unexpected character after closing quote at character '+i);
  if(c==='"'){if(state!=='start')throw Error('Unexpected quote at character '+i);state='quoted';continue;}
  field+=c;state='plain';
 }
 if(state==='quoted')throw Error('Unclosed quoted CSV field');
 if(field!==''||row.length)pushRow();
 if(rows.length<2)throw Error('CSV needs a header and at least one data row');
 const headers=rows.shift().map(x=>x.trim());
 if(headers.some(x=>!x)||new Set(headers).size!==headers.length)throw Error('Headers must be nonempty and unique');
 for(let i=0;i<rows.length;i++)if(rows[i].length!==headers.length)throw Error('Row '+(i+2)+' has '+rows[i].length+' fields; expected '+headers.length);
 return {headers,rows};
}
function check(data,config={}){
 const {headers,rows}=data,ranges=config.ranges||{},idColumn=config.idColumn||'';
 const missing=Object.fromEntries(headers.map((h,j)=>[h,rows.reduce((n,r)=>n+(r[j].trim()===''?1:0),0)]));
 const invalidRanges={},flagged=[];
 for(const [h,b] of Object.entries(ranges)){
  const j=headers.indexOf(h);if(j<0)continue;
  if(!Array.isArray(b)||b.length!==2||!b.every(x=>typeof x==='number'&&Number.isFinite(x))||b[0]>b[1])throw Error('Invalid numeric range for '+h);
  let n=0;rows.forEach((r,i)=>{const v=r[j].trim();if(v==='')return;const x=Number(v);if(!Number.isFinite(x)||x<b[0]||x>b[1]||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(v)){n++;flagged.push({csv_row:i+2,column:h,value:v,issue:'out_of_range_or_non_numeric'});}});invalidRanges[h]=n;
 }
 const seen=new Set();let duplicateRows=0;rows.forEach((r,i)=>{const key=JSON.stringify(r);if(seen.has(key)){duplicateRows++;flagged.push({csv_row:i+2,column:'(all)',value:'',issue:'exact_duplicate_row'});}else seen.add(key);});
 let duplicateIds=null;if(idColumn&&headers.includes(idColumn)){const seenIds=new Set();duplicateIds=0;const j=headers.indexOf(idColumn);rows.forEach((r,i)=>{const id=r[j].trim();if(!id)return;if(seenIds.has(id)){duplicateIds++;flagged.push({csv_row:i+2,column:idColumn,value:id,issue:'duplicate_id'});}else seenIds.add(id);});}
 return {rows:rows.length,columns:headers.length,missing,invalidRanges,exactDuplicateRows:duplicateRows,duplicateIds,flagged,disclaimer:'Flags require human review; no records were deleted. A passing check does not establish validity or representativeness.'};
}
function checkClaim(data,config={}){
 const {headers,rows}=data;const column=config.column,option=String(config.option??'');
 if(!headers.includes(column))throw Error('Choose an existing question column');
 if(!option.trim())throw Error('Choose a response option');
 const j=headers.indexOf(column),valid=rows.map(r=>r[j].trim()).filter(v=>v!=='');
 const numerator=valid.filter(v=>v===option).length,denominator=valid.length,missing=rows.length-denominator;
 if(!denominator)throw Error('No nonblank responses in this question');
 const percentage=100*numerator/denominator;
 const claimed=config.claimedPercent;
 if(claimed!==undefined&&claimed!==null&&(!Number.isFinite(claimed)||claimed<0||claimed>100))throw Error('Claimed percentage must be between 0 and 100');
 const tolerance=0.5;const matches=claimed===undefined||claimed===null?null:Math.abs(percentage-claimed)<=tolerance;
 const recruitment=config.recruitment||'unknown';
 if(!['unknown','voluntary','probability','other'].includes(recruitment))throw Error('Invalid recruitment method');
 return {column,option,numerator,denominator,missing,allRows:rows.length,percentage,claimedPercent:claimed??null,withinHalfPercentagePoint:matches,recruitment,wording:`Among ${denominator} respondents who answered "${column}", ${numerator} (${percentage.toFixed(1)}%) selected "${option}".`,warnings:[...(missing?[`${missing} blank responses were excluded from this question denominator.`]:[]),recruitment==='voluntary'?'Voluntary participation does not establish representativeness.':recruitment==='unknown'?'Recruitment method is unknown; do not generalize to all customers.':recruitment==='probability'?'Sampling frame, nonresponse and weighting still require review.':'Sampling limitations require review.','This check verifies an exact response-option count, not the meaning or truth of a broader marketing claim.','No automatic exclusions or causal conclusions were made.']};
}
return {parseCSV,check,checkClaim};
});
