# Paul Kevin Omgba — SEO technique + Google Search Console

Site : https://omgbapaulkevin.vercel.app/

## 1. Installer le patch SEO sur le site Vercel

1. Sur ton ordinateur, ouvre le projet React du portfolio (V0.6 ou la version déjà déployée).
2. Copie les fichiers de ce ZIP à la racine du projet et accepte de remplacer `index.html` :
   - `index.html` : titre, description, URL canonique, aperçu LinkedIn, données structurées Person et WebSite.
   - `public/robots.txt` : donne aux robots l'accès au site et indique le sitemap.
   - `public/sitemap.xml` : déclare l'URL de la page d'accueil.
   - `public/og-preview.png` : image 1200 × 630 pour les aperçus de lien.
   - `public/og-preview.svg` : source vectorielle modifiable de l'image.
3. Lance `npm run build`, puis redéploie le projet sur Vercel via ton flux habituel (Git ou Vercel CLI).
4. **Ne commence la vérification Google qu'une fois cette version déployée.**

Vérifie ensuite ces trois adresses dans ton navigateur :

- https://omgbapaulkevin.vercel.app/robots.txt
- https://omgbapaulkevin.vercel.app/sitemap.xml
- https://omgbapaulkevin.vercel.app/og-preview.png

Elles doivent afficher respectivement le fichier de robots, le XML du sitemap et la bannière SEO.

## 2. Ajouter le site à Google Search Console

1. Ouvre https://search.google.com/search-console/ avec ton compte Google.
2. Clique sur **Ajouter une propriété**.
3. Choisis **Préfixe de l'URL**, pas « Domaine », car tu utilises un sous-domaine `vercel.app`.
4. Saisis exactement :

   `https://omgbapaulkevin.vercel.app/`

5. Dans les méthodes de validation, choisis **Balise HTML**.
6. Copie la balise complète que Google te donne, sous la forme :

   `<meta name="google-site-verification" content="VALEUR_FOURNIE_PAR_GOOGLE" />`

   **Ne copie pas cet exemple tel quel.** Il faut ton vrai code provenant de Search Console.

7. Dans `index.html`, colle cette balise dans `<head>`, à la place du commentaire « Google Search Console: insert ... » (ou immédiatement après).
8. Redéploie le site sur Vercel. Tu peux vérifier la présence de la balise en affichant le code source de la page (Ctrl+U, puis cherche `google-site-verification`).
9. Retourne dans Search Console et clique sur **VALIDER**.

**Important :** garde la balise dans le code après validation, car Google peut vérifier la propriété à nouveau.

## 3. Envoyer le sitemap à Google

1. Dans Search Console, sélectionne la propriété `https://omgbapaulkevin.vercel.app/`.
2. Ouvre **Indexation → Sitemaps**.
3. Dans « Ajouter un sitemap », saisis simplement `sitemap.xml` puis clique sur **Envoyer**.
4. Consulte le statut de lecture du sitemap. Il doit pouvoir être téléchargé par Google sans connexion ni blocage.

Le sitemap ne déclare qu'une URL, car ton portfolio est actuellement une page unique. Il ne faut pas y placer les fragments `#work`, `#experience`, etc.

## 4. Demander l'indexation

1. Dans la barre supérieure **Inspection de l'URL**, colle `https://omgbapaulkevin.vercel.app/`.
2. Clique sur **Tester l'URL en direct** si ce bouton est proposé.
3. Vérifie que la récupération est possible, puis clique sur **Demander une indexation**.

L'indexation n'est ni automatique ni immédiate : Google décide quand et si une URL entre dans son index. Le fait d'envoyer un sitemap ou de demander une indexation n'est pas une garantie de résultat.

## 5. Vérifications importantes

- **Vercel :** assure-toi de visiter l'URL du **déploiement Production** ; Vercel ajoute normalement `X-Robots-Tag: noindex` aux déploiements Preview et à d'anciens déploiements.
- **Accessibilité :** la page d'accueil doit être publique, répondre avec un statut HTTP 200 et ne pas rediriger vers un écran de connexion.
- **Robots :** aucun `noindex` ne doit être renvoyé par le serveur ni présent dans le HTML publié.
- **Canonical :** doit pointer vers une URL de production unique : `https://omgbapaulkevin.vercel.app/`.
- **Aperçu social :** l'image `og-preview.png` doit être disponible publiquement. Elle est prévue notamment pour LinkedIn et les messageries.
- **Contenu :** Google peut rendre ton portfolio React JavaScript. Continue à conserver de vrais titres HTML, des textes descriptifs et des liens navigables.

## 6. Suivre les résultats

Dans Search Console, consulte **Performances → Résultats de recherche** pour découvrir les requêtes et les clics, puis **Indexation → Pages** pour détecter les éventuels problèmes. Reviens après plusieurs jours : les rapports ne se remplissent pas immédiatement.

Suggestions de requêtes à surveiller :

- Paul Kevin Omgba
- Omgba Paul Kevin developer
- software engineer Cameroon
- React Django developer Yaoundé
- AI automation developer Cameroon

Ne cherche pas à les répéter artificiellement dans les textes. L'important est que le portfolio explique clairement ton parcours, tes projets et tes spécialités.

## Sources officielles

- [Google : validation de propriété](https://support.google.com/webmasters/answer/9008080)
- [Google : rapport Sitemaps](https://support.google.com/webmasters/answer/7451001)
- [Google : fonctionnement du SEO JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Vercel : en-têtes X-Robots-Tag des déploiements](https://vercel.com/docs/headers/response-headers)

---

**Prochaine étape ensemble :** après déploiement du patch, partage la balise de validation HTML donnée par Google Search Console. Je l'intégrerai à la bonne place dans `index.html` et nous vérifierons l'étape suivante.
