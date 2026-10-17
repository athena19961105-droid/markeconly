const assert=require('node:assert/strict');const {calculate}=require('./likert-v42');const data={headers:['id','score'],rows:[['a','5'],['b','4'],['c','3'],['d',''],['e','7'],['f','text'],['g','1']]};
let x=calculate(data,{column:'score',min:1,max:5,threshold:4,denominator:'valid'});assert.equal(x.total,7);assert.equal(x.valid,4);assert.equal(x.missing,1);assert.equal(x.invalid,2);assert.equal(x.positive,2);assert.equal(x.percent,50);assert.deepEqual(x.invalidRows,[6,7]);
x=calculate(data,{column:'score',min:1,max:5,threshold:4,denominator:'all'});assert.equal(x.denominatorCount,7);assert.ok(Math.abs(x.percent-200/7)<1e-9);
const zero=calculate({headers:['score'],rows:[[''],['oops']]},{column:'score',min:1,max:7,threshold:6});assert.equal(zero.percent,null);
assert.throws(()=>calculate(data,{column:'score',min:1,max:5,threshold:6}),/threshold/);
console.log('Likert v4.2 tests passed');
