Thomas Dulac, LP CLOUD
# Brewery Project

Ce project utilise la précieuse api : (https://www.openbrewerydb.org)

## Technologies
- Basé sur un template `create-react-app` avec typescript, **la version de réact est la 18**.
- Utilise également React Router V6.
- Utilise Testing Library pour les test
- Les Feuilles de style sont préprocessées par SASS

### Architectures des dossiers 
- assets : images
- components : composants utilisés dans les pages
- helpers : fonctions pratiques
- loaders : fonctions d'appels à l'API
- pages : les composants de pages, chargé par le router

### et fichiers
- index.tsx : point d'entrée du script
- Routes.tsx : fichier contenants les routes  

Si un composant nécessite des styles, ils sont écrits dans des fichiers SCSS tu même nom. 
Les fichiers testés le sont par des fichiers du même nom, TEST.TSX

## Chargement asynchrone

- Les loaders peuvent être appellé par une fonction retournant un "defer" (cf doc reactrouter)
- Les pages utilisant un loader, s'affiche sans attendre la fin de la requête
- A la fin de la requête, les composants dépendants sont affichés dans les balises SUSPENSE et AWAIT

## Cartes 
Les cartes utilise la librairie Leaflet et React-Leaflet.
En mode "liste", seule les Brasseries avec des coordonnées sont positionnée sur la carte.

## Fonction supplémentaire

Enchainer les corrections de TP, qui portent sur la bière, ça donne envie de se désaltérer.
Heureusement, ce projet propose de déguster une bière en juste un clic.
Attention toutefois, il faut savoir en profiter avec modération... 
Si vous ne vous sentez plus très bien, un refresh porte bien son nom.
