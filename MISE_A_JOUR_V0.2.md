# Portfolio Paul Kevin — Correctif du Hero 3D (V0.2)

Cette mise à jour ne modifie que deux fichiers du projet React V0.1 :

- `src/components/Universe.jsx` : suivi de souris sur toute la fenêtre, parallaxe individuelle des objets, inclinaison plus visible et agrandissement au survol.
- `src/styles.css` : repositionnement du repère de bas de page et suppression d'une annotation qui pouvait chevaucher les modules 3D.

## Installation de la mise à jour

1. Fermer le serveur Vite avec `Ctrl + C` si celui-ci fonctionne.
2. Faire une copie de sauvegarde de tes deux fichiers actuels si tu les as déjà personnalisés.
3. Décompresser le ZIP **dans le dossier racine** `paul-kevin-portfolio-v0.1` et autoriser le remplacement des deux fichiers.
4. Relancer le serveur : `npm run dev`.

Tu n'as pas besoin de relancer `npm install` si les dépendances sont déjà présentes.

## Essais suggérés

- Déplacer le curseur à gauche puis à droite sur le grand titre : l'univers 3D doit maintenant réagir même lorsque la souris est hors du Canvas.
- Survoler chaque objet (ordinateur, réseau IA, téléphone, sculpture) : il doit légèrement grandir et rester cliquable.
- Défiler vers le bas : la transition vers « Technology is what I build. Curiosity is how I think. » conserve son rythme.

## Ajuster la sensibilité

Les valeurs sont regroupées dans la constante `MOTION` en haut du fichier `src/components/Universe.jsx` :

- `moduleMoveX` / `moduleMoveY` : déplacement horizontal / vertical des objets.
- `moduleTilt` : inclinaison de chaque objet.
- `sceneTiltX` / `sceneTiltY` : inclinaison du groupe entier.
- `smoothing` : vitesse à laquelle les objets rejoignent la position visée.

Les mouvements liés au curseur s'atténuent automatiquement durant la transition sombre et sont désactivés sur les écrans de moins de 801 px et en mode « réduction des animations » pour éviter de gêner la navigation.
