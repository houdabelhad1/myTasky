# Application Todo List

Une application de gestion de tâches construite avec React/Next.js et intégrée avec un backend Spring Boot.

## Fonctionnalités

- ✅ Ajouter des tâches avec titre et description
- ✅ Marquer les tâches comme terminées
- ✅ Modifier les tâches existantes
- ✅ Supprimer des tâches
- ✅ Statistiques en temps réel
- ✅ Interface responsive avec Tailwind CSS

## Installation

1. Clonez le projet
2. Installez les dépendances :
   \`\`\`bash
   npm install
   \`\`\`

3. Lancez le serveur de développement :
   \`\`\`bash
   npm run dev
   \`\`\`

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Configuration

Assurez-vous que votre backend Spring Boot fonctionne sur `http://localhost:8080` avec les endpoints suivants :

- `GET /api/tasks` - Récupérer toutes les tâches
- `POST /api/tasks` - Créer une nouvelle tâche
- `PUT /api/tasks/{id}` - Mettre à jour une tâche
- `DELETE /api/tasks/{id}` - Supprimer une tâche

## Technologies utilisées

- Next.js 14
- React 18
- Tailwind CSS
- Lucide React (icônes)
