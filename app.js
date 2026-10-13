const $=s=>document.querySelector(s),KEY='tasbih_v1';
const PN=['Fajr','Dhuhr','Asr','Maghrib','Isha'],PB=['ফজর','যোহর','আসর','মাগরিব','এশা'];
let DEF=[{id:'sub',n:'SubhanAllah',ar:'سُبْحَانَ ٱللَّٰهِ',en:'Glory be to Allah',bn:'আল্লাহ পবিত্র',t:33}];// fallback only; the real list lives in tasbih.json

const THEMES=['forest','night','rose','ocean','dusk','sand','lavender','mint','sunset','ember','midnight','sage','coral','aqua','orchid','gold','stone','emerald','plum','crimson','slate','abyss','obsidian'];
const UF={nunito:'Nunito',poppins:'Poppins',quicksand:'Quicksand',baloo:"'Baloo 2'",lora:'Lora',playfair:"'Playfair Display'"};
const sv=p=>`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const IC={c:sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>'),p:sv('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),s:sv('<path d="M18 20V10M12 20V4M6 20v-6"/>'),d:sv('<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>'),g:sv('<path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>'),r:sv('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>'),a:sv('<path d="M12 5v14M5 12h14"/>'),k:sv('<path d="M5 12l5 5L20 7"/>'),l:sv('<path d="M15 6l-6 6 6 6"/>'),rr:sv('<path d="M9 6l6 6-6 6"/>')};
const ORN='<svg viewBox="0 0 120 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 6h42M76 6h42"/><path d="M60 1l5 5-5 5-5-5z" fill="currentColor"/></svg>';
const DEV=localStorage.getItem('tasbih_dev_id')||(()=>{const v=Math.random().toString(36).slice(2,8);localStorage.setItem('tasbih_dev_id',v);return v})();
function cobj(x){return x&&typeof x=='object'?x:(x?{old:x}:{})}
function cn(x){return typeof x=='number'?x:Object.values(x||{}).reduce((a,b)=>a+b,0)}
function tobj(x){return x&&typeof x=='object'?x:(x?{v:x,t:0}:null)}
function norm(o){o.tl=o.tl||[];o.tt=o.tt||{};o.bs=o.bs||{};o.logs=o.logs||{};o.fv=o.fv||{};for(const k in o.fv){const x=tobj(o.fv[k]);x?o.fv[k]=x:delete o.fv[k]}o.qz=o.qz&&typeof o.qz=='object'?o.qz:{v:+o.qz||0,t:0};
 for(const k in o.tt){const x=tobj(o.tt[k]);x?o.tt[k]=x:delete o.tt[k]}
 for(const d in o.logs){const l=o.logs[d];l.c=l.c||{};for(const k in l.c)l.c[k]=cobj(l.c[k]);
  l.p=(l.p||[0,0,0,0,0]).map(x=>x&&typeof x=='object'?x:{v:x?1:0,t:0});l.z=l.z||{};l.x=l.x||{};for(const k in l.x){const y=tobj(l.x[k]);y?l.x[k]=y:delete l.x[k]}}return o}
const cc=(l,id)=>Math.max(0,cn(l.c[id])-((l.z||{})[id]||0));
const lf=id=>Object.values(S.logs).reduce((a,l)=>a+cc(l,id),0);
const pg=t=>Math.max(0,lf(t.id)-((S.bs[t.id]||{}).v||0))%tg(t);
function migrate(){norm(S);if(S.prog){for(const id in S.prog)S.bs[id]={v:Math.max(0,lf(id)-S.prog[id]),t:0};delete S.prog}}
const out=()=>({tl:[...S.tl].sort((a,b)=>a.id<b.id?-1:1),tt:S.tt,logs:S.logs,bs:S.bs,fv:S.fv,qz:S.qz});
const canon=o=>JSON.stringify(o,(k,v)=>v&&typeof v=='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(x=>[x,v[x]])):v);
const AF={amiri:"Amiri,serif",quran:"'Scheherazade New',Amiri,serif",indo:"'Noto Nastaliq Urdu',serif"};
let S=JSON.parse(localStorage.getItem(KEY)||'null')||{tl:[],tt:{},logs:{},prog:{},fv:{},qz:{v:0,t:0},dt:{},cur:'sub',pend:{c:0,p:0},upd:0,
 set:{theme:'forest',arf:'quran',size:1,en:true,bn:true,haptic:true}};
let tab='c',rg='w',mt='t',wasOff=!navigator.onLine,duaI=0,duaO=0,D=null;
S.set.tl??=true;S.set.ui??='en';S.set.bd??=false;S.set.uf??='nunito';S.set.hms??=35;S.dt??={};
const all=()=>DEF.concat(S.tl),cur=()=>all().find(x=>x.id==S.cur)||DEF[0],tg=t=>{const x=S.tt[t.id];return (x&&typeof x=='object'?x.v:x)||t.t};
const dk=d=>{d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const day=k=>S.logs[k=k||dk()]=S.logs[k]||{c:{},x:{},z:{},p:[0,0,0,0,0].map(()=>({v:0,t:0}))};
const dt=k=>S.logs[k]?Object.keys(S.logs[k].c).reduce((a,id)=>a+cc(S.logs[k],id),0):0;
const dx=k=>S.logs[k]?Object.values(S.logs[k].x||{}).reduce((a,b)=>a+(b.v?1:0),0):0;
const dp=k=>S.logs[k]?S.logs[k].p.reduce((a,b)=>a+(b.v?1:0),0):0;
const vib=p=>{if(S.set.haptic&&navigator.vibrate)navigator.vibrate(p)};
function toast(m){const t=$('#toast');t.textContent=m;t.style.opacity=1;setTimeout(()=>t.style.opacity=0,1800)}
function persist(k){clearTimeout(persist.w);persist.w=setTimeout(persist.f,300);if(!k&&!persist.t)persist.t=setTimeout(()=>{persist.t=0;push()},400)}
persist.f=()=>{clearTimeout(persist.w);persist.w=0;try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
addEventListener('pagehide',()=>persist.f());document.addEventListener('visibilitychange',()=>{if(document.hidden)persist.f()});
function modal(h){const m=document.createElement('div');m.className='mo';m.id='mo';m.innerHTML='<div>'+h+'</div>';m.onclick=e=>{if(e.target==m)m.remove()};document.body.append(m)}
const closeM=()=>$('#mo')&&$('#mo').remove();

// ===== counter =====
function tap(){const t=cur(),l=day();const c=l.c[t.id]=cobj(l.c[t.id]);c[DEV]=(c[DEV]||0)+1;S.pend.c++;
 if(!navigator.onLine)wasOff=true;
 if(pg(t)==0){vib([80,60,80,60,250]);toast('Target complete')}else vib(S.set.hms||35);
 persist();upd()}
function upd(){const t=cur(),p=pg(t);$('#cn').textContent=p;$('#rg').style.strokeDashoffset=565.5*(1-p/tg(t));$('#td').textContent=dt(dk())}
function setT(n){if(!n){n=parseInt(prompt('Custom target',tg(cur())));if(!n||n<1)return}S.tt[S.cur]={v:n,t:Date.now()};persist();render()}
function reset(){S.bs[S.cur]={v:lf(S.cur),t:Date.now()};persist();render()}
function addT(){const g=i=>$('#'+i).value.trim();if(!g('an')&&!g('aa'))return;
 const id='c'+Date.now();S.tl.push({id,n:g('an')||g('aa'),ar:g('aa'),en:g('ae'),bn:g('ab'),t:parseInt(g('at'))||33,note:g('anote')});S.cur=id;closeM();persist();render()}
function openAdd(){modal(`<h2>New tasbih</h2><input id=an placeholder="Name"><textarea id=aa dir=rtl rows=2 placeholder="Arabic text"></textarea><textarea id=ae rows=2 placeholder="English translation"></textarea><textarea id=ab rows=2 placeholder="বাংলা অনুবাদ"></textarea><input id=at type=number placeholder="Target (default 33)"><textarea id=anote rows=3 placeholder="Note (optional) - hadith or significance"></textarea><button class="btn p" onclick=addT()>Add</button>`)}

// ===== prayers =====
let pj=-1;
function togP(i){const l=day();l.p[i]={v:l.p[i].v?0:1,t:Date.now()};S.pend.p+=l.p[i].v;pj=l.p[i].v?i:-1;if(!navigator.onLine)wasOff=true;vib(S.set.hms||35);persist();render()}

function togX(k){const l=day();l.x=l.x||{};l.x[k]={v:(l.x[k]||{}).v?0:1,t:Date.now()};if(!navigator.onLine)wasOff=true;vib(S.set.hms||35);persist()}
function extras(){const x=day().x||{},ck=(k,n,b,e)=>`<label class=xp><input type=checkbox class=cbi ${(x[k]||{}).v?'checked':''} onchange="togX('${k}')"><span class=xpl><span class=xe>${e}</span><span class=xpt><b>${n}</b><span class="mu bn">${b}</span></span>${IC.k}</span></label>`;
 return `<div class=xps>${ck('tahajjud','Tahajjud','তাহাজ্জুদ','🌙')}${ck('sunnah','Sunnah','সুন্নাত','✨')}</div>`}
function qazaCard(){return `<div class="glass qzc"><div class=dn style="font-size:.95rem">🕊️ Missed prayers (qaza)</div><div class=row style="align-items:center;gap:18px;margin:10px 0"><button class=btn onclick="qz(-1)" aria-label="Made up one">${IC.n}</button><b id=qn style="font-size:2.4rem;min-width:3ch;text-align:center;cursor:pointer;color:var(--ac)" onclick="qzSet()">${S.qz.v}</b><button class=btn onclick="qz(1)" aria-label="Missed one">${IC.a}</button></div><div class=mu style="text-align:center;font-size:.75rem">+ missed · − made up · tap the number to set it</div><div class=row style="margin:12px 0 0"><button class="btn p" onclick="openQ()">${IC.k} Log a qaza prayer</button></div></div>`}
// qaza log: pick a past date, cycle a prayer none -> qaza (v:2) -> on time (v:1) -> none
let qzD='';
const dq=k=>S.logs[k]?S.logs[k].p.reduce((a,b)=>a+(b.v==2?1:0),0):0;
function openQ(k){qzD=k||dk(new Date(Date.now()-864e5));modal(`<div id=qzm style="display:grid;gap:10px">${qzModal()}</div>`)}
function qzModal(){const L=S.logs[qzD],lab=['Not prayed','On time','Qaza'];
 return `<h2 style="margin:0">Log qaza</h2><div class=mu>Pick the date you missed, then tap a prayer to mark it as made up (qaza).</div><input type=date id=qdt value="${qzD}" max="${dk()}" onchange="qzD=this.value||qzD;qzRe()">${PN.map((a,i)=>{const v=L?L.p[i].v:0;return `<button class="pd ${v?'done':''} ${v==2?'qz':''}" onclick=qzTap(${i})><span class=pe>${PE[i]}</span><span class=pn><b>${a}</b> <span class="mu bn">${PB[i]}</span><div class=mu style="font-size:.75rem">${lab[v]}</div></span><span class=pk>${IC.k}</span></button>`}).join('')}<button class="btn p" onclick=closeM()>Done</button>`}
function qzRe(){const m=$('#qzm');if(m)m.innerHTML=qzModal()}
function qzTap(i){const l=day(qzD),n={0:2,2:1,1:0}[l.p[i].v]||0;l.p[i]={v:n,t:Date.now()};if(!navigator.onLine)wasOff=true;vib(S.set.hms||35);persist();render();qzRe()}
function qz(n){S.qz={v:Math.max(0,S.qz.v+n),t:Date.now()};vib(S.set.hms||35);persist();$('#qn').textContent=S.qz.v}
function qzSet(){const n=parseInt(prompt('Missed prayers owed',S.qz.v));if(isNaN(n)||n<0)return;S.qz={v:n,t:Date.now()};persist();render()}

// ===== reset stats =====
const RZ=[['t','Tasbih counts','All dhikr counts, daily totals and streak'],['p','Daily prayers','History of the five prayers'],['x','Extra prayers','Tahajjud and Sunnah history'],['q','Qaza counter','Set back to 0']];
const rzSel=()=>[...document.querySelectorAll('#mo .cbi')].filter(x=>x.checked).map(x=>x.value);
function openReset(){modal(`<h2>Reset stats</h2><div class=mu>Choose what to erase. This can't be undone.</div>${RZ.map(r=>`<label class="pr xr"><span><b>${r[1]}</b><div class=mu>${r[2]}</div></span><input type=checkbox class=cbi value=${r[0]} onchange="$('#rzn').disabled=!rzSel().length"><span class=cbx>${IC.k}</span></label>`).join('')}<button class=btn onclick=expData()>Export a backup first</button><button class="btn p" id=rzn onclick=rzNext() disabled>Continue</button><button class=btn onclick=closeM()>Cancel</button>`)}
function rzNext(){const s=rzSel();if(!s.length)return;closeM();
 modal(`<h2>Are you sure?</h2><p style="margin:0">This will permanently erase: <b>${RZ.filter(r=>s.includes(r[0])).map(r=>r[1]).join(', ')}</b>${user?'. It will also be erased from your synced account and your other devices.':'.'}</p><input id=rzi placeholder="Type RESET to confirm" autocapitalize=characters autocomplete=off oninput="$('#rzg').disabled=this.value.trim().toUpperCase()!='RESET'"><button class="btn dz" id=rzg disabled onclick="rzDo('${s.join('')}')">Erase now</button><button class=btn onclick=closeM()>Cancel</button>`)}
function rzDo(s){const T=Date.now();
 if(s.includes('t')){for(const d in S.logs){const l=S.logs[d];l.z=l.z||{};for(const id in l.c)l.z[id]=Math.max(l.z[id]||0,cn(l.c[id]))}all().forEach(x=>S.bs[x.id]={v:0,t:T});S.pend.c=0}
 if(s.includes('p'))for(const d in S.logs)S.logs[d].p=S.logs[d].p.map(x=>x.v?{v:0,t:T}:x);
 if(s.includes('x'))for(const d in S.logs){const x=S.logs[d].x||{};for(const k in x)if(x[k].v)x[k]={v:0,t:T}}
 if(s.includes('q'))S.qz={v:0,t:T};
 if(s.includes('p')||s.includes('x'))S.pend.p=0;
 closeM();persist();render();toast('Stats reset')}

