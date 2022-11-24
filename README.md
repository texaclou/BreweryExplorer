# Brewery Project

Ce project utilise la précieuse api : (https://www.openbrewerydb.org)

## Technologies
- Basé sur un template `create-react-app` avec typescript, **la version de réact est la 18**.
- Utilise également React Router V6.
- Utilise Testing Library pour les test

### Architectures des fichiers  

|_ components : les composants utilisés dans les pages
|_ loaders : les fonctions d'appel à l'API  
|_ pages : les composants de pages  
Routes : fichier contenants le "plan" des routes  
index : point d'entrée  

Si un composant nécessite des styles, ils sont écrits dans des fichiers SCSS tu même nom. 
L'application ayant été réalisé en TDD (autant que possible), des fichiers *.test.tsx accomptagne chaque fichiers.

## Chargement asynchrone

- Les loaders peuvent être appellé par une fonction retournant un "defer" (cf doc reactrouter)
- Les pages utilisant un loader, s'affiche sans attendre la fin de la requête
- A la fin de la requête, les composants dépendants sont affichés

## La recherche

- le endpoints de recherche étant cassé une autre solution a été trouvée, que l'on trouvera dans les loaders (ça serait dommage de s'arrêter au readme)