'use strict';
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const tests=fs.readdirSync(__dirname).filter(n=>/^test(?:-|\.)/.test(n)&&n.endsWith('.js')).sort();
for(const f of tests){const r=spawnSync(process.execPath,[path.join(__dirname,f)],{stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);}
console.log(`All ${tests.length} test scripts passed.`);