// ===== backup =====
function expData(){const o={app:'tasbih',v:1,at:new Date().toISOString(),tl:S.tl,tt:S.tt,bs:S.bs,logs:S.logs,qz:S.qz,fv:S.fv,dt:S.dt,set:S.set};
 const b=new Blob([JSON.stringify(o,null,1)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='tasbih-backup-'+dk()+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
 S.lb=Date.now();persist(1);render();toast('Backup exported')}
async function impData(inp){const f=inp.files[0];inp.value='';if(!f)return;
 try{const r=JSON.parse(await f.text());if(!r||typeof r!='object'||(r.app&&r.app!='tasbih')||!(r.logs||r.tl))throw 0;
  const T=JSON.parse(JSON.stringify(S));mergeInto(T,r);
  if(r.set&&typeof r.set=='object')Object.assign(T.set,r.set);if(r.dt&&typeof r.dt=='object')Object.assign(T.dt,r.dt);
  S=T;persist();render();toast('Backup restored')}catch(e){alert('That file is not a valid Tasbih backup.')}}

// ===== stats =====
function series(){const n=new Date(),o=[];const f=mt=='t'?dt:mt=='p'?dp:dx;
 if(rg=='y'){for(let i=11;i>=0;i--){const d=new Date(n.getFullYear(),n.getMonth()-i,1);let v=0;
  for(const k in S.logs){const x=new Date(k);if(x.getFullYear()==d.getFullYear()&&x.getMonth()==d.getMonth())v+=f(k)}
  o.push({l:d.toLocaleString(LC(),{month:'short'})[0],v})}}
 else{const c=rg=='w'?7:30;for(let i=c-1;i>=0;i--){const d=new Date(n.getFullYear(),n.getMonth(),n.getDate()-i);
  o.push({l:rg=='w'?d.toLocaleString(LC(),{weekday:'short'}).slice(0,2):(i%5==0?d.getDate():''),v:f(dk(d))})}}return o}
function chart(){const d=series(),m=Math.max(1,...d.map(x=>x.v)),w=320/d.length;
 return `<svg viewBox="0 0 320 150" width=100%>${d.map((x,i)=>{const h=x.v/m*105;return `<rect x="${i*w+w*.15}" y="${115-h}" width="${w*.7}" height="${Math.max(h,2)}" rx="${Math.min(6,w*.3)}" fill="var(--ac)" opacity="${x.v?1:.25}"/><text x="${i*w+w/2}" y="136" font-size="10" text-anchor="middle" fill="var(--mu)">${x.l}</text>`}).join('')}</svg><div class=mu>Total: ${d.reduce((a,b)=>a+b.v,0)} · Peak: ${m>1||d.some(x=>x.v)?m:0}</div>`}
function stats(){const ks=Object.keys(S.logs).sort(),tot=ks.reduce((a,k)=>a+dt(k),0),ptot=ks.reduce((a,k)=>a+dp(k),0);
 let st=0,d=new Date();if(!dt(dk(d))&&!dp(dk(d)))d.setDate(d.getDate()-1);
 while(dt(dk(d))||dp(dk(d))){st++;d.setDate(d.getDate()-1)}
 const best=Math.max(0,...ks.map(dt));
 const per={};ks.forEach(k=>{for(const i in S.logs[k].c)per[i]=(per[i]||0)+cc(S.logs[k],i)});
 let tj=0,sn=0;ks.forEach(k=>{const x=S.logs[k].x||{};tj+=(x.tahajjud||{}).v?1:0;sn+=(x.sunnah||{}).v?1:0});
 const qd=ks.reduce((a,k)=>a+dq(k),0);
 return{tot,ptot,st,best,per,tj,sn,qd}}
function setR(r){rg=r;render()}function setM(m){mt=m;render()}

// ===== views =====
const V={
c(){const t=cur(),T=tg(t),p=pg(t);return `${dateBar()}${ptCard()}<div class=card><div style="display:flex;gap:8px;align-items:flex-start"><button class=pick onclick=openSide()><span>${t.n}</span>${IC.m}</button>${t.note?`<button class="nbtn in ${tnO==t.id?'on':''}" onclick=noteTT() aria-label=Note>${IC.nt}</button>`:''}</div>
<div class=ar>${t.ar}</div>${S.set.en&&t.en?`<div class=tr>${t.en}</div>`:''}${S.set.bn&&t.bn?`<div class="tr bn">${t.bn}</div>`:''}</div>
<div class=ring onclick=tap()><svg viewBox="0 0 200 200"><circle class=rb r=90 cx=100 cy=100 /><circle id=rg r=90 cx=100 cy=100 stroke-dasharray=565.5 stroke-dashoffset="${565.5*(1-p/T)}"/></svg><div><span id=cn>${p}</span><span class=mu>of ${T}</span></div></div>
${t.note&&tnO==t.id?`<div class="glass note"><div class=dn style="font-size:.9rem">Note</div><div class="nt bn">${nHTML(t.note)}</div></div>`:''}
<div class=row>${[33,100].map(n=>`<button class="btn ${T==n?'on':''}" onclick=setT(${n})>${n}</button>`).join('')}<button class="btn ${T!=33&&T!=100?'on':''}" onclick=setT(0)>${T!=33&&T!=100?T:'Custom'}</button></div>
<div class=row><button class=btn onclick=reset()>${IC.r} Reset</button><button class=btn onclick=cardC()>${IC.sh} Share</button><button class=btn onclick=openAdd()>${IC.a} New tasbih</button></div>
<p class="mu" style="text-align:center">Today's total: <b id=td>${dt(dk())}</b></p><p class=mu id=ss style="text-align:center;margin-top:-6px;font-size:.75rem">${user?SS:'Not signed in · saved on this device only'}</p>${user?`<div class=row style="margin:0 0 6px"><button class="btn sm syb" onclick=syncNow()>${IC.sy} Sync now</button></div>`:''}`},
p(){const l=day(),n=dp(dk()),nx=ptNext(),t=ptToday(),J=pj;pj=-1;let g='';
 for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=dk(d),L=S.logs[k],X=(L&&L.x)||{};
  g+=`<div class="wd ${i?'':'td'}" onclick="openQ('${k}')"><div class=mu>${d.toLocaleString(LC(),{weekday:'short'}).slice(0,2)}</div>${[0,1,2,3,4].map(j=>`<i class="${L&&L.p[j].v?'on':''} ${L&&L.p[j].v==2?'q':''}"></i>`).join('')}${['tahajjud','sunnah'].map((e,j)=>`<i class="x ${j?'':'x1'} ${(X[e]||{}).v?'on':''}"></i>`).join('')}</div>`}
 const date=new Date().toLocaleDateString(LC(),{weekday:'long',day:'numeric',month:'long'});
 return `<div class="glass pz"><span class=orb></span><button class=nbtn onclick=cardP() aria-label=Share>${IC.sh}</button><div class=dn>🌸 Daily prayers</div><div class=pzd>${date}${t&&t.hj?' · '+t.hj+' AH':''}</div><div class=pzm><b>${n}</b><span>/5</span></div><div class=pzb>${[0,1,2,3,4].map(i=>`<i class="${l.p[i].v?'on':''}"></i>`).join('')}</div><div class=pzs>${pMsg(n)}</div></div>
${PN.map((a,i)=>{const isN=nx&&!nx.tm&&nx.i==i;return `<button class="pd ${l.p[i].v?'done':''} ${l.p[i].v==2?'qz':''} ${isN&&!l.p[i].v?'nx':''} ${J==i?'jp':''}" onclick=togP(${i})><span class=pe>${PE[i]}</span><span class=pn><b>${a}</b> <span class="mu bn">${PB[i]}</span>${l.p[i].v==2?' <span class=qbd>Qaza</span>':''}${ptT(i)}${isN?`<div><span class=nbd>Next · in ${ptD(nx.in)}</span></div>`:''}</span><span class=pk>${IC.k}</span></button>`}).join('')}
${extras()}${qazaCard()}<div class="glass wkc"><div class=mu style="margin-bottom:6px">Last 7 days</div><div class=wk>${g}</div><div class=mu style="margin-top:8px;font-size:.72rem;text-align:center">● on time · ◯ qaza · ▢ Tahajjud, Sunnah · tap a day to log qaza</div></div>`},
s(){const x=stats();return `<div class=row style="justify-content:space-between;margin:0"><h2>Stats</h2><button class=btn onclick=cardS() aria-label=Share>${IC.sh}</button></div><div class=g>${[['Today',dt(dk())],['Total tasbih',x.tot],['Streak',x.st+' d'],['Best day',x.best],['Prayers today',dp(dk())+'/5'],['Prayers total',x.ptot],['Qaza made up',x.qd],['Tahajjud nights',x.tj],['Sunnah days',x.sn]].map(a=>`<div class="card st"><b>${a[1]}</b><span>${a[0]}</span></div>`).join('')}</div>
<div class=card><div class=row style="justify-content:space-between"><span>${[['w','Week'],['m','Month'],['y','Year']].map(a=>`<button class="btn ${rg==a[0]?'on':''}" onclick="setR('${a[0]}')">${a[1]}</button>`).join(' ')}</span><span>${[['t','Tasbih'],['p','Prayer'],['x','Extras']].map(a=>`<button class="btn ${mt==a[0]?'on':''}" onclick="setM('${a[0]}')">${a[1]}</button>`).join(' ')}</span></div>${chart()}</div>
${heat()}<div class=card><div class=mu>By tasbih</div>${all().filter(t=>x.per[t.id]).map(t=>`<div class=pr><span>${t.n}</span><b>${x.per[t.id]}</b></div>`).join('')||'<div class=mu>Nothing yet</div>'}</div>`},
g(){const s=S.set,chk=(k,l)=>`<div class=pr><span>${l}</span><input type=checkbox ${s[k]?'checked':''} onchange="S.set.${k}=this.checked;persist(1);render()"></div>`;
 return `<h2>Settings</h2><div class=card><div class=pr style="display:block"><div class=mu>Interface language</div><select onchange="setUI(this.value)"><option value=en ${s.ui!='bn'?'selected':''}>English</option><option value=bn ${s.ui=='bn'?'selected':''}>বাংলা</option></select></div>${chk('bd','Bengali numerals (০১২)')}</div><div class=card><div class=mu style="margin-bottom:8px">Theme</div>${THEMES.map(t=>`<span class=sw data-theme=${t} title=${t} style="background:linear-gradient(135deg,var(--bg) 50%,var(--ac) 50%);${s.theme==t?'outline:2px solid var(--ac)':''}" onclick="S.set.theme='${t}';persist(1);render()"></span>`).join('')}</div>
<div class=card>${chk('en','English translation')}${chk('bn','বাংলা translation')}${chk('tl','Transliteration (duas)')}${chk('haptic','Haptic vibration (phones)')}<div class=pr style="display:block"><div class=mu>Tap vibration length · ${s.hms} ms</div><input type=range min=10 max=100 step=5 value=${s.hms} oninput="S.set.hms=+this.value;this.previousElementSibling.textContent='Tap vibration length · '+this.value+' ms'" onchange="persist(1);vib(S.set.hms)"></div>
<div class=pr style="display:block"><div class=mu>App font</div><select onchange="S.set.uf=this.value;persist(1);render()">${Object.keys(UF).map(k=>`<option value=${k} ${(s.uf||'nunito')==k?'selected':''}>${UF[k].replace(/'/g,'')}</option>`).join('')}</select></div><div class=pr style="display:block"><div class=mu>Arabic font</div><select onchange="S.set.arf=this.value;persist(1);render()"><option value=amiri ${s.arf=='amiri'?'selected':''}>Amiri (Naskh)</option><option value=quran ${s.arf=='quran'?'selected':''}>Uthmani (Scheherazade)</option><option value=indo ${s.arf=='indo'?'selected':''}>Indo-Pak (Nastaliq)</option></select></div>
<div class=pr style="display:block"><div class=mu>Text size</div><input type=range min=.8 max=1.6 step=.1 value=${s.size} oninput="S.set.size=+this.value;document.documentElement.style.setProperty('--sz',this.value)" onchange="persist(1)"></div></div>
<div class=card><div class=mu style="margin-bottom:8px">Prayer times · city</div>${ptCitySel()}<div class=pr style="display:block"><div class=mu>Calculation method</div><select onchange="S.set.pm=+this.value;persist(1);ptReload()">${PM.map(m=>`<option value=${m[0]} ${s.pm==m[0]?'selected':''}>${m[1]}</option>`).join('')}</select></div><div class=pr style="display:block"><div class=mu>Asr calculation</div><select onchange="S.set.ps=+this.value;persist(1);ptReload()"><option value=1 ${s.ps==1?'selected':''}>Hanafi (later Asr)</option><option value=0 ${s.ps==0?'selected':''}>Shafi'i / Maliki / Hanbali</option></select></div>${chk('h24','24-hour time')}</div>
<div class=card><div class=mu style="margin-bottom:8px">Sync account</div><div id=acc>${acc()}</div></div>
<div class=card><div class=mu style="margin-bottom:8px">Backup</div><div class=row style="justify-content:flex-start"><button class=btn onclick=expData()>Export</button><button class=btn onclick="$('#bf').click()">Import</button></div><input id=bf type=file accept=".json,application/json" hidden onchange="impData(this)"><div class=mu style="margin-top:6px">${S.lb?'Last export: '+new Date(S.lb).toLocaleString():'Never exported'} · import merges into your current data</div></div>
<div class=card><div class=mu style="margin-bottom:8px">Danger zone</div><button class="btn dz" onclick=openReset()>Reset stats…</button></div>`}};
IC.m=sv('<path d="M4 6h16M4 12h16M4 18h16"/>');IC.n=sv('<path d="M5 12h14"/>');IC.cp=sv('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>');
IC.nm=sv('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>');
IC.sy=sv('<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>');
IC.nt=sv('<path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5z"/><path d="M15 3v6h6"/><path d="M8 13h8M8 17h5"/>');
IC.sh=sv('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>');
const star=on=>sv('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>').replace('fill="none"',on?'fill="currentColor"':'fill="none"');
function openSide(){const m=document.createElement('div'),L=S.logs[dk()]||{c:{}};m.className='sb';m.id='sb';
 m.onclick=e=>{if(e.target==m)closeSb()};
 m.innerHTML=`<aside class=glass><div class=sh>My tasbih</div><div class=sl>${all().map(x=>`<button class="di si ${x.id==S.cur?'cur':''}" onclick="pickT('${x.id}')"><span class=sn>${x.n}</span><span class=mu>${cc(L,x.id)}</span></button>`).join('')}</div><button class="btn p" onclick="closeSb();openAdd()">${IC.a} New tasbih</button></aside>`;
 document.body.append(m);requestAnimationFrame(()=>m.classList.add('in'))}
function closeSb(){const m=$('#sb');if(m){m.classList.remove('in');setTimeout(()=>m.remove(),250)}}
let tnO='';
function noteTT(){const id=cur().id;tnO=tnO==id?'':id;render()}
function pickT(id){tnO='';S.cur=id;persist(1);closeSb();render()}
const SEARCH_MIN=8,DC={};let duaQ='',duaN=-1;
const dkey=x=>x.id||((x.name||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'d'+[...(x.arabic||'')].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,7));
const isF=x=>!!(S.fv[dkey(x)]||{}).v;
const dnorm=s=>(s||'').toLowerCase().replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,'');
const dord=()=>D.map((x,i)=>i).filter(i=>duaOk(D[i])).sort((a,b)=>isF(D[b])-isF(D[a])||a-b);
function loadD(){fetch('duas.json').then(r=>r.json()).then(j=>{D=j.duas||[];render();loadX()}).catch(()=>{D=[];render();loadX()})}
function duaGo(n){const o=dord(),p=o.indexOf(duaI);duaI=o[(p+n+o.length)%o.length];render()}
function dList(){const q=dnorm(duaQ.trim());let o=dord();if(q)o=o.filter(i=>{const x=D[i];return dnorm([x.name,x.arabic,x.transliteration,x.en,x.bn,x.cat].join(' ')).includes(q)});
 return o.length?o.map((i,n)=>{const x=D[i];return `<button class=di onclick="duaI=${i};duaO=1;render()"><span class=dnum>${n+1}</span><span>${x.name}${x.src=='x'&&x.cat?`<small class=mu>${xp(x.cat)}</small>`:''}</span><span class="fv ${isF(x)?'on':''}" onclick="event.stopPropagation();favT(${i})">${star(isF(x))}</span>${IC.rr}</button>`}).join(''):'<div class=mu style="padding:16px;text-align:center">No matches</div>'}
// notes: Arabic runs are picked out automatically and shown in the Arabic font
const ARA='\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF';
const A_HAS=new RegExp('['+ARA+']'),A_RUN=new RegExp('['+ARA+'](?:['+ARA+'\\u200c\\u200d ]*['+ARA+'])?','g'),A_FULL=new RegExp('^['+ARA+'\\s\\u200c\\u200d\\d()\\[\\].,:;!?"\'\\-–—]+$');
function nHTML(s){const e=x=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');let out='',pb=true;
 String(s).split('\n').forEach((ln,i)=>{const q=ln.trim(),blk=!!q&&A_HAS.test(q)&&A_FULL.test(q);
  if(i&&!pb&&!blk)out+='\n';
  out+=blk?`<div class="ara blk" dir=rtl>${e(q)}</div>`:e(ln).replace(A_RUN,m=>`<bdi class=ara dir=rtl>${m}</bdi>`);pb=blk});return out}
// ===== 99 names =====
let NM=null,nmI=0,nmO=0,nmQ='',nmF=0,nmN=-1;
const nmK=x=>'nm_'+x.n,nmFav=x=>!!(S.fv[nmK(x)]||{}).v,rk=()=>tab=='nm'?nmK(NM[nmI]):dkey(D[duaI]);
function loadNM(){fetch('names.json').then(r=>r.json()).then(j=>{NM=(j.names||[]).filter(x=>x&&x.arabic).map((x,i)=>({...x,n:Number.isFinite(+x.n)&&x.n!==''&&x.n!=null?+x.n:i+1}));render()}).catch(()=>{NM=[];render()})}
function nmList(){const q=dnorm(nmQ.trim());let o=NM.map((x,i)=>i);if(nmF)o=o.filter(i=>nmFav(NM[i]));if(q)o=o.filter(i=>{const x=NM[i];return dnorm([x.name,x.arabic,x.en,x.bn].join(' ')).includes(q)});
 return o.length?o.map(i=>{const x=NM[i];return `<button class=di onclick="nmI=${i};nmO=1;nmN=-1;render()"><span class=dnum>${x.n||'✦'}</span><span>${x.name}<small class=mu>${x.en||''}</small></span><span class=nra>${x.arabic}</span><span class="fv ${nmFav(x)?'on':''}" onclick="event.stopPropagation();nmFavT(${i})">${star(nmFav(x))}</span></button>`}).join(''):`<div class=mu style="padding:16px;text-align:center">${nmF&&!q?'No favourites yet':'No matches'}</div>`}
function drawNm(){const e=$('#nmlist');if(e)e.innerHTML=nmList()}
function nmFavT(i){const k=nmK(NM[i]);S.fv[k]={v:nmFav(NM[i])?0:1,t:Date.now()};persist();nmO?render():drawNm()}
function nmGo(n){nmI=(nmI+n+NM.length)%NM.length;nmN=-1;render()}
function nmNoteT(){nmN=nmN==nmI?-1:nmI;render()}
function copyNm(){const d=NM[nmI],s=S.set;copyTxt([(d.n?d.n+'. ':'')+d.name,d.arabic,s.en&&d.en,s.bn&&d.bn].filter(Boolean).join('\n')).then(ok=>toast(ok?'Copied':'Copy failed'))}
V.nm=()=>{if(!NM){loadNM();return '<p class=mu>Loading…</p>'}
 if(!NM.length)return '<h2>99 Names</h2><div class=card>Add names in names.json</div>';
 if(!nmO)return `<h2>99 Names of Allah</h2><input id=nq class=srch type=search placeholder="Search names…" value="${nmQ.replace(/"/g,'&quot;')}" oninput="nmQ=this.value;drawNm()"><div class=chips><button class="chip ${nmF?'':'on'}" onclick="nmF=0;render()">All</button><button class="chip ${nmF?'on':''}" onclick="nmF=1;render()">★ Favourites</button></div><div class="glass dl" id=nmlist>${nmList()}</div>`;
 nmI=Math.min(nmI,NM.length-1);const d=NM[nmI],s=S.set,k=nmK(d),T=S.dt[k]||3,c=DC[k]||0;
 return `<div class=row style="justify-content:space-between"><button class=btn onclick="nmO=0;nmN=-1;render()">${IC.l} All names</button><span class=row style="margin:0"><button class="btn ${nmFav(d)?'on':''}" onclick="nmFavT(nmI)" aria-label=Favourite>${star(nmFav(d))}</button><button class=btn onclick=copyNm() aria-label=Copy>${IC.cp}</button><button class=btn onclick=cardN() aria-label=Share>${IC.sh}</button></span></div>
<div class="glass dua"><span class=orb></span>${d.note?`<button class="nbtn ${nmN==nmI?'on':''}" onclick=nmNoteT() aria-label=Note>${IC.nt}</button>`:''}<div class=dn>${d.n?d.n+' · ':''}${d.name}</div><div class=orn>${ORN}</div><div class="ar big">${d.arabic}</div>${s.en&&d.en?`<div class=tr>${d.en}</div>`:''}${s.bn&&d.bn?`<div class="tr bn">${d.bn}</div>`:''}</div>
${d.note&&nmN==nmI?`<div class="glass note"><div class=dn style="font-size:.9rem">Note</div><div class="nt bn">${nHTML(d.note)}</div></div>`:''}
<div class=row style="align-items:center"><span class=mu>Repeat</span>${[3,7].map(m=>`<button class="btn ${T==m?'on':''}" onclick=repT(${m})>${m}×</button>`).join('')}<button class="btn ${T!=3&&T!=7?'on':''}" onclick=repC()>${T!=3&&T!=7?T+'×':'Custom'}</button><button class="btn p" id=rc onclick=repTap() style="min-width:84px">${c} / ${T}</button><button class=btn onclick=repReset() aria-label=Reset>${IC.r}</button></div>
<div class=row style="align-items:center;gap:18px"><button class=btn onclick=nmGo(-1)>${IC.l}</button><span class=mu>${d.n} / ${Math.max(...NM.map(x=>x.n))}</span><button class=btn onclick=nmGo(1)>${IC.rr}</button></div>`};
function noteT(){duaN=duaN==duaI?-1:duaI;render()}
function drawList(){const e=$('#dlist');if(e)e.innerHTML=dList()}
function favT(i){const k=dkey(D[i]);S.fv[k]={v:isF(D[i])?0:1,t:Date.now()};persist();duaO?render():drawList()}
function fbCopy(t){const a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0;user-select:text;-webkit-user-select:text';document.body.append(a);a.select();let ok=false;try{ok=document.execCommand('copy')}catch(e){}a.remove();return Promise.resolve(ok)}
function copyTxt(t){return navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(t).then(()=>true).catch(()=>fbCopy(t)):fbCopy(t)}
function copyDua(){const d=D[duaI],s=S.set;copyTxt([d.name,d.arabic,s.tl&&d.transliteration,s.en&&d.en,s.bn&&d.bn].filter(Boolean).join('\n\n')).then(ok=>toast(ok?'Copied':'Copy failed'))}
function repT(n){const k=rk();S.dt[k]=n;DC[k]=0;persist(1);render()}
function repC(){const k=rk(),n=parseInt(prompt('Repeat how many times?',S.dt[k]||3));if(!n||n<1)return;repT(n)}
function repReset(){DC[rk()]=0;render()}
function repTap(){const k=rk(),T=S.dt[k]||3;let n=DC[k]||0;if(n>=T)n=0;n++;DC[k]=n;
 if(n>=T){vib([80,60,80,60,250]);toast('Done · '+T+'×')}else vib(S.set.hms||35);$('#rc').textContent=n+' / '+T}
V.d=()=>{if(!D){loadD();return '<p class=mu>Loading…</p>'}
 if(!D.length)return '<h2>Duas</h2><div class=card>No duas yet. Add some in duas.json</div>';
 if(!duaO){const sr=D.length>=SEARCH_MIN;if(!sr)duaQ='';return `<h2>Duas</h2>${sr?`<input id=dq class=srch type=search placeholder="Search duas…" value="${duaQ.replace(/"/g,'&quot;')}" oninput="duaQ=this.value;drawList()">`:''}${duaChips()}<div class="glass dl" id=dlist>${dList()}</div>${duaStatus()}`}
 duaI=Math.min(duaI,D.length-1);const d=D[duaI],s=S.set,k=dkey(d),T=S.dt[k]||3,n=DC[k]||0,o=dord();
 return `<div class=row style="justify-content:space-between"><button class=btn onclick="duaO=0;duaN=-1;render()">${IC.l} All duas</button><span class=row style="margin:0"><button class="btn ${isF(d)?'on':''}" onclick="favT(duaI)" aria-label=Favourite>${star(isF(d))}</button><button class=btn onclick=copyDua() aria-label=Copy>${IC.cp}</button><button class=btn onclick=cardD() aria-label=Share>${IC.sh}</button></span></div>
<div class="glass dua"><span class=orb></span>${d.note?`<button class="nbtn ${duaN==duaI?'on':''}" onclick=noteT() aria-label=Note>${IC.nt}</button>`:''}<div class=dn>${d.name}</div><div class=orn>${ORN}</div><div class="ar big">${d.arabic}</div>${s.tl&&d.transliteration?`<div class=trl>${d.transliteration}</div>`:''}${s.en&&d.en?`<div class=tr>${d.en}</div>`:''}${s.bn&&d.bn?`<div class="tr bn">${d.bn}</div>`:''}</div>
${d.note&&duaN==duaI?`<div class="glass note"><div class=dn style="font-size:.9rem">Note</div><div class="nt bn">${nHTML(d.note)}</div></div>`:''}
<div class=row style="align-items:center"><span class=mu>Repeat</span>${[3,7].map(m=>`<button class="btn ${T==m?'on':''}" onclick=repT(${m})>${m}×</button>`).join('')}<button class="btn ${T!=3&&T!=7?'on':''}" onclick=repC()>${T!=3&&T!=7?T+'×':'Custom'}</button><button class="btn p" id=rc onclick=repTap() style="min-width:84px">${n} / ${T}</button><button class=btn onclick=repReset() aria-label=Reset>${IC.r}</button></div>
<div class=row style="align-items:center;gap:18px"><button class=btn onclick=duaGo(-1)>${IC.l}</button><span class=mu>${o.indexOf(duaI)+1} / ${o.length}</span><button class=btn onclick=duaGo(1)>${IC.rr}</button></div>`};
function acc(){if(!fb)return FC.apiKey.startsWith('YOUR')?'<span class=mu>Add your Firebase config in index.html to enable sync. Data is saved on this device meanwhile.</span>':'<span class=mu>Loading…</span>';
 if(user)return `<p>Signed in: <b>${user.email.split('@')[0]}</b></p><div class=mu style="margin:-6px 0 10px">${S.ls?'Last synced: '+new Date(S.ls).toLocaleString():'Not synced yet'}</div><div class=row style="justify-content:flex-start"><button class="btn p syb" onclick=syncNow()>${IC.sy} Sync now</button><button class=btn onclick="fb.Au.signOut(fb.auth)">Sign out</button></div>`;
 return `<div style="display:grid;gap:8px"><input id=em placeholder=Username autocapitalize=none autocomplete=username><input id=pw type=password placeholder=Password><div class=row><button class="btn p" onclick="auth(0)">Sign in</button><button class=btn onclick="auth(1)">Sign up</button></div></div>`}
function auth(n){const a=fb.Au,e=$('#em').value.trim().toLowerCase().replace(/\s+/g,'')+'@tasbih-app.com',p=$('#pw').value;(n?a.createUserWithEmailAndPassword:a.signInWithEmailAndPassword)(fb.auth,e,p).catch(x=>alert(x.message))}

function render(){if(LIB.includes(tab))libLast=tab;document.body.dataset.theme=S.set.theme;document.documentElement.lang=isBn()?'bn':'en';const r=document.documentElement.style;r.setProperty('--sz',S.set.size);r.setProperty('--arf',AF[S.set.arf]);r.setProperty('--uf',UF[S.set.uf||'nunito']);
 $('#v').innerHTML=V[tab]();
 $('#nav').innerHTML=[['c','','Count'],['p','','Prayers'],['lib','','Library'],['s','','Stats'],['g','','Settings']].map(a=>{const lb=a[0]=='lib';return `<button class="${(lb?LIB.includes(tab):tab==a[0])?'on':''}" onclick="tab=${lb?'libLast':`'${a[0]}'`};render()">${IC[a[0]]}${a[2]}</button>`}).join('')}

// ===== firebase sync =====
async function syncNow(){if(syncNow.b)return;if(!user||!fb)return toast('Sign in to sync');if(!navigator.onLine)return toast('You are offline');
 syncNow.b=1;const sp=on=>document.querySelectorAll('.syb').forEach(b=>b.classList.toggle('syncing',on));sp(1);setSS('Syncing…');
 try{const s=await fb.F.getDocFromServer(fb.F.doc(fb.db,'users',user.uid));R=fromWire(s.exists()?s.data():{});merge(R);await push();if(/failed/i.test(SS))throw 0;
  S.ls=Date.now();localStorage.setItem(KEY,JSON.stringify(S));refresh();setSS('Synced');toast('Synced ✓')}
 catch(e){setSS('Sync failed · saved on this device');toast('Sync failed')}
 syncNow.b=0;sp(0);if(tab=='g')render()}
let fb=null,user=null,first=true;
async function initFB(){if(FC.apiKey.startsWith('YOUR'))return;const B='https://www.gstatic.com/firebasejs/10.12.0/';
 try{const[A,Au,F]=await Promise.all(['app','auth','firestore'].map(m=>import(B+'firebase-'+m+'.js')));
 const app=A.initializeApp(FC);fb={Au,F,auth:Au.getAuth(app),db:F.initializeFirestore(app,{localCache:F.persistentLocalCache({tabManager:F.persistentMultipleTabManager()})})};
 Au.onAuthStateChanged(fb.auth,u=>{user=u;first=true;if(u)listen();else if(unsub){unsub();unsub=0}tab=='g'&&render()});tab=='g'&&render()}catch(e){console.warn('Firebase offline',e)}}
let R=norm({}),SS='';
function setSS(t){SS=t;const e=$('#ss');if(e)e.textContent=t}
function mergeInto(T,r){norm(r);r.tl.forEach(x=>{if(!T.tl.find(y=>y.id==x.id))T.tl.push(x)});
 for(const d in r.logs){const a=T.logs[d]=T.logs[d]||{c:{},x:{},z:{},p:[0,0,0,0,0].map(()=>({v:0,t:0}))},b=r.logs[d];
  for(const k in b.c){const ao=a.c[k]=cobj(a.c[k]);for(const v in b.c[k])ao[v]=Math.max(ao[v]||0,b.c[k][v])}
  b.p.forEach((x,i)=>{if(x.t>a.p[i].t||(x.t==a.p[i].t&&x.v>a.p[i].v))a.p[i]=x});a.x=a.x||{};for(const k in b.x){const y=b.x[k],z=a.x[k];if(!z||y.t>z.t||(y.t==z.t&&y.v>z.v))a.x[k]=y};a.z=a.z||{};for(const k in b.z)a.z[k]=Math.max(a.z[k]||0,b.z[k])}
 for(const k in r.tt)if(!T.tt[k]||r.tt[k].t>T.tt[k].t)T.tt[k]=r.tt[k];
 for(const k in r.bs)if(!T.bs[k]||r.bs[k].t>T.bs[k].t)T.bs[k]=r.bs[k];
 for(const k in r.fv)if(!T.fv[k]||r.fv[k].t>T.fv[k].t)T.fv[k]=r.fv[k];
 if(r.qz.t>T.qz.t)T.qz=r.qz}
function merge(r){mergeInto(S,r)}
function fromWire(x){const T=norm({});if(x.d)mergeInto(T,norm(JSON.parse(x.d)));
 const o=norm({tl:Object.values(x.tl||{}),tt:x.tt||{},bs:x.bs||{},fv:x.fv||{},qz:x.qz,logs:{}});
 for(const d in x.logs||{}){const w=x.logs[d];o.logs[d]={c:w.c||{},x:w.x||{},z:w.z||{},p:[0,1,2,3,4].map(i=>(w.p&&w.p[i])||{v:0,t:0})}}
 mergeInto(T,norm(o));return T}
function delta(Rm){const o={logs:{},tt:{},bs:{},tl:{},fv:{}};let n=0;
 for(const d in S.logs){const l=S.logs[d],r=Rm.logs[d]||{c:{},p:[],x:{}},od={c:{},p:{},x:{}};let h=0;
  for(const k in l.c)for(const v in l.c[k])if(l.c[k][v]>(((r.c[k]||{})[v])||0)){(od.c[k]=od.c[k]||{})[v]=l.c[k][v];h=1}
  l.p.forEach((x,i)=>{const y=r.p[i]||{v:0,t:0};if(x.t>y.t||(x.t==y.t&&x.v>y.v)){od.p[i]=x;h=1}});
  for(const k in l.x||{}){const x=l.x[k],y=(r.x||{})[k]||{v:0,t:0};if(x.t>y.t||(x.t==y.t&&x.v>y.v)){od.x[k]=x;h=1}}
  for(const k in l.z||{})if(l.z[k]>((r.z||{})[k]||0)){(od.z=od.z||{})[k]=l.z[k];h=1}
  if(h){if(!Object.keys(od.c).length)delete od.c;if(!Object.keys(od.p).length)delete od.p;if(!Object.keys(od.x).length)delete od.x;o.logs[d]=od;n++}}
 for(const k in S.tt)if(S.tt[k].t>(Rm.tt[k]||{t:-1}).t){o.tt[k]=S.tt[k];n++}
 for(const k in S.bs)if(S.bs[k].t>(Rm.bs[k]||{t:-1}).t){o.bs[k]=S.bs[k];n++}
 for(const k in S.fv)if(S.fv[k].t>(Rm.fv[k]||{t:-1}).t){o.fv[k]=S.fv[k];n++}
 if(S.qz.t>Rm.qz.t){o.qz=S.qz;n++}
 S.tl.forEach(x=>{if(!Rm.tl.find(y=>y.id==x.id)){o.tl[x.id]=x;n++}});
 for(const k of['logs','tt','bs','tl','fv'])if(!Object.keys(o[k]).length)delete o[k];
 return n?o:null}
function refresh(){const a=JSON.stringify([S.tl,S.tt,S.bs,S.fv,S.qz]),b=JSON.stringify(S.logs);
 if(a!=refresh.a)render();else if(b!=refresh.b)tab=='c'&&$('#cn')?upd():render();refresh.a=a;refresh.b=b}
let unsub;function listen(){unsub&&unsub();unsub=fb.F.onSnapshot(fb.F.doc(fb.db,'users',user.uid),s=>{
 R=fromWire(s.exists()?s.data():{});merge(R);localStorage.setItem(KEY,JSON.stringify(S));refresh();
 if(!s.metadata.hasPendingWrites&&!s.metadata.fromCache)setSS('Synced');push()})}
async function push(){if(!user||!fb)return;
 if(!navigator.onLine){wasOff=true;return setSS('Offline · saved on this device, will sync later')}
 const o=delta(R);if(!o)return;const off=wasOff,p={...S.pend};setSS('Saving…');
 try{await fb.F.setDoc(fb.F.doc(fb.db,'users',user.uid),o,{merge:true});setSS('Synced');S.ls=Date.now();
  if(off&&(S.pend.c||S.pend.p)){const q=S.pend;S.pend={c:0,p:0};wasOff=false;modal(`<h2>Synced</h2><p>Your offline progress is saved to your account:</p><div class=g><div class="card st"><b>${q.c}</b><span>tasbih counts</span></div><div class="card st"><b>${q.p}</b><span>prayers marked</span></div></div><button class="btn p" onclick=closeM()>Done</button>`)}
  else{S.pend.c=Math.max(0,S.pend.c-p.c);S.pend.p=Math.max(0,S.pend.p-p.p)}
  localStorage.setItem(KEY,JSON.stringify(S))}catch(e){setSS('Sync failed · saved on this device')}}
// ===== photo card =====
const cv=n=>getComputedStyle(document.body).getPropertyValue(n).trim();
function wrapT(x,t,w){const L=[];String(t).split('\n').forEach(p=>{let l='';p.split(' ').forEach(wd=>{const a=l?l+' '+wd:wd;if(l&&x.measureText(a).width>w){L.push(l);l=wd}else l=a});L.push(l)});return L}
async function makeCard(sp){
 const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const bg=cv('--bg')||'#eef5f0',cd=cv('--cd')||'#fff',ac=cv('--ac')||'#1f7a5c',tx=cv('--tx')||'#173a2f',mu=cv('--mu')||'#6b8a7e';
 const af=AF[S.set.arf]||AF.amiri,bn="'Noto Sans Bengali','Hind Siliguri',sans-serif",uf=UF[S.set.uf||'nunito']||'Nunito',uf2=uf+','+bn;
 try{await Promise.all(['40px '+af,'40px '+bn,'40px '+uf].map(f=>document.fonts.load(f,'ابAঅ')))}catch(e){}
 x.fillStyle=bg;x.fillRect(0,0,W,H);
 let g=x.createRadialGradient(150,100,0,150,100,700);g.addColorStop(0,ac);g.addColorStop(1,'transparent');x.globalAlpha=.28;x.fillStyle=g;x.fillRect(0,0,W,H);
 g=x.createRadialGradient(1000,1150,0,1000,1150,600);g.addColorStop(0,ac);g.addColorStop(1,'transparent');x.globalAlpha=.2;x.fillStyle=g;x.fillRect(0,0,W,H);
 x.globalAlpha=.78;x.fillStyle=cd;x.beginPath();x.roundRect?x.roundRect(60,60,W-120,H-120,56):x.rect(60,60,W-120,H-120);x.fill();
 x.globalAlpha=.25;x.strokeStyle=ac;x.lineWidth=2;x.stroke();x.globalAlpha=1;
 x.textAlign='center';x.textBaseline='middle';x.direction='ltr';
 let ts=46;do{x.font=`700 ${ts}px ${uf2}`;ts-=2}while(x.measureText(sp.title).width>800&&ts>24);
 let tl=[sp.title];
 if(x.measureText(sp.title).width>800){ts=34;x.font=`700 ${ts}px ${uf2}`;tl=wrapT(x,sp.title,800);if(tl.length>2){ts=26;x.font=`700 ${ts}px ${uf2}`;tl=wrapT(x,sp.title,800).slice(0,3)}}
 x.fillStyle=ac;tl.forEach((t,i)=>x.fillText(t,W/2,175+(i-(tl.length-1)/2)*ts*1.22));
 x.strokeStyle=ac;x.fillStyle=ac;x.lineWidth=3;x.globalAlpha=.75;x.beginPath();x.moveTo(380,232);x.lineTo(510,232);x.moveTo(570,232);x.lineTo(700,232);x.stroke();
 x.beginPath();x.moveTo(540,220);x.lineTo(552,232);x.lineTo(540,244);x.lineTo(528,232);x.closePath();x.fill();x.globalAlpha=1;
 const mk=k=>{const o=[],add=(t,fs,fam,col,lh,st)=>{x.direction='ltr';x.font=`${st||''} ${fs*k}px ${fam}`;o.push({L:wrapT(x,t,800),f:x.font,col,lh:fs*k*lh,rtl:fam===af})};
  if(sp.ar)add(sp.ar,84,af,tx,1.9);for(const l of sp.lines)add(l.t,34,l.k=='bn'?bn:uf2,l.k=='tl'?ac:mu,1.55,l.k=='tl'?'italic':'');return o};
 const ht=(B,k)=>B.length?B.reduce((a,b)=>a+b.L.length*b.lh,0)+36*k*(B.length-1):0;
 let k=1,B=mk(k);const R=sp.res||0,AV=880-R;while(ht(B,k)>AV-20&&k>(sp.mk||.45)){k-=.05;B=mk(k)}
 if(sp.mk&&ht(B,k)>AV-20)throw new Error('toolong');
 let y=290+(AV-ht(B,k))/2;
 B.forEach((b,i)=>{x.font=b.f;x.fillStyle=b.col;x.direction=b.rtl?'rtl':'ltr';b.L.forEach(l=>{x.fillText(l,W/2,y+b.lh/2);y+=b.lh});y+=36*k});
 x.direction='ltr';sp.post&&sp.post(x,{W,y:290+AV,ac,bg,tx,mu,uf2});x.direction='ltr';x.font=`700 30px ${uf2}`;x.fillStyle=ac;x.globalAlpha=.8;x.fillText('Tasbih',W/2,1235);x.globalAlpha=1;
 return c}
let CB=null;
async function cardShow(sp){toast('Making card…');
 try{const c=await makeCard(sp),b=await new Promise(r=>c.toBlob(r,'image/png')),u=URL.createObjectURL(b);
  CB={b,u,f:new File([b],'tasbih-card.png',{type:'image/png'})};
  modal(`<img src="${u}" style="max-width:100%;max-height:58vh;justify-self:center;border-radius:16px"><div class=row><button class="btn p" onclick=cardShare()>${IC.sh} Share</button><button class=btn onclick=cardSave()>Save</button><button class=btn onclick=cardClose()>Close</button></div>`)}
 catch(e){toast(e.message=='toolong'?'This verse is too long for a card':'Could not make card')}}
function cardShare(){if(navigator.canShare&&navigator.canShare({files:[CB.f]}))navigator.share({files:[CB.f]}).catch(()=>{});else cardSave()}
function cardSave(){const a=document.createElement('a');a.href=CB.u;a.download='tasbih-card-'+dk()+'.png';document.body.append(a);a.click();a.remove()}
function cardClose(){CB&&URL.revokeObjectURL(CB.u);CB=null;closeM()}
const cl=(s,t,k)=>s&&t?{t,k}:null;
function cardD(){const d=D[duaI],s=S.set;cardShow({title:d.name,ar:d.arabic,lines:[cl(s.tl,d.transliteration,'tl'),cl(s.en,d.en,'tr'),cl(s.bn,d.bn,'bn')].filter(Boolean)})}
function cardN(){const d=NM[nmI],s=S.set;cardShow({title:(d.n?d.n+' · ':'')+d.name,ar:d.arabic,lines:[cl(s.en,d.en,'tr'),cl(s.bn,d.bn,'bn')].filter(Boolean)})}
const rrect=(x,a,b,w,h,r)=>{x.beginPath();x.roundRect?x.roundRect(a,b,w,h,r):x.rect(a,b,w,h)};
function cardC(){const t=cur(),s=S.set,p=pg(t),T=tg(t),td=dt(dk());
 cardShow({title:t.n,ar:t.ar,res:430,lines:[cl(s.en,t.en,'tr'),cl(s.bn,t.bn,'bn')].filter(Boolean),post:(x,o)=>{
  const cx=o.W/2,cy=o.y+190,r=140;x.lineWidth=26;x.lineCap='round';
  x.strokeStyle=o.bg;x.beginPath();x.arc(cx,cy,r,0,7);x.stroke();
  if(p){x.strokeStyle=o.ac;x.beginPath();x.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+2*Math.PI*p/T);x.stroke()}
  x.textAlign='center';x.fillStyle=o.tx;x.font=`800 96px ${o.uf2}`;x.fillText(p,cx,cy-8);
  x.fillStyle=o.mu;x.font=`600 30px ${o.uf2}`;x.fillText('of '+T,cx,cy+62);
  x.font=`600 34px ${o.uf2}`;x.fillText("Today's total: "+td,cx,o.y+395)}})}
function cardS(){const x0=stats(),d=series(),m=Math.max(1,...d.map(v=>v.v)),tot=d.reduce((a,b)=>a+b.v,0);
 const cells=[['Today',dt(dk())],['Total tasbih',x0.tot],['Streak',x0.st+' d'],['Best day',x0.best]];
 const RN={w:'This week',m:'Last 30 days',y:'This year'}[rg],MN={t:'Tasbih',p:'Prayers',x:'Extras'}[mt];
 cardShow({title:'My stats',res:880,lines:[],post:(x,o)=>{
  cells.forEach((c,i)=>{const a=140+(i%2)*410,b=o.y+Math.floor(i/2)*150;x.globalAlpha=.14;x.fillStyle=o.ac;rrect(x,a,b,390,130,28);x.fill();x.globalAlpha=1;
   x.fillStyle=o.ac;x.font=`800 54px ${o.uf2}`;x.fillText(c[1],a+195,b+50);x.fillStyle=o.mu;x.font=`600 26px ${o.uf2}`;x.fillText(c[0],a+195,b+101)});
  x.fillStyle=o.mu;x.font=`600 28px ${o.uf2}`;x.fillText(MN+' · '+RN,o.W/2,o.y+345);
  const w=800/d.length,base=o.y+700;
  d.forEach((v,i)=>{const h=Math.max(v.v/m*300,4),a=140+i*w+w*.15;x.globalAlpha=v.v?1:.25;x.fillStyle=o.ac;rrect(x,a,base-h,w*.7,h,Math.min(8,w*.3));x.fill();x.globalAlpha=1;x.fillStyle=o.mu;x.font=`600 22px ${o.uf2}`;x.fillText(v.l,a+w*.35,base+30)});
  x.font=`600 28px ${o.uf2}`;x.fillStyle=o.mu;x.fillText('Total: '+tot+' · Peak: '+(tot?m:0),o.W/2,base+95)}})}
const PE=['🌅','☀️','🌤️','🌇','🌙'];
const pMsg=n=>n>=5?'All five done, Alhamdulillah 🎉':n==4?'So close, just one more 💫':n>=2?'Mashallah, keep going ✨':n==1?'A lovely start 🌸':'Bismillah, let us begin 🤍';
function cardP(){const l=day(),n=dp(dk()),t=ptToday(),X=l.x||{},bnf="'Noto Sans Bengali','Hind Siliguri',sans-serif",on=cv('--on')||'#fff',
 date=new Date().toLocaleDateString(LC(),{weekday:'long',day:'numeric',month:'long',year:'numeric'})+(t&&t.hj?' · '+t.hj+' AH':'');
 cardShow({title:'Daily prayers',res:880,lines:[],post:(x,o)=>{const y0=o.y,W=o.W;
  x.textAlign='center';x.fillStyle=o.mu;x.font=`600 28px ${o.uf2}`;x.fillText(date,W/2,y0+10);
  x.fillStyle=o.ac;x.font=`800 120px ${o.uf2}`;x.fillText(n+' / 5',W/2,y0+95);
  for(let i=0;i<5;i++){x.globalAlpha=l.p[i].v?1:.2;x.fillStyle=l.p[i].v==2?'#e0a030':o.ac;rrect(x,287+i*104,y0+172,90,22,11);x.fill()}x.globalAlpha=1;
  x.fillStyle=o.ac;x.font=`700 32px ${o.uf2}`;x.fillText(pMsg(n),W/2,y0+236);
  PN.forEach((a,i)=>{const by=y0+280+i*98,cy=by+44,d=l.p[i].v,qc=d==2?'#e0a030':o.ac;
   x.globalAlpha=d?.24:.11;x.fillStyle=qc;rrect(x,140,by,800,88,32);x.fill();x.globalAlpha=1;
   if(d){x.fillStyle=qc;x.beginPath();x.arc(194,cy,27,0,7);x.fill();x.strokeStyle=on;x.lineWidth=5;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(183,cy+1);x.lineTo(191,cy+9);x.lineTo(206,cy-9);x.stroke()}
   else{x.globalAlpha=.45;x.strokeStyle=o.ac;x.lineWidth=4;x.beginPath();x.arc(194,cy,27,0,7);x.stroke();x.globalAlpha=1}
   x.textAlign='left';x.font='40px sans-serif';x.fillStyle=o.tx;x.fillText(PE[i],245,cy+2);
   x.font=`700 36px ${o.uf2}`;x.fillStyle=o.tx;x.fillText(a,310,cy);const w=x.measureText(a).width;
   x.font=`600 28px ${bnf}`;x.fillStyle=o.mu;if(!isBn())x.fillText(PB[i],310+w+16,cy+1);
   if(d==2){const bw=isBn()?0:x.measureText(PB[i]).width,px=310+w+16+bw+16;x.fillStyle=qc;rrect(x,px,cy-17,92,34,17);x.fill();x.fillStyle='#5a3d00';x.font=`800 22px ${o.uf2}`;x.textAlign='center';x.fillText('Qaza',px+46,cy+1)}
   if(t){x.textAlign='right';x.font=`800 36px ${o.uf2}`;x.fillStyle=d?qc:o.tx;x.fillText(ptF(t[a]),915,cy)}});
  [['tahajjud','🌙 Tahajjud'],['sunnah','✨ Sunnah']].forEach((c,i)=>{const d=(X[c[0]]||{}).v,a=140+i*410,b=y0+790;
   x.globalAlpha=d?1:.13;x.fillStyle=o.ac;rrect(x,a,b,390,70,35);x.fill();x.globalAlpha=1;
   x.textAlign='center';x.fillStyle=d?on:o.mu;x.font=`700 30px ${o.uf2}`;x.fillText(c[1]+(d?'  ✓':''),a+195,b+36)});
  x.textAlign='center'}})}
// ===== heatmap + date bar =====
function heat(){const f=mt=='t'?dt:mt=='p'?dp:dx,t=new Date(),s=new Date(t.getFullYear(),t.getMonth(),t.getDate()-t.getDay()-25*7),cs=[];let m=1,o='';
 for(let i=0;i<182;i++){const d=new Date(s.getFullYear(),s.getMonth(),s.getDate()+i);if(d>t)break;const v=f(dk(d));m=Math.max(m,v);cs.push([i,d,v])}
 const op=[.13,.35,.55,.78,1];
 cs.forEach(([i,d,v])=>{const c=Math.floor(i/7),r=i%7,l=v?Math.min(4,Math.ceil(v/m*4)):0;
  o+=`<rect x="${c*14}" y="${16+r*14}" width="11" height="11" rx="3" fill="var(--ac)" opacity="${op[l]}"/>`;
  if(r==0&&d.getDate()<=7)o+=`<text x="${c*14}" y="9" font-size="9" fill="var(--mu)">${d.toLocaleString(LC(),{month:'short'})}</text>`});
 o+=`<text x="266" y="124" font-size="9" text-anchor="end" fill="var(--mu)">Less</text>${op.map((q,j)=>`<rect x="${270+j*14}" y="116" width="11" height="11" rx="3" fill="var(--ac)" opacity="${q}"/>`).join('')}<text x="340" y="124" font-size="9" fill="var(--mu)">More</text>`;
 return `<div class=card><div class=mu style="margin-bottom:6px">Activity · last 26 weeks</div><svg viewBox="0 0 364 130" width=100%>${o}</svg></div>`}
const dbT=()=>new Date().toLocaleTimeString(LC(),{hour:'numeric',minute:'2-digit'}),dbD=()=>new Date().toLocaleDateString(LC(),{weekday:'long',day:'numeric',month:'long',year:'numeric'});
function dateBar(){return `<div class=glass style="padding:12px 18px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center"><span id=dbd class=mu style="font-size:.85rem">${dbD()}</span><b id=dbt style="color:var(--ac)">${dbT()}</b></div>`}
setInterval(()=>{const a=$('#dbt'),b=$('#dbd');if(a&&b){a.textContent=dbT();b.textContent=dbD()}},15000);
// ===== prayer times (AlAdhan API) =====
const PTK='tasbih_pt',PTN=['Fajr','Dhuhr','Asr','Maghrib','Isha'],PEM=['🌅','☀️','🌤️','🌇','🌙'],PBN=['ফজর','যোহর','আসর','মাগরিব','এশা'];
const BDC=[['Dhaka',23.8103,90.4125],['Chattogram',22.3569,91.7832],['Khulna',22.8456,89.5403],['Rajshahi',24.3745,88.6042],['Sylhet',24.8949,91.8687],['Barishal',22.7010,90.3535],['Rangpur',25.7439,89.2752],['Mymensingh',24.7471,90.4203],['Cumilla',23.4607,91.1809],['Gazipur',23.9999,90.4203],['Narayanganj',23.6238,90.5000],["Cox's Bazar",21.4272,92.0058],['Bogura',24.8481,89.3730],['Jashore',23.1664,89.2081],['Dinajpur',25.6217,88.6354],['Noakhali',22.8696,91.0995],['Pabna',24.0064,89.2372],['Tangail',24.2513,89.9167],['Faridpur',23.6070,89.8429],['Kishoreganj',24.4260,90.7766]];
const PM=[[1,'Karachi (Bangladesh / South Asia)'],[3,'Muslim World League'],[2,'ISNA (North America)'],[5,'Egyptian'],[4,'Umm al-Qura (Makkah)']];
S.set.loc??={n:'Dhaka',lat:23.8103,lon:90.4125,tz:'Asia/Dhaka'};S.set.pm??=1;S.set.ps??=1;S.set.h24??=false;
let PT=null,ptBusy=0,ptFail=0,ptErr='';try{PT=JSON.parse(localStorage.getItem(PTK)||'null')}catch(e){}
const hm=x=>{const a=x.split(':');return +a[0]*60+ +a[1]};
const ptF=x=>{if(S.set.h24)return x;const a=x.split(':');return (a[0]%12||12)+':'+a[1]+' '+(a[0]<12?'AM':'PM')};
const ptD=m=>m>=60?Math.floor(m/60)+'h '+(m%60)+'m':m+' min';
const ptKey=(y,m)=>{const l=S.set.loc;return [l.n,l.lat,l.lon,l.c,S.set.pm,S.set.ps,y,m].join('|')};
function ptNow(){const tz=(PT&&PT.tz)||S.set.loc.tz||undefined;
 try{const p=new Intl.DateTimeFormat('en-GB',{timeZone:tz,year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()),g=t=>+p.find(x=>x.type==t).value;
  return{y:g('year'),m:g('month'),d:g('day'),min:(g('hour')%24)*60+g('minute')}}
 catch(e){const n=new Date();return{y:n.getFullYear(),m:n.getMonth()+1,d:n.getDate(),min:n.getHours()*60+n.getMinutes()}}}
function ptToday(n){n=n||ptNow();if(!PT||PT.k!=ptKey(n.y,n.m))return null;return PT.days[n.d-1]||null}
function ptUrl(y,m){const l=S.set.loc,q=new URLSearchParams({method:S.set.pm,school:S.set.ps});let ep;
 if(l.lat!=null){q.set('latitude',l.lat);q.set('longitude',l.lon);if(l.tz)q.set('timezonestring',l.tz);ep='calendar'}
 else{q.set('city',l.n);q.set('country',l.c||'Bangladesh');ep='calendarByCity'}
 return 'https://api.aladhan.com/v1/'+ep+'/'+y+'/'+m+'?'+q}
function ptLoad(){const n=ptNow(),k=ptKey(n.y,n.m);
 if(PT&&PT.k==k)return Promise.resolve(true);if(ptBusy)return ptBusy;
 if(ptFail&&Date.now()-ptFail<60000)return Promise.resolve(false);
 return ptBusy=fetch(ptUrl(n.y,n.m)).then(r=>r.json()).then(j=>{if(!j||j.code!=200||!j.data||!j.data.length)throw new Error('API '+(j&&j.code)+' '+String(j&&(j.data||j.status)||'').slice(0,40));
  PT={k,tz:(j.data[0].meta||{}).timezone||S.set.loc.tz||'',days:j.data.map(x=>{const o={};PTN.concat('Sunrise').forEach(a=>o[a]=String(x.timings[a]).slice(0,5));
   const h=x.date&&x.date.hijri;o.hj=h?h.day+' '+h.month.en+' '+h.year:'';return o})};
  localStorage.setItem(PTK,JSON.stringify(PT));ptFail=0;return true}).catch(e=>{ptFail=Date.now();ptErr=String(e&&e.message||e).slice(0,70);return false}).then(ok=>{ptBusy=0;ptRefresh(ok);return ok})}
function ptNext(){const n=ptNow(),t=ptToday(n);if(!t)return null;
 for(let i=0;i<5;i++){const x=hm(t[PTN[i]]);if(x>n.min)return{i,in:x-n.min,t:t[PTN[i]]}}
 return{i:0,in:hm(t.Fajr)+1440-n.min,t:t.Fajr,tm:1}}
const mF=m=>ptF(String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0'));
function ptForb(t){const sr=hm(t.Sunrise),dh=hm(t.Dhuhr),mg=hm(t.Maghrib);return [['Sunrise','সূর্যোদয়',sr,sr+15],['Zawal (noon)','দুপুর',dh-6,dh],['Sunset','সূর্যাস্ত',mg-15,mg]]}
function ptForbNow(){const n=ptNow(),t=ptToday(n);if(!t)return '';const f=ptForb(t).find(a=>n.min>=a[2]&&n.min<a[3]);return f?`<span class=ptfz>⚠ Forbidden time (${f[0]}) · ends ${mF(f[3])}</span>`:''}
function ptInner(x,l){return x?`<span class=pte>${PEM[x.i]}</span><span class=ptx><span class=ptl>Next prayer</span><b class=ptn>${PTN[x.i]} <span class="bn ptb">${PBN[x.i]}</span></b><span class=ptw>${ptF(x.t)}${x.tm?' · tomorrow':''} · 📍 ${l.n}</span>${ptForbNow()}</span><span class=ptp>in ${ptD(x.in)}</span>`
 :`<span class=pte>🌸</span><span class=ptx><b class=ptn>${ptFail?'Prayer times unavailable':'Loading prayer times…'}</b><span class=ptw>${ptFail?ptErr+' · tap to retry':'📍 '+l.n}</span></span>`}
function ptCard(){ptLoad();return `<div class="glass ptc" id=ptc onclick=ptOpen()>${ptInner(ptNext(),S.set.loc)}</div>`}
function ptT(i){ptLoad();const t=ptToday();return t?`<br><span class=mu style="font-size:.75rem">${ptF(t[PTN[i]])}</span>`:''}
function ptRefresh(ok){const e=$('#ptc');if(e)e.innerHTML=ptInner(ptNext(),S.set.loc);if(ok&&tab=='p')render();const m=$('#ptm');if(m)m.innerHTML=ptModal()}
function ptCitySel(){const l=S.set.loc;
 return `<select onchange="ptSetCity(this.value)">${BDC.map(c=>`<option ${c[0]==l.n&&!l.g&&!l.c?'selected':''}>${c[0]}</option>`).join('')}<option value=__gps ${l.g?'selected':''}>${l.g?'My location':'Use my location…'}</option><option value=__oth ${l.c?'selected':''}>${l.c?l.n+', '+l.c:'Other city…'}</option></select>`}
function ptFR(a,b){const A=mF(a),B=mF(b);return(/ [AP]M$/.test(A)&&A.slice(-2)==B.slice(-2))?A.replace(/ [AP]M$/,'')+'–'+B:A+'–'+B}
const ptFI=i=>i==-1?0:i==1?1:i==3?2:-1;
function ptModal(){const t=ptToday(),x=ptNext(),l=S.set.loc,n=ptNow(),F=t?ptForb(t):[];
 const R=[['Fajr','ফজর',0,'🌅'],['Sunrise','সূর্যোদয়',-1,'🌄'],['Dhuhr','যোহর',1,'☀️'],['Asr','আসর',2,'🌤️'],['Maghrib','মাগরিব',3,'🌇'],['Isha','এশা',4,'🌙']];
 const rows=t?R.map(r=>{const nx=x&&x.i==r[2],past=!nx&&hm(t[r[0]])<=n.min,f=F[ptFI(r[2])],fo=f&&n.min>=f[2]&&n.min<f[3];
  return `<div class="ptr ${nx?'nx':''} ${past?'past':''} ${r[2]<0?'sr':''}"><span class=pe>${r[3]}</span><span class=pn><b>${r[0]}</b> <span class="mu bn">${r[1]}</span>${nx?`<div><span class=nbd>Next · in ${ptD(x.in)}</span></div>`:''}</span>${past?'<span class=ptck>✓</span>':''}<span class=ptz><b class=ptt>${ptF(t[r[0]])}</b>${f?`<span class="ptfs ${fo?'on':''}">🚫 ${ptFR(f[2],f[3])}</span>`:''}</span></div>`}).join(''):`<div class=mu style="padding:12px;text-align:center">${ptFail?'Unavailable · '+ptErr:'Loading…'}</div>`;
 const fb=t?`<div class=mu style="font-size:.72rem;margin:2px 4px 10px;text-align:center">🚫 = forbidden time, no voluntary prayer (approx: sunrise +15 min, noon −6 min, sunset −15 min)</div>`:'';
 return `<div class=pth><div class=ptt2>🕌 Prayer times</div><div class=ptsub>📍 ${l.n}${t&&t.hj?' · '+t.hj+' AH':''}</div></div><div>${rows}</div>${fb}${ptCitySel()}<div class=row style="margin:4px 0 0"><button class="btn p" onclick=cardPT()>${IC.sh} Photo card</button><button class=btn onclick=closeM()>Done</button></div>`}
function cardPT(){const t=ptToday();if(!t){toast('Prayer times not loaded yet');return}
 const nx0=ptNext(),F=ptForb(t),l=S.set.loc,on=cv('--on')||'#fff',bnf="'Noto Sans Bengali','Hind Siliguri',sans-serif",
 date=new Date().toLocaleDateString(LC(),{weekday:'long',day:'numeric',month:'long'})+(t.hj?' · '+t.hj+' AH':''),
 R=[['Fajr','ফজর',0,'🌅'],['Sunrise','সূর্যোদয়',-1,'🌄'],['Dhuhr','যোহর',1,'☀️'],['Asr','আসর',2,'🌤️'],['Maghrib','মাগরিব',3,'🌇'],['Isha','এশা',4,'🌙']],
 mth=((PM.find(m=>m[0]==S.set.pm)||['',''])[1]).split(' (')[0]+' · '+(S.set.ps==1?'Hanafi Asr':"Shafi'i Asr");
 closeM();
 cardShow({title:'Prayer times',res:880,lines:[],post:(x,o)=>{const y0=o.y,W=o.W;
  x.textAlign='center';x.fillStyle=o.mu;x.font=`600 28px ${o.uf2}`;x.fillText(date,W/2,y0+10);
  x.fillStyle=o.ac;x.font=`700 32px ${o.uf2}`;x.fillText('📍 '+l.n,W/2,y0+60);
  let by=y0+112;
  R.forEach(r=>{const sr=r[2]<0,h=sr?74:100,nx=nx0&&nx0.i==r[2],cy=by+h/2,tc=nx?on:o.tx,mc=nx?on:o.mu;
   x.globalAlpha=nx?1:(sr?.08:.13);x.fillStyle=o.ac;rrect(x,140,by,800,h,h/2.8);x.fill();x.globalAlpha=1;
   x.globalAlpha=nx?.3:.2;x.fillStyle=nx?'#fff':o.ac;x.beginPath();x.arc(206,cy,sr?25:34,0,7);x.fill();x.globalAlpha=1;
   x.textAlign='center';x.font=(sr?'30px':'40px')+' sans-serif';x.fillStyle=tc;x.fillText(r[3],206,cy+2);
   x.textAlign='left';x.font=`700 ${sr?30:38}px ${o.uf2}`;x.fillStyle=tc;x.fillText(r[0],268,cy);const w=x.measureText(r[0]).width;
   x.font=`600 ${sr?24:28}px ${bnf}`;x.fillStyle=mc;if(!isBn())x.fillText(r[1],268+w+14,cy+1);
   if(nx){const bw=isBn()?0:x.measureText(r[1]).width,BW=isBn()?112:84,px=268+w+14+bw+14;x.fillStyle='#fff';rrect(x,px,cy-16,BW,32,16);x.fill();x.fillStyle=o.ac;x.font=`800 20px ${o.uf2}`;x.textAlign='center';x.fillText('Next',px+BW/2,cy+1)}
   const f=F[ptFI(r[2])];
   x.textAlign='right';x.font=`800 ${f?(sr?30:36):(sr?32:40)}px ${o.uf2}`;x.fillStyle=nx?on:(sr?o.mu:o.ac);x.fillText(ptF(t[r[0]]),905,f?cy-(sr?13:16):cy);
   if(f){const tx2=ptFR(f[2],f[3]);x.font=`800 ${sr?19:21}px ${o.uf2}`;const fw=x.measureText('🚫 '+tx2).width+24,fh=sr?26:30,fy=cy+(sr?10:12);
    x.fillStyle='#f7d8a0';rrect(x,905-fw,fy,fw,fh,fh/2);x.fill();x.fillStyle='#8a4b00';x.textAlign='center';x.fillText('🚫 '+tx2,905-fw/2,fy+fh/2+1)}
   by+=h+14});
  x.textAlign='center';x.fillStyle=o.mu;x.font=`600 24px ${o.uf2}`;x.fillText(mth,W/2,by+30)}})}
function ptOpen(){ptFail=0;ptLoad();modal(`<div id=ptm style="display:grid;gap:10px">${ptModal()}</div>`)}
function ptAfter(){render();const m=$('#ptm');if(m)m.innerHTML=ptModal()}
async function ptApply(l){const old=S.set.loc;S.set.loc=l;persist(1);PT=null;ptFail=0;localStorage.removeItem(PTK);toast('Loading prayer times…');
 await ptLoad();const ok=await ptLoad();
 if(!ok){S.set.loc=old;persist(1);PT=null;ptFail=0;toast('Could not load times for that place');ptLoad()}
 ptAfter()}
function ptSetCity(v){
 if(v=='__gps'){if(!navigator.geolocation){toast('Location not supported');return ptAfter()}
  navigator.geolocation.getCurrentPosition(p=>ptApply({n:'My location',lat:+p.coords.latitude.toFixed(4),lon:+p.coords.longitude.toFixed(4),g:1}),()=>{toast('Location permission denied');ptAfter()},{timeout:10000});return}
 if(v=='__oth'){const c=(prompt('City name (e.g. Makkah)')||'').trim();if(!c)return ptAfter();const k=(prompt('Country (e.g. Saudi Arabia)')||'').trim();if(!k)return ptAfter();return ptApply({n:c,c:k})}
 const c=BDC.find(x=>x[0]==v);if(c)ptApply({n:c[0],lat:c[1],lon:c[2],tz:'Asia/Dhaka'})}
async function ptReload(){PT=null;ptFail=0;localStorage.removeItem(PTK);await ptLoad();await ptLoad();ptAfter()}
setInterval(()=>{if(!ptToday())ptLoad();const e=$('#ptc');if(e)e.innerHTML=ptInner(ptNext(),S.set.loc)},20000);
addEventListener('online',()=>{ptFail=0;ptLoad()});
// ===== Bangla UI layer =====
// Translates rendered text in place, so templates stay English. Unknown strings fall back to English.
const LC=()=>S.set.ui=='bn'?'bn-BD':'en',isBn=()=>S.set.ui=='bn';
const BNN='০১২৩৪৫৬৭৮৯',bdig=s=>s.replace(/\d/g,d=>BNN[d]);
const BD={
'Count':'গণনা','Prayers':'নামাজ','Stats':'পরিসংখ্যান','Duas':'দোয়া','Names':'নাম','Settings':'সেটিংস',
'Reset':'রিসেট','Share':'শেয়ার','Save':'সংরক্ষণ','New tasbih':'নতুন তাসবিহ','Custom':'কাস্টম',"Today's total:":'আজকের মোট:',
'Not signed in · saved on this device only':'সাইন ইন করা নেই · শুধু এই ডিভাইসে সংরক্ষিত','Sync now':'এখনই সিঙ্ক করুন',
'Note':'টীকা','Add':'যোগ করুন','Done':'সম্পন্ন','Cancel':'বাতিল','Close':'বন্ধ করুন','Continue':'চালিয়ে যান',
'Daily prayers':'দৈনিক নামাজ','Fajr':'ফজর','Dhuhr':'যোহর','Asr':'আসর','Maghrib':'মাগরিব','Isha':'এশা','Sunrise':'সূর্যোদয়','Zawal (noon)':'দুপুর (যাওয়াল)','Sunset':'সূর্যাস্ত',
'Tahajjud':'তাহাজ্জুদ','Sunnah':'সুন্নাত','Qaza':'কাযা','Next':'পরবর্তী','Next prayer':'পরবর্তী নামাজ',
'Missed prayers (qaza)':'কাযা নামাজ','+ missed · − made up · tap the number to set it':'+ ছুটে গেছে · − আদায় হয়েছে · সংখ্যায় ট্যাপ করে নির্ধারণ করুন',
'Log a qaza prayer':'কাযা নামাজ লিখুন','Log qaza':'কাযা লিখুন','Pick the date you missed, then tap a prayer to mark it as made up (qaza).':'যে তারিখের নামাজ ছুটেছিল সেটি বেছে নিন, তারপর নামাজে ট্যাপ করে কাযা হিসেবে চিহ্নিত করুন।',
'Not prayed':'পড়া হয়নি','On time':'সময়মতো','Last 7 days':'গত ৭ দিন','● on time · ◯ qaza · ▢ Tahajjud, Sunnah · tap a day to log qaza':'● সময়মতো · ◯ কাযা · ▢ তাহাজ্জুদ, সুন্নাত · কাযা লিখতে একটি দিনে ট্যাপ করুন',
'Prayer times':'নামাজের সময়','Loading prayer times…':'নামাজের সময় লোড হচ্ছে…','Prayer times unavailable':'নামাজের সময় পাওয়া যায়নি','Loading…':'লোড হচ্ছে…','Unavailable':'পাওয়া যায়নি','Photo card':'ফটো কার্ড',
'🚫 = forbidden time, no voluntary prayer (approx: sunrise +15 min, noon −6 min, sunset −15 min)':'🚫 = নিষিদ্ধ সময়, নফল নামাজ নয় (আনুমানিক: সূর্যোদয়ের পর ১৫ মিনিট, দুপুরের আগে ৬ মিনিট, সূর্যাস্তের আগে ১৫ মিনিট)',
'Today':'আজ','Total tasbih':'মোট তাসবিহ','Streak':'ধারাবাহিকতা','Best day':'সেরা দিন','Prayers today':'আজকের নামাজ','Prayers total':'মোট নামাজ','Qaza made up':'কাযা আদায়','Tahajjud nights':'তাহাজ্জুদের রাত','Sunnah days':'সুন্নাতের দিন',
'Week':'সপ্তাহ','Month':'মাস','Year':'বছর','Tasbih':'তাসবিহ','Prayer':'নামাজ','Extras':'অতিরিক্ত','By tasbih':'তাসবিহ অনুযায়ী','Nothing yet':'এখনো কিছু নেই','Less':'কম','More':'বেশি',
'Activity · last 26 weeks':'কার্যকলাপ · গত ২৬ সপ্তাহ','This week':'এই সপ্তাহ','Last 30 days':'গত ৩০ দিন','This year':'এই বছর','My stats':'আমার পরিসংখ্যান',
'Duas':'দোয়া','All duas':'সব দোয়া','All names':'সব নাম','All':'সব','★ Favourites':'★ প্রিয়','No matches':'কিছু পাওয়া যায়নি','No favourites yet':'এখনো কোনো প্রিয় নেই','Repeat':'পুনরাবৃত্তি','99 Names of Allah':'আল্লাহর ৯৯টি নাম','99 Names':'৯৯টি নাম',
'No duas yet. Add some in duas.json':'এখনো কোনো দোয়া নেই। duas.json-এ যোগ করুন',
'My tasbih':'আমার তাসবিহ','New tasbih':'নতুন তাসবিহ',
'Interface language':'ভাষা','Bengali numerals (০১২)':'বাংলা সংখ্যা (০১২)','Theme':'থিম','English translation':'ইংরেজি অনুবাদ','বাংলা translation':'বাংলা অনুবাদ','Transliteration (duas)':'উচ্চারণ (দোয়া)','Haptic vibration (phones)':'কম্পন (ফোন)',
'App font':'অ্যাপের ফন্ট','Arabic font':'আরবি ফন্ট','Text size':'লেখার আকার','Prayer times · city':'নামাজের সময় · শহর','Calculation method':'গণনা পদ্ধতি','Asr calculation':'আসর গণনা','Hanafi (later Asr)':'হানাফি (দেরিতে আসর)',"Shafi'i / Maliki / Hanbali":'শাফেয়ি / মালিকি / হাম্বলি','24-hour time':'২৪ ঘণ্টার সময়',
'Sync account':'সিঙ্ক অ্যাকাউন্ট','Sign in':'সাইন ইন','Sign up':'সাইন আপ','Sign out':'সাইন আউট','Signed in:':'সাইন ইন:','Not synced yet':'এখনো সিঙ্ক হয়নি','Synced':'সিঙ্ক হয়েছে','Syncing…':'সিঙ্ক হচ্ছে…','Saving…':'সংরক্ষণ হচ্ছে…',
'Offline · saved on this device, will sync later':'অফলাইন · এই ডিভাইসে সংরক্ষিত, পরে সিঙ্ক হবে','Sync failed · saved on this device':'সিঙ্ক ব্যর্থ · এই ডিভাইসে সংরক্ষিত',
'Backup':'ব্যাকআপ','Export':'এক্সপোর্ট','Import':'ইম্পোর্ট','Danger zone':'বিপদ অঞ্চল','Reset stats…':'পরিসংখ্যান রিসেট…','Reset stats':'পরিসংখ্যান রিসেট',
"Choose what to erase. This can't be undone.":'কী মুছবেন বেছে নিন। এটি ফেরানো যাবে না।','Tasbih counts':'তাসবিহ গণনা','All dhikr counts, daily totals and streak':'সব জিকিরের গণনা, দৈনিক মোট ও ধারাবাহিকতা','History of the five prayers':'পাঁচ ওয়াক্তের ইতিহাস',
'Extra prayers':'অতিরিক্ত নামাজ','Tahajjud and Sunnah history':'তাহাজ্জুদ ও সুন্নাতের ইতিহাস','Qaza counter':'কাযা কাউন্টার','Set back to 0':'০-তে ফিরিয়ে আনুন','Export a backup first':'আগে ব্যাকআপ এক্সপোর্ট করুন','Are you sure?':'আপনি কি নিশ্চিত?','Erase now':'এখনই মুছুন',
'Target complete':'লক্ষ্য পূর্ণ','Synced ✓':'সিঙ্ক হয়েছে ✓','Sync failed':'সিঙ্ক ব্যর্থ','Sign in to sync':'সিঙ্ক করতে সাইন ইন করুন','You are offline':'আপনি অফলাইনে আছেন','Backup exported':'ব্যাকআপ এক্সপোর্ট হয়েছে','Backup restored':'ব্যাকআপ ফিরিয়ে আনা হয়েছে','Stats reset':'পরিসংখ্যান রিসেট হয়েছে',
'Copied':'কপি হয়েছে','Copy failed':'কপি ব্যর্থ','Making card…':'কার্ড তৈরি হচ্ছে…','Could not make card':'কার্ড তৈরি করা যায়নি','Prayer times not loaded yet':'নামাজের সময় এখনো লোড হয়নি','Location not supported':'লোকেশন সমর্থিত নয়','Location permission denied':'লোকেশনের অনুমতি দেওয়া হয়নি',
'Could not load times for that place':'ওই স্থানের সময় লোড করা যায়নি','Loading prayer times…':'নামাজের সময় লোড হচ্ছে…','My location':'আমার অবস্থান','Use my location…':'আমার অবস্থান ব্যবহার করুন…','Other city…':'অন্য শহর…',
'Custom target':'কাস্টম লক্ষ্য','Repeat how many times?':'কতবার পড়বেন?','Missed prayers owed':'বাকি কাযা নামাজ','City name (e.g. Makkah)':'শহরের নাম (যেমন: মক্কা)','Country (e.g. Saudi Arabia)':'দেশ (যেমন: সৌদি আরব)','That file is not a valid Tasbih backup.':'এটি সঠিক Tasbih ব্যাকআপ ফাইল নয়।',
'Name':'নাম','Arabic text':'আরবি টেক্সট','English translation':'ইংরেজি অনুবাদ','Target (default 33)':'লক্ষ্য (ডিফল্ট ৩৩)','Note (optional) - hadith or significance':'টীকা (ঐচ্ছিক) - হাদিস বা গুরুত্ব','New tasbih':'নতুন তাসবিহ',
'Search duas…':'দোয়া খুঁজুন…','Search names…':'নাম খুঁজুন…','Username':'ইউজারনেম','Password':'পাসওয়ার্ড',
'Synced':'সিঙ্ক হয়েছে','Your offline progress is saved to your account:':'আপনার অফলাইন অগ্রগতি অ্যাকাউন্টে সংরক্ষিত হয়েছে:','tasbih counts':'তাসবিহ গণনা','prayers marked':'নামাজ চিহ্নিত',
'All five done, Alhamdulillah 🎉':'পাঁচ ওয়াক্তই সম্পন্ন, আলহামদুলিল্লাহ 🎉','So close, just one more 💫':'প্রায় শেষ, আর মাত্র একটি 💫','Mashallah, keep going ✨':'মাশাআল্লাহ, চালিয়ে যান ✨','A lovely start 🌸':'সুন্দর শুরু 🌸','Bismillah, let us begin 🤍':'বিসমিল্লাহ, শুরু করি 🤍',
'Add your Firebase config in index.html to enable sync. Data is saved on this device meanwhile.':'সিঙ্ক চালু করতে index.html-এ Firebase কনফিগ যোগ করুন। এর মধ্যে ডেটা এই ডিভাইসে সংরক্ষিত থাকবে।',
'Daily prayers':'দৈনিক নামাজ','Photo card':'ফটো কার্ড'};
const SUB=[[' · tomorrow',' · আগামীকাল'],[' · tap to retry',' · আবার চেষ্টা করতে ট্যাপ করুন'],['Never exported','এখনো এক্সপোর্ট হয়নি'],['Last export: ','সর্বশেষ এক্সপোর্ট: '],['Last synced: ','সর্বশেষ সিঙ্ক: '],[' · import merges into your current data',' · ইম্পোর্ট বর্তমান ডেটার সাথে মিলে যাবে'],
 [' AM',' এএম'],[' PM',' পিএম'],['Done · ','সম্পন্ন · ']];
const BU=s=>s.replace(/(\d+)h/,'$1 ঘণ্টা').replace(/(\d+)m\b/,'$1 মিনিট').replace(/(\d+) min\b/,'$1 মিনিট');
const RX=[[/^of (\d+)$/,'$1 এর মধ্যে'],[/^(\d+) d$/,'$1 দিন'],[/^Total: (\d+) · Peak: (\d+)$/,'মোট: $1 · সর্বোচ্চ: $2'],
 [/^Tap vibration length · (\d+) ms$/,'ট্যাপ কম্পনের দৈর্ঘ্য · $1 মি.সে.'],
 [/^Next · in (.+)$/,(m,a)=>'পরবর্তী · '+BU(a)+' পরে'],[/^in (\d+h \d+m|\d+h|\d+m|\d+ min)$/,(m,a)=>BU(a)+' পরে'],
 [/^⚠ Forbidden time \((.+)\) · ends (.+)$/,(m,a,b)=>'⚠ নিষিদ্ধ সময় ('+(BD[a]||a)+') · শেষ '+b.replace(/ AM\b/,' এএম').replace(/ PM\b/,' পিএম')]];
function trS(s){const t=s.trim();if(!t)return s;let r=BD[t];
 if(r==null){const m=t.match(/^([^A-Za-z0-9]*)([\s\S]*)$/);if(m[1]&&BD[m[2]]!=null)r=m[1]+BD[m[2]]}
 if(r==null)for(const[re,f]of RX)if(re.test(t)){r=t.replace(re,f);break}
 if(r==null){r=t;for(const[a,b]of SUB)if(r.includes(a))r=r.split(a).join(b);if(r==t)return s}
 return s.match(/^\s*/)[0]+r+s.match(/\s*$/)[0]}
function loc1(s){if(!s)return s;if(isBn())s=trS(s);if(S.set.bd)s=bdig(s);return s}
const LSKIP=/^(SCRIPT|STYLE|TEXTAREA|OPTION)$/;
function locT(n){const p=n.parentNode;if(!p||(p.nodeName!='OPTION'&&LSKIP.test(p.nodeName))||(p.closest&&p.closest('.ar,.nox')))return;const v=n.nodeValue,w=loc1(v);if(w!==v)n.nodeValue=w}
function locN(r){if(r.nodeType==3)return locT(r);if(r.nodeType!=1)return;
 const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT),a=[];let n;while(n=w.nextNode())a.push(n);a.forEach(locT);
 if(isBn())[r,...r.querySelectorAll('[placeholder],[aria-label]')].forEach(e=>['placeholder','aria-label'].forEach(k=>{const v=e.getAttribute&&e.getAttribute(k);if(v){const t=trS(v);if(t!==v)e.setAttribute(k,t)}}))}
new MutationObserver(ms=>{for(const m of ms){if(m.type=='characterData')locT(m.target);else m.addedNodes.forEach(locN)}}).observe(document.body,{childList:true,subtree:true,characterData:true});
// native dialogs and canvas cards are not DOM text, so translate them separately
const _pr=window.prompt.bind(window),_al=window.alert.bind(window);window.prompt=(m,d)=>_pr(loc1(m),d);window.alert=m=>_al(loc1(String(m)));
const _mt=CanvasRenderingContext2D.prototype.measureText;CanvasRenderingContext2D.prototype.measureText=function(t){return _mt.call(this,typeof t=='string'?loc1(t):t)};
const _ft=CanvasRenderingContext2D.prototype.fillText;CanvasRenderingContext2D.prototype.fillText=function(t,...a){return _ft.call(this,typeof t=='string'?loc1(t):t,...a)};
function setUI(v){S.set.ui=v;S.set.bd=v=='bn';persist(1);render()}
// ===== Quran reader (UmmahAPI) =====
// Surah list is built in, so it works offline. Verses come from UmmahAPI once per surah and are kept in IndexedDB.
const QAPI='https://ummahapi.com';
const QN=['Al-Fatihah','Al-Baqarah',"Ali 'Imran",'An-Nisa',"Al-Ma'idah","Al-An'am","Al-A'raf",'Al-Anfal','At-Tawbah','Yunus','Hud','Yusuf',"Ar-Ra'd",'Ibrahim','Al-Hijr','An-Nahl','Al-Isra','Al-Kahf','Maryam','Ta-Ha','Al-Anbiya','Al-Hajj',"Al-Mu'minun",'An-Nur','Al-Furqan',"Ash-Shu'ara",'An-Naml','Al-Qasas',"Al-'Ankabut",'Ar-Rum','Luqman','As-Sajdah','Al-Ahzab','Saba','Fatir','Ya-Sin','As-Saffat','Sad','Az-Zumar','Ghafir','Fussilat','Ash-Shuraa','Az-Zukhruf','Ad-Dukhan','Al-Jathiyah','Al-Ahqaf','Muhammad','Al-Fath','Al-Hujurat','Qaf','Adh-Dhariyat','At-Tur','An-Najm','Al-Qamar','Ar-Rahman',"Al-Waqi'ah",'Al-Hadid','Al-Mujadila','Al-Hashr','Al-Mumtahanah','As-Saff',"Al-Jumu'ah",'Al-Munafiqun','At-Taghabun','At-Talaq','At-Tahrim','Al-Mulk','Al-Qalam','Al-Haqqah',"Al-Ma'arij",'Nuh','Al-Jinn','Al-Muzzammil','Al-Muddaththir','Al-Qiyamah','Al-Insan','Al-Mursalat','An-Naba',"An-Nazi'at","'Abasa",'At-Takwir','Al-Infitar','Al-Mutaffifin','Al-Inshiqaq','Al-Buruj','At-Tariq',"Al-A'la",'Al-Ghashiyah','Al-Fajr','Al-Balad','Ash-Shams','Al-Layl','Ad-Duhaa','Ash-Sharh','At-Tin',"Al-'Alaq",'Al-Qadr','Al-Bayyinah','Az-Zalzalah',"Al-'Adiyat","Al-Qari'ah",'At-Takathur',"Al-'Asr",'Al-Humazah','Al-Fil','Quraysh',"Al-Ma'un",'Al-Kawthar','Al-Kafirun','An-Nasr','Al-Masad','Al-Ikhlas','Al-Falaq','An-Nas'];
const QV=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
const QBIS='بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
let qO=0,qQ='',qJ=0,qVi=1,qFv=0,qErr=null,qRaw='',qDl=0,qInit=0;const QC={},qL={},QD=new Set();
S.qr??=null;S.qb??={};S.set.qbn??=true;S.set.qen??=true;S.set.qtl??=false;S.set.qsz??=1;S.set.qvm??=false;
IC.q=sv('<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6v13"/>');
Object.assign(BD,{'Quran':'কুরআন','All surahs':'সব সূরা','Continue reading':'পড়া চালিয়ে যান','Search surahs…':'সূরা খুঁজুন…','Stop':'থামান','Last read here':'এখানে শেষ পড়েছেন','Transliteration':'উচ্চারণ','Retry':'আবার চেষ্টা করুন','Details':'বিস্তারিত',
 "Couldn't load this surah":'এই সূরা লোড করা যায়নি','You are offline and this surah is not downloaded yet.':'আপনি অফলাইনে আছেন এবং এই সূরা এখনো ডাউনলোড করা হয়নি।',
 'Too many requests. Wait a minute and retry.':'অনেক বেশি অনুরোধ হয়েছে। এক মিনিট পরে আবার চেষ্টা করুন।',
 'Could not reach UmmahAPI. Check your connection and retry.':'UmmahAPI-তে সংযোগ করা যায়নি। ইন্টারনেট দেখে আবার চেষ্টা করুন।',
 'The API replied in a format this app does not understand yet.':'API এমন ফরম্যাটে উত্তর দিয়েছে যা অ্যাপ এখনো বুঝতে পারছে না।',
 'Quran data:':'কুরআনের ডেটা:','Rate limit reached, try again later':'অনুরোধের সীমা শেষ, পরে চেষ্টা করুন','Download stopped':'ডাউনলোড বন্ধ হয়েছে','This verse is too long for a card':'এই আয়াতটি কার্ডের জন্য অনেক লম্বা','Bookmark added':'বুকমার্ক যোগ হয়েছে','Bookmark removed':'বুকমার্ক সরানো হয়েছে'});
RX.push([/^(\d+) verses$/,'$1 আয়াত'],[/^Downloading… (\d+) \/ (\d+)$/,'ডাউনলোড হচ্ছে… $1 / $2'],[/^Download for offline \((\d+) \/ (\d+)\)$/,'অফলাইনের জন্য ডাউনলোড ($1 / $2)']);
const qe=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const qk=s=>dnorm(String(s)).replace(/[^a-z0-9\u0600-\u06ff]/g,'');
const qdb=(()=>{let p;const open=()=>p||(p=new Promise((res,rej)=>{const r=indexedDB.open('tasbih_quran',1);r.onupgradeneeded=()=>r.result.createObjectStore('s');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}));
 const tx=(m,f)=>open().then(db=>new Promise((res,rej)=>{const t=db.transaction('s',m),rq=f(t.objectStore('s'));t.oncomplete=()=>res(rq.result);t.onerror=()=>rej(t.error)}));
 return{get:k=>tx('readonly',s=>s.get(k)),set:(k,v)=>tx('readwrite',s=>s.put(v,k)),keys:()=>tx('readonly',s=>s.getAllKeys())}})();
// --- reading the API response (field names are matched loosely) ---
const qStr=x=>x==null?'':typeof x=='string'?x:typeof x=='object'?(x.text||x.translation||x.value||x.uthmani||x.arabic||''):String(x);
function qArr(j){let d=j&&j.data!==undefined?j.data:j;if(d&&!Array.isArray(d)){const k=['verses','ayahs','ayat'].find(k=>Array.isArray(d[k]));if(k)return d[k];
 if(d.surah&&Array.isArray(d.surah.verses))return d.surah.verses;const f=Object.values(d).find(v=>Array.isArray(v)&&v.length&&typeof v[0]=='object');if(f)return f}return Array.isArray(d)?d:[]}
const qNum=(v,i)=>{for(const k of['ayah','verse_number','verse','ayah_number','number_in_surah','numberInSurah']){const x=v[k];if(x!=null&&+x>0&&+x<=300)return+x}return i+1};
const qAr=v=>qStr(v.arabic!==undefined?v.arabic:v.text_uthmani!==undefined?v.text_uthmani:v.uthmani!==undefined?v.uthmani:v.arabic_text!==undefined?v.arabic_text:v.text_arabic!==undefined?v.text_arabic:v.text);
const qTl=v=>qStr(v.transliteration!==undefined?v.transliteration:v.transliteration_text!==undefined?v.transliteration_text:v.translit);
function qTr(v,key){const t=v.translations!==undefined?v.translations:v.translation;if(t==null)return qStr(v.text_translation!==undefined?v.text_translation:v[key]);if(typeof t=='string')return t;
 if(Array.isArray(t)){const o=t.find(x=>x&&[x.key,x.slug,x.name,x.translation_key,x.id].includes(key))||t[0];return qStr(o)}
 return qStr(t[key]!==undefined?t[key]:Object.values(t)[0])}
const qNorm=s=>s.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,'').replace(/[\u0671]/g,'ا');
function qNoBis(n,ar){if(n==1||n==9)return ar;const w=ar.split(/\s+/);if(w.length>4&&qNorm(w.slice(0,4).join(' '))==qNorm(QBIS))return w.slice(4).join(' ');return ar}
async function qGet(path){const r=await fetch(QAPI+path,{headers:{Accept:'application/json'}});if(r.status==429)throw new Error('rate');if(!r.ok)throw new Error('http '+r.status);const j=await r.json();if(j&&j.success===false)throw new Error('api');return j}
async function qFetch(n){
 const[b,e]=await Promise.allSettled([qGet(`/api/quran/surah/${n}?translation=bengali`),qGet(`/api/quran/surah/${n}?translation=sahih_international`)]);
 if(b.status=='rejected'&&e.status=='rejected')throw e.reason&&e.reason.message=='rate'?e.reason:(b.reason||e.reason);
 const A=b.status=='fulfilled'?qArr(b.value):[],B=e.status=='fulfilled'?qArr(e.value):[],base=A.length?A:B;
 if(!base.length||!base.some(v=>qAr(v))){qRaw=JSON.stringify((b.status=='fulfilled'?b.value:e.value),null,1).slice(0,900);throw new Error('shape')}
 const em={};B.forEach((v,i)=>em[qNum(v,i)]=v);
 const v=base.map((x,i)=>{const a=qNum(x,i),y=A.length?x:null,z=A.length?em[a]:x;return{n:a,ar:qNoBis(n,qAr(x)),tl:qTl(x)||(z?qTl(z):''),bn:y?qTr(y,'bengali'):'',en:z?qTr(z,'sahih_international'):''}});
 return{v,t:Date.now()}}
async function qLoad(n){if(QC[n]||qL[n])return;qL[n]=1;qErr=null;
 try{let c=null;try{c=await qdb.get('s'+n)}catch(e){}
  if(!c){if(!navigator.onLine)throw new Error('offline');c=await qFetch(n);try{await qdb.set('s'+n,c);QD.add(n)}catch(e){}}
  QC[n]=c}catch(e){qErr={n,m:e.message}}
 qL[n]=0;if(tab=='q'&&qO==n)render()}
async function qAll(){if(qDl){qDl=0;return}if(!navigator.onLine)return toast('You are offline');qDl=1;render();
 for(let n=1;n<=114&&qDl;n++){if(QD.has(n))continue;try{const c=await qFetch(n);await qdb.set('s'+n,c);QD.add(n)}catch(e){toast(e.message=='rate'?'Rate limit reached, try again later':'Download stopped');break}
  const b=$('#qdl');if(b)b.textContent=`Downloading… ${QD.size} / 114`;await new Promise(r=>setTimeout(r,300))}
 qDl=0;if(tab=='q'&&!qO)render()}
// --- views ---
function qRows(){const q=qk(qQ.trim());const o=[];for(let n=1;n<=114;n++)if(!q||qk(n+' '+QN[n-1]).includes(q))o.push(n);
 return o.length?o.map(n=>`<button class=di onclick="qOpen(${n})"><span class=dnum>${n}</span><span>${qe(QN[n-1])}<small class=mu>${QV[n-1]} verses</small></span>${QD.has(n)?'<span class=qok>✓</span>':''}${IC.rr}</button>`).join(''):'<div class=mu style="padding:16px;text-align:center">No matches</div>'}
function qDraw(){const e=$('#qlist');if(e)e.innerHTML=qRows()}
function qOpen(n,a){if(n<1||n>114)return;qO=n;qJ=a||0;qVi=a||1;qErr=null;render();if(!a)scrollTo(0,0)}
function qT(k){S.set[k]=!S.set[k];if(k=='qvm'){if(S.set.qvm){if(S.qr&&S.qr.s==qO)qVi=S.qr.a}else qJ=qVi}persist(1);render()}
function qZ(d){S.set.qsz=Math.min(1.8,Math.max(.8,+(S.set.qsz+d).toFixed(2)));persist(1);render()}
function qMark(a){S.qr={s:qO,a,t:Date.now()};persist(1);document.querySelectorAll('.qv.cur').forEach(e=>e.classList.remove('cur'));const e=$('#qv'+a);e&&e.classList.add('cur');toast('Last read here')}
const qVs=a=>QC[qO]&&QC[qO].v.find(x=>x.n==a);
function qCp(a){const v=qVs(a),s=S.set;if(!v)return;copyTxt([`${QN[qO-1]} (${qO}:${a})`,v.ar,s.qtl&&v.tl,s.qen&&v.en,s.qbn&&v.bn].filter(Boolean).join('\n\n')).then(ok=>toast(ok?'Copied':'Copy failed'))}
function qCard(a){const v=qVs(a),s=S.set;if(!v)return;let L=[cl(s.qtl,v.tl,'tl'),cl(s.qen,v.en,'tr'),cl(s.qbn,v.bn,'bn')].filter(Boolean);
 if(v.ar.length>260){const t=L.filter(l=>l.k!='tl');L=t.length?[t.find(l=>l.k=='bn')||t[0]]:[]}
 cardShow({title:`${QN[qO-1]} ${qO}:${a}`,ar:v.ar,lines:L,mk:.4})}
function qDbg(){modal(`<h3>${qe(qErr?qErr.m:'')}</h3><pre style="white-space:pre-wrap;word-break:break-all;user-select:text;max-height:50vh;overflow:auto;font-size:.75rem">${qe(qRaw||'(no response captured)')}</pre><div class=row><button class=btn onclick=closeM()>Close</button></div>`)}
function qFav(a,s){const k=(s||qO)+':'+a,on=!S.qb[k];if(on)S.qb[k]=Date.now();else delete S.qb[k];persist(1);toast(on?'Added to favourites':'Removed from favourites');
 const b=!s&&!S.set.qvm&&document.querySelector('#qv'+a+' .qa .btn');if(b){b.classList.toggle('on',on);b.innerHTML=star(on)}else render()}
const qRec=(s,a)=>{S.qr={s,a,t:Date.now()};persist(1)};
function qGo(d){const v=qVi+d;
 if(v<1){if(qO>1){qRec(qO-1,QV[qO-2]);qOpen(qO-1,QV[qO-2])}return}
 if(v>QV[qO-1]){if(qO<114){qRec(qO+1,1);qOpen(qO+1,1)}return}
 qVi=v;qRec(qO,v);render();scrollTo(0,0)}
function qJump(){const t=QV[qO-1],n=parseInt(prompt('Go to verse (1–'+t+')',qVi));if(n>=1&&n<=t){qVi=n;qRec(qO,n);render();scrollTo(0,0)}}
const qWt=new Set();
function qWarm(){const need=[...new Set(Object.keys(S.qb).map(k=>+k.split(':')[0]))].filter(n=>!QC[n]&&!qWt.has(n));if(!need.length)return;need.forEach(n=>qWt.add(n));
 Promise.all(need.map(n=>qdb.get('s'+n).then(c=>{if(c)QC[n]=c}).catch(()=>{}))).then(()=>{if(tab=='q'&&!qO&&qFv)render()})}
function qFavL(){const ks=Object.keys(S.qb).sort((a,b)=>S.qb[b]-S.qb[a]);
 if(!ks.length)return '<div class=mu style="padding:16px;text-align:center">No favourite verses yet. Tap ★ on any verse.</div>';
 return ks.map(k=>{const[s,a]=k.split(':').map(Number),c=QC[s],v=c&&c.v.find(x=>x.n==a),t=v&&((S.set.qbn&&v.bn)||v.en||v.bn||'');
  return `<button class=di onclick="qOpen(${s},${a})"><span class=dnum>${s}:${a}</span><span>${qe(QN[s-1])}${t?`<small class=mu>${qe(t.length>90?t.slice(0,90)+'…':t)}</small>`:''}</span><span class="fv on" onclick="event.stopPropagation();qFav(${a},${s})">${star(true)}</span>${IC.rr}</button>`}).join('')}
Object.assign(BD,{'Verse by verse':'আয়াত ধরে ধরে','Favourite':'প্রিয়','Copy':'কপি','Added to favourites':'প্রিয়তে যোগ হয়েছে','Removed from favourites':'প্রিয় থেকে সরানো হয়েছে','No favourite verses yet. Tap ★ on any verse.':'এখনো কোনো প্রিয় আয়াত নেই। যেকোনো আয়াতে ★ ট্যাপ করুন।','Previous verse':'আগের আয়াত','Next verse':'পরের আয়াত','Previous surah':'আগের সূরা','Next surah':'পরের সূরা','Mark as last read':'শেষ পড়া হিসেবে চিহ্নিত করুন','Smaller text':'ছোট লেখা','Larger text':'বড় লেখা'});
RX.push([/^★ Favourites \((\d+)\)$/,'★ প্রিয় ($1)'],[/^Go to verse \(1–(\d+)\)$/,'আয়াত নম্বরে যান (১–$1)']);
function qList(){if(!qInit){qInit=1;qdb.keys().then(k=>{(k||[]).forEach(x=>{const n=+String(x).slice(1);if(n)QD.add(n)});if(tab=='q'&&!qO&&!qFv)render()}).catch(()=>{})}
 const r=S.qr,nf=Object.keys(S.qb).length,
 tabs=`<div class=chips><button class="chip ${qFv?'':'on'}" onclick="qFv=0;render()">All surahs</button><button class="chip ${qFv?'on':''}" onclick="qFv=1;render()">★ Favourites (${nf})</button></div>`,
 cont=r?`<button class="glass qcont" onclick="qOpen(${r.s},${r.a})"><span class=mu>Continue reading</span><b>${qe(QN[r.s-1])} · ${r.s}:${r.a}</b>${IC.rr}</button>`:'';
 if(qFv){qWarm();return `<h2>Quran</h2>${cont}${tabs}<div class="glass dl qfl">${qFavL()}</div><div style="height:90px"></div>`}
 return `<h2>Quran</h2>${cont}${tabs}<input class=srch type=search placeholder="Search surahs…" value="${qe(qQ)}" oninput="qQ=this.value;qDraw()"><div class="glass dl" id=qlist>${qRows()}</div>
<div class=row><button class=btn id=qdl onclick=qAll()>${qDl?'Downloading… '+QD.size+' / 114':'Download for offline ('+QD.size+' / 114)'}</button>${qDl?'<button class=btn onclick=qAll()>Stop</button>':''}</div>
<div class=mu style="text-align:center;font-size:.8rem;margin:6px 0 90px">Quran data: <a href="https://ummahapi.com" target=_blank rel=noopener>UmmahAPI</a></div>`}
function qRead(){const n=qO,c=QC[n],s=S.set,tot=QV[n-1];
 const top=`<div class=row style="justify-content:space-between"><button class=btn onclick="qO=0;render()">${IC.l} All surahs</button><span class=mu>${n} / 114</span></div>`;
 if(!c){if(!qL[n]&&!qErr)qLoad(n);
  if(qErr&&qErr.n==n){const m=qErr.m=='offline'?'You are offline and this surah is not downloaded yet.':qErr.m=='rate'?'Too many requests. Wait a minute and retry.':qErr.m=='shape'?'The API replied in a format this app does not understand yet.':'Could not reach UmmahAPI. Check your connection and retry.';
   return top+`<div class=card><p><b>Couldn't load this surah</b></p><p class=mu>${m}</p><div class=row><button class="btn p" onclick="qErr=null;qL[${n}]=0;render()">Retry</button>${qRaw?'<button class=btn onclick=qDbg()>Details</button>':''}</div></div>`}
  return top+'<p class=mu>Loading…</p>'}
 const ch=`<div class="chips qc"><button class="chip ${s.qvm?'on':''}" onclick="qT('qvm')">Verse by verse</button><button class="chip ${s.qbn?'on':''}" onclick="qT('qbn')">বাংলা</button><button class="chip ${s.qen?'on':''}" onclick="qT('qen')">English</button><button class="chip ${s.qtl?'on':''}" onclick="qT('qtl')">Transliteration</button><button class=chip onclick="qZ(-.1)" aria-label="Smaller text">A−</button><button class=chip onclick="qZ(.1)" aria-label="Larger text">A+</button></div>`;
 const tx=v=>`${s.qtl&&v.tl?`<div class=trl>${qe(v.tl)}</div>`:''}${s.qen&&v.en?`<div class=tr>${qe(v.en)}</div>`:''}${s.qbn&&v.bn?`<div class="tr bn">${qe(v.bn)}</div>`:''}`;
 if(s.qvm){qJ=0;const v=c.v.find(x=>x.n==qVi)||c.v[0],f=!!S.qb[n+':'+v.n];qVi=v.n;
  return `<div style="--qs:${s.qsz}">${top}<div class=row style="justify-content:space-between;margin:0 4px 6px"><b>${qe(QN[n-1])}</b><span class=mu>${n}:${v.n}</span></div>${ch}
<div class="glass dua qvm"><span class=orb></span>${v.n==1&&n!=1&&n!=9?`<div class=ar dir=rtl style="font-size:1.15rem;opacity:.8;margin-bottom:10px">${QBIS}</div>`:''}<div class="ar big" dir=rtl>${qe(v.ar)}</div>${tx(v)}</div>
<div class=row><button class="btn ${f?'on':''}" onclick="qFav(${v.n})">${star(f)} Favourite</button><button class=btn onclick="qCp(${v.n})">${IC.cp} Copy</button><button class=btn onclick="qCard(${v.n})">${IC.sh} Photo card</button></div>
<div class=row style="align-items:center;gap:18px;margin-bottom:90px"><button class=btn onclick="qGo(-1)" aria-label="Previous verse">${IC.l}</button><button class=btn onclick=qJump()>${v.n} / ${tot}</button><button class=btn onclick="qGo(1)" aria-label="Next verse">${IC.rr}</button></div></div>`}
 const r=S.qr,vs=c.v.map(v=>{const b=S.qb[n+':'+v.n],cur=r&&r.s==n&&r.a==v.n;
  return `<div class="qv ${cur?'cur':''}" id=qv${v.n} data-a=${v.n}><div class=qh><button class=qn onclick="qMark(${v.n})" aria-label="Mark as last read">${v.n}</button><span class=qa><button class="btn ${b?'on':''}" onclick="qFav(${v.n})" aria-label=Favourite>${star(!!b)}</button><button class=btn onclick="qCp(${v.n})" aria-label=Copy>${IC.cp}</button><button class=btn onclick="qCard(${v.n})" aria-label="Photo card">${IC.sh}</button></span></div><div class="ar big" dir=rtl>${qe(v.ar)}</div>${tx(v)}</div>`}).join('');
 if(qJ){const a=qJ;qJ=0;setTimeout(()=>{const e=$('#qv'+a);e&&e.scrollIntoView({block:'start'})},60)}
 return `<div style="--qs:${s.qsz}">${top}<div class="glass dua"><span class=orb></span><div class=dn>${n}. ${qe(QN[n-1])}</div><div class=mu>${tot} verses</div>${n!=1&&n!=9?`<div class=orn>${ORN}</div><div class="ar big" dir=rtl>${QBIS}</div>`:''}</div>${ch}<div class="glass qvs">${vs}</div>
<div class=row style="align-items:center;gap:18px;margin-bottom:90px"><button class=btn onclick="qOpen(${n-1})" ${n>1?'':'disabled'} aria-label="Previous surah">${IC.l}</button><span class=mu>${n} / 114</span><button class=btn onclick="qOpen(${n+1})" ${n<114?'':'disabled'} aria-label="Next surah">${IC.rr}</button></div></div>`}
V.q=()=>qO?qRead():qList();
// remember where the reader is when they scroll
let qSt=0;addEventListener('scroll',()=>{if(tab!=='q'||!qO||qSt||scrollY<200)return;qSt=setTimeout(()=>{qSt=0;for(const e of document.querySelectorAll('.qv'))if(e.getBoundingClientRect().bottom>90){const a=+e.dataset.a;if(!S.qr||S.qr.s!=qO||S.qr.a!=a){S.qr={s:qO,a,t:Date.now()};persist(1)}break}},700)},{passive:true});
// ===== More duas (UmmahAPI) =====
// API duas are added to the same list as yours (marked src:'x'), so favourites, repeat counts, copy and cards all work. Yours win on duplicates.
let xS='',xRaw='',duaSrc='',duaCat='',duaCats=[];
const xs=x=>Array.isArray(x)?x.map(xs).filter(Boolean).join(', '):String(x==null?'':typeof x=='object'?(x.text||x.translation||x.en||x.english||x.name||x.title||''):x).replace(/<[^>]*>/g,'').replace(/[<>]/g,'').trim();
const xa=s=>qNorm(s||'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[^\u0600-\u06ff]/g,'');
const xp=c=>String(c).replace(/[_-]+/g,' ').replace(/\b[a-z]/g,m=>m.toUpperCase());
const duaOk=x=>(!duaSrc||(duaSrc=='x'?x.src=='x':x.src!='x'))&&(!duaCat||x.cat==duaCat);
function xNorm(j){const d=j&&j.data!==undefined?j.data:j;let a=[];
 if(Array.isArray(d))a=d;
 else if(d&&typeof d=='object'){const vals=Object.values(d),keys=Object.keys(d),cs=d.categories;
  if(Array.isArray(cs)&&cs.some(c=>c&&Array.isArray(c.duas)))cs.forEach(c=>(c.duas||[]).forEach(x=>a.push(Object.assign({category:c.name||c.title||c.id},x))));
  else{const k=['duas','items','results'].find(k=>Array.isArray(d[k]));
   if(k)a=d[k];
   else if(vals.length&&vals.every(Array.isArray))vals.forEach((v,i)=>v.forEach(x=>a.push(Object.assign({category:keys[i]},x))));
   else{const f=vals.find(v=>Array.isArray(v)&&v.length&&typeof v[0]=='object');if(f)a=f}}}
 return a.filter(r=>r&&typeof r=='object').map((r,i)=>{const id=r.id??r.dua_id??r.number??(i+1),sr=xs(r.source!==undefined?r.source:r.sources!==undefined?r.sources:r.reference!==undefined?r.reference:r.ref);
  return{id:'x'+id,src:'x',name:xs(r.title??r.name??r.dua_title??r.heading)||('Dua '+(i+1)),arabic:xs(r.arabic??r.arabic_text??r.text_arabic??r.dua??r.text),transliteration:xs(r.transliteration??r.transliteration_text),
   en:xs(r.translation??r.english??r.en??r.meaning??r.translation_en),note:sr?'Source: '+sr:'',cat:xs(r.category??r.category_id??r.categoryId??r.category_name??r.type)}}).filter(x=>x.arabic)}
function xMerge(l){const loc=D.filter(x=>x.src!='x'),seen=new Set(loc.map(x=>xa(x.arabic)).filter(Boolean));D=loc.concat(l.filter(x=>!seen.has(xa(x.arabic))))}
async function loadX(force){if(xS=='load'||!D)return;xS='load';
 try{let c=null;try{c=await qdb.get('duas')}catch(e){}
  const fresh=c&&Date.now()-c.t<2592e6;
  if(c)xMerge(c.list);
  if(!c||force||!fresh){
   if(navigator.onLine){try{const j=await qGet('/api/duas'),l=xNorm(j);
     if(!l.length){xRaw=JSON.stringify(j,null,1).slice(0,900);throw new Error('shape')}
     try{await qdb.set('duas',{list:l,t:Date.now()})}catch(e){}xMerge(l)}catch(e){if(!c)throw e}}
   else if(!c)throw new Error('offline')}
  xS='ok'}catch(e){xS='err'}
 if(tab=='d')render()}
function duaSet(s,ci){duaSrc=s;duaCat=ci===''?'':(duaCats[ci]||'');render()}
function duaChips(){duaCats=[...new Set(D.filter(x=>x.src=='x'&&x.cat).map(x=>x.cat))];
 return `<div class="chips qc"><button class="chip ${!duaSrc?'on':''}" onclick="duaSet('','')">All</button><button class="chip ${duaSrc=='m'?'on':''}" onclick="duaSet('m','')">My duas</button><button class="chip ${duaSrc=='x'?'on':''}" onclick="duaSet('x','')">More duas</button></div>`
 +(duaSrc=='x'&&duaCats.length?`<select class="srch xcat" onchange="duaSet('x',this.value)" aria-label="Category"><option value="">All categories (${D.filter(x=>x.src=='x').length})</option>${duaCats.map((c,k)=>`<option value="${k}" ${duaCat==c?'selected':''}>${xp(c)} (${D.filter(x=>x.src=='x'&&x.cat==c).length})</option>`).join('')}</select>`:'')}
function xDbg(){modal(`<pre style="white-space:pre-wrap;word-break:break-all;user-select:text;max-height:50vh;overflow:auto;font-size:.75rem">${qe(xRaw||'(no response captured)')}</pre><div class=row><button class=btn onclick=closeM()>Close</button></div>`)}
function duaStatus(){if(duaSrc=='m')return '';
 if(xS=='load')return duaSrc=='x'?'<p class=mu style="text-align:center">Loading more duas…</p>':'';
 if(xS=='err')return duaSrc=='x'?`<div class=card><p class=mu>Couldn't load more duas.</p><div class=row><button class="btn p" onclick="loadX(1)">Retry</button>${xRaw?'<button class=btn onclick=xDbg()>Details</button>':''}</div></div>`:'';
 return duaSrc=='x'&&xS=='ok'?'<div class=mu style="text-align:center;font-size:.8rem;margin-top:6px">More duas: <a href="https://ummahapi.com" target=_blank rel=noopener>UmmahAPI</a></div>':''}
Object.assign(BD,{'My duas':'আমার দোয়া','More duas':'আরও দোয়া','All categories':'সব বিভাগ','Loading more duas…':'আরও দোয়া লোড হচ্ছে…',"Couldn't load more duas.":'আরও দোয়া লোড করা যায়নি।','More duas:':'আরও দোয়া:'});
let qTx=0,qTy=0,qTk=0;addEventListener('touchstart',e=>{qTk=!e.target.closest('.chips,input,select,.mo,nav');qTx=e.touches[0].clientX;qTy=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{if(!qTk||tab!=='q'||!qO||!S.set.qvm||$('#mo'))return;const t=e.changedTouches[0],dx=t.clientX-qTx,dy=t.clientY-qTy;if(Math.abs(dx)>70&&Math.abs(dy)<45)qGo(dx<0?1:-1)},{passive:true});
addEventListener('keydown',e=>{if(tab!=='q'||!qO||!S.set.qvm||$('#mo')||/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName))return;if(e.key=='ArrowRight')qGo(1);else if(e.key=='ArrowLeft')qGo(-1)});
const typing=e=>/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName);
addEventListener('keydown',e=>{if(e.code!=='Space'||typing(e)||$('#mo')||$('#sb')||tab!=='c')return;e.preventDefault();if(!e.repeat)tap()});
addEventListener('keyup',e=>{if(e.code==='Space'&&!typing(e)&&tab==='c')e.preventDefault()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)push()});addEventListener('pagehide',push);
addEventListener('offline',()=>{wasOff=true;setSS('Offline · saved on this device, will sync later')});addEventListener('online',push);
// ===== Library tab (Quran / Hadith / Duas / Names) + Hadith reader (UmmahAPI) =====
// One bottom-bar tab holds the four reading sections; each keeps its own tab id so the existing views work unchanged.
const LIB=['q','h','d','nm'];let libLast='q';
IC.lib=sv('<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="M15.5 5.5l3.6-1 2.9 14.5-3.6 1z"/>');
for(const[k,v]of Object.entries({'Library':'লাইব্রেরি','Hadith':'হাদিস','Search hadith…':'হাদিস খুঁজুন…','Search':'খুঁজুন','Random hadith':'যেকোনো একটি হাদিস','Another hadith':'আরেকটি হাদিস','Back':'ফিরে যান','No hadith found.':'কোনো হাদিস পাওয়া যায়নি।',"Couldn't load this":'লোড করা যায়নি','You are offline and this page is not saved yet.':'আপনি অফলাইনে আছেন এবং এই পাতা এখনো সংরক্ষিত হয়নি।','Hadith data:':'হাদিসের ডেটা:'}))BD[k]??=v;
function libBar(){return `<div class="chips qc">${[['q','Quran'],['h','Hadith'],['d','Duas'],['nm','Names']].map(a=>`<button class="chip ${tab==a[0]?'on':''}" onclick="libGo('${a[0]}')">${a[1]}</button>`).join('')}</div>`}
function libGo(t){if(tab==t)return;tab=t;render();scrollTo(0,0)}
const _vq=V.q,_vd=V.d,_vnm=V.nm;
V.q=()=>(qO?'':libBar())+_vq();
V.d=()=>(duaO?'':libBar())+_vd();
V.nm=()=>(nmO?'':libBar())+_vnm();

