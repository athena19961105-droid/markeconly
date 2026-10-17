(function(root){'use strict';
function audit(parsed,config){
 if(!parsed||!Array.isArray(parsed.headers)||!Array.isArray(parsed.rows))throw Error('Upload a valid CSV first.');
 const columns=config.columns||[];
 if(columns.length<2||new Set(columns).size!==columns.length)throw Error('Select at least two distinct response columns.');
 const indexes=columns.map(c=>parsed.headers.indexOf(c));if(indexes.some(i=>i<0))throw Error('Selected column is missing from CSV.');
 const n=parsed.rows.length;let respondentsWithSelection=0,respondentsWithValidAnswers=0,selectionCount=0;const counts=columns.map(()=>0),invalidRows=[],partialRows=[];let allMissing=0;
 parsed.rows.forEach((row,ri)=>{
  const values=indexes.map(i=>String(row[i]??'').trim());
  const invalid=values.some(v=>v!==''&&v!=='0'&&v!=='1');
  if(invalid){invalidRows.push(ri+2);return;}
  if(values.every(v=>v==='')){allMissing++;return;}
  if(values.some(v=>v==='')){partialRows.push(ri+2);return;}
  respondentsWithValidAnswers++;
  let selected=0;values.forEach((v,i)=>{if(v==='1'){counts[i]++;selected++;selectionCount++;}});
  if(selected)respondentsWithSelection++;
 });
 const denominator=config.denominator==='all'?'all':'complete';
 const respondentDenominator=denominator==='all'?n:respondentsWithValidAnswers;
 const options=columns.map((column,i)=>({column,count:counts[i],percentOfRespondents:respondentDenominator?counts[i]/respondentDenominator*100:null,percentOfSelections:selectionCount?counts[i]/selectionCount*100:null}));
 const warnings=[];
 if(invalidRows.length)warnings.push('Rows with non-binary values were excluded from numerators and complete-case denominator.');
 if(partialRows.length)warnings.push('Partially missing rows were excluded from numerators and complete-case denominator; inspect whether blanks mean no selection.');
 if(allMissing)warnings.push('Fully blank response sets were excluded from complete-case denominator.');
 if(denominator==='all')warnings.push('All uploaded rows denominator includes missing and invalid rows; percentages may be lower.');
 warnings.push('Percent of respondents may sum above 100% for multiple-response questions. Percent of selections sums to 100% when selections exist.');
 warnings.push('Binary columns must use 1=selected and 0=not selected; no automatic recoding, weighting, or row exclusions from Section 5.');
 return {version:'4.4',format:'one binary 0/1 column per option',denominatorMode:denominator,uploadedRows:n,completeValidRespondents:respondentsWithValidAnswers,respondentsWithSelection,selectionCount,fullyMissingRows:allMissing,partialMissingRows:partialRows,invalidRows,respondentDenominator,options,warnings,scope:'Descriptive sample statistics only; not proof of population representativeness.'};
}
root.MarkEconlyMultipleResponse={audit};
})(typeof window!=='undefined'?window:globalThis);
