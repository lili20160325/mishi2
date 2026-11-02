/*UI-START*/
(function(){
'use strict';
var E=window.PZE,ROOMS=window.PZ_ROOMS,ITEMS=window.PZ_ITEMS;
function $(s,r){return (r||document).querySelector(s);}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var QS=new URLSearchParams(location.search);
/* ---------------- 存档（本页专用，与解谜大冒险 puzzle_v1 互不影响） ---------------- */
var KEY='xingyue_escape_v1'; /* 星钥天文馆·全新主线 */
function defStore(){return {v:2,sound:true,best:{},rooms:{}};}
var store;try{if(QS.has('reset'))localStorage.removeItem(KEY);store=JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){store=null;}
if(!store||store.v!==2)store=defStore();['best','rooms'].forEach(function(k){if(!store[k])store[k]={};});
function save(){try{localStorage.setItem(KEY,JSON.stringify(store));}catch(e){}}
/* ---------------- 声音 ---------------- */
var actx=null;
function ac(){if(!actx){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;try{actx=new C();}catch(e){return null;}}if(actx.state==='suspended')actx.resume();return actx;}
function tone(f,d,type,v,delay){if(!store.sound)return;var c=ac();if(!c)return;var t=c.currentTime+(delay||0),o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v||0.12,t+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+0.05);}
var SFX={
  tap:function(){tone(660,0.07,'triangle',0.07);},
  pick:function(){tone(520,0.08,'sine',0.1);tone(780,0.08,'sine',0.08,0.06);},
  ok:function(){tone(660,0.1,'sine',0.12);tone(880,0.14,'sine',0.12,0.09);},
  bad:function(){tone(240,0.16,'sawtooth',0.06);tone(190,0.2,'sawtooth',0.05,0.12);},
  unlock:function(){[523,659,784,1047].forEach(function(f,i){tone(f,0.12,'triangle',0.1,i*0.07);});},
  hint:function(){tone(988,0.08,'sine',0.08);tone(1319,0.12,'sine',0.07,0.08);},
  win:function(){[523,659,784,659,784,1047].forEach(function(f,i){tone(f,0.16,'triangle',0.12,i*0.11);});}
};
/* ---------------- 小工具 ---------------- */
var STAR='M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2 6.1 20.4l1.3-6.5L2.5 9.3l6.6-.8z';
function starSvg(lit,cls){return '<svg viewBox="0 0 24 24"'+(cls?' class="'+cls+'"':'')+'><path d="'+STAR+'" fill="'+(lit?'#ffc23c':'#e8dff0')+'" stroke="'+(lit?'#e59f00':'#d6cbe2')+'" stroke-width="1.5" stroke-linejoin="round"/></svg>';}
function starsHtml(n){var s='<span class="stars">';for(var i=0;i<3;i++)s+=starSvg(i<n,i<n?'lit':'');return s+'</span>';}
var toastT=null;function toast(t,ms){var el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){el.classList.remove('show');},ms||2200);}
function confetti(){var cs=['#ff6fa5','#8e6bff','#22b88a','#ffc23c','#4d9bff'];for(var i=0;i<36;i++){var d=document.createElement('div');d.className='confetti';d.style.left=Math.random()*100+'vw';d.style.background=cs[i%5];d.style.animationDuration=(1.6+Math.random()*1.4)+'s';d.style.animationDelay=(Math.random()*0.4)+'s';document.body.appendChild(d);(function(x){setTimeout(function(){x.remove();},3600);})(d);}}
function shake(el){if(!el)return;el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}
/* ---------------- 进度 ---------------- */
var N=ROOMS.length,CHAP=5; /* 10 间：2 章×5 */
function bestOf(i){return store.best['room:'+i]||0;}
function unlocked(i){if(QS.has('unlock')||i===0)return true;
  var batch=Math.floor(i/CHAP),start=batch*CHAP;
  if(i===start){for(var j=start-CHAP;j<start;j++)if(!bestOf(j))return false;return true;}
  return bestOf(i-1)>0;}
