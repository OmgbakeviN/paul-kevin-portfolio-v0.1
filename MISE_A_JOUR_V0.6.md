# Paul Kevin Omgba — Portfolio V0.6 · Skills Explorer

## Ce qui change

La section **Expertise / Skills** devient un explorateur interactif avec :

1. Des titres qui s'animent **lettre par lettre au scroll** (GSAP + ScrollTrigger).
2. Des logos de technologies qui apparaissent **au survol des catégories**.
3. Un accordéon animé en douceur, avec catégories sélectionnables au clic et au clavier.
4. Un objet **3D Three.js** qui change de forme et de couleur avec le domaine sélectionné.
5. Des **liens vers les projets existants**. Un clic ouvre directement la fiche du projet dans la galerie Selected Work ; pour Nazli Tech School, le lien mène à la section Experience.

L'objet 3D a une alternative légère si WebGL n'est pas disponible ou si la préférence « réduire les animations » est active. Sur mobile, le panneau 3D se place au-dessus de l'accordéon.

## Installer le patch

1. Partir de la **V0.5.1** du portfolio.
2. Sauvegarder les fichiers existants `src/App.jsx` et `src/components/SelectedWork.jsx`.
3. Copier les fichiers et dossiers contenus dans le ZIP **à la racine du projet**, en conservant l'arborescence et en acceptant l'écrasement de ces deux fichiers.
4. Lancer `npm install` si les dépendances ne sont pas déjà installées, puis `npm run dev`.

Il n'y a **aucune nouvelle dépendance npm** : GSAP, Three.js et React Three Fiber sont déjà utilisés dans le portfolio.

## Personnalisation

- Ajouter, modifier ou réordonner les six catégories dans `src/data/skills.js`.
- Les objets `proofs` utilisent les vrais `id` de `src/data/projects.js` et peuvent pointer vers une ancre (`href`).
- Le composant 3D est dans `src/components/SkillSculpture.jsx`.
- Les couleurs, l'espacement et la version mobile sont dans `src/components/SkillsExplorer.css`.
- Les logos SVG des technologies sont placés dans `public/images/skills/` et sont chargés localement.

## Validation

Compilation Vite : `npm run build` — réussie. L'avertissement de taille de bundle existe parce que le portfolio charge plusieurs scènes 3D ; il n'empêche pas la compilation.

Les logos SVG proviennent des icônes monochromes **Simple Icons 16.38.0**. Les marques restent la propriété de leurs détenteurs respectifs.