const HC=[['bukhari','Sahih al-Bukhari'],['muslim','Sahih Muslim'],['abudawud','Sunan Abi Dawud'],['tirmidhi',"Jami' at-Tirmidhi"],['ibnmajah','Sunan Ibn Majah'],['nasai',"Sunan an-Nasa'i"],['malik','Muwatta Malik'],['nawawi',"Nawawi's 40 Hadith"],['qudsi','40 Hadith Qudsi'],['dehlawi',"Shah Waliullah's 40"]];
const HPG=25,hNm=c=>(HC.find(x=>x[0]==c)||[0,c])[1];
let hM='home',hC='',hP=1,hQ='',hL=[],hTot=0,hSt='',hErr='',hRaw='',hRq=0,hD=0,hI=0,hEdge='';
// The API's exact field names are not documented, so these helpers accept the usual variants.
function hItems(j){const HT=['arabic','english','text','arabic_text','english_text','hadith_arabic','hadith_english'],
 has=o=>o&&typeof o=='object'&&!Array.isArray(o)&&HT.some(k=>o[k]!=null),
 walk=(d,n)=>{if(d==null||n>3)return null;
  if(Array.isArray(d))return d.length&&typeof d[0]=='object'?d:null;
  if(typeof d!='object')return null;
  for(const k of['hadiths','results','items','data'])if(Array.isArray(d[k])&&d[k].length&&typeof d[k][0]=='object')return d[k];
  if(has(d))return[d];
  for(const k in d){const r=walk(d[k],n+1);if(r)return r}
  return null};
 return walk(j&&j.data!==undefined?j.data:j,0)||[]}
