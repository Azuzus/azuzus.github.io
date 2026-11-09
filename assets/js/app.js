/* =========================================================
   STATUT OUVERT / FERMÉ + HORAIRES
   ========================================================= */
$('#hero-pz').innerHTML = `<svg viewBox="0 0 400 400">${pizza({sauce:SAUCE.tomate,types:typesOf('olives, champignons, pepperoni, poivrons, tomates cerises, chèvre, pesto'),seed:'hero',anim:ALL})}</svg>`;

const HOURS = {0:[[18,22]],1:null,2:[[18,22]],3:[[11.5,14],[18,22]],4:[[11.5,14],[18,22]],5:[[11.5,14],[18,22]],6:[[11.5,14],[18,22]]};
const DAYS = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const fmtH = h => `${Math.floor(h)}h${h%1?String(Math.round(h%1*60)).padStart(2,'0'):''}`;
function status(){
  const now=new Date(), d=now.getDay(), h=now.getHours()+now.getMinutes()/60, slots=HOURS[d]||[];
  const cur = slots.find(([a,b]) => h>=a && h<b);
  if(cur) return {open:true, short:`Ouvert jusqu'à ${fmtH(cur[1])}`, long:`Ouvert jusqu'à ${fmtH(cur[1])}`};
  const next = slots.find(([a]) => h<a);
  if(next) return {open:false, short:`Fermé, ouvre à ${fmtH(next[0])}`, long:`Fermé, ouverture à ${fmtH(next[0])}`};
  let k=1; while(k<8 && !HOURS[(d+k)%7]) k++; const nd=(d+k)%7, when = k===1?'demain':DAYS[nd].toLowerCase();
  return {open:false, short:`Fermé, ouvre ${when} ${fmtH(HOURS[nd][0][0])}`, long:`Fermé, réouverture ${when} à ${fmtH(HOURS[nd][0][0])}`};
}
function paintStatus(){const s=status();$$('[data-status]').forEach(el=>{el.className='status '+(s.open?'open':'closed');el.lastElementChild.textContent=s.short});$$('[data-status-long]').forEach(el=>el.textContent=s.long)}
paintStatus(); setInterval(paintStatus, 60000);
$('#hours').insertAdjacentHTML('beforeend', [1,2,3,4,5,6,0].map(d => {
  const v = HOURS[d] ? HOURS[d].map(([a,b])=>`${fmtH(a)} – ${fmtH(b)}`).join(', ') : 'Fermé';
  return `<tr class="${d===new Date().getDay()?'today':''}"><th scope="row">${DAYS[d]}</th><td>${v}</td></tr>`; }).join(''));