function sumStars(){var s=0;for(var i=0;i<N;i++)s+=bestOf(i);return s;}
function doneCount(){var s=0;for(var i=0;i<N;i++)if(bestOf(i))s++;return s;}
function record(i,stars){var key='room:'+i;if(!store.best[key]||stars>store.best[key])store.best[key]=stars;save();}
function resetAllProgress(){var sound=!!store.sound;store=defStore();store.sound=sound;save();}
function resetChapterProgress(c){var c0=c*CHAP,c1=Math.min(c0+CHAP,N);
  for(var i=c0;i<c1;i++){delete store.best['room:'+i];var id=ROOMS[i]&&ROOMS[i].id;if(id)delete store.rooms[id];}
  save();}
function chapterRangeLabel(c){var a=c*CHAP+1,b=Math.min((c+1)*CHAP,N);return '第 '+a+'-'+b+' 间';}
function openResetSheet(){var h=sheetHead('🗑 清空全部通关？');
  h+='<p class="say">会清空本页<strong>星钥天文馆</strong>全部章节的通关星星和半途进度，不能恢复。</p>';
  h+='<div class="note">声音开关会保留。清空后可以从第 1 关重新玩起。\n\n不会影响旧版「台风夜·旧楼谜影」或其他游戏的进度。</div>';
  h+='<div class="actions"><button class="btn coral" data-act="resetAllYes">确认清空全部</button><button class="btn ghost" data-act="close">再想想</button></div>';
  openSheet(h);}
function openResetChapterSheet(){var lab=chapterRangeLabel(roomChapter);
  var h=sheetHead('🔄 重置本章？');
  h+='<p class="say">只清空当前选中的<strong>'+lab+'</strong>通关星星和半途进度，其他章节不受影响。</p>';
  h+='<div class="note">重置后，本章要从第一间重新逃出。如果后面章节因此还没解锁，需要先再通关本章。</div>';
  h+='<div class="actions"><button class="btn coral" data-act="resetChapterYes">确认重置本章</button><button class="btn ghost" data-act="close">再想想</button></div>';
  openSheet(h);}
/* ---------------- 页面切换 ---------------- */
var nav={screen:'home',idx:0};
function show(id){$$('.screen').forEach(function(s){s.classList.toggle('active',s.id==='scr-'+id);});nav.screen=id;window.scrollTo(0,0);}
function paintMute(){$$('[data-act="mute"]').forEach(function(b){b.textContent=store.sound?'🔊':'🔇';});}
var OWL=['闭馆夜里，线索藏在告示、铭牌和便签里——先观察，再动手。','密码不会直接弹题：要从场景证据推出来。','有干扰项！假标签、过时海报、错误年份都可能是陷阱。','物品可以组合：手电筒+电池、两半星图、夹灯+电池……','顺着房间走完主线，就能揭开白墨是谁。'];
var roomChapter=0;
function renderHome(chap){if(chap!=null)roomChapter=chap;
  var tot=sumStars(),done=doneCount();
  $('#homeStars').innerHTML=starSvg(true)+tot+' / '+(N*3);
  $('#progText').textContent='已通关 '+done+' / '+N+' 间';
  $('#owlSay').textContent=OWL[done%OWL.length];
  var h='<div class="chapters">';
  var nc=Math.ceil(N/CHAP);
  for(var c=0;c<nc;c++){var a=c*CHAP+1,b=Math.min((c+1)*CHAP,N);
    h+='<button class="btn '+(roomChapter===c?'primary':'ghost')+'" data-act="chapter" data-c="'+c+'" style="min-height:40px;padding:8px 12px;font-size:14px">第 '+a+'-'+b+' 间</button>';}
  h+='</div>';
  h+='<div class="home-reset"><button class="btn" data-act="resetChapter" type="button">🔄 重置本章</button><button class="btn" data-act="resetProgress" type="button">🗑 清空全部通关</button></div>';
  h+='<div class="room-list-hint">↕ 往下滑动看本章房间；顶部可切换章节</div>';
  h+='<div class="room-list-panel"><div class="big-grid">';
  var c0=roomChapter*CHAP,c1=c0+CHAP;
  ROOMS.forEach(function(x,i){
    if(i<c0||i>=c1)return;
    var lock=!unlocked(i),b=bestOf(i);
    h+='<button class="big'+(lock?' locked':'')+'" data-act="play" data-i="'+i+'"><div class="bi">'+(lock?'🔒':x.emoji)+'</div><div style="min-width:0"><b>'+(i+1)+'. '+esc(x.title)+'</b><small>'+esc(x.sub)+'</small>'+
      (store.rooms[x.id]&&!b?'<small style="color:#d63e7a;font-weight:800">● 上次玩到一半</small>':'')+'</div><div class="r">'+(lock?'':starsHtml(b))+'</div></button>';});
  h+='</div></div>';
  $('#listBody').innerHTML=h;paintMute();show('home');}
