# Portfolio Paul Kevin — V0.5 / Experience

Cette mise à jour ajoute une nouvelle section **Experience** à la V0.4 du portfolio, sans modifier le Hero, le portrait ni la spirale des projets.

## Contenu ajouté

Une chronologie professionnelle avec **5 expériences** :

1. **Nazli Tech School** — AI Programming Instructor & Digital Marketing Specialist (novembre 2026 — présent), Maroc / à distance.
2. **Smartsana Academy** — Application Developer (juin 2026 — présent), Yaoundé / hybride.
3. **CogIT Business** — Artificial Intelligence Specialist (mai 2026 — présent), Côte d'Ivoire / à distance.
4. **Independent Freelance** — Full-Stack Developer (janvier 2023 — présent), Cameroun / à distance.
5. **Smartsana Academy** — Frontend Developer Intern (juin — août 2025), Yaoundé / hybride.

Le contenu est en anglais pour correspondre au reste du portfolio.

## Direction artistique

- Fond aubergine foncé et accents violets et dorés, dans la continuité de l'identité actuelle.
- Intro typographique éditoriale, fixe pendant une partie de la lecture sur grand écran.
- Colonne chronologique verticale dont la ligne progresse au scroll.
- Apparition progressive des postes et animations de titres, réactions légères au survol.
- Mise en page adaptée aux écrans mobiles, et animation réduite pour les utilisateurs qui le demandent.
- Logos **Nazli Tech School** et **Smartsana Academy** fournis par Paul Kevin.
- **CogIT Business** : monogramme typographique temporaire, car nous ne disposons pas d'un logo officiel confirmé.

## Installation sur ton React V0.4

1. Fais une copie de sauvegarde de ton projet actuel.
2. Décompresse le ZIP de la V0.5 à la **racine du projet**, là où se trouve `package.json`.
3. Accepte uniquement le remplacement de `src/App.jsx` ; les autres fichiers sont nouveaux.
4. Vérifie que les deux logos existent dans `public/images/experience/`.
5. Lance `npm run dev` et teste le lien **Experience** du menu.

## Fichiers du patch

```text
src/App.jsx                              (modifié : menu, section, numérotation)
src/data/experience.js                   (nouveau : données des 5 postes)
src/components/ExperienceTimeline.jsx    (nouveau : composant React)
src/components/ExperienceTimeline.css    (nouveau : style et animations)
public/images/experience/nazli.webp      (nouveau : logo)
public/images/experience/smartsana.webp   (nouveau : logo)
MISE_A_JOUR_V0.5.md
```

**Aucune nouvelle dépendance npm.** Le patch ne touche pas à `src/data/projects.js`, `src/data/portfolio.js`, `src/components/Hero.jsx`, ni à la spirale 3D existante.

## Ajouter d'autres expériences plus tard

Le composant est alimenté par le tableau `experience` dans `src/data/experience.js`. Pour ajouter un poste, insère simplement un objet :

```js
{
  id: 'mon-nouveau-poste',
  company: 'Nom de l’entreprise',
  role: 'Intitulé du poste',
  type: 'Contract',
  period: '2027 — PRESENT',
  place: 'City, Country',
  mode: 'Remote',
  monogram: 'ABC', // ou logo: '/images/experience/entreprise.webp'
  logoStyle: 'default',
  description: 'Short overview of this experience.',
  highlights: ['First responsibility.', 'Second responsibility.'],
  tags: ['React', 'Python'],
},
```

L'indexation, le nombre total et la frise sont calculés automatiquement. Pour une nouvelle image, place-la dans `public/images/experience/`.

## Vérification technique

- `npm run build` : **réussi**.
- Vite affiche toujours son avertissement non bloquant concernant le poids du bundle JavaScript, lié notamment à la partie 3D.
- Une prévisualisation automatique avec le navigateur local n'a pas été possible dans cet environnement ; pense à vérifier le rendu visuel sur ton navigateur.
