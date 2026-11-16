# Portfolio — Ahounou Yannick

Portfolio personnel présentant mon profil, mes compétences et mes projets en développement web.

## Direction visuelle

Le site adopte une identité sombre et éditoriale : typographie expressive, mise en page aérée, détails typographiques et accent bleu doux. L'objectif est de présenter le parcours et les réalisations de façon personnelle, lisible et sans effets décoratifs superflus.

## Technologies

- **HTML5** : structure sémantique et contenu ;
- **CSS3** : mise en page responsive, identité visuelle et animations discrètes ;
- **JavaScript** : navigation mobile, apparition progressive des sections et mise à jour de l'année.

Les polices Manrope et DM Mono sont chargées depuis Google Fonts. Le site reste sans framework ni dépendance JavaScript.

## Contenu

- Présentation personnelle ;
- Sélection de projets avec aperçu, technologies, code source, démonstration et pages de présentation détaillées ;
- Présentation des compétences et outils utilisés ;
- Liens de contact ;
- Navigation adaptée aux écrans mobiles.

## Projets présentés

| Projet | Technologies | Démonstration |
| --- | --- | --- |
| Menu restaurant | HTML, CSS, JavaScript | https://ahounou10.github.io/Menu_restaurant/ |
| Citations motivantes | HTML, CSS, Font Awesome | https://ahounou10.github.io/Citation/ |
| Carte de visite | HTML, CSS | https://ahounou10.github.io/Carte_de_Visite/ |

Les descriptions du portfolio restent volontairement limitées aux éléments connus de ces réalisations. Elles pourront être enrichies avec les fonctionnalités réellement présentes dans chaque dépôt.

La présentation détaillée des projets repose sur un seul modèle (`projet.html`). Les informations de chaque réalisation sont centralisées dans `projets.js` et chargées grâce à un identifiant dans l’URL (par exemple `projet.html?id=menu-restaurant`). Pour ajouter un projet, il suffit donc d’ajouter ses données dans le catalogue et sa carte dans la page d’accueil. Les galeries restent masquées tant qu’aucune capture réelle n’a été ajoutée.

## Lancer le projet en local

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/Ahounou10/Portfolio.git
   ```

2. Ouvrir le dossier dans Visual Studio Code.
3. Lancer `index.html` dans un navigateur ou avec Live Server.

Aucune installation de dépendance n'est nécessaire.

## Structure

```text
Portfolio/
├── images/
│   ├── Yassine.jpg
│   ├── carte_visite.png
│   ├── citation.png
│   └── restaurant.png
├── images/
│   └── projets/
│       └── README.md
├── index.html
├── projet.html
├── projets.js
├── projet-detail.css
├── style.css
├── script.js
└── README.md
```

## Pistes d'évolution

- Ajouter des projets plus complets avec leurs études de cas ;
- Ajouter des captures d'écran et détails techniques vérifiés pour chaque réalisation ;
- Enrichir le parcours avec les expériences et formations confirmées ;
- Vérifier les performances, le référencement et l'accessibilité sur différents navigateurs.

---

© Ahounou Yannick.
