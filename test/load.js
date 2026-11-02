// 从 index.html（默认）或 src/（--src）里取出代码块，在 vm 里运行
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
module.exports=function load(blocks){
  const useSrc=process.argv.includes('--src');
  const txt=useSrc
    ?['engine','rooms','rooms-extra'].map(f=>{
        const p=path.join(__dirname,'../src/'+f+'.js');
        return fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';
      }).join('\n')
    :fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
  const ctx={};ctx.globalThis=ctx;vm.createContext(ctx);
  for(const b of blocks){
    if(b==='ROOMS'){
      const parts=[];
      const re=/\/\*ROOMS(?:-EXTRA)?-START\*\/([\s\S]*?)\/\*ROOMS(?:-EXTRA)?-END\*\//g;
      let m;while((m=re.exec(txt)))parts.push(m[1]);
      if(!parts.length)throw new Error('ROOMS block not found');
      for(const p of parts)vm.runInContext(p,ctx);
      continue;
    }
    const m=txt.match(new RegExp('/\\*'+b+'-START\\*/([\\s\\S]*?)/\\*'+b+'-END\\*/'));
    if(!m)throw new Error(b+' block not found');
    vm.runInContext(m[1],ctx);
  }
  return ctx;
};
