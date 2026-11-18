# Paul Kevin — V0.3 · Selected Work

Mise à jour **ciblée** pour ton projet React/Vite existant. Elle conserve le Hero 3D, son interaction à la souris et la transition « Technology is what I build. Curiosity is how I think. ».

## Installation sur Windows

1. Fais une copie de sécurité de ton projet actuel (ou un commit Git).
2. Décompresse le ZIP **à la racine** de `paul-kevin-portfolio-v0.1`, à côté de `package.json`.
3. Accepte le remplacement de **`src/App.jsx` seulement**. Les autres fichiers du ZIP sont nouveaux.
4. **Ne supprime pas** tes autres fichiers, notamment ton portrait `public/images/kevin-portrait.webp` et `src/data/portfolio.js`.
5. Relance le serveur (`npm run dev`). Si le serveur tourne déjà, Vite actualise la page.

## Ce que la V0.3 apporte

- MBOA FLIX à l'honneur, avec **les deux vraies captures** présentées comme des téléphones flottants.
- POMERA avec une vitrine façon navigateur, profondeur et couleur rouge/prune.
- SHORTY avec sa vraie capture d'écran, sur une scène bleu nuit.
- Effets de mouvement à la souris, révélation progressive au défilement et version mobile.
- Un clic sur n'importe quel projet ouvre une **fiche de détails** avec description, technologies et liens disponibles.
- Images converties en WebP sans perte pour préserver les détails tout en réduisant les fichiers.
- Aucun package npm supplémentaire à installer.

## Ajouter un quatrième projet (ou autant que tu veux)

Ouvre **`src/data/projects.js`**. Ajoute un objet à la fin du tableau `selectedProjects`, par exemple :

```js
{
  id: 'mon-nouveau-projet',            // Identifiant unique
  title: 'MON NOUVEAU PROJET',
  category: 'WEB APPLICATION / PRODUCT',
  discipline: 'Full-stack development',
  lead: 'Une phrase courte et mémorable.',
  description: 'Description de ce que fait réellement le projet.',
  tags: ['React', 'Django'],
  highlights: [
    'Première fonctionnalité ou réalisation.',
    'Deuxième fonctionnalité ou réalisation.',
  ],
  layout: 'standard',                 // ou 'featured' pour toute la largeur
  theme: 'default',                   // mboa, pomera, shorty, default
  media: {
    type: 'image',                    // voir les autres types ci-dessous
    src: '/images/projects/mon-projet.webp',
    alt: 'Capture du nouveau projet',
  },
  links: {
    live: 'https://exemple.com',     // optionnel, supprimer si absent
    source: 'https://github.com/...',// optionnel
  },
},
```

Dépose l'image dans `public/images/projects/` et garde le même nom que dans `media.src`.

**Types de médias disponibles :**

- `image` : une capture ou une image de couverture.
- `browser` : une capture de site dans un cadre de navigateur.
- `phones` : plusieurs captures mobiles dans une mise en scène 3D CSS (`images: [...]`). Les deux premières s'affichent en profondeur.
- `video` : aperçu animé (`src: '/videos/demo.mp4'`, `poster: '/images/...webp'`). Prévoir un format compressé, muet et optimisé pour le Web.

Les numéros et le compteur se recalculent automatiquement. Les projets sans URL restent consultables dans leur fiche de détails.

## Fichiers modifiés et ajoutés

```text
src/
├── App.jsx                       ← remplacé : branche SelectedWork
├── components/
│   ├── SelectedWork.jsx           ← nouveau : cartes, animations, fiches
│   └── SelectedWork.css           ← nouveau : styles isolés
└── data/
    └── projects.js                ← nouveau : SEUL fichier à éditer pour les projets
public/
└── images/
    └── projects/
        ├── mboa-flix-home.webp
        ├── mboa-flix-culture.webp
        ├── pomera.webp
        └── shorty.webp
```

### Notes importantes

- `src/data/portfolio.js` **n'est pas inclus** dans le ZIP : le chemin de ton portrait et tes liens restent donc inchangés. L'ancien tableau `featuredProjects` qui s'y trouve n'est plus utilisé par la nouvelle section Work.
- Le lien de SHORTY reprend l'ancienne adresse associée à JANUS dans ton fichier initial : `https://janus-oibd.onrender.com`. **Vérifie qu'elle mène toujours au bon projet**, et corrige-la dans `src/data/projects.js` si nécessaire.
- Les textes des fiches sont rédigés à partir de tes captures et du portfolio initial. Tu peux les personnaliser dans `projects.js`.
- Si tu préfères supprimer les animations, le navigateur respecte automatiquement le réglage système *réduire les mouvements*.

## Vérification effectuée

- Build de production : `npm run build` **réussi**.
- Médias des trois projets présents et identifiants uniques : **vérifiés**.
- Le serveur d'aperçu local de l'environnement de génération n'était pas accessible ; vérifie donc l'apparence dans ton navigateur après extraction.
