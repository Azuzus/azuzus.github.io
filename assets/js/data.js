/* =========================================================
   DONNÉES — flyer + ancien site texaspizza.fr
   ========================================================= */
const H = 'halal';
const SAUCE = {tomate:'#c8372a', bbq:'#5e2a17', creme:'#efe4cc'};
const MENU = [
  {id:'tomate', title:'Base tomate', items:[
    ['El Dorado','Mozzarella, gruyère, olives',[6,9,19]],
    ['Woodville','Mozzarella, olives, jambon',[6.5,9.5,19.5]],
    ['Clifton','Mozzarella, olives, jambon, champignons',[7,10,20]],
    ['Texas','Mozzarella, olives, lardons, oignons, œuf',[8,11,21]],
    ['Kentucky','Mozzarella, olives, champignons, artichauts, tomates cerises, poivrons, oignons',[8,11,21]],
    ['Miami','Mozzarella, olives, viande hachée (bœuf cuisiné selon le site)',[8,11,21],H],
    ['Country','Mozzarella, olives, filet de poulet, oignon, kebab',[8.5,11.5,21.5],H],
    ['Colorado','Mozzarella, olives, champignons, pepperoni, poivrons',[8.5,11.5,21.5]],
    ['Boston','Mozzarella, olives, jambon, lardons, maroilles, crème fraîche',[8.5,11.5,21.5]],
    ['Hollywood','Mozzarella, olives, thon, oignons, tomates cerises, champignons',[8.5,11.5,21.5]],
    ['Canyon','Mozzarella, olives, chèvre, lardons',[8.5,11.5,21.5]],
    ['Kingsville','Mozzarella, olives, chèvre, reblochon',[8.5,11.5,21.5]],
    ['Memphis','Mozzarella, olives, chorizo, poivrons, œuf',[8.5,11.5,21.5]],
    ['Arlington','Mozzarella, olives, merguez, poivrons',[8.5,11.5,21.5],H],
    ['Dallas','Mozzarella, olives, jambon, champignons, artichauts, œuf',[8.5,11.5,21.5]],
    ['Houston','Mozzarella, olives, reblochon, chèvre, camembert, maroilles, gorgonzola',[9,12,22]],
    ['Bahamas','Mozzarella, olives, champignons, Saint-Jacques, beurre à l\'ail',[10,13,23]],
    ['Pizza du mois','Recette à découvrir sur la page Facebook ou par téléphone',[10,13,23]],
  ]},
  {id:'bbq', title:'Base barbecue', items:[
    ['Buffalo','Mozzarella, olives, viande hachée, jambon, lardons, merguez',[9,12,22]],
    ['Buffalo Halal','Mozzarella, olives, viande hachée, poulet, kebab, merguez',[9,12,22],H],
  ]},
  {id:'creme', title:'Base crème fraîche', items:[
    ['Orlando','Mozzarella, gruyère râpé, olives, chèvre, miel',[8.5,11.5,21.5]],
    ['Welsh','Mozzarella, moutarde, gruyère, cheddar, jambon, œuf, olives',[8.5,11.5,21.5]],
    ['La Forestière','Mozzarella, lardons, oignons, champignons',[8.5,11.5,21.5]],
    ['Tartiflette','Mozzarella, olives, lardons, oignons, pomme-de-terre, reblochon',[9,12,22]],
    ['Denver','Mozzarella, oignons, champignons, poulet sucré, graines de sésame, olives',[9,12,22],H],
    ['Alaska','Mozzarella, gruyère râpé, olives, saumon fumé',[9,12,22]],
    ['Chicago','Mozzarella, olives, filet de poulet, oignons, champignons, poivrons, sauce curry',[9,12,22],H],
    ['Washington','Mozzarella, bœuf cuisiné, oignons, tomates cerises, cheddar, olives, sauce samouraï',[9,12,22],H],
    ['New York','Mozzarella, pesto, filet de poulet, burratina, tomates cerises, olives',[10,13,23],H],
    ['Las Vegas','Mozzarella, saumon, pomme-de-terre, Boursin, ciboulette, tomates cerises, olives',[10,13,23]],
  ]},
];
const PASTA = [
  ['Penne Welsh','Sauce crème moutarde, jambon, cheddar, gruyère, œuf',7.5],
  ['Penne Orientale','Sauce crème curry, poulet, champignons, oignon, poivrons, mozzarella',7.5,H],
  ['Penne Chorizo','Sauce crème fraîche, chorizo, camembert, mozzarella',7.5],
  ['Penne Gorgonzola','Sauce crème fraîche, filet de poulet, gorgonzola, mozzarella',7.5,H],
  ['Penne Poulet Pesto','Sauce crème pesto, filet de poulet, tomates cerises, mozzarella, burrata (+ 1,50 €)',9,H],
  ['Penne Carbonara','Sauce crème fraîche, oignon, lardon, mozzarella',7.5],
  ['Penne Saumon','Sauce crème fraîche, saumon, oignon, champignons, mozzarella',7.5],
  ['Penne 3 Fromages','Sauce crème fraîche, chèvre, raclette, mozzarella',7.5],
  ['Penne Bœuf','Sauce crème fraîche, bœuf, cheddar, champignons, mozzarella',7.5,H],
];
const DRINKS = [
  ['Softs 33 cl', [['Pepsi','',1.5,'#1d4fa0'],['Pepsi Zéro','',1.5,'#2a2a2a'],['Lipton Ice Tea Tropical','',1.5,'#f2a33a'],['Lipton Ice Tea Pêche','',1.5,'#f08a4b'],['Lipton Ice Tea Pastèque Menthe','',1.5,'#e8506a'],['Lipton Ice Tea Framboise','',1.5,'#b8325a'],['Mirinda','',1.5,'#f37021'],['7UP Cherry','',1.5,'#c4183c'],['7UP Mojito','',1.5,'#3aa357'],['7UP Citron & Citron vert','',1.5,'#2f9e44']]],
  ['Grand format et eau', [['Coca-Cola','1,5 L',4,'#e41e2b'],['Eau plate','33 cl',1,'#9cc8e6']]],
  ['Bières', [['Leffe','25 cl',2.5,'#c48a2c'],['Goudale','33 cl',3.5,'#d9a441']]],
  ['Vins', [['Rosé Bardolino','75 cl',10,'#f2a7a0'],['Rouge Montepulciano','75 cl',10,'#7a1f2b']]],
];
const BASES = [['Sauce tomate','#c8372a'],['Barbecue','#5e2a17'],['Crème fraîche','#efe4cc'],['Crème curry','#e6c25a'],['Crème moutarde','#e2cf7c'],['Pesto','#5f8a3a']];
const INGS = {
  'Viandes et poissons':[['Viande hachée',H],['Filet de poulet',H],['Kebab',H],['Merguez',H],['Lardon'],['Jambon'],['Chorizo'],['Pepperoni'],['Saint-Jacques'],['Saumon'],['Thon'],['Oeuf bio']],
  'Fromages et extras':[['Boursin'],['Burratina','+ 2 €'],['Camembert'],['Cheddar'],['Chèvre'],['Gorgonzola'],['Gruyère'],['Maroille'],['Raclette'],['Reblochon'],['Beurre à l\'ail'],['Tabasco']],
  'Légumes et fruits':[['Ananas'],['Artichaut'],['Champignons'],['Ciboulette'],['Graines de sésame'],['Oignons'],['Olives'],['Poivrons'],['Pommes-de-terre'],['Tomates cerises']],
};
const COMPOSE = {1:[6.5,9.5,19.5],3:[8.5,11.5,21.5],5:[10.5,13.5,23.5]};
const SUPP = {meat:[1,1.5,3.5], veg:[.5,1,2]};
const SIZES = ['24 cm','29 cm','50 cm'];

/* =========================================================
   OUTILS (utilisés par pizza.js et app.js)
   ========================================================= */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const norm = s => s.toLowerCase().replace(/œ/g,'oe').normalize('NFD').replace(/[̀-ͯ]/g,'');
const eur = n => n.toFixed(2).replace('.',',') + ' €';
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const f1 = n => n.toFixed(1);
function rnd(seed){let s=2166136261;for(const c of seed)s=Math.imul(s^c.charCodeAt(0),16777619)>>>0;return()=>((s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296)}
const MEAT = /viande|poulet|kebab|merguez|lardon|jambon|chorizo|pepperoni|saint-jacques|saumon|thon|boeuf/;
const ITEMS = MENU.flatMap(g => g.items.map(([n,d,p,h]) => ({n,d,p,h:h===H,cat:g.id,catTitle:g.title,sauce:SAUCE[g.id],
  veg:!MEAT.test(norm(d)) && n!=='Pizza du mois', mystery:n==='Pizza du mois'})));
