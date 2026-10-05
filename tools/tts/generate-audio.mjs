import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT=process.cwd();
const site=path.join(ROOT,'site','6044-1397');
const outDir=path.join(site,'audio','fa');
const manifestPath=path.join(ROOT,'tools','tts','audio-manifest.json');
fs.mkdirSync(outDir,{recursive:true});

function decode(s){
  return s.replace(/\\'/g,"'").replace(/\\n/g,' ').replace(/\\t/g,' ');
}
function extract(content,key){
  const re=new RegExp(key + "\\s*:\\s*'([^']*)'", "g");
  return [...content.matchAll(re)].map(m=>decode(m[1]));
}
function normalizeForSpeech(text){
  return String(text||'')
    .replace(/QC/g,'کیو سی')
    .replace(/SCC/g,'اس سی سی')
    .replace(/ISIRI/g,'ایس آی آر آی')
    .replace(/ASTM/g,'ای اس تی ام')
    .replace(/MPa/g,'مگاپاسکال')
    .replace(/kg\/m³/g,'کیلوگرم بر مترمکعب')
    .replace(/kg\/m2/g,'کیلوگرم بر مترمربع')
    .replace(/fcm/g,'اف‌سی‌ام')
    .replace(/fc/g,'اف‌سی')
    .replace(/\bS([0-9])\b/g,'اس $1')
    .replace(/→/g,'، سپس ')
    .replace(/=/g,' برابر ')
    .replace(/؛/g,'، ')
    .replace(/:/g,'، ')
    .replace(/\s+/g,' ')
    .trim();
}
function run(cmd,args){execFileSync(cmd,args,{stdio:'inherit'});}
const manifest=[];
for(let i=1;i<=23;i++){
  const ch=String(i).padStart(2,'0');
  const file=path.join(site,'ch'+ch,'app.js');
  if(!fs.existsSync(file)) continue;
  const content=fs.readFileSync(file,'utf8');
  const spoken=extract(content,'spokenText');
  const bodies=extract(content,'body');
  const beats=spoken.length?spoken:bodies;
  beats.forEach((text,index)=>{
    const spokenText=normalizeForSpeech(text);
    if(!spokenText)return;
    const base='ch'+ch+'-'+String(index+1).padStart(2,'0');
    const wav=path.join(outDir,base+'.wav');
    const mp3=path.join(outDir,base+'.mp3');
    run('espeak-ng',['-v','fa','-s','142','-p','48','-a','150','-w',wav,spokenText]);
    run('ffmpeg',['-y','-loglevel','error','-i',wav,'-af','loudnorm=I=-16:LRA=7:TP=-1.5','-ac','1','-ar','24000','-codec:a','libmp3lame','-b:a','64k',mp3]);
    fs.unlinkSync(wav);
    manifest.push({chapter:i,beat:index+1,file:'audio/fa/'+base+'.mp3',text:spokenText});
  });
}
fs.writeFileSync(manifestPath,JSON.stringify({version:1,voice:'espeak-ng fa',sampleRate:24000,bitrate:'64k',items:manifest},null,2)+'\n');
console.log('Generated',manifest.length,'Persian narration tracks');
