## TP 5: Rendering - data fetching and rendering with next.js

👨‍🦱 _Contributeurs: CARRE Gaetan & BOUHACINA Adam_ 👨🏽

### Introduction

Dans ce Lab, nous allons travailler avec Next.js et React pour comprendre l'importance des différentes stratégies de récupération de données et leur impact sur les performances de notre application et leur importance pour améliorer l'expérience utilisateur.

### Part 1: Utiliser SSG
Nous allons commencer par revoir la page `/pages/articles.js` de notre application. Cette page est actuellement implémentée avec CSR, ce qui signifie que les articles ne sont pas inclus dans la page générée au moment de la construction. Nous allons réimplémenter la page en utilisant la stratégie SSG pour inclure les articles dans la page générée cela permettra en plus d'améliorer les performances de notre application, d'être référencé par les moteurs de recherche. Après avoir revu la page `/pages/articles.js` on va revoir la page de chaque article. Du faites qu'on affiche pas mal d'informations (4 images, récupération de data supabase...) il est préférable d'utiliser la technologie SSG pour que ces éléments soit chargés pendant le build et avoir un affichage rapide des éléments de la page. On intègre donc les méthodes `getStaticProps` et `getStaticPaths`vu qu'il s'agit de routes dynamiques.

![Untitled](/img/screen19.png)

### Part 2: Build notre application

Grâce à la commande ```npm run build``` on build notre application ce qui est une étape importante. En effet, le processus de build génère une version optimisée de l'application prête à être déployée sur un serveur. Quand on build notre appli, Next.js va générer des pages HTML prérendues pour chaque route de notre application. Cela permet d'optimiser les performances de notre application et d'améliorer l'expérience utilisateur. En effet, le navigateur n'a plus besoin de télécharger le code JavaScript pour afficher la page. Il suffit de télécharger le HTML et le CSS. Cela permet d'obtenir une meilleure expérience utilisateur et d'améliorer les performances de notre application.


### Conclusion

Au terme de ce TP nous pouvons affirmer,l'importance des stratégies de récupération de données dans Next.js. Nous avons aussi pratiquer React et Next.js pour les implémenter. En conclusion, ce TP va nous servir à améliorer les performances et l'expérience utilisateur de notre application en utilisant ces stratégies.