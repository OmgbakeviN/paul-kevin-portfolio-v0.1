# Paul Kevin — Selected Work V0.3.1

## Ce qui change

- **3 projets vedettes** : MBOA FLIX, POMERA, SHORTY (alias Janus dans l'ancien portfolio).
- **7 réalisations dans l'archive filtrable** : Signum QR, FEICOM Monitor, SeedFlow, Omgba Flix (le site web, différent de MBOA FLIX), Cogit Business, Be Wise Innovation et SMARTSANA Academy.
- **4 filtres** : All projects, Full-stack, Frontend, AI Automation.
- **Fiches de détail** : descriptions, technologies, liens et galerie d'images lorsque des captures sont disponibles.
- **14 images WebP** issues des captures fournies (pas de fausses captures pour les automatisations). Les trois cartes d'agents utilisent des visuels abstraits créés en CSS.

## Installation dans votre portfolio existant

1. Assurez-vous d'avoir déjà appliqué la **V0.3 Selected Work** et que le site fonctionne.
2. Fermez le serveur Vite si besoin, puis **décompressez le patch à la racine du projet**, au même niveau que `package.json`.
3. Confirmez le remplacement de ces **trois fichiers uniquement** :
   - `src/data/projects.js`
   - `src/components/SelectedWork.jsx`
   - `src/components/SelectedWork.css`
4. Les nouvelles images sont ajoutées dans `public/images/projects/`.
5. Lancez `npm run dev` pour tester ou `npm run build` pour préparer une version de production.

**Ce patch ne remplace ni `src/App.jsx`, ni le Hero, ni `src/data/portfolio.js`, ni `public/images/kevin-portrait.webp`.** Votre portrait et vos autres changements restent intacts.

## Ajouter facilement d'autres projets

Tout se fait dans `src/data/projects.js`. Dupliquez un objet du tableau `selectedProjects` :

```js
{
  id: 'mon-projet',           // identifiant unique
  featured: false,           // true : grande carte ; false : galerie
  group: 'fullstack',        // fullstack | frontend | automation
  title: 'MON PROJET',
  category: 'FULL-STACK / WEB APP',
  discipline: 'Web development',
  lead: 'Une courte phrase accrocheuse.',
  description: 'Description réelle du projet.',
  tags: ['React', 'Django'],
  highlights: ['Un point fort', 'Un autre point fort'],
  theme: 'default',
  media: {
    type: 'browser',
    src: '/images/projects/mon-projet.webp',
    alt: 'Capture de mon projet',
  },
  gallery: ['/images/projects/mon-projet-02.webp'],
  links: {
    live: 'https://exemple.com',
    source: 'https://github.com/...',
  },
},
```

Le compteur, les filtres, l'affichage et la fiche détaillée se mettront à jour automatiquement.

Autres options pour `media` :
- `{ type: 'image', src: '/images/...' }`
- `{ type: 'phones', images: ['/images/...', '/images/...'] }`
- `{ type: 'video', src: '/videos/...', poster: '/images/...' }`
- `{ type: 'concept', label: 'NOM DE LA DÉMONSTRATION' }` : art abstrait CSS quand aucune capture publique n'est disponible.

Supprimez les champs `gallery`, `links.live` ou `links.source` si vous ne disposez pas de ces éléments. Ne laissez pas d'URL fictive sur un site public.

## À confirmer avant publication définitive

- Dans les fichiers transmis, la capture porte la marque **Shorty**, tandis que l'ancien portfolio associe le code source et l'URL au projet **Janus Link Tracker**. Une seule fiche a été conservée pour ne pas créer un doublon. Vérifiez cette association.
- Les liens des anciennes réalisations proviennent de votre ancien portfolio. Vérifiez que les démonstrations en ligne sont encore accessibles.
- Les expériences Cogit Business, Be Wise Innovation et SMARTSANA Academy proviennent de vos CV, sans captures publiques. Leur présentation n'expose pas de données client.

## Vérification technique

`npm run build` : réussi dans l'environnement de préparation. La taille du bundle JavaScript déclenche l'avertissement Vite de la V0.3 existante (notamment la scène 3D), sans empêcher la compilation.
