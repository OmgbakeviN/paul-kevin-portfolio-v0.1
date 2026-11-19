# Portfolio Paul Kevin — Correctif V0.5.1 / Experience

## Problème corrigé

Dans la V0.5, les cartes Experience utilisaient une classe CSS d'apparition ajoutée directement au DOM par `IntersectionObserver`. Quand React actualisait la carte active au scroll, il pouvait réécrire la liste des classes et supprimer cette classe. La carte devenait alors invisible.

## Corrections

- L'état « déjà apparu » est maintenant conservé **dans React** : un poste qui a été révélé ne redevient plus transparent lors du changement de poste actif.
- Sur ordinateur, le contenu de chaque expérience **reste temporairement fixé dans la zone de lecture** pendant une distance de défilement supplémentaire, avant de céder la place au poste suivant.
- Sur mobile, la chronologie reste en défilement naturel, avec plus d'espacement pour faciliter la lecture.
- L'animation d'apparition se joue une seule fois et ne masque plus les postes lors de leur sortie.
- Aucun changement dans les postes, les logos, le Hero ou la spirale des projets.

## Installation

1. Ce patch s'applique sur le portfolio **V0.5** (Experience déjà installé).
2. Fais une sauvegarde de ton projet actuel.
3. Décompresse le ZIP à la racine de ton projet React, à côté de `package.json`.
4. Remplace uniquement ces deux fichiers :

```text
src/components/ExperienceTimeline.jsx
src/components/ExperienceTimeline.css
```

5. Lance `npm run dev`, puis clique sur **Experience** et fais défiler les postes.

Pas de nouvelle dépendance npm. `npm run build` est passé avec succès. Le maintien et les transitions entre les expériences ont aussi été vérifiés dans le navigateur.
