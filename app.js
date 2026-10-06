const $=s=>document.querySelector(s),KEY='tasbih_v1';
const PN=['Fajr','Dhuhr','Asr','Maghrib','Isha'],PB=['ফজর','যোহর','আসর','মাগরিব','এশা'];
const DEF=[
{id:'sub',n:'SubhanAllah',ar:'سُبْحَانَ ٱللَّٰهِ',en:'Glory be to Allah',bn:'আল্লাহ পবিত্র',t:33},
{id:'alh',n:'Alhamdulillah',ar:'ٱلْحَمْدُ لِلَّٰهِ',en:'All praise is for Allah',bn:'সকল প্রশংসা আল্লাহর',t:33},
{id:'akb',n:'Allahu Akbar',ar:'ٱللَّٰهُ أَكْبَرُ',en:'Allah is the Greatest',bn:'আল্লাহ সর্বমহান',t:33},
{id:'lai',n:'La ilaha illallah',ar:'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ',en:'There is no god but Allah',bn:'আল্লাহ ছাড়া কোনো ইলাহ নেই',t:100},
{id:'ast',n:'Astaghfirullah',ar:'أَسْتَغْفِرُ ٱللَّٰهَ',en:'I seek forgiveness from Allah',bn:'আমি আল্লাহর কাছে ক্ষমা চাই',t:100},
{id:'dur',n:'Durood',ar:'ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ',en:'O Allah, send blessings upon Muhammad',bn:'হে আল্লাহ, মুহাম্মদের ওপর রহমত বর্ষণ করুন',t:100},
{id:'subh',n:'Subhanallahi wa bihamdihi',ar:'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',en:'Glory be to Allah and His is the praise.',bn:'আল্লাহর পবিত্রতা ও মহিমা ঘোষণা করছি এবং সমস্ত প্রশংসা তাঁরই',t:100}];
const THEMES=['forest','night','rose','ocean','dusk','sand','lavender','mint','sunset','ember','midnight'];
const UF={nunito:'Nunito',poppins:'Poppins',quicksand:'Quicksand',baloo:"'Baloo 2'",lora:'Lora',playfair:"'Playfair Display'"};
const sv=p=>`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const IC={c:sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>'),p:sv('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),s:sv('<path d="M18 20V10M12 20V4M6 20v-6"/>'),d:sv('<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>'),g:sv('<path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>'),r:sv('<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>'),a:sv('<path d="M12 5v14M5 12h14"/>'),k:sv('<path d="M5 12l5 5L20 7"/>'),l:sv('<path d="M15 6l-6 6 6 6"/>'),rr:sv('<path d="M9 6l6 6-6 6"/>')};
const ORN='<svg viewBox="0 0 120 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 6h42M76 6h42"/><path d="M60 1l5 5-5 5-5-5z" fill="currentColor"/></svg>';
const AF={amiri:"Amiri,serif",indo:"'Noto Nastaliq Urdu',serif"};
let S=JSON.parse(localStorage.getItem(KEY)||'null')||{tl:[],tt:{},logs:{},prog:{},cur:'sub',pend:{c:0,p:0},upd:0,
 set:{theme:'forest',arf:'amiri',size:1,en:true,bn:true,haptic:true}};
let tab='c',rg='w',mt='t',wasOff=!navigator.onLine,duaI=0,duaO=0,D=null;
S.set.tl??=true;S.set.uf??='nunito';
const all=()=>DEF.concat(S.tl),cur=()=>all().find(x=>x.id==S.cur)||DEF[0],tg=t=>S.tt[t.id]||t.t;
const dk=d=>{d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const day=k=>S.logs[k=k||dk()]=S.logs[k]||{c:{},p:[0,0,0,0,0]};
const dt=k=>S.logs[k]?Object.values(S.logs[k].c).reduce((a,b)=>a+b,0):0;
const dp=k=>S.logs[k]?S.logs[k].p.reduce((a,b)=>a+b,0):0;
const vib=p=>{if(S.set.haptic&&navigator.vibrate)navigator.vibrate(p)};
function toast(m){const t=$('#toast');t.textContent=m;t.style.opacity=1;setTimeout(()=>t.style.opacity=0,1800)}
function persist(){S.upd=Date.now();localStorage.setItem(KEY,JSON.stringify(S));clearTimeout(persist.t);persist.t=setTimeout(push,1500)}
function modal(h){const m=document.createElement('div');m.className='mo';m.id='mo';m.innerHTML='<div>'+h+'</div>';m.onclick=e=>{if(e.target==m)m.remove()};document.body.append(m)}
const closeM=()=>$('#mo')&&$('#mo').remove();

// ===== counter =====
function tap(){const t=cur(),l=day();S.prog[t.id]=(S.prog[t.id]||0)+1;l.c[t.id]=(l.c[t.id]||0)+1;S.pend.c++;
 if(!navigator.onLine)wasOff=true;
 if(S.prog[t.id]>=tg(t)){S.prog[t.id]=0;vib([80,60,80,60,250]);toast('Target complete')}else vib(12);
 persist();upd()}
function upd(){const t=cur(),p=S.prog[t.id]||0;$('#cn').textContent=p;$('#rg').style.strokeDashoffset=565.5*(1-p/tg(t));$('#td').textContent=dt(dk())}
function setT(n){if(!n){n=parseInt(prompt('Custom target',tg(cur())));if(!n||n<1)return}S.tt[S.cur]=n;persist();render()}
function reset(){S.prog[S.cur]=0;persist();render()}
function addT(){const g=i=>$('#'+i).value.trim();if(!g('an')&&!g('aa'))return;
 const id='c'+Date.now();S.tl.push({id,n:g('an')||g('aa'),ar:g('aa'),en:g('ae'),bn:g('ab'),t:parseInt(g('at'))||33});S.cur=id;closeM();persist();render()}
function openAdd(){modal(`<h2>New tasbih</h2><input id=an placeholder="Name"><input id=aa dir=rtl placeholder="Arabic text"><input id=ae placeholder="English translation"><input id=ab placeholder="বাংলা অনুবাদ"><input id=at type=number placeholder="Target (default 33)"><button class="btn p" onclick=addT()>Add</button>`)}

// ===== prayers =====
function togP(i){const l=day();l.p[i]=l.p[i]?0:1;S.pend.p+=l.p[i]?1:0;if(!navigator.onLine)wasOff=true;vib(20);persist();render()}

// ===== stats =====
function series(){const n=new Date(),o=[];const f=mt=='t'?dt:dp;
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
 const per={};ks.forEach(k=>{for(const i in S.logs[k].c)per[i]=(per[i]||0)+S.logs[k].c[i]});
 return{tot,ptot,st,best,per}}
function setR(r){rg=r;render()}function setM(m){mt=m;render()}

// ===== views =====
const V={
c(){const t=cur(),T=tg(t),p=S.prog[t.id]||0;return `<div class=card><button class=pick onclick=openSide()><span>${t.n}</span>${IC.m}</button>
<div class=ar>${t.ar}</div>${S.set.en&&t.en?`<div class=tr>${t.en}</div>`:''}${S.set.bn&&t.bn?`<div class="tr bn">${t.bn}</div>`:''}</div>
<div class=ring onclick=tap()><svg viewBox="0 0 200 200"><circle class=rb r=90 cx=100 cy=100 /><circle id=rg r=90 cx=100 cy=100 stroke-dasharray=565.5 stroke-dashoffset="${565.5*(1-p/T)}"/></svg><div><span id=cn>${p}</span><span class=mu>of ${T}</span></div></div>
<div class=row>${[33,100].map(n=>`<button class="btn ${T==n?'on':''}" onclick=setT(${n})>${n}</button>`).join('')}<button class="btn ${T!=33&&T!=100?'on':''}" onclick=setT(0)>${T!=33&&T!=100?T:'Custom'}</button></div>
<div class=row><button class=btn onclick=reset()>${IC.r} Reset</button><button class=btn onclick=openAdd()>${IC.a} New tasbih</button></div>
<p class="mu" style="text-align:center">Today's total: <b id=td>${dt(dk())}</b></p>`},
p(){const l=day();let g='';for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=dk(d);
 g+=`<div style="text-align:center"><div class=mu>${d.toLocaleString('en',{weekday:'short'}).slice(0,2)}</div>${[0,1,2,3,4].map(j=>`<div style="width:14px;height:14px;margin:3px auto;border-radius:50%;background:${S.logs[k]&&S.logs[k].p[j]?'var(--ac)':'var(--bg)'}"></div>`).join('')}</div>`}
 return `<h2>Daily prayers · ${dp(dk())}/5</h2><div class=card>${PN.map((n,i)=>`<div class=pr><span><b>${n}</b> <span class="mu bn">${PB[i]}</span></span><button class="btn ${l.p[i]?'p':''}" onclick=togP(${i})>${l.p[i]?IC.k+' Prayed':'Mark'}</button></div>`).join('')}</div>
<div class=card><div class=mu style="margin-bottom:6px">Last 7 days</div><div style="display:flex;justify-content:space-around">${g}</div></div>`},
s(){const x=stats();return `<h2>Stats</h2><div class=g>${[['Today',dt(dk())],['Total tasbih',x.tot],['Streak',x.st+' d'],['Best day',x.best],['Prayers today',dp(dk())+'/5'],['Prayers total',x.ptot]].map(a=>`<div class="card st"><b>${a[1]}</b><span>${a[0]}</span></div>`).join('')}</div>
<div class=card><div class=row style="justify-content:space-between"><span>${[['w','Week'],['m','Month'],['y','Year']].map(a=>`<button class="btn ${rg==a[0]?'on':''}" onclick="setR('${a[0]}')">${a[1]}</button>`).join(' ')}</span><span>${[['t','Tasbih'],['p','Prayer']].map(a=>`<button class="btn ${mt==a[0]?'on':''}" onclick="setM('${a[0]}')">${a[1]}</button>`).join(' ')}</span></div>${chart()}</div>
<div class=card><div class=mu>By tasbih</div>${all().filter(t=>x.per[t.id]).map(t=>`<div class=pr><span>${t.n}</span><b>${x.per[t.id]}</b></div>`).join('')||'<div class=mu>Nothing yet</div>'}</div>`},
g(){const s=S.set,chk=(k,l)=>`<div class=pr><span>${l}</span><input type=checkbox ${s[k]?'checked':''} onchange="S.set.${k}=this.checked;persist();render()"></div>`;
 return `<h2>Settings</h2><div class=card><div class=mu style="margin-bottom:8px">Theme</div>${THEMES.map(t=>`<span class=sw data-theme=${t} style="background:var(--ac);${s.theme==t?'outline:2px solid var(--ac)':''}" onclick="S.set.theme='${t}';persist();render()"></span>`).join('')}</div>
<div class=card>${chk('en','English translation')}${chk('bn','বাংলা translation')}${chk('tl','Transliteration (duas)')}${chk('haptic','Haptic vibration (phones)')}
<div class=pr style="display:block"><div class=mu>App font</div><select onchange="S.set.uf=this.value;persist();render()">${Object.keys(UF).map(k=>`<option value=${k} ${(s.uf||'nunito')==k?'selected':''}>${UF[k].replace(/'/g,'')}</option>`).join('')}</select></div><div class=pr style="display:block"><div class=mu>Arabic font</div><select onchange="S.set.arf=this.value;persist();render()"><option value=amiri ${s.arf=='amiri'?'selected':''}>Amiri (Naskh)</option><option value=indo ${s.arf=='indo'?'selected':''}>Indo-Pak (Nastaliq)</option></select></div>
<div class=pr style="display:block"><div class=mu>Text size</div><input type=range min=.8 max=1.6 step=.1 value=${s.size} oninput="S.set.size=+this.value;document.documentElement.style.setProperty('--sz',this.value)" onchange="persist()"></div></div>
<div class=card><div class=mu style="margin-bottom:8px">Sync account</div><div id=acc>${acc()}</div></div>`}};
IC.m=sv('<path d="M4 6h16M4 12h16M4 18h16"/>');
function openSide(){const m=document.createElement('div'),L=(S.logs[dk()]||{c:{}}).c;m.className='sb';m.id='sb';
 m.onclick=e=>{if(e.target==m)closeSb()};
 m.innerHTML=`<aside class=glass><div class=sh>My tasbih</div><div class=sl>${all().map(x=>`<button class="di si ${x.id==S.cur?'cur':''}" onclick="pickT('${x.id}')"><span class=sn>${x.n}</span><span class=mu>${L[x.id]||0}</span></button>`).join('')}</div><button class="btn p" onclick="closeSb();openAdd()">${IC.a} New tasbih</button></aside>`;
 document.body.append(m);requestAnimationFrame(()=>m.classList.add('in'))}
function closeSb(){const m=$('#sb');if(m){m.classList.remove('in');setTimeout(()=>m.remove(),250)}}
function pickT(id){S.cur=id;persist();closeSb();render()}
function loadD(){fetch('duas.json').then(r=>r.json()).then(j=>{D=j.duas||[];render()}).catch(()=>{D=[];render()})}
function duaGo(n){duaI=(duaI+n+D.length)%D.length;render()}
V.d=()=>{if(!D){loadD();return '<p class=mu>Loading…</p>'}
 if(!D.length)return '<h2>Duas</h2><div class=card>No duas yet. Add some in duas.json</div>';
 if(!duaO)return `<h2>Duas</h2><div class="glass dl">${D.map((x,i)=>`<button class=di onclick="duaI=${i};duaO=1;render()"><span class=dnum>${i+1}</span><span>${x.name}</span>${IC.rr}</button>`).join('')}</div>`;
 duaI=Math.min(duaI,D.length-1);const d=D[duaI],s=S.set;
 return `<div class=row style="justify-content:flex-start"><button class=btn onclick="duaO=0;render()">${IC.l} All duas</button></div>
<div class="glass dua"><span class=orb></span><div class=dn>${d.name}</div><div class=orn>${ORN}</div><div class="ar big">${d.arabic}</div>${s.tl&&d.transliteration?`<div class=trl>${d.transliteration}</div>`:''}${s.en&&d.en?`<div class=tr>${d.en}</div>`:''}${s.bn&&d.bn?`<div class="tr bn">${d.bn}</div>`:''}</div>
<div class=row style="align-items:center;gap:18px"><button class=btn onclick=duaGo(-1)>${IC.l}</button><span class=mu>${duaI+1} / ${D.length}</span><button class=btn onclick=duaGo(1)>${IC.rr}</button></div>`};
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
 const app=A.initializeApp(FC);fb={Au,F,auth:Au.getAuth(app),db:F.initializeFirestore(app,{localCache:F.persistentLocalCache()})};
 Au.onAuthStateChanged(fb.auth,u=>{user=u;first=true;if(u)listen();tab=='g'&&render()});tab=='g'&&render()}catch(e){console.warn('Firebase offline',e)}}
function listen(){fb.F.onSnapshot(fb.F.doc(fb.db,'users',user.uid),s=>{if(s.metadata.hasPendingWrites)return;
 if(s.exists())merge(JSON.parse(s.data().d));localStorage.setItem(KEY,JSON.stringify(S));render();if(first){first=false;push()}})}
function merge(r){r.tl.forEach(x=>{if(!S.tl.find(y=>y.id==x.id))S.tl.push(x)});
 for(const d in r.logs){const a=day(d),b=r.logs[d];for(const k in b.c)a.c[k]=Math.max(a.c[k]||0,b.c[k]);b.p.forEach((v,i)=>a.p[i]=a.p[i]||v?1:0)}
 if(r.upd>S.upd){S.set=r.set;S.tt=r.tt;S.prog=r.prog;S.cur=r.cur}}
async function push(){if(!user||!fb)return;const p={...S.pend},off=wasOff;
 try{await fb.F.setDoc(fb.F.doc(fb.db,'users',user.uid),{d:JSON.stringify(S)});
  S.pend.c-=p.c;S.pend.p-=p.p;localStorage.setItem(KEY,JSON.stringify(S));
  if(off&&(p.c||p.p)){wasOff=false;modal(`<h2>Synced</h2><p>Your offline progress is saved to your account:</p><div class=g><div class="card st"><b>${p.c}</b><span>tasbih counts</span></div><div class="card st"><b>${p.p}</b><span>prayers marked</span></div></div><button class="btn p" onclick=closeM()>Done</button>`)}}catch(e){}}
const typing=e=>/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName);
addEventListener('keydown',e=>{if(e.code!=='Space'||typing(e)||$('#mo')||$('#sb')||tab!=='c')return;e.preventDefault();if(!e.repeat)tap()});
addEventListener('keyup',e=>{if(e.code==='Space'&&!typing(e)&&tab==='c')e.preventDefault()});
addEventListener('offline',()=>wasOff=true);addEventListener('online',push);
render();initFB();
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
