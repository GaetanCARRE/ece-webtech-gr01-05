<div align="center"># ece-webtech-gr01-05 by CARRE Gaetan et BOUHACINA Adam</div>
## Introduction

👋 Bienvenue sur notre projet de technologie web !

📝 Ce fichier README accompagne les différents travaux pratiques réalisés par CARRE Gaetan et BOUHACINA Adam dans le cadre de la matière de technologie web.

💻 Pour une meilleure compréhension et pour être plus opérationnels lors de la réalisation du projet, nous avons décidé de travailler sur deux branches distinctes pour chaque TP : Adam sur la branche [adamtp](https://github.com/GaetanCARRE/ece-webtech-gr01-05/tree/adamtp) et Gaetan sur la branche [dev](https://github.com/GaetanCARRE/ece-webtech-gr01-05/tree/dev).

🌐 Notre objectif à travers ces TP est de découvrir et de maîtriser les technologies web modernes, telles que HTML, CSS, JavaScript et bien d'autres encore. Nous allons également explorer des frameworks populaires tels que React, Angular, Vue.js, etc.

💡 Chacun des TP sera accompagné d'un sujet précis, qui nous permettra de mettre en pratique les concepts étudiés en cours. Nous allons créer des sites web interactifs, des applications web, et bien plus encore !

🤝 Nous espérons que ce projet nous permettra de travailler en équipe de manière efficace, de développer notre créativité et de nous familiariser avec les technologies web essentielles pour le développement d'applications modernes.

📌 Ce fichier README sera mis à jour à mesure que nous avancerons dans les TP, avec les instructions nécessaires pour exécuter nos projets et les détails de chaque TP.

🚀 Nous sommes impatients de commencer ce voyage passionnant dans le monde de la technologie web ! Attention décollage !

## TP 1: NodeJs

👨‍🦱 _Contributeurs: CARRE Gaetan & BOUHACINA Adam_ 👨🏽

### Introduction

Le TP1 est une introduction au développement d'applications Node.js. Les étapes suivantes sont incluses dans ce TP :
* Démarrer un projet
* Créer un script simple Node.js
* Créer un serveur HTTP
* Créer une applications avec plusieurs routes
* Prise en main de Git et des Conventionnal Commit 

### Instructions d'installations

* Ouvrez votre terminal ou Git Bash
* Naviguez jusqu'au répertoire souhaité à l'aide des commandes bash CLI ici ```cd gitdossier```
* Clonez le dépôt en utilisant la commande: ```git clone https://github.com/GaetanCARRE/ece-webtech-gr01-05.git```
* Entrez dans le dossier ```cd ece-webtech-gr01-05```

![Untitled](/img/screen1.png)

### Part 1. Démarrer un projet 

* Initialisation du git ```git-init```
* Initialisation de node.js ``` npm init -y``` ce qui créer le fichier ```package.json```
* Faisons notre premier commit ! 🥹

![Untitled](/img/screen2.png)

### Part 2. Créer un script NodeJs

Passons maintenant à la création de notre premier script _NodeJs_.

####  2.1 Créer un script

On travaille sur l'environnement de développement intégré _VS Code_ .
On créer donc un code tout simple qui nous affiche un message dans le fichier ```index.js```

``` console.log("Hello world")```

Pour lancer le code il nous suffit d'ouvrir le terminal et d'entrer la commande suivante 

``` node index.js``` 

Ce qui éxecute le code dans le fichier index.js ce qui affiche donc dans le terminal 
``` Hello world```

#### 2.2 Définir un script NPM

Il est fastidieux de à chaque fois mettre la même commande  ``` node index.js``` tout le temps dans le terminal pour éxecuter le code. A la place on définit un script qui va le faire à notre place il noius suffit d'intégrer ce scripts  dans le fichier ``` package.json``` comme suivant:
``` 
{
...
"scripts":{
"start": "node index.js"
},
...
}
```
Et maintenant en utilisant la commande ``` npm run start``` cela fait exactement la même chose que la fin du  _2.1_.

### Part 3. Création d'un serveur HTTP

Dans cette partie, nous allons créer un ser veur HTTP avec Node.js

#### 3.1 Créer un serveur HTTP

On modifie le code dans ``` index.js``` avec le contenue suivant 
```
// Importer un module
const http = require('http');

// Déclarer un serveur HTTP
http.createServer(function (req, res) {

  // Écrire l'en-tête de la réponse
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Écrire le contenu de la réponse
  res.end('Hello World\n');

// Démarrer le serveur
}).listen(8080); 
```

#### 3.2 Lancer le serveur HTTP 

On lance le serveur grâce à la commande ``` npm run start```
Pour afficher la page plusieurs solutions s'offre à nous
* Ouvrir le navigateur et mettre dans l'url ```http://localhost:8080```
* Utiliser la commande ```curl localhost:8080``` pour avoir le contenu de la page

#### 3.3 Définir une fonction de rappel

On modifie le code pour définir une fonction de rappel:
```
const serverHandle = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World\n')
}

http
.createServer(serverHandle)
.listen(8080)
```

Ensuite on fait dans l'ordre:
* Renvoi de HTML
* Obtention du chemin d'accès
* Routage de base
* Organisation du code en un module avec les fichiers ``` handles.js``` et ```index.js```
* L'intégration de Nodemon via un scripts ```dev``` qui facilite grandement le travail _finis les CTRL C , ```npm run start```_ il nous suffit uniquement de lancer nodemon via le scripts ```dev``` et le serveur ce relance a chaque sauvegarde des fichiers du dossier

### Part 5. Création d'une application de base avec plusieurs routes et lecture à partir d'un fichier JSON

On créer un programme avec plusieurs routes:
* Une route ``` hello``` qui prend en paramètre ```name``` et qui affiche ``` Hello [name]``` et si ```name``` est le prénom de Gaetan ou d'Adam alors on affiche un message plus personnalisé. 
* Une route ``` about``` qui affiche le contenu du fichier ```content/about.js```

Voici le code qu'on obtient dans les fichiers ``` handles.js``` et ```index.js``` pour obtenir ce que l'on souhaite:

![Untitled](/img/screen3.png)
![Untitled](/img/screen4.png)

### Part 6. Upload sur Git 

Maintenant il nous ne reste plus qu'a ```commit``` et ```push``` dans nos branches respectif sans oublier bien évidemment de mettre a jour le ```.gitignore``` 😉

### Conclusion

Lors de ce TP nous avons pu nous familiariser avec Node.js et Git et à créer un serveur web basique en utilisant Node.js. .Nous avons réussi à crée un serveur web fonctionnel, en utilisant les différentes fonctionnalités de Node.js.

La première partie consistait à créer un projet, un dépôt Git et un fichier package.json initial. La deuxième partie était de créer un script Node.js basique qui affichait un message dans la console. La troisième partie consistait à créer un serveur HTTP basique, en écoutant les demandes et en y répondant. Le serveur a été testé en utilisant un navigateur.

Le TP a été conçu comme la base pour les futurs cours, où des fonctionnalités supplémentaires seraient ajoutées pour créer une application web plus complexe.


