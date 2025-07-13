import React, { useState, useEffect } from "react";
//le nom de la biblio React , besoin pour interpreter et render mon code de composant JSX
//from 'react" package react
//useState c'est comme donnée une petite mémo à mon composant
//const [compteur, setCompteur] = useState(0);
// Ici :
// - `compteur` est ce dont ton composant se souvient (sa valeur actuelle, qui est 0 au début).
// - `setCompteur` est la fonction que tu utiliseras pour changer la valeur de `compteur`.
//useEffect, c'est comme dire à ton composant : "Quand certaines choses se passent (ou même juste après que tu t'affiches), exécute cette action."
function TaskList() {
    const [tasks, setTasks] = useState([]); // État pour stocker la liste des tâches, setTask fct qui va permettre d'ajouter nouvelle tache
    const [loading, setLoading] = useState(true); // État pour indiquer si le chargement est en cours
    const [error, setError] = useState(null); // État pour stocker les erreurs
    useEffect(() => {
    // Cette fonction sera exécutée une seule fois après le premier rendu du composant
    // (grâce au tableau de dépendances vide [])

    const fetchTasks = async () => {
      try {
        // 1. Effectuer la requête HTTP vers l'API Spring Boot
        
        const response = await fetch('http://localhost:8080/api/tasks');

        // 2. Vérifier si la réponse est OK (statut 200)
        if (!response.ok) {
          // Si le statut n'est pas 200, lancer une erreur
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // 3. Convertir la réponse en JSON
        const data = await response.json();

        // 4. Mettre à jour l'état avec les données reçues
        setTasks(data);
      } catch (err) {
        // 5. Gérer les erreurs (problème réseau, erreur serveur, etc.)
        console.error("Erreur lors de la récupération des tâches:", err);
        setError(err.message); // Stocker le message d'erreur
      } finally {
        // 6. Indiquer que le chargement est terminé, qu'il y ait eu succès ou erreur
        setLoading(false);
      }
    };

    fetchTasks(); // Appeler la fonction pour récupérer les tâches
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'une fois (au montage du composant)

  // --- Rendu du composant ---
  if (loading) {
    return <p>Chargement des tâches...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Erreur: {error}</p>;
  }

  return (
    <div>
      <h2>Liste des Tâches</h2>
      {tasks.length === 0 ? (
        <p>Aucune tâche trouvée pour le moment.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            // Utilise task.taskId comme clé unique (important pour React)
            <li key={task.taskId}>
              <strong>{task.title}</strong>: {task.description} - {task.completed ? 'Terminée' : 'En cours'}
              {task.dueDate && ` (Date limite: ${task.dueDate})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
