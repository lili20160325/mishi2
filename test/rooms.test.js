'use strict';
// 星钥天文馆：按 solution 走通每间；检查不会卡死（BFS）；锁答案与 solution 一致
const load=require('./load');
const ctx=load(['ENGINE','ROOMS']);
const E=ctx.PZE.room, ROOMS=ctx.PZ_ROOMS, ITEMS=ctx.PZ_ITEMS;
let fails=0;
const fail=(r,m)=>{fails++; console.log('FAIL', r&&r.id, m);};
const ok=(r,m)=>console.log('OK', r.id, m);

function act(r,st,a){
  if(a[0]==='code')return E.code(r,st,a[1],a[2]);
  if(a[0]==='take')return E.take(r,st,a[1]);
  if(a[0]==='use')return E.use(r,st,a[1],a[2]);
  if(a[0]==='combine')return E.combine(r,st,a[1],a[2]);
  if(a[0]==='look')return E.look(r,st,a[1]);
}

const key=st=>Object.keys(st.flags).filter(k=>st.flags[k]).sort().join(',')+'|'+st.inv.slice().sort().join(',')+'|'+(st.done?1:0);

function bfsReachableWin(r){
  const start=E.init();
  const seen=new Set([key(start)]);
  const q=[start];
  let guard=0;
  while(q.length && guard++<50000){
    const st=q.shift();
    if(st.done) return true;
    const tryPush=(nst)=>{const k=key(nst); if(!seen.has(k)){seen.add(k); q.push(nst);}};
    // look all objs (may set flags)
    for(const o of r.objects){
      const n=JSON.parse(JSON.stringify(st));
      const res=E.look(r,n,o.id);
      if(res&&res.ok) tryPush(n);
    }
    for(const o of r.objects){
      const n=JSON.parse(JSON.stringify(st));
      const res=E.take(r,n,o.id);
      if(res&&res.ok) tryPush(n);
    }
    for(const o of r.objects){
      const v=E.view(r,st,o.id);
      if(v&&v.lock){
        const n=JSON.parse(JSON.stringify(st));
        const res=E.code(r,n,o.id,v.lock.answer);
        if(res&&res.ok) tryPush(n);
      }
      if(v&&v.use){
        for(const u of v.use){
          if(st.inv.indexOf(u.item)<0) continue;
          const n=JSON.parse(JSON.stringify(st));
          const res=E.use(r,n,o.id,u.item);
          if(res&&res.ok) tryPush(n);
        }
      }
    }
    for(const c of (r.combos||[])){
      if(st.inv.indexOf(c.a)<0||st.inv.indexOf(c.b)<0) continue;
      const n=JSON.parse(JSON.stringify(st));
      const res=E.combine(r,n,c.a,c.b);
      if(res&&res.ok) tryPush(n);
    }
  }
  return false;
}

console.log('=== walkthrough solutions ===');
for(const r of ROOMS){
  if(!r.solution||!r.solution.length){ fail(r,'no solution'); continue; }
  const st=E.init();
  let step=0;
  for(const a of r.solution){
    step++;
    const res=act(r,st,a);
    if(!res||!res.ok){ fail(r,'step '+step+' '+JSON.stringify(a)+' => '+(res&&res.text)); break; }
  }
  if(!st.done) fail(r,'solution finished but not done. flags='+JSON.stringify(st.flags)+' inv='+st.inv);
  else ok(r,'walkthrough '+r.solution.length+' steps');
}

console.log('=== BFS winnable ===');
for(const r of ROOMS){
  if(bfsReachableWin(r)) ok(r,'BFS can win');
  else fail(r,'BFS cannot reach win');
}

console.log('=== item refs ===');
const used=new Set();
for(const r of ROOMS){
  for(const o of r.objects){
    for(const v of o.views){
      (v.take&&v.take.give||[]).forEach(i=>used.add(i));
      (v.lock&&v.lock.ok&&v.lock.ok.give||[]).forEach(i=>used.add(i));
      (v.use||[]).forEach(u=>{used.add(u.item);(u.give||[]).forEach(i=>used.add(i));});
    }
  }
  (r.combos||[]).forEach(c=>{used.add(c.a);used.add(c.b);(c.give||[]).forEach(i=>used.add(i));});
}
for(const i of used){
  if(!ITEMS[i]) fail(null,'missing item def '+i);
}
console.log('items used', used.size);

console.log(fails?('\nFAILED '+fails):'\nALL PASS');
process.exit(fails?1:0);
