#!/usr/bin/env node
/**
 * Static QA for the 6044 interactive book.
 * No npm dependencies.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(process.cwd());
const SITE = path.join(ROOT, 'site', '6044-1397');
const BOOKS = path.join(ROOT, 'books', '6044-1397');
const expected = Array.from({length:22}, (_,i)=>String(i+1).padStart(2,'0'));
const errors = [], warnings = [];

function fail(m){ errors.push(m); }
function warn(m){ warnings.push(m); }
function exists(p){ return fs.existsSync(p); }
function read(p){ return fs.readFileSync(p,'utf8'); }
function rel(p){ return path.relative(ROOT,p).replaceAll(path.sep,'/'); }

if(!exists(SITE)) fail('site/6044-1397 is missing');
checkNarration(SITE);
checkSimulationContract();
checkAssessmentContract();
checkSearchContract();
if(!exists(BOOKS)) fail('books/6044-1397 is missing');

for(const n of expected){
  const dir=path.join(SITE,'ch'+n);
  const html=path.join(dir,'index.html');
  if(!exists(html)) fail(`ch${n}: index.html missing`);
}

function checkSimulationContract(){
  const p=path.join(SITE,'lib','simulations.js');
  if(!exists(p)){ fail('shared simulation engine missing: site/6044-1397/lib/simulations.js'); return; }
  const src=read(p), sandbox={window:{},console};
  try{ vm.runInNewContext(src,sandbox,{timeout:1000,filename:rel(p)}); }
  catch(e){ fail('shared simulation engine parse failure: '+e.message); return; }
  const sim=sandbox.window.SimulationEngine?.ch11;
  const fresh=sandbox.window.SimulationEngine?.ch10;
  const sampling=sandbox.window.SimulationEngine?.ch08;
  const temperature=sandbox.window.SimulationEngine?.ch07;
  const specimen=sandbox.window.SimulationEngine?.specimen;
  const production=sandbox.window.SimulationEngine?.ch14;
  const orderDelivery=sandbox.window.SimulationEngine?.orderDelivery;
  const conformity=sandbox.window.SimulationEngine?.ch15;
  if(!sim) { fail('ch11 shared simulation is missing'); return; }
  if(!fresh) { fail('ch10 shared simulation is missing'); return; }
  if(!sampling) { fail('ch08 shared simulation is missing'); return; }
  if(!temperature) { fail('ch07 shared simulation is missing'); return; }
  if(!specimen) { fail('specimen shared simulation is missing'); return; }
  if(!production) { fail('ch14 shared simulation is missing'); return; }
  if(!orderDelivery) { fail('order-delivery shared simulation is missing'); return; }
  if(!conformity) { fail('ch15 conformity simulation is missing'); return; }
  for(const tc of (sim.testCases||[])){
    const got=sim.calculate(tc.input);
    if(!got.valid || got.pass!==tc.pass || Math.abs(got.mean-tc.mean)>1e-9)
      fail('ch11 simulation test failed: '+JSON.stringify(tc.input));
  }
  for(const tc of (fresh.testCases||[])){
    let ok;
    if(tc.kind==='slump') ok=fresh.classifySlump(tc.input)===tc.expected;
    if(tc.kind==='flow') ok=fresh.classifyFlow(tc.input)===tc.expected;
    if(tc.kind==='density') ok=fresh.density(tc.input.measured,tc.input.specified).pass===tc.pass;
    if(!ok) fail('ch10 simulation test failed: '+JSON.stringify(tc));
  }
  for(const tc of (sampling.testCases||[])){
    const got=sampling.calculate(tc.input);
    if(!got.valid || got.pass!==tc.pass)
      fail('ch08 simulation test failed: '+JSON.stringify(tc.input));
  }
  for(const tc of (temperature.testCases||[])){
    const got=temperature.calculate(tc.input);
    if(!got.valid || got.pass!==tc.pass || got.minimumC!==tc.minimumC)
      fail('ch07 temperature simulation test failed: '+JSON.stringify(tc.input));
  }
  for(const tc of (specimen.testCases||[])){
    const got=specimen.calculate(tc.input);
    if(tc.valid===false ? got.valid : (!got.valid || got.ready!==tc.ready))
      fail('specimen simulation test failed: '+JSON.stringify(tc.input));
  }
  for(const tc of (production.testCases||[])){
    const got=production.calculate(tc.input);
    if(!got.valid || got.complete!==tc.complete)
      fail('ch14 production control simulation test failed: '+JSON.stringify(tc.input));
  }
  for(const tc of (orderDelivery.testCases||[])){
    const got=orderDelivery.calculate(tc.input);
    if(tc.valid===false ? got.valid : (!got.valid || got.traceable!==tc.traceable))
      fail('order-delivery simulation test failed: '+JSON.stringify(tc.input));
  }
  for(const tc of (conformity.testCases||[])){
    const got=conformity.calculate(tc.input);
    if(!got.valid || got.assessmentReady!==tc.assessmentReady)
      fail('ch15 conformity simulation test failed: '+JSON.stringify(tc.input));
  }
}


function checkAssessmentContract(){
  const jsPath=path.join(SITE,'lib','assessment.js');
  const htmlPath=path.join(SITE,'assessment.html');
  if(!exists(jsPath)){ fail('assessment engine missing: site/6044-1397/lib/assessment.js'); return; }
  if(!exists(htmlPath)){ fail('assessment page missing: site/6044-1397/assessment.html'); return; }
  const sandbox={window:{},console};
  try{ vm.runInNewContext(read(jsPath),sandbox,{timeout:1000,filename:rel(jsPath)}); }
  catch(e){ fail('assessment engine parse failure: '+e.message); return; }
  const engine=sandbox.window.AssessmentEngine;
  if(!engine || !Array.isArray(engine.questions) || engine.questions.length<8){ fail('assessment question bank is incomplete'); return; }
  const requiredTypes=new Set(engine.questions.map(q=>q.type));
  for(const type of ['mcq','truefalse','sequence','numeric','scenario']) if(!requiredTypes.has(type)) fail('assessment type missing: '+type);
  for(const q of engine.questions){
    if(!q.id || !q.unit || !q.source || !q.explanation) fail('assessment question missing metadata: '+(q.id||'unknown'));
  }
  const numeric=engine.questions.find(q=>q.id==='q08');
  if(!numeric || Math.abs(engine.grade(numeric,35.36))>1) fail('assessment numeric grading contract invalid');
  const summary=engine.summary();
  if(summary.total!==engine.questions.length) fail('assessment summary total mismatch');
  const html=read(htmlPath);
  if(!html.includes('assessment.js')) fail('assessment page does not load shared assessment engine');
  if(!html.includes('نقاط نیازمند مرور')) fail('assessment page missing weakness-map output');
}




function checkSharedChapterNavigation(){
  for(const n of expected){
    const htmlPath=path.join(SITE,'ch'+n,'index.html');
    if(!exists(htmlPath)) continue;
    const html=read(htmlPath);
    if(!html.includes('../lib/engine.js')) continue;
    if(!html.includes('../lib/engine.css')) fail('ch'+n+': shared engine CSS missing');
    if(!html.includes('class="book-controls"')) warn('ch'+n+': no .book-controls container for shared navigation');
  }
}

function checkBookProgressContract(){
  const enginePath=path.join(SITE,'lib','engine.js');
  const homePath=path.join(SITE,'index.html');
  if(!exists(enginePath)) return fail('book engine missing for progress contract');
  const engine=read(enginePath);
  if(!engine.includes("standard6044-book-progress-v1")) fail('book progress storage key missing');
  if(!engine.includes('toggleBookmark') || !engine.includes('updateBookmarkButton')) fail('bookmark controls missing from shared engine');
  if(!engine.includes('saveProgress()')) fail('chapter progress persistence missing from shared engine');
  if(!exists(homePath)) return fail('book home missing for progress dashboard');
  const home=read(homePath);
  if(!home.includes('progress-dashboard') || !home.includes('chapters-done')) fail('home progress dashboard missing');
}

function checkSearchContract(){
  const jsPath=path.join(SITE,'lib','search.js');
  const htmlPath=path.join(SITE,'search.html');
  if(!exists(jsPath)){ fail('search engine missing: site/6044-1397/lib/search.js'); return; }
  if(!exists(htmlPath)){ fail('search page missing: site/6044-1397/search.html'); return; }
  const sandbox={window:{},console};
  try{ vm.runInNewContext(read(jsPath),sandbox,{timeout:1000,filename:rel(jsPath)}); }
  catch(e){ fail('search engine parse failure: '+e.message); return; }
  const engine=sandbox.window.BookSearch;
  if(!engine || !Array.isArray(engine.items) || engine.items.length!==22) fail('search index must contain exactly 22 learning units');
  for(const term of ['۳۲','اسلامپ','مقاومت','نمونه‌برداری']){
    if(!engine.search(term).length) fail('search query returned no result: '+term);
  }
  if(engine.search('NOT-A-REAL-6044-TERM').length) fail('search no-result contract failed');
  if(!read(htmlPath).includes('search.js')) fail('search page does not load shared search engine');
}

checkSharedChapterNavigation();
checkBookProgressContract();

function checkNarration(dir){
  for(const file of walk(dir).filter(p=>p.endsWith('.js'))){
    const src=read(file);
    if(!src.includes('BOOK_CONFIG')) continue;
    if(src.includes('narration:')){
      if(!src.includes('beats:')) fail(`${rel(file)}: narration config missing beats array`);
      if(!src.includes('displayText:') && !src.includes('text:')) fail(`${rel(file)}: narration beats missing displayText/text`);
      if(!src.includes('spokenText:') && !src.includes('text:')) fail(`${rel(file)}: narration beats missing spokenText/text`);
    }
  }
}

function walk(dir){
  if(!exists(dir)) return [];
  const out=[];
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,ent.name);
    if(ent.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

for(const p of walk(SITE)){
  if(p.toLowerCase().endsWith('.pdf')) fail(`PDF inside site output: ${rel(p)}`);
}

for(const n of expected){
  const dir=path.join(SITE,'ch'+n);
  const htmlPath=path.join(dir,'index.html');
  if(!exists(htmlPath)) continue;
  const html=read(htmlPath);

  if(!html.includes('../lib/engine.js') && !html.includes('../lib/engine.css')){
    warn(`ch${n}: legacy/non-engine chapter (not yet migrated)`);
  }

  const appMatch=html.match(/<script[^>]+src=["']\.\/app\.js["'][^>]*>/i);
  if(!appMatch) continue;

  const appPath=path.join(dir,'app.js');
  if(!exists(appPath)){ fail(`ch${n}: index references app.js but file is missing`); continue; }
  const app=read(appPath);
  if(!/window\.BOOK_CONFIG\s*=/.test(app)) fail(`ch${n}: app.js has no BOOK_CONFIG`);

  const sandbox={window:{},console};
  try{
    vm.runInNewContext(app,sandbox,{timeout:1000,filename:rel(appPath)});
  }catch(e){
    fail(`ch${n}: app.js syntax/runtime parse failure: ${e.message}`);
    continue;
  }
  const cfg=sandbox.window.BOOK_CONFIG;
  if(!cfg || !Array.isArray(cfg.beats) || !cfg.beats.length) fail(`ch${n}: BOOK_CONFIG.beats is empty/missing`);

  const engineJs=html.includes('../lib/engine.js');
  const engineCss=html.includes('../lib/engine.css');
  if(!engineJs) fail(`ch${n}: app.js exists but shared engine.js is not referenced`);
  if(!engineCss) fail(`ch${n}: app.js exists but shared engine.css is not referenced`);

  const beatCount=cfg?.beats?.length||0;
  const beatAttrs=[...html.matchAll(/data-beat=["']([^"']+)["']/gi)];
  for(const m of beatAttrs){
    for(const token of m[1].trim().split(/\s+/)){
      const num=Number(token);
      if(!Number.isInteger(num) || num<1 || num>beatCount)
        fail(`ch${n}: data-beat="${m[1]}" points outside 1..${beatCount}`);
    }
  }

  const roles=[...html.matchAll(/data-scene-role=["']([^"']+)["']/gi)].map(m=>m[1]);
  const shown=new Set();
  for(const step of (cfg?.scene?.steps||[])){
    for(const role of (step.show||[])) shown.add(role);
  }
  for(const role of new Set(roles)){
    if(!shown.has(role)) warn(`ch${n}: scene role "${role}" is never listed in scene.show[]`);
  }
}

for(const n of expected){
  const dir=path.join(BOOKS,'chapters');
  const md=path.join(dir,'ch'+n+'.md');
  if(!exists(md)) fail(`source chapter map missing: books/6044-1397/chapters/ch${n}.md`);
}

const allHtml=walk(SITE).filter(p=>p.endsWith('.html'));
for(const htmlPath of allHtml){
  const html=read(htmlPath);
  const base=path.dirname(htmlPath);
  for(const m of html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)){
    const ref=m[1];
    if(!ref || ref.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(ref) || ref.startsWith('//') || ref.startsWith('data:')) continue;
    const clean=decodeURIComponent(ref.split('#')[0].split('?')[0]);
    if(!clean) continue;
    const target=path.resolve(base,clean);
    if(!target.startsWith(SITE)) continue;
    if(!exists(target)) fail(`${rel(htmlPath)} -> missing local reference: ${clean}`);
  }
}

console.log(`6044 QA: ${errors.length?'FAIL':'PASS'}`);
console.log(`Checked learning units: ${expected.length}`);
console.log(`Checked HTML files: ${allHtml.length}`);
if(warnings.length){ console.log(`Warnings: ${warnings.length}`); for(const x of warnings) console.log('  WARN '+x); }
if(errors.length){ console.log(`Errors: ${errors.length}`); for(const x of errors) console.log('  FAIL '+x); process.exit(1); }
