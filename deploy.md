# Hebergement sans serveur

Le site est statique. Il n'a pas besoin de serveur, base de donnees, PHP, Node ou WordPress.

## Option recommandee maintenant: GitHub Pages

Pourquoi:

- Gratuit avec un depot public.
- Suffisant pour une landing page statique.
- Deploiement automatique a chaque push.
- Bon point de depart avant d'acheter un domaine.

Ce projet contient deja un workflow GitHub Actions:

```text
.github/workflows/deploy-projetfz-pages.yml
```

Le workflow publie seulement le dossier `ProjetFZ`. Voir `github-pages.md` pour les etapes completes.

## Alternative: Cloudflare Pages

Pourquoi:

- Gratuit pour un petit site statique.
- Deploiement par upload direct ou Git.
- Domaine personnalise possible.
- CDN rapide au Canada.
- Possibilite d'ajouter plus tard des fonctions serverless si le projet grandit.

Etapes:

1. Creer un compte Cloudflare.
2. Aller dans Workers & Pages.
3. Creer un projet Pages.
4. Choisir Direct Upload pour commencer vite, ou Git Integration si le projet est dans GitHub.
5. Publier le dossier `ProjetFZ`.
6. Ajouter un domaine personnalise quand tu en as un.

## Alternative simple: GitHub Pages sans workflow

Pourquoi:

- Gratuit avec un depot GitHub public.
- Tres bien pour un premier site statique.
- Deploiement automatique depuis un repo.

Etapes:

1. Creer un depot GitHub qui contient uniquement les fichiers du site a la racine.
2. Ajouter les fichiers `index.html`, `styles.css`, `script.js`, `robots.txt` et `sitemap.xml`.
3. Aller dans Settings > Pages.
4. Choisir `Deploy from a branch`.
5. Choisir la branche et le dossier racine.
6. Connecter un domaine plus tard si necessaire.

## Alternative rapide: Netlify

Pourquoi:

- Deploiement par drag-and-drop.
- Domaine temporaire immediat.
- Domaine personnalise et SSL inclus dans le plan gratuit.

Etapes:

1. Creer un compte Netlify.
2. Glisser-deposer le dossier `ProjetFZ`.
3. Tester l'URL temporaire.
4. Ajouter un domaine personnalise.

## Domaine

Pour le SEO, un domaine propre aide. Idees de noms:

- `codefizz.ca`
- `rabaisfizz.ca`
- `forfaitfizz.ca`
- `referencefizz.ca`

Verifier la disponibilite et eviter un nom qui peut faire croire au site officiel de Fizz.
