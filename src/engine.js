/*ENGINE-START*/
(function(G){
'use strict';
var E={};
/* ================= 密室逃脱 ================= */
function has(st,i){return st.inv.indexOf(i)>=0;}
function cond(st,c){var neg=c[0]==='!';if(neg)c=c.slice(1);var v=c.indexOf('has:')===0?has(st,c.slice(4)):!!st.flags[c];return neg?!v:v;}
function condAll(st,list){return !list||list.every(function(c){return cond(st,c);});}
var R={
  init:function(){return {flags:{},inv:[],done:false};},
  obj:function(room,id){for(var i=0;i<room.objects.length;i++)if(room.objects[i].id===id)return room.objects[i];return null;},
  view:function(room,st,id){var o=R.obj(room,id);if(!o)return null;for(var i=0;i<o.views.length;i++)if(condAll(st,o.views[i].if))return o.views[i];return null;},
  apply:function(st,eff){(eff.take||[]).forEach(function(i){var k=st.inv.indexOf(i);if(k>=0)st.inv.splice(k,1);});
    (eff.give||[]).forEach(function(i){if(!has(st,i))st.inv.push(i);});(eff.set||[]).forEach(function(f){st.flags[f]=true;});
    if(eff.win){st.done=true;st.flags.escaped=true;}return {ok:true,text:eff.text||'',eff:eff};},
  look:function(room,st,id){var v=R.view(room,st,id);if(!v)return {ok:false,text:''};if(v.set)v.set.forEach(function(f){st.flags[f]=true;});return {ok:true,view:v,text:v.text};},
  take:function(room,st,id){var v=R.view(room,st,id);if(!v||!v.take)return {ok:false,text:'这里没有可以拿的东西。'};return R.apply(st,v.take);},
  norm:function(s){return String(s).toUpperCase().replace(/\s+/g,'');},
  code:function(room,st,id,code){var v=R.view(room,st,id);if(!v||!v.lock)return {ok:false,text:''};
    if(R.norm(code)===R.norm(v.lock.answer))return R.apply(st,v.lock.ok);return {ok:false,bad:true,text:v.lock.bad||'密码不对哦，再想一想。'};},
  use:function(room,st,id,item){if(!has(st,item))return {ok:false,text:''};var v=R.view(room,st,id);
    var u=v&&v.use?v.use.filter(function(x){return x.item===item;})[0]:null;
    if(!u)return {ok:false,text:(v&&v.wrong)||'好像用不上，换个东西试试吧。'};return R.apply(st,u);},
  combine:function(room,st,a,b){if(!has(st,a)||!has(st,b)||a===b)return {ok:false,text:''};
    var c=(room.combos||[]).filter(function(x){return (x.a===a&&x.b===b)||(x.a===b&&x.b===a);})[0];
    if(!c)return {ok:false,text:'这两样东西放在一起，好像没什么用。'};
    return R.apply(st,{take:[a,b],give:c.give,set:c.set,text:c.text});},
  hint:function(room,st){for(var i=0;i<room.hints.length;i++){var h=room.hints[i];if(!st.flags[h.until]&&condAll(st,h.if))return {idx:i,h:h};}return null;}
};
E.room=R;
G.PZE=E;
})(typeof window!=='undefined'?window:globalThis);
/*ENGINE-END*/
