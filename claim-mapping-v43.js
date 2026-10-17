(function(root){'use strict';
const names={unknown:'Unknown / not established',intention:'Purchase intention / likelihood',behavior:'Actual past purchasing behavior',attitude:'Attitude / agreement',satisfaction:'Satisfaction',other:'Other (manual review)'};
function audit(input){
 const q=String(input.question||'').trim(),s=String(input.statement||'').trim();
 const measured=String(input.measured||'unknown'),asserted=String(input.asserted||'unknown');
 const scope=String(input.scope||'respondents'),sampling=String(input.sampling||'unknown');
 const column=String(input.column||'').trim(), source=String(input.source||'').trim();
 const findings=[];
 function push(code,status,detail){findings.push({code,status,detail});}
 if(!q)push('question_text','needs_input','Provide the exact survey question wording.');else push('question_text','documented','Survey question wording supplied by user; not independently verified.');
 if(!s)push('claim_text','needs_input','Provide the exact proposed public statement.');
 if(!column)push('data_column','needs_input','Select the CSV column associated with this question.');
 if(measured==='unknown'||asserted==='unknown')push('construct','needs_review','One or both constructs are unknown; semantic equivalence cannot be established.');
 else if(measured==='other'||asserted==='other')push('construct','needs_review','Other construct requires manual review.');
 else if(measured!==asserted)push('construct','mismatch',`Declared survey measure (${names[measured]||measured}) differs from claim (${names[asserted]||asserted}).`);
 else push('construct','declared_match','User-declared constructs agree; question wording has NOT been independently checked.');
 if(scope==='population')push('population','unsupported','Do not generalize this sample to all consumers without defensible sampling and inference evidence'+(sampling==='probability'?'; probability sampling was user-declared, not verified.':'.'));
 else if(scope==='unknown')push('population','needs_review','Claim population is unclear.');
 else push('population','limited','Claim limited to survey respondents; still check nonresponse and data quality.');
 if(!source)push('source','needs_review','No questionnaire/source identifier provided.');
 const blocking=findings.some(f=>f.status==='mismatch'||f.status==='unsupported'||f.status==='needs_input');
 return {schema:'markeconly.claim-question-mapping.v4.3',generatedAt:new Date().toISOString(),input:{question:q,statement:s,measured,asserted,scope,sampling,column,source},findings,decision:blocking?'review_required':'manual_verification_required',limitations:['Inputs and construct classifications are user-declared.','No NLP, causal inference, representativeness verification, or independent questionnaire authentication is performed.','This module does not automatically recompute a numerical percentage; use Sections 4 or 7 for numerical evidence.']};
}
root.MarkEconlyClaimMapping={audit,names};
})(typeof module!=='undefined'&&module.exports?module.exports:window);