function play(i,force){if(!unlocked(i)){SFX.bad();toast('先完成前一关，才能玩这一关哦！');return;}nav.idx=i;closeSheet(true);startRoom(i,force);paintMute();}
/* ---------------- 弹窗 ---------------- */
var sheetLocked=false,sheetOnClose=null;
function openSheet(html,opt){opt=opt||{};$('#sheet').innerHTML=html;$('#mask').classList.add('show');sheetLocked=!!opt.locked;sheetOnClose=opt.onClose||null;$('#sheet').scrollTop=0;}
function closeSheet(silent){var m=$('#mask');if(!m.classList.contains('show'))return;m.classList.remove('show');$('#sheet').innerHTML='';var f=sheetOnClose;sheetOnClose=null;sheetLocked=false;if(f&&!silent)f();}
function sheetHead(t){return '<div class="sheet-h"><h3>'+t+'</h3><button class="xbtn" data-act="close" aria-label="关闭">✕</button></div>';}
function hintSheet(H){var h=sheetHead('💡 提示');h+='<div class="hint-list">';
  if(!H.texts.length)h+='<div class="hint-item">需要帮忙吗？提示会一点一点给，先看第一条，想一想再看下一条。</div>';
  H.texts.forEach(function(t,i){h+='<div class="hint-item"><b>提示 '+(i+1)+'：</b>'+esc(t)+'</div>';});h+='</div>';
  var more=H.texts.length<H.max||H.repeat;
  h+='<div class="actions">'+(more?'<button class="btn sun" data-act="hintMore">'+(H.texts.length===0?'给我一点提示':H.texts.length<H.max?'再多一点提示':'再看下一步')+'</button>':'')+'<button class="btn ghost" data-act="close">我自己想想</button></div>';
  h+='<div class="hint-cost">用了提示，这一关的星星会少一点。没关系，学会最重要！</div>';
  openSheet(h);curHint=H;}
var curHint=null;
function hintMore(){var H=curHint;if(!H)return;var t=H.reveal(H.texts.length<H.max?H.texts.length:H.max-1);
  if(H.texts.length<H.max)H.texts.push(t);else H.texts[H.max-1]=t;SFX.hint();hintSheet(H);}
function winSheet(o){SFX.win();confetti();record(nav.idx,o.stars);
  var h='<div class="win"><div style="font-size:48px">'+(o.icon||'🎉')+'</div><div class="wt">'+o.title+'</div><div class="bigstars">'+[0,1,2].map(function(i){return starSvg(i<o.stars);}).join('')+'</div>';
  h+='<div class="ws">'+o.stat+'</div>';
  if(o.ending)h+='<div class="ending">'+esc(o.ending)+'</div>';
  if(o.explain&&o.explain.length)h+='<div class="explain"><h4>🦉 解谜思路</h4><ol>'+o.explain.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ol></div>';
  var hasNext=nav.idx+1<N;
  h+='<div class="actions">'+(hasNext?'<button class="btn primary" data-act="next">下一关 ➜</button>':'')+'<button class="btn ghost" data-act="retry">再玩一次</button><button class="btn ghost" data-act="tolist">返回列表</button></div>';
  if(!hasNext)h+='<div class="hint-cost">🏆 星钥天文馆全部通关！晨光里，你安全离开啦！</div>';
  h+='</div>';openSheet(h,{locked:true});}
function statLine(parts){return parts.filter(Boolean).join(' · ');}

/* ================= 密室逃脱 ================= */
var RP=null;
function startRoom(i,force){var room=ROOMS[i],saved=store.rooms[room.id];
  RP={room:room,i:i,st:E.room.init(),hints:0,stage:{},sel:null,hl:null,msg:'点房间里的东西，仔细看看吧！',started:Date.now()};
  if(saved&&!force){RP.st=saved.st;RP.hints=saved.hints||0;RP.stage=saved.stage||{};RP.msg='欢迎回来！接着上次的进度继续。';}
  $('#roomTitle').innerHTML=room.emoji+' '+esc(room.title)+'<small>第 '+(i+1)+' 间密室</small>';
  show('room');renderRoom();if(!saved||force)storySheet();}