function hN(r,i,src){if(r.hadith&&typeof r.hadith=='object'&&!Array.isArray(r.hadith))r=Object.assign({},r,r.hadith);
 const g=(...ks)=>{for(const k of ks){const v=r[k];if(v!=null&&v!=='')return v}return''},cl=xs(g('collection_name','collection'));
 return{n:xs(g('hadith_number','hadithNumber','number','hadith_no','id'))||String(i+1),
  ar:xs(g('arabic','arabic_text','text_arabic','ar','hadith_arabic')),
  en:xs(g('english','english_text','text_english','en','text','translation','hadith_english')),
  nr:xs(g('narrator','narrated_by','chapter','book')),
  src:HC.some(x=>x[0]==cl)?hNm(cl):(src||'')}}
function hPg(j){const p=(j&&(j.pagination||j.meta||(j.data&&j.data.pagination)))||j||{},t=+(p.total_pages??p.totalPages??p.pages??p.last_page??0);return t>0?t:0}
async function hLoad(){const m=hM,c=hC,p=hP,q=hQ,id=++hRq;hSt='load';hErr='';hRaw='';if(tab=='h')render();
 try{let r=null;const key=m=='list'?`h_${c}_${HPG}_${p}`:'';
  if(key){try{r=await qdb.get(key)}catch(e){}}
  if(!r||!r.list||!r.list.length){r=null;
   if(!navigator.onLine)throw new Error('offline');
   const path=m=='list'?`/api/hadith/${c}?page=${p}&limit=${HPG}`:m=='search'?`/api/hadith/search?q=${encodeURIComponent(q)}&limit=50`:'/api/hadith/random',
    j=await qGet(path),a=hItems(j);
   if(!a.length){if(m!='search'){hRaw=JSON.stringify(j,null,1).slice(0,900);throw new Error('shape')}r={list:[],pg:0}}
   else r={list:a.map((x,i)=>hN(x,i,m=='list'?hNm(c):'')),pg:hPg(j)};
   if(key&&r.list.length){try{await qdb.set(key,r)}catch(e){}}}
  if(id!=hRq)return;hL=r.list;hTot=r.pg||0;hSt='';
  if(hD&&hEdge){hI=hEdge=='last'?Math.max(0,hL.length-1):0}hEdge=''}
 catch(e){if(id!=hRq)return;hSt='err';hErr=e.message}
 if(tab=='h')render()}
