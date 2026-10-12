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
const AF={amiri:"Amiri,serif",indo:"'Noto Nastaliq Urdu',serif"};
let S=JSON.parse(localStorage.getItem(KEY)||'null')||{tl:[],tt:{},logs:{},prog:{},fv:{},qz:{v:0,t:0},dt:{},cur:'sub',pend:{c:0,p:0},upd:0,
 set:{theme:'forest',arf:'amiri',size:1,en:true,bn:true,haptic:true}};
let tab='c',rg='w',mt='t',wasOff=!navigator.onLine,duaI=0,duaO=0,D=null;
S.set.tl??=true;S.set.uf??='nunito';S.set.hms??=35;S.dt??={};
const all=()=>DEF.concat(S.tl),cur=()=>all().find(x=>x.id==S.cur)||DEF[0],tg=t=>{const x=S.tt[t.id];return (x&&typeof x=='object'?x.v:x)||t.t};
const dk=d=>{d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const day=k=>S.logs[k=k||dk()]=S.logs[k]||{c:{},x:{},z:{},p:[0,0,0,0,0].map(()=>({v:0,t:0}))};
const dt=k=>S.logs[k]?Object.keys(S.logs[k].c).reduce((a,id)=>a+cc(S.logs[k],id),0):0;
const dx=k=>S.logs[k]?Object.values(S.logs[k].x||{}).reduce((a,b)=>a+(b.v?1:0),0):0;
const dp=k=>S.logs[k]?S.logs[k].p.reduce((a,b)=>a+(b.v?1:0),0):0;
const vib=p=>{if(S.set.haptic&&navigator.vibrate)navigator.vibrate(p)};
function toast(m){const t=$('#toast');t.textContent=m;t.style.opacity=1;setTimeout(()=>t.style.opacity=0,1800)}
function persist(k){localStorage.setItem(KEY,JSON.stringify(S));if(!k&&!persist.t)persist.t=setTimeout(()=>{persist.t=0;push()},400)}
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
function qazaCard(){return `<div class="glass qzc"><div class=dn style="font-size:.95rem">🕊️ Missed prayers (qaza)</div><div class=row style="align-items:center;gap:18px;margin:10px 0"><button class=btn onclick="qz(-1)" aria-label="Made up one">${IC.n}</button><b id=qn style="font-size:2.4rem;min-width:3ch;text-align:center;cursor:pointer;color:var(--ac)" onclick="qzSet()">${S.qz.v}</b><button class=btn onclick="qz(1)" aria-label="Missed one">${IC.a}</button></div><div class=mu style="text-align:center;font-size:.75rem">+ missed · − made up · tap the number to set it</div></div>`}
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
  o.push({l:d.toLocaleString('en',{month:'short'})[0],v})}}
 else{const c=rg=='w'?7:30;for(let i=c-1;i>=0;i--){const d=new Date(n.getFullYear(),n.getMonth(),n.getDate()-i);
  o.push({l:rg=='w'?d.toLocaleString('en',{weekday:'short'}).slice(0,2):(i%5==0?d.getDate():''),v:f(dk(d))})}}return o}
function chart(){const d=series(),m=Math.max(1,...d.map(x=>x.v)),w=320/d.length;
 return `<svg viewBox="0 0 320 150" width=100%>${d.map((x,i)=>{const h=x.v/m*105;return `<rect x="${i*w+w*.15}" y="${115-h}" width="${w*.7}" height="${Math.max(h,2)}" rx="${Math.min(6,w*.3)}" fill="var(--ac)" opacity="${x.v?1:.25}"/><text x="${i*w+w/2}" y="136" font-size="10" text-anchor="middle" fill="var(--mu)">${x.l}</text>`}).join('')}</svg><div class=mu>Total: ${d.reduce((a,b)=>a+b.v,0)} · Peak: ${m>1||d.some(x=>x.v)?m:0}</div>`}
