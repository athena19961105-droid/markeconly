'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const pages=new Map(files(__dirname).filter(f=>f.endsWith('.html')).map(f=>[f,fs.readFileSync(f,'utf8')]));
let checked=0;
for(const [file,html] of pages){for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
 const href=m[1];if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href))continue;
 const [resource,hash]=href.split('#');const clean=resource.split('?')[0];const target=clean?path.resolve(path.dirname(file),decodeURIComponent(clean)):file;
 assert(fs.existsSync(target),`${path.basename(file)}: missing ${href}`);checked++;
 if(hash&&pages.has(target))assert([...pages.get(target).matchAll(/\bid="([^"]+)"/g)].some(x=>x[1]===hash),`${path.basename(file)}: missing anchor ${href}`);
}}
console.log(`PASS static links: ${pages.size} pages, ${checked} local asset/link targets`);
