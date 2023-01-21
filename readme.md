# Persons data monitor

Persons data monitor est une application web développer avec HTML, CSS, Javascirpt ES6, qui permet au utilisateur de visualiser un tableau de personne ou de le filtrer par tranche d'age ou par couleur des yeux.

## Comment ça marche

Pour tester l'application en ligne : [cliquer ici](https://vanilla-monitor-test-s4qs.vercel.app/)

-> pour filtrer par couleur des yeux, vous rajouter dans l'URL : ?eyeColor=couleur

- par exemple [https://monsite.app?eyeColor=blue](https://vanilla-monitor-test-s4qs.vercel.app?eyeColor=blue) va afficher uniquement les personne ayant couleur des yeux blue

-> pour filtrer par tranche d'age vous rajouter dans l'URL : ?age=xx-xx

- par exemple [https://monsite.app?age=20-25](https://vanilla-monitor-test-s4qs.vercel.app?age=20-25) va afficher uniquement les personne ayant l'age entre 20 et 25 ans

-> pour filtrer par tranche d'age et par couleur des yeux vous rajouter dans l'URL : ?age=xx-xx&eyeColor=couleur ou ?eyeColor=couleur&age=xx-xx

- par exemple [https://monsite.app?age=20-25&eyeColor=brown](https://vanilla-monitor-test-s4qs.vercel.app?age=20-25&eyeColor=brown) va afficher uniquement les personne ayant l'age entre 20 et 25 ans et couleur des yeux brown

## Installation

1. Installer [NodeJs](https://nodejs.org/en/) LTS sur votre machine.
2. Telecharger le fichier ZIP ou bien clonner le projet depuis [Github](https://github.com/salahED/vanilla-monitor-test)
3. Dans la racine du projet, vous ouvrer le terminal puis vous lancer la commande :

```bash
npm install
```

## Utilisation

Pour builder le projet :

```
npm run build
```

Pour tester le fonctionnement du code en mode développement :

```
npm run dev
```

Pour lancer les test :

```
npm run test
```

## Organisation des fichiers

```
racine
|___assets
    |_____datas.json
|___src
    |_______mocks__
    |_____personsTable
          |____tests
               |____PersonsService.test.js
               |____TableRendrer.test.js
          |____main.js
          |____PersonsService.js
          |____TableRendrer.js
    |_____global.css
    |_____handleError.js
    |_____httpClient.js
    |_____index.html
    |_____index.js
|...configFiles
```

## Séquencement d'execution du code

1- index.js fait appele à la fonction main()

```javascript
import { main } from "./personsTable/main";

main();
```

2- la fonction main() construit la requête query en récupérant les query params de l'URL puis elle fait appelle au service personService pour respirer les données puis elle appelle le service TableRender pour afficher la table, dans le cas d'une erreur elle appele le service handleError pour afficher l'erreur.

```javascript
try {
  const data = await personService.fetchData(query);
  renderer.render(data);
} catch (error) {
  handleError(error);
}
```

3- le service personService est responsable de la validation de la requête, la récupération des données en utilisant le service httpClient et le filtre des données

```javascript
  async fetchData(query) {
    this.validateQuery(query);
    const fetchedData = await httpClient.get("/datas.json");
    return this.filterData(fetchedData, query);
  }
```

4- le service TableRender va utiliser les données récupérer pour construire le tableau

```javascript
 render(data) {
    document.getElementById(this.tableId).innerHTML = this.getTableHtml(data);
  }
```
