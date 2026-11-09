/* =========================================================
   PIZZA EN SVG — chaque ingrédient a sa forme
   ========================================================= */
const TYPES = [
  ['olive',/olive/],['mush',/champignon/],['ham',/jambon/],['pep',/pepperoni/],['chorizo',/chorizo/],
  ['onion',/oignon/],['pepper',/poivron/],['cherry',/tomates? cerises?/],['egg',/oeuf/],['bacon',/lardon/],
  ['mince',/viande hachee|boeuf/],['chicken',/poulet/],['kebab',/kebab/],['merguez',/merguez/],['salmon',/saumon/],
  ['tuna',/thon/],['arti',/artichaut/],['scallop',/saint-jacques/],['potato',/pomme/],['cheese',/chevre|reblochon|camembert|maroille|gorgonzola|burrat|boursin|raclette|gruyere/],
  ['cheddar',/cheddar/],['herb',/pesto|ciboulette/],['sesame',/sesame/],['pine',/ananas/],['garlic',/beurre a l'ail/],
  ['honey',/miel/],['curry',/curry/],['samourai',/samourai/],['mustard',/moutarde/],['tabasco',/tabasco/],
];
const typesOf = txt => { const t = norm(txt); return TYPES.filter(([,re]) => re.test(t)).map(([k]) => k); };
const CHEESE_PATH = 'M-1.4 0C-1.4-1-.4-1.4.4-1.2 1.4-1 1.6.2 1 .9.3 1.6-1.4 1.2-1.4 0Z';
const SHAPES = {
  olive:'<circle r=".72" fill="none" stroke="#1b1916" stroke-width=".5"/>',
  mush:'<path d="M-1.2.2Q-1.2-1.1 0-1.1T1.2.2Z" fill="#e6d7b8" stroke="#a88c62" stroke-width=".14"/><rect x="-.35" y=".1" width=".7" height=".8" rx=".2" fill="#d6c39b"/>',
  ham:'<rect x="-1.1" y="-.8" width="2.2" height="1.6" rx=".5" fill="#eaa4a0"/><path d="M-.7-.3h1.2" stroke="#f6cfcb" stroke-width=".18"/>',
  pep:'<circle r="1.25" fill="#b52d22"/><circle r="1.25" fill="none" stroke="#8e1f17" stroke-width=".15"/><circle cx=".4" cy="-.3" r=".15" fill="#e8a37a"/><circle cx="-.4" cy=".35" r=".12" fill="#e8a37a"/>',
  chorizo:'<circle r="1" fill="#c4452b"/><circle cx=".3" cy=".2" r=".2" fill="#f2c08f"/><circle cx="-.35" cy="-.25" r=".16" fill="#f2c08f"/>',
  onion:'<path d="M-1.1.3A1.1 1.1 0 0 1 1.1.3" fill="none" stroke="#f6efe3" stroke-width=".28" stroke-linecap="round"/>',
  pepper:'<path d="M-1 .4Q0-1 1 .4" fill="none" stroke="#3c8a3a" stroke-width=".45" stroke-linecap="round"/>',
  cherry:'<circle r=".95" fill="#e0342a"/><circle r=".55" fill="#f06a55"/><circle cx="-.3" cy="-.3" r=".18" fill="#ffd0c4"/>',
  egg:'<path d="M-2 0C-2-1.8-.4-2.2.6-1.8 2.2-1.3 2.4.8 1.2 1.6 0 2.4-2 1.6-2 0Z" fill="#fbf7ee"/><circle cx=".1" cy="-.1" r=".9" fill="#f2b81f"/><circle cx="-.2" cy="-.4" r=".25" fill="#ffe08a"/>',
  bacon:'<rect x="-.7" y="-.35" width="1.4" height=".7" rx=".15" fill="#d6826b"/><rect x="-.7" y="-.08" width="1.4" height=".18" fill="#f3d3c3"/>',
  mince:'<circle r=".45" fill="#5b3322"/><circle cx=".6" cy=".3" r=".35" fill="#6d3f2a"/><circle cx="-.4" cy=".5" r=".3" fill="#4a2a1c"/>',
  chicken:'<rect x="-1.1" y="-.35" width="2.2" height=".7" rx=".35" fill="#dcae73"/><rect x="-.8" y="-.08" width="1.5" height=".12" fill="#b88449"/>',
  kebab:'<path d="M-1.2-.2Q0-.7 1.2-.1L1 .4Q0 0-1.1.4Z" fill="#8a5230"/>',
  merguez:'<circle r=".7" fill="#9c3a24"/><circle r=".42" fill="#c4583a"/>',
  salmon:'<rect x="-1.1" y="-.45" width="2.2" height=".9" rx=".4" fill="#f29b7a"/><path d="M-.6-.4-.3.4M.1-.4.4.4" stroke="#fbd0bd" stroke-width=".14"/>',
  tuna:'<circle r=".45" fill="#c9a08c"/><circle cx=".55" cy=".2" r=".38" fill="#b88e7b"/><circle cx="-.3" cy=".5" r=".3" fill="#d6b3a2"/>',
  arti:'<path d="M0-1Q1 0 0 1-1 0 0-1Z" fill="#a9b45c"/><path d="M0-.8V.8" stroke="#7d8a3a" stroke-width=".12"/>',
  scallop:'<circle r=".95" fill="#f6e8d1" stroke="#e0bf8f" stroke-width=".2"/>',
  potato:'<rect x="-.6" y="-.6" width="1.2" height="1.2" rx=".25" fill="#ebc76a"/><rect x="-.6" y="-.6" width="1.2" height=".35" rx=".2" fill="#f4dc95"/>',
  cheese:`<path d="${CHEESE_PATH}" fill="#fff8ea"/>`,
  cheddar:`<path d="${CHEESE_PATH}" fill="#f0a93a"/>`,
  herb:'<ellipse rx="1" ry=".45" fill="#3f7f34"/><path d="M-.9 0H.9" stroke="#2c5e24" stroke-width=".1"/>',
  sesame:'<ellipse rx=".3" ry=".16" fill="#f4e6c3"/>',
  pine:'<path d="M-.8-.5H.8L.5.6H-.5Z" fill="#f4d34a"/>',
  garlic:'<circle r=".35" fill="#fff4cf"/>',
};
const COUNT = {egg:3, cheese:7, cheddar:6, sesame:30, garlic:16};
const DRIZZLE = {honey:'#e2a12b', curry:'#e7b729', samourai:'#e0702d', mustard:'#d9b531', tabasco:'#b3241a'};

/* anim(type) -> true : ces ingrédients se posent avec une courte animation */
function pizza({cx=200, cy=200, r=180, sauce, types, seed='x', anim}){
  const R = rnd(seed), u = r/14;
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#crust)"/>`;
  for(let i=0;i<18;i++){const a=R()*6.283,d=r*(.9+R()*.07);s+=`<circle cx="${f1(cx+Math.cos(a)*d)}" cy="${f1(cy+Math.sin(a)*d)}" r="${f1(r*(.01+R()*.022))}" fill="#6b3818" opacity=".4"/>`}
  s += `<circle cx="${cx}" cy="${cy}" r="${f1(r*.865)}" fill="${sauce}"/><circle cx="${cx}" cy="${cy}" r="${f1(r*.865)}" fill="none" stroke="rgba(0,0,0,.2)" stroke-width="${f1(r*.025)}"/>`;
  const light = /^#(e|f)/i.test(sauce);
  for(let i=0;i<24;i++){const a=R()*6.283,d=Math.sqrt(R())*r*.74;s+=`<path transform="translate(${f1(cx+Math.cos(a)*d)} ${f1(cy+Math.sin(a)*d)}) rotate(${(R()*360)|0}) scale(${f1(u*(1.4+R()*.9))})" d="${CHEESE_PATH}" fill="#f8ecd0" opacity="${light?.7:.55}"/>`}
  const solid = types.filter(t => SHAPES[t]);
  const per = Math.max(6, Math.round(54/Math.max(1,solid.length)));
  let k = 0;
  for(const t of solid){
    const Rt = rnd(seed+t), n = COUNT[t] || per, an = anim && anim(t);
    for(let i=0;i<n;i++){
      const a=Rt()*6.283, d=Math.sqrt(Rt())*r*(t==='egg'?.5:.76), sc=u*(.85+Rt()*.35);
      const inner = an ? `<g class="tp" style="animation-delay:${(k++*8)%480}ms">${SHAPES[t]}</g>` : SHAPES[t];
      s += `<g transform="translate(${f1(cx+Math.cos(a)*d)} ${f1(cy+Math.sin(a)*d)}) rotate(${(Rt()*360)|0}) scale(${f1(sc)})">${inner}</g>`;
    }
  }
  for(const t of types.filter(t => DRIZZLE[t])){
    const Rt = rnd(seed+t), rot = Rt()*180, off = (Rt()-.5)*r*.5;
    let d=''; for(let x=-.68;x<=.68;x+=.04){const px=x*r, py=off+Math.sin(x*14)*r*.07; d+=(d?'L':'M')+f1(px)+' '+f1(py)}
    s += `<path ${anim && anim(t)?'class="dz"':''} pathLength="1" transform="translate(${cx} ${cy}) rotate(${f1(rot)})" d="${d}" fill="none" stroke="${DRIZZLE[t]}" stroke-width="${f1(r*.022)}" stroke-linecap="round" opacity=".9"/>`;
  }
  return s;
}
const ALL = () => true;
const mystery = (cx,cy,r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#crust)"/><circle cx="${cx}" cy="${cy}" r="${f1(r*.865)}" fill="#1a1816"/><text x="${cx}" y="${f1(cy+r*.3)}" text-anchor="middle" font-family="Bodoni Moda" font-size="${f1(r*.9)}" fill="#e8402f">?</text>`;
