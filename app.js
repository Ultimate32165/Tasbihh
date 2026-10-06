const $=s=>document.querySelector(s),KEY='tasbih_v1';
const PN=['Fajr','Dhuhr','Asr','Maghrib','Isha'],PB=['ফজর','যোহর','আসর','মাগরিব','এশা'];
const DEF=[
{id:'sub',n:'SubhanAllah',ar:'سُبْحَانَ ٱللَّٰهِ',en:'Glory be to Allah',bn:'আল্লাহ পবিত্র',t:33},
{id:'alh',n:'Alhamdulillah',ar:'ٱلْحَمْدُ لِلَّٰهِ',en:'All praise is for Allah',bn:'সকল প্রশংসা আল্লাহর',t:33},
{id:'akb',n:'Allahu Akbar',ar:'ٱللَّٰهُ أَكْبَرُ',en:'Allah is the Greatest',bn:'আল্লাহ সর্বমহান',t:33},
{id:'lai',n:'La ilaha illallah',ar:'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ',en:'There is no god but Allah',bn:'আল্লাহ ছাড়া কোনো ইলাহ নেই',t:100},
{id:'ast',n:'Astaghfirullah',ar:'أَسْتَغْفِرُ ٱللَّٰهَ',en:'I seek forgiveness from Allah',bn:'আমি আল্লাহর কাছে ক্ষমা চাই',t:100},
{id:'dur',n:'Durood',ar:'ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ',en:'O Allah, send blessings upon Muhammad',bn:'হে আল্লাহ, মুহাম্মদের ওপর রহমত বর্ষণ করুন',t:100},
{id:'subh',n:'Subhanallahi wa bihamdihi',ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',en:'Glory be to Allah and His is the praise.',bn:'আল্লাহর পবিত্রতা ও মহিমা ঘোষণা করছি এবং সমস্ত প্রশংসা তাঁরই',t:100},
{id:'hawqala',n:'Hawqala',tr:'La hawla wa la quwwata illa billah',ar:'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',en:'There is no power and no strength except with Allah',bn:'আল্লাহর সাহায্য ছাড়া পাপ থেকে বাঁচার কোনো উপায় নেই এবং নেক কাজ করার কোনো শক্তি নেই',t:100},
];
const THEMES=['forest','night','rose','ocean','dusk','sand','lavender','mint','sunset','ember','midnight'];
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
 const id='c'+Date.now();S.tl.push({id,n:g('an')||g('aa'),ar:g('aa'),en:g('ae'),bn:g('ab'),t:parseInt(g('at'))||33});S.cur=id;closeM();persist();render()}
function openAdd(){modal(`<h2>New tasbih</h2><input id=an placeholder="Name"><input id=aa dir=rtl placeholder="Arabic text"><input id=ae placeholder="English translation"><input id=ab placeholder="বাংলা অনুবাদ"><input id=at type=number placeholder="Target (default 33)"><button class="btn p" onclick=addT()>Add</button>`)}

// ===== prayers =====
function togP(i){const l=day();l.p[i]={v:l.p[i].v?0:1,t:Date.now()};S.pend.p+=l.p[i].v;if(!navigator.onLine)wasOff=true;vib(S.set.hms||35);persist();render()}

function togX(k){const l=day();l.x=l.x||{};l.x[k]={v:(l.x[k]||{}).v?0:1,t:Date.now()};if(!navigator.onLine)wasOff=true;vib(S.set.hms||35);persist()}
function extras(){const x=day().x||{},ck=(k,n,b,e)=>`<label class="pr xr"><span><span class=xe>${e}</span><b>${n}</b> <span class="mu bn">${b}</span></span><input type=checkbox class=cbi ${(x[k]||{}).v?'checked':''} onchange="togX('${k}')"><span class=cbx>${IC.k}</span></label>`;
 return `<div class=card><div class=mu style="margin-bottom:2px">Extras today</div>${ck('tahajjud','Tahajjud','তাহাজ্জুদ','🌙')}${ck('sunnah','Sunnah','সুন্নাত','✨')}</div>`}