function roomSave(){store.rooms[RP.room.id]={st:RP.st,hints:RP.hints,stage:RP.stage};save();}
function storySheet(){var r=RP.room;openSheet(sheetHead(r.emoji+' '+esc(r.title))+'<div class="story">'+r.story.map(function(p){return '<p class="say">'+esc(p)+'</p>';}).join('')+'</div><div class="note">玩法：点房间里的东西可以查看；看到「拿起」就把物品放进物品栏；先点物品栏里的物品选中它，再点房间里的东西就能“使用”；先后点两个物品可以“组合”。</div><div class="actions"><button class="btn primary" data-act="close">开始探险！</button></div>');}
function renderRoom(){var r=RP.room,st=RP.st,s=r.art(st.flags);
  r.objects.forEach(function(o){var b=o.box;s+='<rect class="hit" data-obj="'+o.id+'" x="'+b[0]+'" y="'+b[1]+'" width="'+b[2]+'" height="'+b[3]+'" fill="transparent"><title>'+esc(o.name)+'</title></rect>';});
  if(RP.hl){var o=E.room.obj(r,RP.hl);if(o){var b=o.box;s+='<rect class="hl" x="'+(b[0]-3)+'" y="'+(b[1]-3)+'" width="'+(b[2]+6)+'" height="'+(b[3]+6)+'" rx="10"/>';}}
  $('#scene').innerHTML=s;$('#roomMsg').innerHTML=esc(RP.msg);
  var h='',n=Math.max(5,st.inv.length);for(var i=0;i<n;i++){var it=st.inv[i];if(!it){h+='<div class="slot empty"></div>';continue;}var I=ITEMS[it];
    h+='<button class="slot'+(RP.sel===it?' sel':'')+(I.glow?' glow':'')+'" data-act="item" data-item="'+it+'"><span class="ic">'+I.icon+'</span><span class="nm">'+esc(I.name)+'</span></button>';}
  $('#inv').innerHTML=h;$('#invTip').textContent=RP.sel?'已选中「'+ITEMS[RP.sel].name+'」':'点物品可以选中它';}
function roomMsg(t){RP.msg=t;$('#roomMsg').innerHTML=esc(t);}
function roomAfter(res,objId){
  if(RP.hl&&E.room.hint(RP.room,RP.st)===null)RP.hl=null;
  var h=E.room.hint(RP.room,RP.st);if(RP.hl&&(!h||h.h.obj!==RP.hl))RP.hl=null;
  roomSave();renderRoom();if(RP.st.done){setTimeout(roomWin,700);}}
function roomTapObj(id){var r=RP.room,st=RP.st;if(st.done)return;
  if(RP.sel){var it=RP.sel,res=E.room.use(r,st,id,it);if(res.ok){SFX.unlock();RP.sel=null;roomMsg(res.text);toast(res.text,2600);roomAfter(res,id);}else{SFX.bad();roomMsg(res.text);toast(res.text);shake($('.scene-box'));}return;}
  SFX.tap();var lk=E.room.look(r,st,id);if(lk.view&&lk.view.set)roomSave();roomInspect(id);}
var LK=null;
function roomInspect(id,banner,bad){var r=RP.room,o=E.room.obj(r,id),v=E.room.view(r,RP.st,id);if(!v){closeSheet();return;}
  var h=sheetHead(esc(o.name));if(banner)h+='<div class="banner'+(bad?' bad':'')+'">'+esc(banner)+'</div>';
  h+='<p class="say">'+esc(v.text)+'</p>';if(v.note)h+='<div class="note">'+esc(v.note)+'</div>';
  if(v.use&&!v.take&&!v.lock)h+='<div class="gnote">💡 要在这里用东西：先关掉这个窗口，在物品栏选中物品，再点「'+esc(o.name)+'」。</div>';
  if(v.lock){var L=v.lock;if(!LK||LK.id!==id||LK.kind!==L.kind||LK.ans!==L.answer)LK={id:id,kind:L.kind,len:L.len||L.opts.length,val:'',dial:L.opts&&L.kind==='dial'?L.opts.map(function(){return 0;}):null,ans:L.answer};h+=lockHtml(L);}
  else LK=null;
  h+='<div class="actions">'+(v.take?'<button class="btn mint" data-act="take" data-obj="'+id+'">✋ 拿起</button>':'')+'<button class="btn ghost" data-act="close">'+(v.take?'先不拿':'好的')+'</button></div>';
  openSheet(h);RP.inspect=id;}