function seg(el, onPick, attr){
  el.addEventListener('click', e => { const b = e.target.closest('button'); if(!b) return;
    el.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed', x===b)); onPick(+b.dataset[attr]); });
}

/* =========================================================
   LA CARTE
   ========================================================= */
const S = {cat:'all', size:1, q:'', halal:false, veg:false, active:'Texas'};
const CATS = [['all','Toutes',ITEMS.length], ...MENU.map(g=>[g.id, g.title.replace('Base ','').replace(/^./,c=>c.toUpperCase()), g.items.length])];
$('#cats').innerHTML = CATS.map(([id,l,n]) => `<button data-cat="${id}" aria-pressed="${id==='all'}">${l}<span>${n}</span></button>`).join('');
$('#cats').addEventListener('click', e => { const b=e.target.closest('button'); if(!b) return; S.cat=b.dataset.cat; $$('#cats button').forEach(x=>x.setAttribute('aria-pressed',x===b)); renderList(); });

function visible(){
  const q = norm(S.q.trim());
  return ITEMS.filter(it => (S.cat==='all'||it.cat===S.cat) && (!S.halal||it.h) && (!S.veg||it.veg) && (!q || norm(it.n+' '+it.d).includes(q)));
}
const thumb = it => `<svg class="thumb" viewBox="0 0 60 60" aria-hidden="true">${it.mystery?mystery(30,30,28):pizza({cx:30,cy:30,r:28,sauce:it.sauce,types:typesOf(it.d),seed:it.n})}</svg>`;
const tags = it => `${it.h?'<span class="tag h"><i></i>Halal</span>':''}${it.veg?'<span class="tag">Sans viande</span>':''}`;

function renderList(){
  const vis = visible(); let html='', cat=null;
  for(const it of vis){
    if(it.cat!==cat){ cat=it.cat; const g=MENU.find(m=>m.id===cat); html+=`<li class="group"><i style="background:${SAUCE[cat]}"></i><h4>${g.title}</h4><span>${vis.filter(v=>v.cat===cat).length}</span><hr></li>`; }
    html += `<li class="row${it.n===S.active?' on':''}" data-n="${esc(it.n)}" tabindex="0">${thumb(it)}
      <div><div class="l1"><h5>${esc(it.n)}</h5><span class="dots"></span><span class="pr">${eur(it.p[S.size])}</span></div>
      <p>${esc(it.d)}</p><div class="tags">${tags(it)}</div></div>
      <button class="add" data-add="${esc(it.n)}" aria-label="Ajouter ${esc(it.n)} à ma liste"><svg><use href="#i-plus"/></svg></button></li>`;
  }
  $('#list').innerHTML = html || '<li class="empty">Aucune pizza ne correspond. <a href="#compose" class="textlink">Composez la vôtre</a></li>';
  if(vis.length && !vis.some(v=>v.n===S.active)) setActive(vis[0].n);
}
function setActive(n){
  if(n===S.active) return; S.active=n;
  $$('#list .row').forEach(r => r.classList.toggle('on', r.dataset.n===n));
  renderStage();
}
function renderStage(){
  const it = ITEMS.find(x=>x.n===S.active);
  const ings = it.mystery ? ['Recette surprise','Demandez par téléphone'] : it.d.split(', ');
  $('#stage').innerHTML = `
    <div class="head"><span class="meta">${it.catTitle}</span><span>${tags(it)}</span></div>
    <h3>${esc(it.n)}</h3>
    <div class="plate"><svg viewBox="0 0 400 400" aria-hidden="true">${it.mystery?mystery(200,200,180):pizza({sauce:it.sauce,types:typesOf(it.d),seed:it.n,anim:ALL})}</svg></div>
    <div class="ings">${ings.map(x=>`<span>${esc(x)}</span>`).join('')}</div>
    <div class="prices">${SIZES.map((s,i)=>`<button data-size="${i}" aria-pressed="${i===S.size}"><small>${s}</small><b>${eur(it.p[i])}</b></button>`).join('')}</div>
    <button class="btn" data-add="${esc(it.n)}"><svg class="ico"><use href="#i-plus"/></svg><span>Ajouter, ${eur(it.p[S.size])}</span></button>`;
}
function setSize(i){
  S.size=i; $$('#sizes button').forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
  $$('#list .row').forEach(r => { const it=ITEMS.find(x=>x.n===r.dataset.n); r.querySelector('.pr').textContent=eur(it.p[i]); });
  const st=$('#stage'); st.querySelectorAll('.prices button').forEach((b,k)=>b.setAttribute('aria-pressed',k===i));
  const it=ITEMS.find(x=>x.n===S.active); const lbl=st.querySelector('.btn span'); if(lbl) lbl.textContent=`Ajouter, ${eur(it.p[i])}`;
}
seg($('#sizes'), setSize, 'size');
$('#stage').addEventListener('click', e => { const b=e.target.closest('.prices button'); if(b) setSize(+b.dataset.size); });
const list = $('#list');
list.addEventListener('mouseover', e => { const r=e.target.closest('.row'); if(r && matchMedia('(hover:hover)').matches) setActive(r.dataset.n); });
list.addEventListener('focusin', e => { const r=e.target.closest('.row'); if(r) setActive(r.dataset.n); });
list.addEventListener('click', e => { const r=e.target.closest('.row'); if(r && !e.target.closest('.add')) setActive(r.dataset.n); });
list.addEventListener('keydown', e => { if(e.key==='Enter' && e.target.classList.contains('row')) addPizza(e.target.dataset.n); });
document.addEventListener('click', e => { const b=e.target.closest('[data-add]'); if(b) addPizza(b.dataset.add); });
function addPizza(n){ const it=ITEMS.find(x=>x.n===n); addCart(it.n, SIZES[S.size]+', '+it.catTitle.toLowerCase(), it.p[S.size]); }
$('#q').addEventListener('input', e => { S.q=e.target.value; renderList(); });
for(const k of ['halal','veg']) $('#f-'+k).addEventListener('click', e => { S[k]=!S[k]; e.currentTarget.setAttribute('aria-pressed',S[k]); renderList(); });
$('#dice').addEventListener('click', () => {
  const rows = $$('#list .row').filter(r => r.dataset.n!=='Pizza du mois' && r.dataset.n!==S.active); if(!rows.length) return;
  const r = rows[Math.floor(Math.random()*rows.length)]; setActive(r.dataset.n);
  r.classList.remove('picked'); void r.offsetWidth; r.classList.add('picked'); r.scrollIntoView({behavior:'smooth',block:'center'});
});
renderList(); renderStage();

/* =========================================================
   COMPOSE TA PIZZA
   ========================================================= */
const B = {size:1, base:'Sauce tomate', ings:[]};
let prevTypes = new Set();
const MEAT_CHEESE = new Set([...INGS['Viandes et poissons'],...INGS['Fromages et extras']].map(x=>x[0]));
const optBtn = (v, on, inner) => `<button class="opt" aria-pressed="${on}" data-v="${esc(v)}">${inner}</button>`;
const box = '<span class="box"><svg><use href="#i-check"/></svg></span>';
$('#b-size').innerHTML = SIZES.map((s,i) => optBtn(i, i===B.size, s)).join('');
$('#b-base').innerHTML = BASES.map(([b,c]) => optBtn(b, b===B.base, `<span class="sw" style="background:${c}"></span>${b}`)).join('');
$('#b-ing').innerHTML = Object.entries(INGS).map(([cat,l]) => `<div class="ing-cat">${cat}</div><div class="opts">${l.map(([n,f]) => optBtn(n,false,`${box}${n}${f===H?' <small class="h">Halal</small>':f?` <small>${f}</small>`:''}`)).join('')}</div>`).join('');
function bPrice(){
  const n=B.ings.length, s=B.size; if(!n) return {total:0, tier:0};
  const tier = n<=1?1:n<=3?3:5; let total = COMPOSE[tier][s];
  B.ings.slice(5).forEach(i => total += MEAT_CHEESE.has(i)?SUPP.meat[s]:SUPP.veg[s]);
  if(B.ings.includes('Burratina')) total += 2;
  return {total, tier};
}
function bRender(){
  $$('#b-size .opt').forEach(b => b.setAttribute('aria-pressed', +b.dataset.v===B.size));
  $$('#b-base .opt').forEach(b => b.setAttribute('aria-pressed', b.dataset.v===B.base));
  $$('#b-ing .opt').forEach(b => b.setAttribute('aria-pressed', B.ings.includes(b.dataset.v)));
  const n=B.ings.length, {total,tier}=bPrice(), types=typesOf(B.ings.join(', ')+' ');
  $('#b-count').textContent = `${n} choisi${n>1?'s':''}`;
  const sauce = BASES.find(b=>b[0]===B.base)[1];
  const before = prevTypes; prevTypes = new Set(types);
  $('#b-svg').innerHTML = pizza({sauce, types, seed:'compose', anim:t=>!before.has(t)});
  $('#b-tiers').innerHTML = [1,3,5].map(k => `<div class="${k===tier?'on':''}">${k} ingrédient${k>1?'s':''}<b>${eur(COMPOSE[k][B.size])}</b></div>`).join('');
  $('#b-hint').textContent = n===0 ? 'Choisissez vos ingrédients' : (n===2||n===4) ? 'Encore un ingrédient pour le même prix' : n>5 ? `${n-5} ingrédient${n>6?'s':''} en supplément` : '';
  $('#b-total').textContent = n ? eur(total) : '—';
  $('#b-add').disabled = !n;
}
$('#compose .builder').addEventListener('click', e => {
  const b=e.target.closest('.opt'); if(!b) return; const v=b.dataset.v, where=b.parentElement.id;
  if(where==='b-size') B.size=+v; else if(where==='b-base'){ B.base=v; prevTypes=new Set(); }
  else B.ings = B.ings.includes(v) ? B.ings.filter(x=>x!==v) : [...B.ings, v];
  bRender();
});
$('#b-add').addEventListener('click', () => addCart('Pizza composée', `${SIZES[B.size]}, ${B.base.toLowerCase()} : ${B.ings.join(', ').toLowerCase()}`, bPrice().total));
bRender();

/* =========================================================
   50 CM MULTI-RECETTES
   ========================================================= */
const XL = {n:2, picks:['Texas','Orlando','Buffalo','Houston'], sel:0};
function wedge(i,n){
  if(n===1) return 'M250 250m-232 0a232 232 0 1 0 464 0a232 232 0 1 0-464 0';
  const a0=-Math.PI/2+i*2*Math.PI/n, a1=a0+2*Math.PI/n, R=232, p=a=>`${f1(250+R*Math.cos(a))} ${f1(250+R*Math.sin(a))}`;
  return `M250 250L${p(a0)}A${R} ${R} 0 0 1 ${p(a1)}Z`;
}
let xlPrev = [];
function xlRender(){
  const n=XL.n; let s='<defs>'; for(let i=0;i<n;i++) s+=`<clipPath id="w${i}"><path d="${wedge(i,n)}"/></clipPath>`; s+='</defs>';
  for(let i=0;i<n;i++){
    const it=ITEMS.find(x=>x.n===XL.picks[i]), changed = xlPrev[i]!==it.n+n;
    s += `<g class="slice" data-i="${i}" clip-path="url(#w${i})">${pizza({cx:250,cy:250,r:230,sauce:it.sauce,types:typesOf(it.d),seed:it.n+'xl',anim:changed?ALL:null})}<path class="shade" d="${wedge(i,n)}" fill="#fff"/></g>`;
  }
  if(n>1) for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n; s+=`<line x1="250" y1="250" x2="${f1(250+232*Math.cos(a))}" y2="${f1(250+232*Math.sin(a))}" stroke="#12110f" stroke-width="4"/>`}
  for(let i=0;i<n;i++){const a=-Math.PI/2+(i+.5)*2*Math.PI/n, d=n===1?0:120, x=250+d*Math.cos(a), y=250+d*Math.sin(a), on=XL.sel===i;
    s+=`<g pointer-events="none"><circle cx="${f1(x)}" cy="${f1(y)}" r="18" fill="${on?'#d93a26':'#12110f'}" stroke="#efe9de" stroke-opacity="${on?0:.4}"/><text x="${f1(x)}" y="${f1(y+5)}" text-anchor="middle" font-family="Instrument Sans" font-weight="500" font-size="15" fill="#fff">${i+1}</text></g>`}
  $('#xl-svg').innerHTML = s;
  xlPrev = XL.picks.slice(0,n).map(p=>p+n);
  const opts = cur => MENU.map(m=>`<optgroup label="${m.title}">${m.items.filter(([nm])=>nm!=='Pizza du mois').map(([nm])=>`<option ${nm===cur?'selected':''}>${esc(nm)}</option>`).join('')}</optgroup>`).join('');
  $('#xl-slots').innerHTML = XL.picks.slice(0,n).map((p,i) => { const it=ITEMS.find(x=>x.n===p);
    return `<label class="slot${XL.sel===i?' sel':''}"><span class="num">${i+1}</span><span><select data-i="${i}" aria-label="Recette de la part ${i+1}">${opts(p)}</select><small>${esc(it.d)} · ${eur(it.p[2])}</small></span></label>`; }).join('');
  $('#xl-price').textContent = eur(xlPrice());
  $('#xl-rule').textContent = n===4 ? 'Prix fixe pour 4 recettes' : n===2 ? 'Au tarif de la plus chère des deux' : 'Prix 50 cm de la carte';
}
const xlPrice = () => XL.n===4 ? 25 : Math.max(...XL.picks.slice(0,XL.n).map(p=>ITEMS.find(x=>x.n===p).p[2]));
seg($('#xl-modes'), n => { XL.n=n; XL.sel=0; xlRender(); }, 'n');
$('#xl-svg').addEventListener('click', e => { const g=e.target.closest('.slice'); if(!g) return; XL.sel=+g.dataset.i; xlRender(); $(`#xl-slots select[data-i="${XL.sel}"]`).focus(); });
$('#xl-slots').addEventListener('change', e => { const i=+e.target.dataset.i; XL.picks[i]=e.target.value; XL.sel=i; xlRender(); });
$('#xl-add').addEventListener('click', () => addCart(`Pizza 50 cm, ${XL.n} recette${XL.n>1?'s':''}`, XL.picks.slice(0,XL.n).join(', '), xlPrice()));
xlRender();

/* =========================================================
   PÂTES ET BOISSONS
   ========================================================= */
const dish = seed => { const R=rnd(seed); let p=''; for(let i=0;i<10;i++) p+=`<rect x="${f1(12+R()*28)}" y="${f1(20+R()*14)}" width="10" height="4" rx="2" fill="${R()>.5?'#d08a3a':'#e9b65e'}" transform="rotate(${(R()*80-40)|0} ${f1(18+R()*18)} ${f1(26+R()*8)})"/>`;
  return `<svg viewBox="0 0 56 56" aria-hidden="true"><rect x="2" y="12" width="52" height="34" rx="8" fill="#2a2622"/><rect x="6" y="16" width="44" height="26" rx="5" fill="#f2cf86"/>${p}</svg>`; };
$('#pasta').innerHTML = PASTA.map(([n,d,p,h]) => `<article>${dish(n)}<div><h4>${esc(n)}</h4><p>${esc(d)}</p><div class="pl"><span>${eur(p)}</span>${h?'<span class="tag h"><i></i>Halal</span>':''}</div></div><button class="add" data-pasta="${esc(n)}" aria-label="Ajouter ${esc(n)} à ma liste"><svg><use href="#i-plus"/></svg></button></article>`).join('');
$('#pasta').addEventListener('click', e => { const b=e.target.closest('[data-pasta]'); if(!b) return; const p=PASTA.find(x=>x[0]===b.dataset.pasta); addCart(p[0], 'Gratin du midi', p[2]); });

$('#drinks').innerHTML = DRINKS.map(([g,l]) => `<div class="dgroup"><h4>${g}</h4><hr></div>` + l.map(([n,v,p,c]) => `<div class="drink"><span class="can" style="background:${c}"></span><span>${esc(n)}${v?`<small>${v}</small>`:''}</span><span class="pr">${eur(p)}</span><button class="add" data-drink="${esc(n)}" aria-label="Ajouter ${esc(n)} à ma liste"><svg><use href="#i-plus"/></svg></button></div>`).join('')).join('');
$('#drinks').addEventListener('click', e => { const b=e.target.closest('[data-drink]'); if(!b) return; for(const [,l] of DRINKS){ const d=l.find(x=>x[0]===b.dataset.drink); if(d) addCart(d[0], d[1]||'Soft 33 cl', d[2]); } });

/* =========================================================
   MA LISTE (gardée sur cet appareil)
   ========================================================= */
let cart = []; try { cart = JSON.parse(localStorage.getItem('tp-liste')) || []; } catch(e) {}
const save = () => { try { localStorage.setItem('tp-liste', JSON.stringify(cart)); } catch(e) {} };
const dock = $('#dock');
const syncDock = () => dock.classList.toggle('hide', !cart.length); // visible seulement quand la liste a des articles (sur mobile, la barre Appeler reste toujours là)
function addCart(label, detail, price){
  const k = label+'|'+detail, it = cart.find(x=>x.k===k);
  it ? it.q++ : cart.push({k,label,detail,price,q:1}); save(); renderCart();
}
function renderCart(){
  const count = cart.reduce((a,x)=>a+x.q,0), total = cart.reduce((a,x)=>a+x.q*x.price,0);
  $('#cart-count').textContent = count; $('#cart-total').textContent = eur(total);
  $('#open-cart').classList.toggle('empty-cart', !count);
  syncDock();
  $('#cart-list').innerHTML = cart.length ? cart.map((x,i) => `<li><b>${esc(x.label)}</b><span class="pr">${eur(x.price*x.q)}</span><small>${esc(x.detail)}</small><span class="qty"><button data-q="${i}" data-d="-1" aria-label="Retirer un">−</button><span>${x.q}</span><button data-q="${i}" data-d="1" aria-label="Ajouter un">+</button></span></li>`).join('') : '<li class="empty-msg">Votre liste est vide. Ajoutez des pizzas avec le bouton +</li>';
}
$('#cart-list').addEventListener('click', e => { const b=e.target.closest('[data-q]'); if(!b) return; const x=cart[+b.dataset.q]; x.q += +b.dataset.d; if(x.q<=0) cart.splice(+b.dataset.q,1); save(); renderCart(); });
$('#clear-cart').addEventListener('click', () => { cart=[]; save(); renderCart(); });
const drawer=$('#drawer'), scrim=$('#scrim');
const openCart = on => { drawer.classList.toggle('on',on); scrim.classList.toggle('on',on); drawer.setAttribute('aria-hidden',!on); if(on) $('#close-cart').focus(); };
$('#open-cart').addEventListener('click', () => openCart(true));
$('#close-cart').addEventListener('click', () => openCart(false));
scrim.addEventListener('click', () => openCart(false));
addEventListener('keydown', e => { if(e.key==='Escape') openCart(false); });
renderCart();
