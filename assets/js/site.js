/* =========================================================
   Texas Pizza — script commun à toutes les pages
   1. Consentement (bandeau cookies, conforme aux recommandations CNIL :
      « Tout refuser » aussi visible que « Tout accepter », choix modifiable)
   2. Carte Google Maps chargée seulement après accord
   3. Mesure d'audience chargée seulement après accord (si configurée)
   4. Adresse email reconstruite en JS (anti-spam)
   ========================================================= */
(() => {
  /* Mesure d'audience : renseignez le domaine déclaré sur plausible.io
     (ex. 'texaspizza.fr'). Laisser vide = aucune mesure chargée. */
  const PLAUSIBLE_DOMAIN = '';

  const KEY = 'tp-consent';
  const VERSION = 1;
  const MAX_AGE = 1000 * 60 * 60 * 24 * 182; // le choix est redemandé au bout de 6 mois
  const read = () => {
    try {
      const c = JSON.parse(localStorage.getItem(KEY));
      return c && c.v === VERSION && Date.now() - Date.parse(c.date) < MAX_AGE ? c : null;
    } catch (e) { return null; }
  };
  const write = c => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} };
  let consent = read();

  /* ---------- 2. carte ---------- */
  function loadMaps(){
    document.querySelectorAll('[data-map]').forEach(box => {
      if (box.querySelector('iframe')) return;
      const f = document.createElement('iframe');
      f.src = box.dataset.map; f.title = box.dataset.mapTitle || 'Plan d\'accès';
      f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
      box.replaceChildren(f);
    });
  }
  /* ---------- 3. audience ---------- */
  function loadAudience(){
    if (!PLAUSIBLE_DOMAIN || document.querySelector('script[data-audience]')) return;
    const s = document.createElement('script');
    s.defer = true; s.dataset.audience = '1'; s.dataset.domain = PLAUSIBLE_DOMAIN;
    s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  }
  function apply(){
    if (!consent) return;
    if (consent.maps) loadMaps();
    if (consent.audience) loadAudience();
  }
  function save(maps, audience){
    consent = {v: VERSION, maps: !!maps, audience: !!audience, date: new Date().toISOString()};
    write(consent); apply(); hide();
  }

  /* ---------- 1. bandeau ---------- */
  const banner = document.createElement('section');
  banner.className = 'cookie'; banner.hidden = true;
  banner.setAttribute('aria-labelledby', 'cookie-title');
  banner.innerHTML = `
    <h2 id="cookie-title">Cookies et contenus externes</h2>
    <p>Le site fonctionne sans cookie. Avec votre accord, nous affichons la carte Google Maps${PLAUSIBLE_DOMAIN ? ' et mesurons la fréquentation de façon anonyme' : ''}. <a class="textlink" href="confidentialite.html">En savoir plus</a></p>
    <fieldset hidden id="cookie-choices">
      <legend class="sr-only">Choix par catégorie</legend>
      <label><input type="checkbox" checked disabled><span>Nécessaire<small>Votre liste de commande et ce choix, gardés sur votre appareil</small></span></label>
      <label><input type="checkbox" id="c-maps"><span>Carte Google Maps<small>Google peut déposer des cookies quand la carte s'affiche</small></span></label>
      ${PLAUSIBLE_DOMAIN ? '<label><input type="checkbox" id="c-aud"><span>Mesure d\'audience<small>Statistiques anonymes de visite, sans cookie</small></span></label>' : ''}
    </fieldset>
    <div class="row-btns">
      <button class="btn" data-c="refuse">Tout refuser</button>
      <button class="btn" data-c="accept">Tout accepter</button>
    </div>
    <button class="textlink more" data-c="custom" aria-expanded="false" aria-controls="cookie-choices">Personnaliser</button>`;
  const choices = banner.querySelector('#cookie-choices');
  const more = banner.querySelector('.more');

  function show(custom){
    banner.hidden = false;
    banner.querySelector('#c-maps').checked = !!(consent && consent.maps);
    const aud = banner.querySelector('#c-aud'); if (aud) aud.checked = !!(consent && consent.audience);
    setCustom(!!custom);
  }
  function hide(){ banner.hidden = true; }
  function setCustom(on){
    choices.hidden = !on; more.setAttribute('aria-expanded', on);
    more.textContent = on ? 'Enregistrer mes choix' : 'Personnaliser';
    more.dataset.c = on ? 'save' : 'custom';
  }
  banner.addEventListener('click', e => {
    const b = e.target.closest('[data-c]'); if (!b) return;
    const a = b.dataset.c;
    if (a === 'refuse') save(false, false);
    else if (a === 'accept') save(true, true);
    else if (a === 'custom') setCustom(true);
    else if (a === 'save') { const aud = banner.querySelector('#c-aud'); save(banner.querySelector('#c-maps').checked, aud && aud.checked); }
  });

  document.addEventListener('click', e => {
    if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); show(true); banner.querySelector('button').focus(); }
    if (e.target.closest('[data-map-load]')) save(true, consent ? consent.audience : false);
  });

  /* ---------- 4. email ---------- */
  function mails(){
    document.querySelectorAll('[data-mail]').forEach(a => {
      const m = a.dataset.mail + '@' + a.dataset.domain;
      a.href = 'mailto:' + m; if (!a.dataset.keepText) a.textContent = m;
    });
  }

  function init(){
    document.body.appendChild(banner);
    mails();
    if (consent) apply(); else show(false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
