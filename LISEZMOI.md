# Site Texas Pizza Lomme

Site statique : du HTML, du CSS et du JavaScript, sans base de données ni outil de compilation. Il suffit d'envoyer le dossier chez l'hébergeur.

## Organisation

```
site nico/
├── index.html              Accueil : carte, compose, 50 cm, pâtes, boissons, horaires
├── mentions-legales.html
├── confidentialite.html
├── cgu.html                Conditions d'utilisation
├── 404.html                Page « introuvable »
├── robots.txt, sitemap.xml Référencement
├── site.webmanifest        Icône quand le site est ajouté à l'écran d'accueil
├── favicon.ico
├── .htaccess               HTTPS forcé, sécurité, 404, cache (serveur Apache)
└── assets/
    ├── css/style.css       Toute la mise en forme
    ├── js/data.js          LA CARTE : pizzas, prix, pâtes, boissons, ingrédients
    ├── js/pizza.js         Dessin des pizzas
    ├── js/app.js           Carte interactive, compose, 50 cm, ma liste, horaires
    ├── js/site.js          Bandeau cookies, carte Google, email anti-spam
    ├── fonts/              Polices hébergées sur le site
    └── img/                Favicon, icônes, image de partage réseaux sociaux
```

**Changer un prix ou une pizza :** modifiez seulement `assets/js/data.js`.
**Changer les horaires :** `HOURS` en haut de `assets/js/app.js`, le tableau dans `index.html` (bloc JSON-LD) et le texte des pâtes.

Ne mettez pas `LISEZMOI.md` en ligne (le `.htaccess` le bloque de toute façon).

## Checklist de mise en ligne

| Point | État | Détail |
|---|---|---|
| Forcer le HTTPS | Fait, à activer | `.htaccess` redirige vers `https://www.texaspizza.fr` et ajoute HSTS. Activez d'abord le certificat SSL gratuit chez l'hébergeur |
| Clés API hors front | Vérifié | Aucune clé ni jeton dans le code. La carte Google s'intègre sans clé |
| Mentions légales | Fait, à compléter | Raison sociale, SIRET, TVA, directeur de publication, hébergeur, médiateur |
| Sauvegardes automatiques | À faire chez l'hébergeur | Voir plus bas |
| Page de confidentialité | Fait | `confidentialite.html` |
| Page de CGU | Fait | `cgu.html`, avec allergènes et alcool |
| Bandeau cookies | Fait, testé | « Tout refuser » et « Tout accepter » au même niveau, choix par catégorie, redemandé après 6 mois, lien « Gérer les cookies » en pied de page |
| Site responsive | Vérifié | 375, 768 et 1360 px, aucun débordement horizontal |
| Contraste des couleurs | Vérifié | 380 textes contrôlés, tous au niveau WCAG AA (4,5:1) |
| Images + vitesse | Vérifié | Aucune photo lourde, pizzas dessinées en code, polices locales préchargées, scripts différés, environ 180 Ko au total, aucune requête externe avant accord |
| Meta title + description | Fait | Sur chaque page. Le titre de l'accueil est « Texas Pizza » : « Texas Pizza Lomme · Pizzeria artisanale » serait mieux pour Google |
| Textes alternatifs | Vérifié | Pas de balise image sans texte ; pizzas décrites ou masquées aux lecteurs d'écran ; carte Google titrée |
| Sitemap + robots.txt | Fait | À la racine |
| Search Console | À faire par vous | Voir plus bas |
| Favicon | Fait | SVG, PNG 32, icône Apple, icônes 192 et 512 |
| Image réseaux sociaux | Fait | `assets/img/og-image.png` 1200 × 630 |
| Liens + page 404 | Vérifié | Tous les liens internes répondent ; une adresse inconnue renvoie `404.html` avec le code 404 |
| Anti-spam | Fait | Pas de formulaire sur le site ; l'email est reconstruit en JavaScript pour échapper aux robots |
| Outil d'analytics | Prêt, à activer | Plausible (sans cookie, hébergé en UE), chargé seulement après accord. Créez le compte puis renseignez `PLAUSIBLE_DOMAIN` dans `assets/js/site.js` |
| Un seul CTA | Fait | Le seul bouton rouge plein est « Appeler » ; tout le reste est secondaire |

## Ce qui reste à faire de votre côté

1. **Domaine.** Le site suppose `https://www.texaspizza.fr`. S'il change, remplacez cette adresse dans `index.html`, les 4 autres pages, `robots.txt`, `sitemap.xml` et `.htaccess`.
2. **HTTPS.** Activez Let's Encrypt dans l'espace client de l'hébergeur, puis envoyez le site avec le `.htaccess`. Si l'hébergeur n'utilise pas Apache (Netlify, Vercel…), dites-le : il faut une autre syntaxe.
3. **Sauvegardes.** Activez les sauvegardes automatiques quotidiennes dans l'espace client (OVH, o2switch et Hostinger les proposent) et gardez une copie de ce dossier sur un disque ou un cloud.
4. **Search Console.** Sur search.google.com/search-console, ajoutez le domaine, validez par enregistrement DNS (ou collez la balise dans `index.html` à l'endroit prévu), puis soumettez `https://www.texaspizza.fr/sitemap.xml`.
5. **Fiche Google Business.** Vérifiez que les horaires y sont identiques à ceux du site.
6. **Mentions légales.** Complétez tout ce qui est entre parenthèses.
7. **Liens Uber Eats et Deliveroo.** Remplacez les liens génériques par ceux de la fiche du restaurant.
