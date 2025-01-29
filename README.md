# BoiteAnnonces API

BoiteAnnonces est une API REST permettant aux utilisateurs de publier et gérer des annonces.

## 🚀 Installation et lancement

### 1. Cloner le projet :

```bash
git clone https://github.com/ton-utilisateur/BoiteAnnonces.git
cd BoiteAnnonces
```

### 2. Installer les dépendances :

```bash
npm install
```

### 3. Configurer les variables d’environnement :

Créer un fichier `.env` et ajouter :

```makefile
MONGO_URI=mongodb://localhost:27017/boiteannonces
JWT_SECRET=supersecret
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
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
| POST    | `/api/auth/login`  | Connexion utilisateur    |
| POST    | `/api/ads`         | Créer une annonce 🔒     |
| GET     | `/api/ads`         | Lister les annonces      |
| GET     | `/api/ads/:id`     | Voir une annonce         |
| PUT     | `/api/ads/:id`     | Modifier une annonce 🔒  |
| DELETE  | `/api/ads/:id`     | Supprimer une annonce 🔒 |

🔒 : Requiert une authentification