function stats(){const ks=Object.keys(S.logs).sort(),tot=ks.reduce((a,k)=>a+dt(k),0),ptot=ks.reduce((a,k)=>a+dp(k),0);
 let st=0,d=new Date();if(!dt(dk(d))&&!dp(dk(d)))d.setDate(d.getDate()-1);
 while(dt(dk(d))||dp(dk(d))){st++;d.setDate(d.getDate()-1)}
 const best=Math.max(0,...ks.map(dt));
 const per={};ks.forEach(k=>{for(const i in S.logs[k].c)per[i]=(per[i]||0)+cc(S.logs[k],i)});
 let tj=0,sn=0;ks.forEach(k=>{const x=S.logs[k].x||{};tj+=(x.tahajjud||{}).v?1:0;sn+=(x.sunnah||{}).v?1:0});
 return{tot,ptot,st,best,per,tj,sn}}
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
  g+=`<div class="wd ${i?'':'td'}"><div class=mu>${d.toLocaleString('en',{weekday:'short'}).slice(0,2)}</div>${[0,1,2,3,4].map(j=>`<i class="${L&&L.p[j].v?'on':''}"></i>`).join('')}${['tahajjud','sunnah'].map((e,j)=>`<i class="x ${j?'':'x1'} ${(X[e]||{}).v?'on':''}"></i>`).join('')}</div>`}
 const date=new Date().toLocaleDateString('en',{weekday:'long',day:'numeric',month:'long'});
 return `<div class="glass pz"><span class=orb></span><button class=nbtn onclick=cardP() aria-label=Share>${IC.sh}</button><div class=dn>🌸 Daily prayers</div><div class=pzd>${date}${t&&t.hj?' · '+t.hj+' AH':''}</div><div class=pzm><b>${n}</b><span>/5</span></div><div class=pzb>${[0,1,2,3,4].map(i=>`<i class="${l.p[i].v?'on':''}"></i>`).join('')}</div><div class=pzs>${pMsg(n)}</div></div>
${PN.map((a,i)=>{const isN=nx&&!nx.tm&&nx.i==i;return `<button class="pd ${l.p[i].v?'done':''} ${isN&&!l.p[i].v?'nx':''} ${J==i?'jp':''}" onclick=togP(${i})><span class=pe>${PE[i]}</span><span class=pn><b>${a}</b> <span class="mu bn">${PB[i]}</span>${ptT(i)}${isN?`<div><span class=nbd>Next · in ${ptD(nx.in)}</span></div>`:''}</span><span class=pk>${IC.k}</span></button>`}).join('')}
${extras()}${qazaCard()}<div class="glass wkc"><div class=mu style="margin-bottom:6px">Last 7 days</div><div class=wk>${g}</div><div class=mu style="margin-top:8px;font-size:.72rem;text-align:center">● five prayers · ▢ Tahajjud, Sunnah</div></div>`},
s(){const x=stats();return `<div class=row style="justify-content:space-between;margin:0"><h2>Stats</h2><button class=btn onclick=cardS() aria-label=Share>${IC.sh}</button></div><div class=g>${[['Today',dt(dk())],['Total tasbih',x.tot],['Streak',x.st+' d'],['Best day',x.best],['Prayers today',dp(dk())+'/5'],['Prayers total',x.ptot],['Tahajjud nights',x.tj],['Sunnah days',x.sn]].map(a=>`<div class="card st"><b>${a[1]}</b><span>${a[0]}</span></div>`).join('')}</div>
<div class=card><div class=row style="justify-content:space-between"><span>${[['w','Week'],['m','Month'],['y','Year']].map(a=>`<button class="btn ${rg==a[0]?'on':''}" onclick="setR('${a[0]}')">${a[1]}</button>`).join(' ')}</span><span>${[['t','Tasbih'],['p','Prayer'],['x','Extras']].map(a=>`<button class="btn ${mt==a[0]?'on':''}" onclick="setM('${a[0]}')">${a[1]}</button>`).join(' ')}</span></div>${chart()}</div>
${heat()}<div class=card><div class=mu>By tasbih</div>${all().filter(t=>x.per[t.id]).map(t=>`<div class=pr><span>${t.n}</span><b>${x.per[t.id]}</b></div>`).join('')||'<div class=mu>Nothing yet</div>'}</div>`},
g(){const s=S.set,chk=(k,l)=>`<div class=pr><span>${l}</span><input type=checkbox ${s[k]?'checked':''} onchange="S.set.${k}=this.checked;persist(1);render()"></div>`;
 return `<h2>Settings</h2><div class=card><div class=mu style="margin-bottom:8px">Theme</div>${THEMES.map(t=>`<span class=sw data-theme=${t} title=${t} style="background:linear-gradient(135deg,var(--bg) 50%,var(--ac) 50%);${s.theme==t?'outline:2px solid var(--ac)':''}" onclick="S.set.theme='${t}';persist(1);render()"></span>`).join('')}</div>
<div class=card>${chk('en','English translation')}${chk('bn','বাংলা translation')}${chk('tl','Transliteration (duas)')}${chk('haptic','Haptic vibration (phones)')}<div class=pr style="display:block"><div class=mu>Tap vibration length · ${s.hms} ms</div><input type=range min=10 max=100 step=5 value=${s.hms} oninput="S.set.hms=+this.value;this.previousElementSibling.textContent='Tap vibration length · '+this.value+' ms'" onchange="persist(1);vib(S.set.hms)"></div>
<div class=pr style="display:block"><div class=mu>App font</div><select onchange="S.set.uf=this.value;persist(1);render()">${Object.keys(UF).map(k=>`<option value=${k} ${(s.uf||'nunito')==k?'selected':''}>${UF[k].replace(/'/g,'')}</option>`).join('')}</select></div><div class=pr style="display:block"><div class=mu>Arabic font</div><select onchange="S.set.arf=this.value;persist(1);render()"><option value=amiri ${s.arf=='amiri'?'selected':''}>Amiri (Naskh)</option><option value=indo ${s.arf=='indo'?'selected':''}>Indo-Pak (Nastaliq)</option></select></div>
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
const dord=()=>D.map((x,i)=>i).sort((a,b)=>isF(D[b])-isF(D[a])||a-b);
function loadD(){fetch('duas.json').then(r=>r.json()).then(j=>{D=j.duas||[];render()}).catch(()=>{D=[];render()})}
function duaGo(n){const o=dord(),p=o.indexOf(duaI);duaI=o[(p+n+o.length)%o.length];render()}
function dList(){const q=dnorm(duaQ.trim());let o=dord();if(q)o=o.filter(i=>{const x=D[i];return dnorm([x.name,x.arabic,x.transliteration,x.en,x.bn].join(' ')).includes(q)});
 return o.length?o.map((i,n)=>{const x=D[i];return `<button class=di onclick="duaI=${i};duaO=1;render()"><span class=dnum>${n+1}</span><span>${x.name}</span><span class="fv ${isF(x)?'on':''}" onclick="event.stopPropagation();favT(${i})">${star(isF(x))}</span>${IC.rr}</button>`}).join(''):'<div class=mu style="padding:16px;text-align:center">No matches</div>'}
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
 if(!duaO){const sr=D.length>=SEARCH_MIN;if(!sr)duaQ='';return `<h2>Duas</h2>${sr?`<input id=dq class=srch type=search placeholder="Search duas…" value="${duaQ.replace(/"/g,'&quot;')}" oninput="duaQ=this.value;drawList()">`:''}<div class="glass dl" id=dlist>${dList()}</div>`}
 duaI=Math.min(duaI,D.length-1);const d=D[duaI],s=S.set,k=dkey(d),T=S.dt[k]||3,n=DC[k]||0,o=dord();
 return `<div class=row style="justify-content:space-between"><button class=btn onclick="duaO=0;duaN=-1;render()">${IC.l} All duas</button><span class=row style="margin:0"><button class="btn ${isF(d)?'on':''}" onclick="favT(duaI)" aria-label=Favourite>${star(isF(d))}</button><button class=btn onclick=copyDua() aria-label=Copy>${IC.cp}</button><button class=btn onclick=cardD() aria-label=Share>${IC.sh}</button></span></div>
<div class="glass dua"><span class=orb></span>${d.note?`<button class="nbtn ${duaN==duaI?'on':''}" onclick=noteT() aria-label=Note>${IC.nt}</button>`:''}<div class=dn>${d.name}</div><div class=orn>${ORN}</div><div class="ar big">${d.arabic}</div>${s.tl&&d.transliteration?`<div class=trl>${d.transliteration}</div>`:''}${s.en&&d.en?`<div class=tr>${d.en}</div>`:''}${s.bn&&d.bn?`<div class="tr bn">${d.bn}</div>`:''}</div>
${d.note&&duaN==duaI?`<div class="glass note"><div class=dn style="font-size:.9rem">Note</div><div class="nt bn">${nHTML(d.note)}</div></div>`:''}
<div class=row style="align-items:center"><span class=mu>Repeat</span>${[3,7].map(m=>`<button class="btn ${T==m?'on':''}" onclick=repT(${m})>${m}×</button>`).join('')}<button class="btn ${T!=3&&T!=7?'on':''}" onclick=repC()>${T!=3&&T!=7?T+'×':'Custom'}</button><button class="btn p" id=rc onclick=repTap() style="min-width:84px">${n} / ${T}</button><button class=btn onclick=repReset() aria-label=Reset>${IC.r}</button></div>
<div class=row style="align-items:center;gap:18px"><button class=btn onclick=duaGo(-1)>${IC.l}</button><span class=mu>${o.indexOf(duaI)+1} / ${D.length}</span><button class=btn onclick=duaGo(1)>${IC.rr}</button></div>`};
function acc(){if(!fb)return FC.apiKey.startsWith('YOUR')?'<span class=mu>Add your Firebase config in index.html to enable sync. Data is saved on this device meanwhile.</span>':'<span class=mu>Loading…</span>';
 if(user)return `<p>Signed in: <b>${user.email.split('@')[0]}</b></p><div class=mu style="margin:-6px 0 10px">${S.ls?'Last synced: '+new Date(S.ls).toLocaleString():'Not synced yet'}</div><div class=row style="justify-content:flex-start"><button class="btn p syb" onclick=syncNow()>${IC.sy} Sync now</button><button class=btn onclick="fb.Au.signOut(fb.auth)">Sign out</button></div>`;
 return `<div style="display:grid;gap:8px"><input id=em placeholder=Username autocapitalize=none autocomplete=username><input id=pw type=password placeholder=Password><div class=row><button class="btn p" onclick="auth(0)">Sign in</button><button class=btn onclick="auth(1)">Sign up</button></div></div>`}
function auth(n){const a=fb.Au,e=$('#em').value.trim().toLowerCase().replace(/\s+/g,'')+'@tasbih-app.com',p=$('#pw').value;(n?a.createUserWithEmailAndPassword:a.signInWithEmailAndPassword)(fb.auth,e,p).catch(x=>alert(x.message))}

function render(){document.body.dataset.theme=S.set.theme;const r=document.documentElement.style;r.setProperty('--sz',S.set.size);r.setProperty('--arf',AF[S.set.arf]);r.setProperty('--uf',UF[S.set.uf||'nunito']);
 $('#v').innerHTML=V[tab]();
 $('#nav').innerHTML=[['c','','Count'],['p','','Prayers'],['s','','Stats'],['d','','Duas'],['nm','','Names'],['g','','Settings']].map(a=>`<button class="${tab==a[0]?'on':''}" onclick="tab='${a[0]}';render()">${IC[a[0]]}${a[2]}</button>`).join('')}

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
 const af=AF[S.set.arf]||AF.amiri,bn="'Hind Siliguri',sans-serif",uf=UF[S.set.uf||'nunito']||'Nunito',uf2=uf+','+bn;
 try{await Promise.all(['40px '+af,'40px '+bn,'40px '+uf].map(f=>document.fonts.load(f,'ابAঅ')))}catch(e){}
 x.fillStyle=bg;x.fillRect(0,0,W,H);
 let g=x.createRadialGradient(150,100,0,150,100,700);g.addColorStop(0,ac);g.addColorStop(1,'transparent');x.globalAlpha=.28;x.fillStyle=g;x.fillRect(0,0,W,H);
 g=x.createRadialGradient(1000,1150,0,1000,1150,600);g.addColorStop(0,ac);g.addColorStop(1,'transparent');x.globalAlpha=.2;x.fillStyle=g;x.fillRect(0,0,W,H);
 x.globalAlpha=.78;x.fillStyle=cd;x.beginPath();x.roundRect?x.roundRect(60,60,W-120,H-120,56):x.rect(60,60,W-120,H-120);x.fill();
 x.globalAlpha=.25;x.strokeStyle=ac;x.lineWidth=2;x.stroke();x.globalAlpha=1;
 x.textAlign='center';x.textBaseline='middle';x.direction='ltr';
 let ts=46;do{x.font=`700 ${ts}px ${uf2}`;ts-=2}while(x.measureText(sp.title).width>800&&ts>24);
 x.fillStyle=ac;x.fillText(sp.title,W/2,175);
 x.strokeStyle=ac;x.fillStyle=ac;x.lineWidth=3;x.globalAlpha=.75;x.beginPath();x.moveTo(380,232);x.lineTo(510,232);x.moveTo(570,232);x.lineTo(700,232);x.stroke();
 x.beginPath();x.moveTo(540,220);x.lineTo(552,232);x.lineTo(540,244);x.lineTo(528,232);x.closePath();x.fill();x.globalAlpha=1;
 const mk=k=>{const o=[],add=(t,fs,fam,col,lh,st)=>{x.direction='ltr';x.font=`${st||''} ${fs*k}px ${fam}`;o.push({L:wrapT(x,t,800),f:x.font,col,lh:fs*k*lh,rtl:fam===af})};
  if(sp.ar)add(sp.ar,84,af,tx,1.9);for(const l of sp.lines)add(l.t,34,l.k=='bn'?bn:uf2,l.k=='tl'?ac:mu,1.55,l.k=='tl'?'italic':'');return o};
 const ht=(B,k)=>B.length?B.reduce((a,b)=>a+b.L.length*b.lh,0)+36*k*(B.length-1):0;
 let k=1,B=mk(k);const R=sp.res||0,AV=880-R;while(ht(B,k)>AV-20&&k>.45){k-=.05;B=mk(k)}
 let y=290+(AV-ht(B,k))/2;
 B.forEach((b,i)=>{x.font=b.f;x.fillStyle=b.col;x.direction=b.rtl?'rtl':'ltr';b.L.forEach(l=>{x.fillText(l,W/2,y+b.lh/2);y+=b.lh});y+=36*k});
 x.direction='ltr';sp.post&&sp.post(x,{W,y:290+AV,ac,bg,tx,mu,uf2});x.direction='ltr';x.font=`700 30px ${uf2}`;x.fillStyle=ac;x.globalAlpha=.8;x.fillText('Tasbih',W/2,1235);x.globalAlpha=1;
 return c}