function lockHtml(L){var h='<div class="lock" id="lockBox"><div class="lock-p">🔒 '+esc(L.prompt||'输入密码')+'</div>';
  if(L.kind==='num'||L.kind==='alpha'){h+='<div class="codebox" id="codebox">'+codeCells()+'</div>';
    if(L.kind==='num'){h+='<div class="pad">';['1','2','3','4','5','6','7','8','9',L.dot?'.':'','0','⌫'].forEach(function(k){h+=k===''?'<span></span>':'<button data-act="'+(k==='⌫'?'bs':'key')+'" data-k="'+k+'">'+k+'</button>';});h+='</div>';}
    else{h+='<div class="kb">';'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(k){h+='<button data-act="key" data-k="'+k+'">'+k+'</button>';});h+='<button data-act="bs" data-k="⌫">⌫</button></div>';}
    h+='<button class="btn purple ok" data-act="lockok">确定</button>';}
  else if(L.kind==='dial'){h+='<div class="dials">';L.opts.forEach(function(o,i){h+='<div class="dial"><button data-act="dial" data-i="'+i+'" data-d="-1" aria-label="上一个">▲</button><div class="ch" id="dial'+i+'">'+o[LK.dial[i]]+'</div><button data-act="dial" data-i="'+i+'" data-d="1" aria-label="下一个">▼</button></div>';});h+='</div><button class="btn purple ok" data-act="lockok">确定</button>';}
  else if(L.kind==='choice'){h+='<div class="choices">';L.opts.forEach(function(o){h+='<button data-act="choice" data-v="'+o.v+'" style="background:'+o.c+'" aria-label="盒子"></button>';});h+='</div>';}
  return h+'</div>';}
function codeCells(){var s='';for(var i=0;i<LK.len;i++){var c=LK.val[i]||'';s+='<span class="'+(c?'f':'')+'">'+c+'</span>';}return s;}
function lockKey(k){if(!LK)return;SFX.tap();if(k==='⌫')LK.val=LK.val.slice(0,-1);else if(LK.val.length<LK.len)LK.val+=k;var cb=$('#codebox');if(cb)cb.innerHTML=codeCells();}
function lockDial(i,d){var v=E.room.view(RP.room,RP.st,LK.id),o=v.lock.opts[i];LK.dial[i]=(LK.dial[i]+d+o.length)%o.length;$('#dial'+i).textContent=o[LK.dial[i]];SFX.tap();}
function lockSubmit(val){var id=LK.id,v=E.room.view(RP.room,RP.st,id);if(val===undefined)val=v.lock.kind==='dial'?LK.dial.map(function(x,i){return v.lock.opts[i][x];}).join(''):LK.val;
  if((v.lock.kind==='num'||v.lock.kind==='alpha')&&val.length<1){toast('先输入密码哦');return;}
  var res=E.room.code(RP.room,RP.st,id,val);
  if(res.ok){SFX.unlock();LK=null;roomMsg(res.text);roomSave();if(RP.st.done){closeSheet(true);roomAfter(res,id);toast(res.text,2600);return;}roomAfter(res,id);roomInspect(id,res.text);}
  else{SFX.bad();if(LK.kind!=='dial')LK.val='';roomInspect(id,res.text,true);shake($('#lockBox'));}}
function roomTake(id){var res=E.room.take(RP.room,RP.st,id);if(!res.ok)return;SFX.pick();roomMsg(res.text);roomAfter(res,id);roomInspect(id,res.text);}
function roomTapItem(it){var st=RP.st;if(st.done)return;
  if(RP.sel===it){RP.sel=null;SFX.tap();roomMsg('「'+ITEMS[it].name+'」：'+ITEMS[it].desc);renderRoom();return;}
  if(RP.sel){var a=RP.sel,res=E.room.combine(RP.room,st,a,it);RP.sel=null;if(res.ok){SFX.unlock();roomMsg(res.text);toast(res.text);roomAfter(res);}else{SFX.bad();roomMsg(res.text);toast(res.text);renderRoom();}return;}
  RP.sel=it;SFX.pick();roomMsg('已选中「'+ITEMS[it].name+'」：'+ITEMS[it].desc+' 点房间里的东西来使用它，或者再点一个物品来组合。（再点一次可以放下）');renderRoom();}
function roomHint(){var hh=E.room.hint(RP.room,RP.st);if(!hh){toast('你已经快成功啦！');return;}var key=hh.idx;var texts=(RP.stage[key]||[]).slice();
  hintSheet({texts:texts,max:hh.h.tiers.length,reveal:function(i){RP.hints++;var arr=RP.stage[key]=RP.stage[key]||[];arr.push(hh.h.tiers[i]);if(i>=1&&hh.h.obj){RP.hl=hh.h.obj;}roomSave();renderRoom();return hh.h.tiers[i];}});}
function roomWin(){var r=RP.room,stars=RP.hints<=0?3:RP.hints<=3?2:1;delete store.rooms[r.id];save();
  winSheet({icon:'🚪',title:'挑战成功「'+r.title+'」！',stars:stars,ending:RP.msg,stat:statLine([RP.hints?'用了 '+RP.hints+' 次提示':'一次提示也没用，太棒了！']),explain:r.explain});}


/* ================= 数字游戏：24 点 ================= */
var NG={nums:[],used:[],expr:'',lastWasOp:true,solved:0};
function ngDeal(){
  // easy-ish packs for grade 5
  var packs=[[8,3,3,3],[6,6,4,1],[8,8,3,3],[4,4,4,4],[9,9,4,2],[8,5,5,2],[6,4,3,2],[7,7,3,3],[5,5,5,5],[9,3,4,2],[8,6,4,2],[9,6,3,2]];
  NG.nums=packs[Math.floor(Math.random()*packs.length)].slice();
  NG.used=[0,0,0,0];NG.expr='';NG.lastWasOp=true;ngRender();
}
function ngEvalSafe(s){
  if(!/^[0-9+\-*/().\s]+$/.test(s))return null;
  try{var v=Function('"use strict";return ('+s+')')();return typeof v==='number'&&isFinite(v)?v:null;}catch(e){return null;}
}
function ngRender(){
  var h='<p class="say" style="text-align:center">用下面四个数，加上 + − × ÷ 和括号，算出 <b>24</b>。每个数只能用一次。</p>';
  h+='<div class="num-cards">';
  NG.nums.forEach(function(n,i){h+='<button class="num-card'+(NG.used[i]?' used':'')+'" data-act="ngNum" data-i="'+i+'" '+(NG.used[i]?'disabled':'')+'>'+n+'</button>';});
  h+='</div><div class="num-expr">'+(NG.expr||'点击数字和运算')+'</div>';
  h+='<div class="num-ops">';
  [['+','+'],['-','−'],['*','×'],['/','÷'],['(',')'],['bs','⌫']].forEach(function(x){h+='<button class="btn ghost" data-act="ngOp" data-k="'+x[0]+'">'+x[1]+'</button>';});
  h+='</div>';
  h+='<div class="actions" style="justify-content:center"><button class="btn mint" data-act="ngCheck">算一算</button><button class="btn sun" data-act="ngDeal">换一组</button><button class="btn ghost" data-act="ngClear">清空</button></div>';
  h+='<div class="hint-cost" style="text-align:center">已过关 '+NG.solved+' 组 · 和密室同一页面</div>';
  var el=document.getElementById('numGameBody');if(el)el.innerHTML=h;paintMute();
}
function ngTapNum(i){if(NG.used[i])return;if(!NG.lastWasOp&&NG.expr.length){toast('先点运算符号');return;}NG.used[i]=1;NG.expr+=String(NG.nums[i]);NG.lastWasOp=false;SFX.tap();ngRender();}
function ngTapOp(k){
  if(k==='bs'){ // undo last token roughly
    if(!NG.expr)return;
    var ch=NG.expr.slice(-1);
    if(/\d/.test(ch)){
      // remove trailing number and unuse matching card
      var m=NG.expr.match(/(\d+)$/);if(m){var num=m[1];NG.expr=NG.expr.slice(0,-num.length);
        for(var i=NG.nums.length-1;i>=0;i--)if(NG.used[i]&&String(NG.nums[i])===num){NG.used[i]=0;break;}
        NG.lastWasOp=true;}}
    else{NG.expr=NG.expr.slice(0,-1);NG.lastWasOp=/[+\-*/(]/.test(NG.expr.slice(-1))||!NG.expr;}
    SFX.tap();ngRender();return;
  }
  NG.expr+=k;NG.lastWasOp=(k!==')');SFX.tap();ngRender();
}
function ngCheck(){
  if(NG.used.some(function(u){return!u;})){SFX.bad();toast('四个数都要用上哦');return;}
  var v=ngEvalSafe(NG.expr);
  if(v==null){SFX.bad();toast('算式有点奇怪，再试试');return;}
  if(Math.abs(v-24)<1e-6){NG.solved++;SFX.win();toast('正好 24！太棒了 🎉');confetti();setTimeout(ngDeal,900);}
  else{SFX.bad();toast('等于 '+Math.round(v*1000)/1000+'，还不是 24');}
}
function showNum(){show('num');ngDeal();}

/* ================= 事件 ================= */
document.addEventListener('click',function(ev){var t=ev.target;
  if(t.id==='mask'){if(!sheetLocked)closeSheet();return;}
  if(nav.screen==='room'){var ob=t.closest('#scene [data-obj]');if(ob){roomTapObj(ob.getAttribute('data-obj'));return;}}
  var b=t.closest('[data-act]');if(!b)return;var a=b.dataset.act;
  switch(a){
    case 'mute':store.sound=!store.sound;save();paintMute();if(store.sound)SFX.tap();break;
    case 'home':SFX.tap();closeSheet(true);renderHome();break;
    case 'modeMystery':SFX.tap();show('home');renderHome();window.scrollTo(0, document.getElementById('mysteryBlock')?document.getElementById('mysteryBlock').offsetTop-8:0);break;
    case 'modeNum':SFX.tap();showNum();break;
    case 'ngNum':ngTapNum(+b.dataset.i);break;
    case 'ngOp':ngTapOp(b.dataset.k);break;
    case 'ngCheck':ngCheck();break;
    case 'ngDeal':SFX.tap();ngDeal();break;
    case 'ngClear':SFX.tap();NG.expr='';NG.used=[0,0,0,0];NG.lastWasOp=true;ngRender();break;
    case 'chapter':SFX.tap();renderHome(+b.dataset.c);break;
    case 'back':SFX.tap();closeSheet(true);renderHome(Math.floor(nav.idx/CHAP));break;
    case 'play':SFX.tap();play(+b.dataset.i);break;
    case 'close':SFX.tap();closeSheet();break;
    case 'hint':SFX.tap();roomHint();break;
    case 'hintMore':hintMore();break;
    case 'next':closeSheet(true);play(nav.idx+1);break;
    case 'retry':closeSheet(true);play(nav.idx,true);break;
    case 'tolist':closeSheet(true);renderHome(Math.floor(nav.idx/CHAP));break;
    case 'item':roomTapItem(b.dataset.item);break;
    case 'take':roomTake(b.dataset.obj);break;
    case 'key':lockKey(b.dataset.k);break;
    case 'bs':lockKey('⌫');break;
    case 'dial':lockDial(+b.dataset.i,+b.dataset.d);break;
    case 'lockok':lockSubmit();break;
    case 'choice':lockSubmit(b.dataset.v);break;
    case 'story':SFX.tap();storySheet();break;
    case 'roomReset':SFX.tap();openSheet(sheetHead('🔄 重新开始？')+'<p class="say">房间会回到一开始的样子，物品栏也会清空。</p><div class="actions"><button class="btn primary" data-act="roomResetYes">重新开始</button><button class="btn ghost" data-act="close">不了</button></div>');break;
    case 'roomResetYes':closeSheet(true);delete store.rooms[RP.room.id];save();startRoom(RP.i,true);break;
    case 'resetProgress':SFX.tap();openResetSheet();break;
    case 'resetChapter':SFX.tap();openResetChapterSheet();break;
    case 'resetChapterYes':closeSheet(true);resetChapterProgress(roomChapter);SFX.ok();toast(chapterRangeLabel(roomChapter)+' 已重置！');renderHome();break;
    case 'resetAllYes':closeSheet(true);resetAllProgress();roomChapter=0;SFX.ok();toast('全部通关已清空，可以从头玩啦！');renderHome();break;
  }
});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(!sheetLocked)closeSheet();}});
window.PZ={E:E,store:function(){return store;},room:function(){return RP;},nav:nav,play:play,unlocked:unlocked,bestOf:bestOf,resetAllProgress:resetAllProgress,resetChapterProgress:resetChapterProgress,renderHome:renderHome,KEY:KEY};
paintMute();renderHome();
})();
/*UI-END*/
