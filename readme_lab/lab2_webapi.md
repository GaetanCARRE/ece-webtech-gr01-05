## TP 2: WebAPI

👨‍🦱 _Contributeurs: CARRE Gaetan & BOUHACINA Adam_ 👨🏽

### Introduction 

Voici les objectifs de ce TP qui va permettre de créer et de nous familiariser avec une API:
* Refactoriser l'application précédente pour utiliser **Express**
* Créer une API avec la création d'une base de données et d'un ensemble de routes API

### Part 1. Réfactoriser l'application précedente - implémentation d'Express

Nous allons installer et prendre en main Express lors de ce TP. Le but d'Express est de permettre de créer un serveur web et d'y créer une API.

On installe donc le package npm Express sur notre machine et après avoir étudier la documentation on peut passer à la refactorisation du code établi lors du [TP1 Node.Js](https://github.com/GaetanCARRE/ece-webtech-gr01-05/blob/main/lab1_nodejs.md).

On passe ensuite aux tests de l'application Gaetan utilise **Insomnia** et **Postman** tandis qu'Adam utilise **Postman**.

![Untitled](/assets/screen5.png)
![Untitled](/assets/screen6.png)
![Untitled](/assets/screen7.png)

### Part 2. Créer l'API

Dans cette partie on va créer une API avec un certains nombres d'articles, de commentaires liés aux articles et surtout des routes qui vont nous permettre de gérer les articles et les commentaires:

1. Gestion des articles
    * Une route GET ```/articles``` pour lister tous les articles.
    * Une route POST ```/articles``` pour ajouter un nouvelle article.
    * Une route GET ```/articles/:articleID``` pour rechercher un article grâce à son ```articleID```.
2. Gestion des commentaires
    * Une route GET ```/articles/:articleId/comments``` pour avoir tout les commentaires de l'article grâce à son ```articleID```
    * Une route POST ```/articles/:articleId/comments``` pour ajouter un nouveau commentaire à un article grâce à son ```articleID```
    * Une route GET ```/articles/:articleId/comments/:commentId``` pour avoir un commentaire grâce à son ```commentID``` et ```articleID```

Après avoir mis en place les routes, notamment grâce à la fonction ```find()``` pour effectuer des recherches dans des fichers Javascript,
voici les résultats de nos tests réalisés sur **Postman** pour chaque requête:

![Untitled](/assets/screen8.png)
![Untitled](/assets/screen9.png)
![Untitled](/assets/screen10.png)
![Untitled](/assets/screen11.png)
![Untitled](/assets/screen12.png)
![Untitled](/assets/screen13.png)

### Conclusion

Le but de ce TP,  avait pour but de nous apprendre à utiliser le framework Express pour construire une API web. Nous avons ainsi refactorisé notre application existante pour utiliser Express, créé un ensemble de routes d'API pour gérer des articles et des commentaires, et appris à tester notre API en utilisant des outils tels que Postman ou Insomnia.

En travaillant sur ce TP, nous avons acquis une compréhension plus approfondie des concepts clés de la programmation côté serveur, tels que la gestion de base de données et les routes d'API .