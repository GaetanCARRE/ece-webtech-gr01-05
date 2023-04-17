## TP 3: Framework - Getting started with React and Next.js

👨‍🦱 _Contributeurs: CARRE Gaetan & BOUHACINA Adam_ 👨🏽

### Introduction:
Ce TP a pour objectif de nous initier à l'utilisation de React en combinaison avec Next.js pour la création rapide d'applications web. Ce TP marque le début de la création d'un site (blogging, boutique...) qui servira pour le projet du semestre.

### Partie 1. Initialiser l'application Next.js
On installe npx grâce à la commande ```npm i npx```

Grâce a npx qu'on vient d'installer on va créer manuellement notre site web ce qui va créer le dossier app

### Partie 2. Construire un squelette de site web

On créez plusieurs pages avec des informations :

* / - la page d'accueil
![Untitled](/assets/screen14.PNG)
* /about - la page "à propos"
![Untitled](/assets/screen15.PNG)
* /contacts - la page de contact
![Untitled](/assets/screen16.PNG)
* /articles - une liste d'articles
![Untitled](/assets/screen17.PNG)

En plus de cela on va créer un menu déroulant pour pouvoir accéder aux autres pages du site web.

### Partie 3. Créer des routes dynamiques
On va utiliser ici les routes dynamique très utile pour notamment la création de pages d'articles qui va permettre d'au lieu de créer plusieurs fichiers pour les pages d'articles par exemple les regroupés seulement dans un seul fichier.

Dans ce cas là, on va créer une page d'article avec une route comme ```/articles/:articleId```, affichant l'identifiant de l'article et des données relatif à l'article en question.
![Untitled](/assets/screen18.PNG)

### Conclusion:
Ce TP est une étape importante pour la création de votre site du projet et l'apprentissage de l'utilisation de React et Next.js ensemble. En effet nous avons pu apprendre, à créer la base d'un site web en construisant le squelette. De plus, nous avons pris en main l'outil TailWindCSS qui nous permet de gérer toute la partie design du site web. Enfin nous avons appris comment créer des routes dynamiques et leur utilité.
