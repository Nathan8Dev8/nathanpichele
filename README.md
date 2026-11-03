# Portfolio — Nathan Pichele

Site statique (HTML/CSS/JS). Three.js et le modèle 3D sont inclus en local. Aucun build.

## Lancer en local
Le site doit passer par un petit serveur (un double-clic sur `index.html` ne charge pas la 3D).

```bash
cd ~/Documents/TOUT/MON_CV/PORTFOLIO
python3 -m http.server 5190
```
Puis ouvrir http://127.0.0.1:5190. `Ctrl + C` pour arrêter.

Alternative : l'extension « Live Server » de VS Code (clic droit sur `index.html` > Open with Live Server).

## Modifier le contenu (fichier `app.js`)
- `SERVICES` : la liste des services
- `SKILLS` : les cartes compétences
- `PROJECTS` : les projets (capture 1200×750 en WebP dans `assets/img/`)
- `PATH` : le parcours
- `EN` : la version anglaise des textes fixes ; la version française est dans `index.html`

Chaque texte est écrit `[français, anglais]`.

## Mettre en ligne
Glisser le dossier sur https://app.netlify.com/drop, ou `npx vercel` dans le dossier.
Fichiers nécessaires : `index.html`, `styles.css`, `app.js`, `assets/`, `CV_Nathan.pdf`.

## Crédits
Modèle 3D « Laptop » par Aullwen (CC BY 4.0), crédité en pied de page : ne pas retirer.
# nathanpichele
