# ProjetFZ

ProjetFZ est un projet de site statique trilingue pour promouvoir un code de référence Fizz et convertir du trafic SEO/SEM/GEO vers l'abonnement Fizz.

Le site est conçu pour fonctionner sans serveur: il suffit d'héberger les fichiers statiques sur GitHub Pages, Cloudflare Pages, Netlify ou tout autre hébergeur de fichiers HTML/CSS/JS.

## Objectif

- Obtenir environ 1 conversion Fizz par jour.
- Faire connaître un code de référence Fizz avec une visibilité efficace.
- Capter des recherches intentionnelles comme `code référence fizz`, `code promo fizz`, `forfait mobile fizz québec`, `internet fizz avis`, `économiser fizz`.
- Rester transparent: le site doit dire clairement que le propriétaire reçoit une prime si le code est utilisé.
- Offrir une expérience en français, anglais et espagnol.

## Hypotheses de depart

- Le code de référence Fizz configuré dans le site est `OYYKR`.
- La prime Fizz affichée actuellement est de 40$ pour le parrain et 40$ pour la personne invitée, mais Fizz indique que le montant peut changer sans préavis.
- Le code doit être entré pendant l'activation du premier forfait Fizz. Il ne peut généralement pas être ajouté rétroactivement.
- Le bonus est appliqué après que le nouveau membre a cumulé deux mois de service, selon les conditions Fizz.

Sources officielles à vérifier régulièrement:

- [Programme de référence Fizz](https://fizz.ca/fr/inviter-des-amis)
- [FAQ référence Fizz](https://fizz.ca/fr/faq/comment-inviter-des-amis-chez-fizz)

## Fichiers

- `index.html`: page racine qui redirige vers `/fr/`, `/en/` ou `/es/`.
- `fr/index.html`: landing page française.
- `en/index.html`: landing page anglaise.
- `es/index.html`: landing page espagnole.
- `styles.css`: mise en page responsive.
- `script.js`: code de référence, liens sortants et suivi d'événements local.
- `robots.txt`: directives pour les moteurs de recherche.
- `sitemap.xml`: sitemap à mettre à jour avec le vrai domaine.
- `github-pages.md`: marche à suivre pour publier sur GitHub Pages.
- `marketing-plan.md`: plan SEM, SEO et GEO.
- `keywords.md`: angles de contenu et mots-clés.
- `deploy.md`: options d'hébergement sans serveur.

## Configuration rapide

1. Vérifier que le code `OYYKR` dans `script.js`, `fr/index.html`, `en/index.html` et `es/index.html` est toujours le code Fizz à utiliser.
2. Vérifier que les URL `https://celiboom.github.io/projetfz/fr/`, `/en/` et `/es/` correspondent bien au repo GitHub Pages publié.
3. Publier le dossier tel quel sur un hébergeur statique.
4. Ajouter Google Search Console et Bing Webmaster Tools après publication.
5. Si tu fais du SEM, commencer avec un budget test faible et des mots-clés exacts.

Les liens de conversion vers Fizz doivent toujours inclure le paramètre `?ref=OYYKR`. Le site le fait automatiquement dans `script.js` à partir de `REFERRAL_CODE`.

La langue peut être forcée à partir de la racine avec le paramètre `culture` dans l'URL:

- `?culture=fr-CA` redirige vers `/fr/`.
- `?culture=en-US` redirige vers `/en/`.
- `?culture=es-ES` redirige vers `/es/`.

Si `culture` est absent, le site utilise la langue du navigateur quand elle est disponible. Les variantes comme `en-CA`, `fr-FR`, `es-MX` et `es-US` sont aussi acceptées.

Les boutons Mobile et Internet produisent des événements distincts: `click_mobile`, `click_internet`, et le bouton de copie produit `copy_code`.

## Notes importantes

Le site doit éviter de laisser croire qu'il est un site officiel Fizz. Les annonces, titres SEO et pages doivent rester transparents: `site indépendant`, `code de référence`, `prime de parrainage`, pas `coupon officiel` si ce n'est pas fourni officiellement par Fizz.