function hCard(x,i){return `<div class="card hd"><div class=qh><span class=hn>${x.src?qe(x.src)+' · ':''}#${qe(x.n)}</span><button class=btn onclick="hCp(${i})" aria-label=Copy>${IC.cp}</button></div>${x.ar?`<div class=ar dir=rtl>${qe(x.ar)}</div>`:''}${x.en?`<div class="tr nox">${qe(x.en)}</div>`:''}${x.nr&&x.nr!=x.en?`<div class="mu nox hnr">${qe(x.nr)}</div>`:''}</div>`}
const hPv=x=>{const t=(x.en||x.nr||x.ar||'').replace(/\s+/g,' ').trim();return t.length>90?t.slice(0,90)+'…':t};
function hRow(x,i){return `<button class=di onclick="hSel(${i})"><span style="flex:1;min-width:0;text-align:left;overflow-wrap:anywhere"><b class=hn>${x.src?qe(x.src)+' · ':''}#${qe(x.n)}</b><small class="mu nox">${qe(hPv(x))}</small></span>${IC.rr}</button>`}
V.h=()=>{const bar=libBar(),cr='<div class=mu style="text-align:center;font-size:.8rem;margin:6px 0 90px">Hadith data: <a href="https://ummahapi.com" target=_blank rel=noopener>UmmahAPI</a></div>';
 if(hM=='home')return `${bar}<h2>Hadith</h2><div class=card><div style="display:flex;gap:8px;align-items:center"><input id=hq class=srch style="margin:0;flex:1;min-width:0" type=search placeholder="Search hadith…" value="${qe(hQ)}" onkeydown="if(event.key=='Enter')hSearch()"><button class="btn p" onclick=hSearch()>Search</button></div><div class=row style="margin-top:12px"><button class="btn p" onclick=hRandom()>Random hadith</button></div></div><div class="glass dl">${HC.map(x=>`<button class=di onclick="hOpen('${x[0]}')"><span style="flex:1;min-width:0;text-align:left">${qe(x[1])}</span>${IC.rr}</button>`).join('')}</div>${cr}`;
 const rnd=hM=='random',one=rnd||hD,title=hM=='list'?qe(hNm(hC)):hM=='search'?'“'+qe(hQ)+'”':'Random hadith';
 let body;
 if(hSt=='load')body='<p class=mu style="text-align:center;margin:30px 0">Loading…</p>';
 else if(hSt=='err'){const m=hErr=='rate'?'Too many requests. Wait a minute and retry.':hErr=='offline'?'You are offline and this page is not saved yet.':hErr=='shape'?'The API replied in a format this app does not understand yet.':'Could not reach UmmahAPI. Check your connection and retry.';
  body=`<div class=card><p><b>Couldn't load this</b></p><p class=mu>${m}</p><div class=row><button class="btn p" onclick=hLoad()>Retry</button></div>${hRaw?`<pre class=mu style="font-size:.65rem;white-space:pre-wrap;word-break:break-all;user-select:text;-webkit-user-select:text">${qe(hRaw)}</pre>`:''}</div>`}
 else if(!hL.length)body='<div class=card><p class=mu>No hadith found.</p></div>';
 else if(one){const i=rnd?0:Math.min(hI,hL.length-1);body=hCard(hL[i],i)}
 else body=`<div class="glass dl">${hL.map(hRow).join('')}</div>`;
 let more='';
 if(hSt==''&&hL.length){const lst=hM=='list',endP=lst&&(hTot?hP>=hTot:hL.length<HPG);
  if(rnd)more='<div class=row><button class="btn p" onclick=hRandom()>Another hadith</button></div>';
  else if(hD)more=`<div class=row style="align-items:center;gap:18px;margin:6px 0"><button class=btn onclick="hStep(-1)" ${hI<=0&&(!lst||hP<=1)?'disabled':''} aria-label=Previous>${IC.l}</button><span class=mu>${hI+1} / ${hL.length}</span><button class=btn onclick="hStep(1)" ${hI>=hL.length-1&&(!lst||endP)?'disabled':''} aria-label=Next>${IC.rr}</button></div>`;
  else if(lst)more=`<div class=row style="align-items:center;gap:18px;margin:6px 0"><button class=btn onclick="hPage(-1)" ${hP<=1?'disabled':''} aria-label=Previous>${IC.l}</button><span class=mu>${hP}${hTot?' / '+hTot:''}</span><button class=btn onclick="hPage(1)" ${endP?'disabled':''} aria-label=Next>${IC.rr}</button></div>`}
 return `${bar}<div class=row style="justify-content:space-between;align-items:center;margin:0 4px 10px"><button class=btn onclick=hBack()>${IC.l} Back</button><span class=mu style="min-width:0;overflow-wrap:anywhere;text-align:right">${title}</span></div>${body}${more}${cr}`};
