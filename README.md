# Kristou Coucou Beach — Site vitrine

Site vitrine statique d'une page (single-page) pour **Kristou Coucou Beach**, plage privée à Ghar El Melh (Tunisie). 100 % en français, responsive, sans framework ni backend.

## Aperçu

Une seule page qui défile, avec un header fixe et une navigation qui *smooth-scroll* vers chaque section :

`#accueil` · `#apropos` · `#services` · `#galerie` · `#forfaits` · `#contact`

- **Header** transparent au-dessus du hero, puis **barre verte** pleine au défilement. Menu hamburger sur mobile.
- **Hero** : carrousel plein écran (auto toutes les 5 s, flèches gauche/droite, points de navigation).
- **À propos**, **Services** (4 features + 4 cartes), **Galerie** (grille masonry + lightbox), **Forfaits** (5 cartes), **Contact** (infos + Google Maps).
- Tous les boutons **« Réserver »** et les liens sociaux ouvrent WhatsApp / Facebook / Instagram / Google Maps dans un nouvel onglet.

## Palette (dérivée du logo)

Couleurs échantillonnées directement depuis le logo (vert + crème), déclarées en variables CSS dans `:root` (`styles.css`) :

| Variable | Valeur | Usage |
|---|---|---|
| `--green` | `#3E5D49` | vert de la marque (échantillonné sur le logo) |
| `--green-dark` | `#2A4234` | header/footer, survols |
| `--green-deep` | `#1E3126` | titres sur fond clair |
| `--green-light` | `#6E8C77` | sauge (dégradés) |
| `--cream` | `#FFF7EC` | fond (échantillonné sur le logo) |
| `--cream-2` | `#F4EBDC` | sections alternées |
| `--sand` | `#D6A85B` | accent chaud (CTA, badges) |

## Structure du dossier

```
Krystou/
├── index.html          # structure de la page
├── styles.css          # tout le design + palette (variables CSS)
├── main.js             # carrousel, menu mobile, galerie, lightbox, forfaits, reveals
├── README.md
├── assets/
│   ├── logo-white.png      # logo recoloré blanc (header/footer) — fond transparent
│   ├── logo-green.png      # logo vert original — fond transparent
│   ├── favicon.ico / favicon-32/64/180.png
│   └── media/
│       ├── hero/           # hero-1..6.webp   (source : pics_fou9)
│       ├── services/       # service-bateau / cabine / dej / cocktail .webp
│       ├── forfait/        # forfait-70/80/90/100/130.webp
│       ├── hist/           # hist-1.webp + hist-video.mp4  (À propos + features)
│       └── exp/            # exp-1.webp + exp-video.mp4
└── (dossiers sources d'origine : Logo, pics_fou9, pics_hist, pics_exp,
     pics_services, pics-forfait — conservés tels quels)
```

### Traitement des médias
Les images d'origine (JPEG, jusqu'à ~5 Mo) ont été converties en **WebP** optimisé et redimensionnées, et rangées sous `assets/media/` avec des noms propres (les noms d'origine contenaient espaces/emojis). Le logo a été détouré (fond crème rendu transparent) et décliné en version blanche pour le header.

## Lancer en local

Aucune dépendance. Ouvrez simplement `index.html` dans un navigateur, ou servez le dossier :

```bash
# Python
python -m http.server 8000
# puis http://localhost:8000
```

> Un petit serveur local est recommandé (plutôt que `file://`) pour que la lecture des vidéos et le chargement des WebP se comportent comme en production.

## Déploiement

Site 100 % statique : déposez le contenu du dossier sur n'importe quel hébergement statique (Netlify, Vercel, GitHub Pages, Cloudflare Pages, ou un simple hébergement mutualisé). Le point d'entrée est `index.html` à la racine. Aucune variable d'environnement ni build nécessaire.

## Liens externes utilisés
- WhatsApp réservation : `https://wa.me/21693604882`
- Facebook : `https://www.facebook.com/kristoucoucoubeach/`
- Instagram : `https://www.instagram.com/kristou_coucou_beach`
- Google Maps : `https://maps.app.goo.gl/hhA6WU68Uer9Mj5LA` (coord. 37.1448946, 10.2115194)