function qazaCard(){return `<div class=card><div class=mu>Missed prayers (qaza)</div><div class=row style="align-items:center;gap:18px;margin:10px 0"><button class=btn onclick="qz(-1)" aria-label="Made up one">${IC.n}</button><b id=qn style="font-size:2.2rem;min-width:3ch;text-align:center;cursor:pointer" onclick="qzSet()">${S.qz.v}</b><button class=btn onclick="qz(1)" aria-label="Missed one">${IC.a}</button></div><div class=mu style="text-align:center">+ missed · − made up · tap the number to set it</div></div>`}
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
c(){const t=cur(),T=tg(t),p=pg(t);return `<div class=card><button class=pick onclick=openSide()><span>${t.n}</span>${IC.m}</button>
<div class=ar>${t.ar}</div>${S.set.en&&t.en?`<div class=tr>${t.en}</div>`:''}${S.set.bn&&t.bn?`<div class="tr bn">${t.bn}</div>`:''}</div>
<div class=ring onclick=tap()><svg viewBox="0 0 200 200"><circle class=rb r=90 cx=100 cy=100 /><circle id=rg r=90 cx=100 cy=100 stroke-dasharray=565.5 stroke-dashoffset="${565.5*(1-p/T)}"/></svg><div><span id=cn>${p}</span><span class=mu>of ${T}</span></div></div>
<div class=row>${[33,100].map(n=>`<button class="btn ${T==n?'on':''}" onclick=setT(${n})>${n}</button>`).join('')}<button class="btn ${T!=33&&T!=100?'on':''}" onclick=setT(0)>${T!=33&&T!=100?T:'Custom'}</button></div>
<div class=row><button class=btn onclick=reset()>${IC.r} Reset</button><button class=btn onclick=openAdd()>${IC.a} New tasbih</button></div>
<p class="mu" style="text-align:center">Today's total: <b id=td>${dt(dk())}</b></p><p class=mu id=ss style="text-align:center;margin-top:-6px;font-size:.75rem">${user?SS:'Not signed in · saved on this device only'}</p>`},
p(){const l=day();let g='';for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=dk(d);
 g+=`<div style="text-align:center"><div class=mu>${d.toLocaleString('en',{weekday:'short'}).slice(0,2)}</div>${[0,1,2,3,4].map(j=>`<div style="width:14px;height:14px;margin:3px auto;border-radius:50%;background:${S.logs[k]&&S.logs[k].p[j].v?'var(--ac)':'var(--bg)'}"></div>`).join('')}${['tahajjud','sunnah'].map((e,j)=>`<div style="width:14px;height:14px;margin:${j?'3px':'10px'} auto 3px;border-radius:5px;background:${((S.logs[k]&&S.logs[k].x||{})[e]||{}).v?'var(--ac)':'var(--bg)'}"></div>`).join('')}</div>`}
 return `<h2>Daily prayers · ${dp(dk())}/5</h2><div class=card>${PN.map((n,i)=>`<div class=pr><span><b>${n}</b> <span class="mu bn">${PB[i]}</span></span><button class="btn ${l.p[i].v?'p':''}" onclick=togP(${i})>${l.p[i].v?IC.k+' Prayed':'Mark'}</button></div>`).join('')}</div>
${extras()}${qazaCard()}<div class=card><div class=mu style="margin-bottom:6px">Last 7 days</div><div style="display:flex;justify-content:space-around">${g}</div><div class=mu style="margin-top:8px;font-size:.72rem;text-align:center">● five prayers · ▢ Tahajjud, Sunnah</div></div>`},
s(){const x=stats();return `<h2>Stats</h2><div class=g>${[['Today',dt(dk())],['Total tasbih',x.tot],['Streak',x.st+' d'],['Best day',x.best],['Prayers today',dp(dk())+'/5'],['Prayers total',x.ptot],['Tahajjud nights',x.tj],['Sunnah days',x.sn]].map(a=>`<div class="card st"><b>${a[1]}</b><span>${a[0]}</span></div>`).join('')}</div>
<div class=card><div class=row style="justify-content:space-between"><span>${[['w','Week'],['m','Month'],['y','Year']].map(a=>`<button class="btn ${rg==a[0]?'on':''}" onclick="setR('${a[0]}')">${a[1]}</button>`).join(' ')}</span><span>${[['t','Tasbih'],['p','Prayer'],['x','Extras']].map(a=>`<button class="btn ${mt==a[0]?'on':''}" onclick="setM('${a[0]}')">${a[1]}</button>`).join(' ')}</span></div>${chart()}</div>
<div class=card><div class=mu>By tasbih</div>${all().filter(t=>x.per[t.id]).map(t=>`<div class=pr><span>${t.n}</span><b>${x.per[t.id]}</b></div>`).join('')||'<div class=mu>Nothing yet</div>'}</div>`},
g(){const s=S.set,chk=(k,l)=>`<div class=pr><span>${l}</span><input type=checkbox ${s[k]?'checked':''} onchange="S.set.${k}=this.checked;persist(1);render()"></div>`;
 return `<h2>Settings</h2><div class=card><div class=mu style="margin-bottom:8px">Theme</div>${THEMES.map(t=>`<span class=sw data-theme=${t} style="background:var(--ac);${s.theme==t?'outline:2px solid var(--ac)':''}" onclick="S.set.theme='${t}';persist(1);render()"></span>`).join('')}</div>
<div class=card>${chk('en','English translation')}${chk('bn','বাংলা translation')}${chk('tl','Transliteration (duas)')}${chk('haptic','Haptic vibration (phones)')}<div class=pr style="display:block"><div class=mu>Tap vibration length · ${s.hms} ms</div><input type=range min=10 max=100 step=5 value=${s.hms} oninput="S.set.hms=+this.value;this.previousElementSibling.textContent='Tap vibration length · '+this.value+' ms'" onchange="persist(1);vib(S.set.hms)"></div>
<div class=pr style="display:block"><div class=mu>App font</div><select onchange="S.set.uf=this.value;persist(1);render()">${Object.keys(UF).map(k=>`<option value=${k} ${(s.uf||'nunito')==k?'selected':''}>${UF[k].replace(/'/g,'')}</option>`).join('')}</select></div><div class=pr style="display:block"><div class=mu>Arabic font</div><select onchange="S.set.arf=this.value;persist(1);render()"><option value=amiri ${s.arf=='amiri'?'selected':''}>Amiri (Naskh)</option><option value=indo ${s.arf=='indo'?'selected':''}>Indo-Pak (Nastaliq)</option></select></div>
<div class=pr style="display:block"><div class=mu>Text size</div><input type=range min=.8 max=1.6 step=.1 value=${s.size} oninput="S.set.size=+this.value;document.documentElement.style.setProperty('--sz',this.value)" onchange="persist(1)"></div></div>
<div class=card><div class=mu style="margin-bottom:8px">Sync account</div><div id=acc>${acc()}</div></div>
<div class=card><div class=mu style="margin-bottom:8px">Backup</div><div class=row style="justify-content:flex-start"><button class=btn onclick=expData()>Export</button><button class=btn onclick="$('#bf').click()">Import</button></div><input id=bf type=file accept=".json,application/json" hidden onchange="impData(this)"><div class=mu style="margin-top:6px">${S.lb?'Last export: '+new Date(S.lb).toLocaleString():'Never exported'} · import merges into your current data</div></div>
<div class=card><div class=mu style="margin-bottom:8px">Danger zone</div><button class="btn dz" onclick=openReset()>Reset stats…</button></div>`}};
IC.m=sv('<path d="M4 6h16M4 12h16M4 18h16"/>');IC.n=sv('<path d="M5 12h14"/>');IC.cp=sv('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>');
const star=on=>sv('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>').replace('fill="none"',on?'fill="currentColor"':'fill="none"');
function openSide(){const m=document.createElement('div'),L=S.logs[dk()]||{c:{}};m.className='sb';m.id='sb';
 m.onclick=e=>{if(e.target==m)closeSb()};
 m.innerHTML=`<aside class=glass><div class=sh>My tasbih</div><div class=sl>${all().map(x=>`<button class="di si ${x.id==S.cur?'cur':''}" onclick="pickT('${x.id}')"><span class=sn>${x.n}</span><span class=mu>${cc(L,x.id)}</span></button>`).join('')}</div><button class="btn p" onclick="closeSb();openAdd()">${IC.a} New tasbih</button></aside>`;
 document.body.append(m);requestAnimationFrame(()=>m.classList.add('in'))}
function closeSb(){const m=$('#sb');if(m){m.classList.remove('in');setTimeout(()=>m.remove(),250)}}
function pickT(id){S.cur=id;persist(1);closeSb();render()}
const SEARCH_MIN=8,DC={};let duaQ='';
const dkey=x=>x.id||((x.name||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'d'+[...(x.arabic||'')].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,7));
const isF=x=>!!(S.fv[dkey(x)]||{}).v;
const dnorm=s=>(s||'').toLowerCase().replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,'');
const dord=()=>D.map((x,i)=>i).sort((a,b)=>isF(D[b])-isF(D[a])||a-b);
function loadD(){fetch('duas.json').then(r=>r.json()).then(j=>{D=j.duas||[];render()}).catch(()=>{D=[];render()})}
function duaGo(n){const o=dord(),p=o.indexOf(duaI);duaI=o[(p+n+o.length)%o.length];render()}
function dList(){const q=dnorm(duaQ.trim());let o=dord();if(q)o=o.filter(i=>{const x=D[i];return dnorm([x.name,x.arabic,x.transliteration,x.en,x.bn].join(' ')).includes(q)});
 return o.length?o.map((i,n)=>{const x=D[i];return `<button class=di onclick="duaI=${i};duaO=1;render()"><span class=dnum>${n+1}</span><span>${x.name}</span><span class="fv ${isF(x)?'on':''}" onclick="event.stopPropagation();favT(${i})">${star(isF(x))}</span>${IC.rr}</button>`}).join(''):'<div class=mu style="padding:16px;text-align:center">No matches</div>'}
function drawList(){const e=$('#dlist');if(e)e.innerHTML=dList()}
function favT(i){const k=dkey(D[i]);S.fv[k]={v:isF(D[i])?0:1,t:Date.now()};persist();duaO?render():drawList()}
function fbCopy(t){const a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0;user-select:text;-webkit-user-select:text';document.body.append(a);a.select();let ok=false;try{ok=document.execCommand('copy')}catch(e){}a.remove();return Promise.resolve(ok)}
function copyTxt(t){return navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(t).then(()=>true).catch(()=>fbCopy(t)):fbCopy(t)}
function copyDua(){const d=D[duaI],s=S.set;copyTxt([d.name,d.arabic,s.tl&&d.transliteration,s.en&&d.en,s.bn&&d.bn].filter(Boolean).join('\n\n')).then(ok=>toast(ok?'Copied':'Copy failed'))}
function repT(n){const k=dkey(D[duaI]);S.dt[k]=n;DC[k]=0;persist(1);render()}
function repC(){const k=dkey(D[duaI]),n=parseInt(prompt('Repeat how many times?',S.dt[k]||3));if(!n||n<1)return;repT(n)}
function repReset(){DC[dkey(D[duaI])]=0;render()}
function repTap(){const k=dkey(D[duaI]),T=S.dt[k]||3;let n=DC[k]||0;if(n>=T)n=0;n++;DC[k]=n;
 if(n>=T){vib([80,60,80,60,250]);toast('Done · '+T+'×')}else vib(S.set.hms||35);$('#rc').textContent=n+' / '+T}
V.d=()=>{if(!D){loadD();return '<p class=mu>Loading…</p>'}
 if(!D.length)return '<h2>Duas</h2><div class=card>No duas yet. Add some in duas.json</div>';
 if(!duaO){const sr=D.length>=SEARCH_MIN;if(!sr)duaQ='';return `<h2>Duas</h2>${sr?`<input id=dq class=srch type=search placeholder="Search duas…" value="${duaQ.replace(/"/g,'&quot;')}" oninput="duaQ=this.value;drawList()">`:''}<div class="glass dl" id=dlist>${dList()}</div>`}
 duaI=Math.min(duaI,D.length-1);const d=D[duaI],s=S.set,k=dkey(d),T=S.dt[k]||3,n=DC[k]||0,o=dord();
 return `<div class=row style="justify-content:space-between"><button class=btn onclick="duaO=0;render()">${IC.l} All duas</button><span class=row style="margin:0"><button class="btn ${isF(d)?'on':''}" onclick="favT(duaI)" aria-label=Favourite>${star(isF(d))}</button><button class=btn onclick=copyDua() aria-label=Copy>${IC.cp}</button></span></div>
<div class="glass dua"><span class=orb></span><div class=dn>${d.name}</div><div class=orn>${ORN}</div><div class="ar big">${d.arabic}</div>${s.tl&&d.transliteration?`<div class=trl>${d.transliteration}</div>`:''}${s.en&&d.en?`<div class=tr>${d.en}</div>`:''}${s.bn&&d.bn?`<div class="tr bn">${d.bn}</div>`:''}</div>
<div class=row style="align-items:center"><span class=mu>Repeat</span>${[3,7].map(m=>`<button class="btn ${T==m?'on':''}" onclick=repT(${m})>${m}×</button>`).join('')}<button class="btn ${T!=3&&T!=7?'on':''}" onclick=repC()>${T!=3&&T!=7?T+'×':'Custom'}</button><button class="btn p" id=rc onclick=repTap() style="min-width:84px">${n} / ${T}</button><button class=btn onclick=repReset() aria-label=Reset>${IC.r}</button></div>
<div class=row style="align-items:center;gap:18px"><button class=btn onclick=duaGo(-1)>${IC.l}</button><span class=mu>${o.indexOf(duaI)+1} / ${D.length}</span><button class=btn onclick=duaGo(1)>${IC.rr}</button></div>`};
function acc(){if(!fb)return FC.apiKey.startsWith('YOUR')?'<span class=mu>Add your Firebase config in index.html to enable sync. Data is saved on this device meanwhile.</span>':'<span class=mu>Loading…</span>';
 if(user)return `<p>Signed in: <b>${user.email.split('@')[0]}</b></p><button class=btn onclick="fb.Au.signOut(fb.auth)">Sign out</button>`;
 return `<div style="display:grid;gap:8px"><input id=em placeholder=Username autocapitalize=none autocomplete=username><input id=pw type=password placeholder=Password><div class=row><button class="btn p" onclick="auth(0)">Sign in</button><button class=btn onclick="auth(1)">Sign up</button></div></div>`}
function auth(n){const a=fb.Au,e=$('#em').value.trim().toLowerCase().replace(/\s+/g,'')+'@tasbih-app.com',p=$('#pw').value;(n?a.createUserWithEmailAndPassword:a.signInWithEmailAndPassword)(fb.auth,e,p).catch(x=>alert(x.message))}

function render(){document.body.dataset.theme=S.set.theme;const r=document.documentElement.style;r.setProperty('--sz',S.set.size);r.setProperty('--arf',AF[S.set.arf]);r.setProperty('--uf',UF[S.set.uf||'nunito']);
 $('#v').innerHTML=V[tab]();
 $('#nav').innerHTML=[['c','','Count'],['p','','Prayers'],['s','','Stats'],['d','','Duas'],['g','','Settings']].map(a=>`<button class="${tab==a[0]?'on':''}" onclick="tab='${a[0]}';render()">${IC[a[0]]}${a[2]}</button>`).join('')}

// ===== firebase sync =====
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
 try{await fb.F.setDoc(fb.F.doc(fb.db,'users',user.uid),o,{merge:true});setSS('Synced');
  if(off&&(S.pend.c||S.pend.p)){const q=S.pend;S.pend={c:0,p:0};wasOff=false;modal(`<h2>Synced</h2><p>Your offline progress is saved to your account:</p><div class=g><div class="card st"><b>${q.c}</b><span>tasbih counts</span></div><div class="card st"><b>${q.p}</b><span>prayers marked</span></div></div><button class="btn p" onclick=closeM()>Done</button>`)}
  else{S.pend.c=Math.max(0,S.pend.c-p.c);S.pend.p=Math.max(0,S.pend.p-p.p)}
  localStorage.setItem(KEY,JSON.stringify(S))}catch(e){setSS('Sync failed · saved on this device')}}
const typing=e=>/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName);
addEventListener('keydown',e=>{if(e.code!=='Space'||typing(e)||$('#mo')||$('#sb')||tab!=='c')return;e.preventDefault();if(!e.repeat)tap()});
addEventListener('keyup',e=>{if(e.code==='Space'&&!typing(e)&&tab==='c')e.preventDefault()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)push()});addEventListener('pagehide',push);
addEventListener('offline',()=>{wasOff=true;setSS('Offline · saved on this device, will sync later')});addEventListener('online',push);
migrate();render();initFB();
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
