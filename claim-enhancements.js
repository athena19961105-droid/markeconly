(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.MarkEconlyClaims=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
function evaluate(data,config){
 if(!data||!Array.isArray(data.headers)||!Array.isArray(data.rows))throw Error('Upload a valid CSV first.');
 const column=config.column,option=String(config.option??'').trim(),idColumn=config.idColumn||'',ranges=config.ranges||{};
 if(!data.headers.includes(column)||!option.trim())throw Error('Choose a valid question and response option.');
 for(const [name,bounds] of Object.entries(ranges)){if(!data.headers.includes(name))throw Error('Unknown range column: '+name);if(!Array.isArray(bounds)||bounds.length!==2||!bounds.every(x=>typeof x==='number'&&Number.isFinite(x))||bounds[0]>bounds[1])throw Error('Invalid numeric range for '+name);}
 if(config.excludeIds&&!data.headers.includes(idColumn))throw Error('Choose an ID column before simulating repeated-ID exclusions.');
 const cj=data.headers.indexOf(column),ij=data.headers.indexOf(idColumn),seenRows=new Set(),seenIds=new Set(),reasons={exactDuplicate:0,duplicateId:0,invalidRange:0};
 const kept=[];let excluded=0;const excludedDetails=[];const reasonTotals={exactDuplicate:0,duplicateId:0,invalidRange:0};
 for(const [rowIndex,row] of data.rows.entries()){const key=JSON.stringify(row),dup=seenRows.has(key);seenRows.add(key);const id=ij<0?'':row[ij].trim(),dupId=!!id&&seenIds.has(id);if(id)seenIds.add(id);
 let invalid=false;for(const [name,b] of Object.entries(ranges)){const j=data.headers.indexOf(name);if(j<0)continue;const v=row[j].trim();if(v===''||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(v)||!Number.isFinite(Number(v))||Number(v)<b[0]||Number(v)>b[1]){invalid=true;break;}}
 const remove=(!!config.excludeExact&&dup)||(!!config.excludeIds&&dupId)||(!!config.excludeInvalid&&invalid);
 if(remove){excluded++;const why=[];if(config.excludeExact&&dup){reasons.exactDuplicate++;why.push('Exact duplicate row');}if(config.excludeIds&&dupId){reasons.duplicateId++;why.push('Repeated respondent ID');}if(config.excludeInvalid&&invalid){reasons.invalidRange++;why.push('Missing/invalid numeric-range value');}excludedDetails.push({csvRow:data.rowNumbers?.[rowIndex]??rowIndex+2,reasons:why});}else kept.push(row);
 }
 const valid=kept.filter(r=>r[cj].trim()!=='');const numerator=valid.filter(r=>r[cj].trim()===option).length,denominator=valid.length;
 return {totalRows:data.rows.length,retainedRows:kept.length,excludedRows:excluded,validResponses:denominator,missingResponses:kept.length-denominator,numerator,percentage:denominator?100*numerator/denominator:null,overlappingReasonCounts:reasons,excludedDetails,appliedRules:{excludeExact:!!config.excludeExact,excludeIds:!!config.excludeIds,excludeInvalid:!!config.excludeInvalid,idColumn,ranges},note:'Sensitivity scenario only. Flags are not proof of invalidity. Exclusions are not saved to the uploaded file.'};
}
function report(data,config){const baseline=ResearchCheck.checkClaim(data,config),scenarios=config.scenarios||null;return {product:'MarkEconly Research Check',reportType:'Survey claim evidence (exploratory)',createdAt:new Date().toISOString(),source:{filename:config.filename||'local CSV',rows:data.rows.length,columns:data.headers.length},question:baseline.column,selectedResponse:baseline.option,calculation:{numerator:baseline.numerator,validDenominator:baseline.denominator,missing:baseline.missing,percentage:baseline.percentage,claimedPercentage:baseline.claimedPercent,withinHalfPercentagePoint:baseline.withinHalfPercentagePoint},recruitment:baseline.recruitment,suggestedWording:baseline.wording,warnings:baseline.warnings,sensitivity:scenarios,limitations:['Exact text matching only; response coding and question wording require human review.','No proof of representativeness, construct validity, causal inference or advertising-law compliance.','Uploaded data are processed locally in the browser; exported files may contain selected question text and summary results.']};}
return {evaluate,report};
});
