# Portfolio Paul Kevin — V0.4 / Project Spine

## Nouveautés

Une nouvelle présentation interactive des **7 projets d'archive** en forme de spirale 3D verticale :

- Rotation au **défilement naturel** de la page, sans bloquer ni détourner la molette.
- Chaque carte de projet passe au premier plan sur une trajectoire hélicoïdale ; les autres reculent en profondeur.
- Le nom, l'accroche, la description et les technologies changent avec une **animation typographique mot par mot**.
- Une progression et des boutons « précédent / suivant » permettent d'explorer les projets individuellement.
- Le mode **GRID** reste disponible pour une consultation rapide avec les filtres Full-stack / Frontend / AI Automation.
- Les trois projets vedettes **MBOA FLIX, POMERA et SHORTY** conservent leurs grandes présentations, avec une nouvelle apparition animée des titres et des métadonnées.
- Sur les appareils qui demandent une **réduction des animations**, la spirale se transforme en galerie statique accessible.
- Les cartes gardent les captures authentiques et visuels abstraits de la V0.3.1.

## Installation

1. Conservez une copie de sauvegarde de votre projet local.
2. Assurez-vous d'avoir déjà installé **V0.3.1** et ses images dans `public/images/projects/`.
3. Décompressez ce fichier ZIP à la **racine du projet React**, à côté de `package.json`.
4. Remplacez les deux fichiers existants :
   - `src/components/SelectedWork.jsx`
   - `src/components/SelectedWork.css`
5. Deux nouveaux fichiers doivent être ajoutés :
   - `src/components/ProjectSpine.jsx`
   - `src/components/ProjectSpine.css`
6. Lancez `npm run dev` pour voir le résultat ou `npm run build` pour compiler.

**Aucun nouveau paquet npm n'est nécessaire.** Ce patch ne remplace ni le Hero, ni les animations de transition entre le Hero et la présentation personnelle, ni le portrait, ni `src/data/projects.js` ou `src/data/portfolio.js`.

## Ajouter un nouveau projet

La source de données reste `src/data/projects.js` (depuis la V0.3.1). Pour ajouter un projet à la spirale, utilisez simplement :

```js
{
  id: 'nouveau-projet',
  featured: false,
  group: 'frontend',
  title: 'NOUVEAU PROJET',
  category: 'FRONTEND / WEB APP',
  discipline: 'Frontend development',
  lead: 'L’idée en une phrase.',
  description: 'Une description vérifiable.',
  tags: ['React'],
  theme: 'default',
  media: { type: 'browser', src: '/images/projects/nouveau.webp', alt: 'Aperçu du projet' },
  links: {},
},
```

Le nombre de cartes, le parcours de scroll et les étapes de navigation s'adaptent automatiquement.

## Vérifications

- `npm run build` : réussi.
- Prévisualisation dans un navigateur : spirale, rotation avec défilement, bascule GRID, liens vers les fiches et fermeture des fiches testés.
- Avertissement Vite existant : le bundle JavaScript dépasse 500 Ko, en partie à cause de la scène 3D du portfolio ; cet avertissement ne bloque pas la compilation.
