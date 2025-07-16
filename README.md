# 📝 MyTasky – Gestionnaire de Tâches Personnel

Projet développé dans le cadre de mon défi personnel : **1 projet technique par semaine**.

## 🚀 Présentation

MyTasky est une application de type **To-Do List** qui permet d’ajouter, modifier, supprimer et visualiser des tâches.

- **Frontend** : React (hooks `useState`, `useEffect`) – UI générée avec [V0](https://v0.dev)
- **Backend** : Spring Boot – API REST
- **Base de données** : H2 en mémoire
- **UI** : Bootstrap & Tailwind CSS
- **Fonctionnalités** : CRUD complet pour les tâches

---

## 📂 Structure du projet

myTasky/
│
├── frontend/ # Application React
├── backend/ # Application Spring Boot
├── LICENSE
└── README.md


---

## ⚙️ Lancer le projet localement

### 1. Backend – Spring Boot

```bash
cd backend
./mvnw spring-boot:run

L’API sera disponible sur : http://localhost:8080/api/tasks

2. Frontend – React
cd frontend
npm install
npm run dev

L’interface sera disponible sur : http://localhost:3000
✅ Fonctionnalités
Ajouter une tâche

Modifier une tâche

Supprimer une tâche

Afficher la liste des tâches

🛠️ Technologies utilisées
React

Spring Boot

H2 Database

REST API

Bootstrap / Tailwind CSS


