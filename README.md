# BoiteAnnonces API

BoiteAnnonces est une API REST permettant aux utilisateurs de publier et gérer des annonces.

## 🚀 Installation et lancement

### 1. Cloner le projet :

```bash
git clone https://github.com/BillyRogier/BoiteAnnonces.git
cd BoiteAnnonces
```

### 2. Installer les dépendances :

```bash
npm install
```

### 3. Configurer les variables d’environnement :

Créer un fichier `.env` et ajouter :

```makefile
PORT=5000
MONGO_URI=mongodb://localhost:27017/boiteannonces
JWT_SECRET=supersecretkey
COOKIE_SECRET=anothersecretkey
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

### 4. Lancer le serveur :

```bash
npm start
```

L’API tournera sur `http://localhost:5000`.

## 📌 Fonctionnalités

✅ Inscription / Connexion avec JWT & OAuth2  
✅ Création / Modification / Suppression des annonces  
✅ Consultation des annonces avec mise en cache (Redis)  
✅ Sécurisation avec rate-limit, helmet et cookies

## 📖 Routes API

| Méthode | Endpoint           | Description              |
| ------- | ------------------ | ------------------------ |
| POST    | `/api/auth/signup` | Inscription utilisateur  |
| POST    | `/api/auth/google` | Inscription google       |
| POST    | `/api/auth/github` | Inscription github       |
| POST    | `/api/auth/login`  | Connexion utilisateur    |
| POST    | `/api/ads`         | Créer une annonce 🔒     |
| GET     | `/api/ads`         | Lister les annonces      |
| GET     | `/api/ads/:id`     | Voir une annonce         |
| PUT     | `/api/ads/:id`     | Modifier une annonce 🔒  |
| DELETE  | `/api/ads/:id`     | Supprimer une annonce 🔒 |

🔒 : Requiert une authentification