let CB=null;
async function cardShow(sp){toast('Making card…');
 try{const c=await makeCard(sp),b=await new Promise(r=>c.toBlob(r,'image/png')),u=URL.createObjectURL(b);
  CB={b,u,f:new File([b],'tasbih-card.png',{type:'image/png'})};
  modal(`<img src="${u}" style="max-width:100%;max-height:58vh;justify-self:center;border-radius:16px"><div class=row><button class="btn p" onclick=cardShare()>${IC.sh} Share</button><button class=btn onclick=cardSave()>Save</button><button class=btn onclick=cardClose()>Close</button></div>`)}
 catch(e){toast('Could not make card')}}
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
function cardP(){const l=day(),n=dp(dk()),t=ptToday(),X=l.x||{},bnf="'Hind Siliguri',sans-serif",on=cv('--on')||'#fff',
 date=new Date().toLocaleDateString('en',{weekday:'long',day:'numeric',month:'long',year:'numeric'})+(t&&t.hj?' · '+t.hj+' AH':'');
 cardShow({title:'Daily prayers',res:880,lines:[],post:(x,o)=>{const y0=o.y,W=o.W;
  x.textAlign='center';x.fillStyle=o.mu;x.font=`600 28px ${o.uf2}`;x.fillText(date,W/2,y0+10);
  x.fillStyle=o.ac;x.font=`800 120px ${o.uf2}`;x.fillText(n+' / 5',W/2,y0+95);
  for(let i=0;i<5;i++){x.globalAlpha=l.p[i].v?1:.2;x.fillStyle=o.ac;rrect(x,287+i*104,y0+172,90,22,11);x.fill()}x.globalAlpha=1;
  x.fillStyle=o.ac;x.font=`700 32px ${o.uf2}`;x.fillText(pMsg(n),W/2,y0+236);
  PN.forEach((a,i)=>{const by=y0+280+i*98,cy=by+44,d=l.p[i].v;
   x.globalAlpha=d?.24:.11;x.fillStyle=o.ac;rrect(x,140,by,800,88,32);x.fill();x.globalAlpha=1;
   if(d){x.fillStyle=o.ac;x.beginPath();x.arc(194,cy,27,0,7);x.fill();x.strokeStyle=on;x.lineWidth=5;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(183,cy+1);x.lineTo(191,cy+9);x.lineTo(206,cy-9);x.stroke()}
   else{x.globalAlpha=.45;x.strokeStyle=o.ac;x.lineWidth=4;x.beginPath();x.arc(194,cy,27,0,7);x.stroke();x.globalAlpha=1}
   x.textAlign='left';x.font='40px sans-serif';x.fillStyle=o.tx;x.fillText(PE[i],245,cy+2);
   x.font=`700 36px ${o.uf2}`;x.fillStyle=o.tx;x.fillText(a,310,cy);const w=x.measureText(a).width;
   x.font=`600 28px ${bnf}`;x.fillStyle=o.mu;x.fillText(PB[i],310+w+16,cy+1);
   if(t){x.textAlign='right';x.font=`800 36px ${o.uf2}`;x.fillStyle=d?o.ac:o.tx;x.fillText(ptF(t[a]),915,cy)}});
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
  if(r==0&&d.getDate()<=7)o+=`<text x="${c*14}" y="9" font-size="9" fill="var(--mu)">${d.toLocaleString('en',{month:'short'})}</text>`});
 o+=`<text x="266" y="124" font-size="9" text-anchor="end" fill="var(--mu)">Less</text>${op.map((q,j)=>`<rect x="${270+j*14}" y="116" width="11" height="11" rx="3" fill="var(--ac)" opacity="${q}"/>`).join('')}<text x="340" y="124" font-size="9" fill="var(--mu)">More</text>`;
 return `<div class=card><div class=mu style="margin-bottom:6px">Activity · last 26 weeks</div><svg viewBox="0 0 364 130" width=100%>${o}</svg></div>`}
const dbT=()=>new Date().toLocaleTimeString('en',{hour:'numeric',minute:'2-digit'}),dbD=()=>new Date().toLocaleDateString('en',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
function dateBar(){return `<div class=glass style="padding:12px 18px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center"><span id=dbd class=mu style="font-size:.85rem">${dbD()}</span><b id=dbt style="color:var(--ac)">${dbT()}</b></div>`}
setInterval(()=>{const a=$('#dbt'),b=$('#dbd');if(a&&b){a.textContent=dbT();b.textContent=dbD()}},15000);
// ===== prayer times (AlAdhan API) =====
const PTK='tasbih_pt',PTN=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
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
function ptForbNow(){const n=ptNow(),t=ptToday(n);if(!t)return '';const f=ptForb(t).find(a=>n.min>=a[2]&&n.min<a[3]);return f?`<div style="color:#d64545;font-size:.75rem;font-weight:700">⚠ Forbidden time (${f[0]}) · ends ${mF(f[3])}</div>`:''}
function ptInner(x,l){return x?`<span><b style="color:var(--ac)">${PTN[x.i]}</b> <span class=mu>${ptF(x.t)}${x.tm?' · tomorrow':''}</span><div class=mu style="font-size:.75rem">${l.n}</div>${ptForbNow()}</span><b>in ${ptD(x.in)}</b>`
 :`<span class=mu>${ptFail?'Prayer times unavailable · '+ptErr+' · tap to retry':'Loading prayer times…'}<div style="font-size:.75rem">${l.n}</div></span>`}
function ptCard(){ptLoad();return `<div class=glass id=ptc onclick=ptOpen() style="padding:12px 18px;margin:0 0 14px;display:flex;justify-content:space-between;align-items:center;cursor:pointer">${ptInner(ptNext(),S.set.loc)}</div>`}
function ptT(i){ptLoad();const t=ptToday();return t?`<br><span class=mu style="font-size:.75rem">${ptF(t[PTN[i]])}</span>`:''}
function ptRefresh(ok){const e=$('#ptc');if(e)e.innerHTML=ptInner(ptNext(),S.set.loc);if(ok&&tab=='p')render();const m=$('#ptm');if(m)m.innerHTML=ptModal()}
function ptCitySel(){const l=S.set.loc;
 return `<select onchange="ptSetCity(this.value)">${BDC.map(c=>`<option ${c[0]==l.n&&!l.g&&!l.c?'selected':''}>${c[0]}</option>`).join('')}<option value=__gps ${l.g?'selected':''}>${l.g?'My location':'Use my location…'}</option><option value=__oth ${l.c?'selected':''}>${l.c?l.n+', '+l.c:'Other city…'}</option></select>`}
function ptModal(){const t=ptToday(),x=ptNext(),l=S.set.loc,B=['ফজর','যোহর','আসর','মাগরিব','এশা'];
 const rows=t?[['Fajr','ফজর',0],['Sunrise','সূর্যোদয়',-1],['Dhuhr','যোহর',1],['Asr','আসর',2],['Maghrib','মাগরিব',3],['Isha','এশা',4]].map(r=>`<div class=pr><span ${x&&x.i==r[2]?'style="color:var(--ac);font-weight:800"':''}>${r[0]} <span class="mu bn">${r[1]}</span></span><b>${ptF(t[r[0]])}</b></div>`).join(''):`<div class=mu style="padding:12px;text-align:center">${ptFail?'Unavailable · '+ptErr:'Loading…'}</div>`;
 const fb=t?`<div class=mu style="margin:10px 0 2px">Forbidden times (no voluntary prayer)</div>${ptForb(t).map(a=>`<div class=pr><span>${a[0]} <span class="mu bn">${a[1]}</span></span><b>${mF(a[2])} – ${mF(a[3])}</b></div>`).join('')}<div class=mu style="font-size:.72rem">Approximate: sunrise +15 min, noon −6 min, sunset −15 min.</div>`:'';
 return `<h2 style="margin:0">Prayer times</h2><div class=mu>${t&&t.hj?t.hj+' AH':''}</div><div>${rows}</div>${fb}${ptCitySel()}<button class="btn p" onclick=closeM()>Done</button>`}
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
const typing=e=>/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName);
addEventListener('keydown',e=>{if(e.code!=='Space'||typing(e)||$('#mo')||$('#sb')||tab!=='c')return;e.preventDefault();if(!e.repeat)tap()});
addEventListener('keyup',e=>{if(e.code==='Space'&&!typing(e)&&tab==='c')e.preventDefault()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)push()});addEventListener('pagehide',push);
addEventListener('offline',()=>{wasOff=true;setSS('Offline · saved on this device, will sync later')});addEventListener('online',push);
const TJ=fetch('tasbih.json').then(r=>r.json()).then(j=>{const l=(j.tasbih||[]).filter(x=>x&&x.id&&x.name).map(x=>({id:String(x.id),n:x.name,ar:x.arabic||'',en:x.en||'',bn:x.bn||'',t:+x.target||33,note:x.note||''}));if(l.length)DEF=l}).catch(()=>{});
let started=0;const go=()=>{if(started)return render();started=1;migrate();render();initFB()};
TJ.then(go);setTimeout(()=>{if(!started)go()},1500);
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