function hOpen(c){hM='list';hC=c;hP=1;hL=[];hTot=0;hD=0;hEdge='';hLoad();scrollTo(0,0)}
function hPage(d){const p=hP+d;if(p<1)return;hP=p;hD=0;hLoad();scrollTo(0,0)}
function hSel(i){hI=i;hD=1;render();scrollTo(0,0)}
function hStep(d){const i=hI+d;
 if(i>=0&&i<hL.length){hI=i;render();scrollTo(0,0);return}
 if(hM!='list')return;const np=hP+d;if(np<1||(d>0&&(hTot?hP>=hTot:hL.length<HPG)))return;
 hP=np;hEdge=d>0?'first':'last';hLoad();scrollTo(0,0)}
function hSearch(){const e=$('#hq'),v=e&&e.value.trim();if(!v)return;hQ=v;hM='search';hC='';hL=[];hTot=0;hD=0;hLoad();scrollTo(0,0)}
function hRandom(){hM='random';hC='';hL=[];hTot=0;hD=0;hLoad();scrollTo(0,0)}
function hBack(){if(hD&&hM!='random'){hD=0;hEdge='';render();scrollTo(0,0);return}hM='home';hC='';hL=[];hSt='';hD=0;hRq++;render();scrollTo(0,0)}
function hCp(i){const x=hL[i];if(!x)return;copyTxt([`${x.src?x.src+' ':''}#${x.n}`,x.ar,x.en,x.nr&&x.nr!=x.en?x.nr:''].filter(Boolean).join('\n\n')).then(ok=>toast(ok?'Copied':'Copy failed'))}

const TJ=fetch('tasbih.json').then(r=>r.json()).then(j=>{const l=(j.tasbih||[]).filter(x=>x&&x.id&&x.name).map(x=>({id:String(x.id),n:x.name,ar:x.arabic||'',en:x.en||'',bn:x.bn||'',t:+x.target||33,note:x.note||''}));if(l.length)DEF=l}).catch(()=>{});
let started=0;const go=()=>{if(started)return render();started=1;migrate();render();initFB()};
TJ.then(go);setTimeout(()=>{if(!started)go()},1500);
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
