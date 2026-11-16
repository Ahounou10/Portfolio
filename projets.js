/*
 * Catalogue des projets du portfolio.
 * Pour ajouter un projet : dupliquer un objet, lui donner un identifiant unique,
 * puis renseigner ses informations et mettre à jour sa carte dans index.html.
 */
const projets = {
  "menu-restaurant": {
    titre: "Menu restaurant",
    categorie: "INTERFACE WEB · EXERCICE",
    description: "Une interface de menu conçue pour travailler l’organisation du contenu, la mise en page avec Flexbox et l’ajout de quelques interactions JavaScript.",
    image: "images/restaurant.png",
    imageAlt: "Aperçu de l’interface du menu restaurant",
    presentation: "Ce projet est une réalisation d’apprentissage autour de la présentation d’un menu de restaurant. Il m’a servi à mettre en pratique la structuration d’une page web et l’organisation visuelle de ses contenus.",
    demarche: "J’ai travaillé la structure HTML, la mise en page avec CSS Flexbox et quelques interactions en JavaScript. Cette présentation pourra être enrichie avec des captures détaillées et des explications supplémentaires au fil de la documentation du projet.",
    type: "Exercice de développement web",
    technologies: "HTML · CSS · JavaScript",
    code: "https://github.com/Ahounou10/Menu_restaurant",
    demo: "https://ahounou10.github.io/Menu_restaurant/",
    captures: []
  },
  "citations-motivantes": {
    titre: "Citations motivantes",
    categorie: "MISE EN PAGE · EXERCICE",
    description: "Une page consacrée aux citations, réalisée pour pratiquer la structuration HTML, le style CSS et l’intégration d’une bibliothèque d’icônes.",
    image: "images/citation.png",
    imageAlt: "Aperçu de la page de citations motivantes",
    presentation: "Ce projet est une petite réalisation web centrée sur la présentation de citations. Il m’a permis de travailler l’organisation du contenu et sa mise en forme dans une interface simple.",
    demarche: "J’ai utilisé HTML et CSS pour construire la page et intégré Font Awesome pour les icônes. Les détails supplémentaires sur les choix de conception et les éléments de l’interface pourront être ajoutés avec les prochaines captures.",
    type: "Exercice de développement web",
    technologies: "HTML · CSS · Font Awesome",
    code: "https://github.com/Ahounou10/Citation",
    demo: "https://ahounou10.github.io/Citation/",
    captures: []
  },
  "carte-de-visite": {
    titre: "Carte de visite",
    categorie: "PREMIÈRES BASES · EXERCICE",
    description: "Une première réalisation web pour présenter des informations personnelles dans une composition simple et pratiquer les bases de HTML et CSS.",
    image: "images/carte_visite.png",
    imageAlt: "Aperçu de la carte de visite web",
    presentation: "Cette carte de visite est l’une de mes premières réalisations. Le projet consiste à organiser des informations dans une composition web simple et lisible.",
    demarche: "J’ai utilisé HTML pour structurer le contenu et CSS pour travailler sa présentation. La page pourra être complétée plus tard avec des captures détaillées et un retour sur les apprentissages réalisés.",
    type: "Exercice de développement web",
    technologies: "HTML · CSS",
    code: "https://github.com/Ahounou10/Carte_de_Visite",
    demo: "https://ahounou10.github.io/Carte_de_Visite/",
    captures: []
  }
};

const identifiant = new URLSearchParams(window.location.search).get("id");
const projet = projets[identifiant];

if (!projet) {
  document.getElementById("projet-contenu").hidden = true;
  document.getElementById("projet-introuvable").hidden = false;
} else {
  const remplir = (id, valeur) => {
    document.getElementById(id).textContent = valeur;
  };

  remplir("fil-projet", projet.titre);
  remplir("projet-categorie", projet.categorie);
  remplir("projet-titre", projet.titre);
  remplir("projet-description", projet.description);
  remplir("projet-presentation", projet.presentation);
  remplir("projet-demarche", projet.demarche);
  remplir("projet-type", projet.type);
  remplir("projet-technologies", projet.technologies);

  document.title = projet.titre + " — Portfolio d’Ahounou Yannick";
  document.querySelector('meta[name="description"]').setAttribute("content", projet.description);

  const image = document.getElementById("projet-image");
  image.src = projet.image;
  image.alt = projet.imageAlt;

  ["projet-demo", "projet-demo-aside"].forEach(id => {
    document.getElementById(id).href = projet.demo;
  });
  ["projet-code", "projet-code-aside"].forEach(id => {
    document.getElementById(id).href = projet.code;
  });

  if (projet.captures && projet.captures.length > 0) {
    const galerie = document.getElementById("projet-galerie");
    const conteneur = document.getElementById("projet-captures");

    projet.captures.forEach(capture => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = capture.image;
      img.alt = capture.alt;
      img.loading = "lazy";
      figure.appendChild(img);
      conteneur.appendChild(figure);
    });

    galerie.hidden = false;
  }
}
