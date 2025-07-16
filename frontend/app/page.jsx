"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2, Check, X } from "lucide-react"

const API_BASE_URL = "http://localhost:8080/api/tasks"

export default function TodoApp() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ title: "", description: "" })
  const [editingTask, setEditingTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Récupérer toutes les taches au chargement
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_BASE_URL)
      if (response.ok) {
        const data = await response.json()
        console.log("DEBUG: Fetched tasks:", data); // DEBUG: Log fetched tasks
        setTasks(data)
      } else {
        setError("Erreur lors du chargement des taches")
      }
    } catch (err) {
      setError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  // Créer une nouvelle tache
  const createTask = async (e) => {
    e.preventDefault()
    if (!newTask.title.trim()) return

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          completed: false,
        }),
      })

      if (response.ok) {
        const createdTask = await response.json()
        console.log("DEBUG: Created task:", createdTask); // DEBUG: Log created task
        setTasks([...tasks, createdTask])
        setNewTask({ title: "", description: "" })
        setError("")
      } else {
        setError("Erreur lors de la création de la tache")
      }
    } catch (err) {
      setError("Erreur de connexion au serveur")
    }
  }

  // Mettre à jour une tache
  const updateTask = async (id, updatedTask) => {
    console.log("DEBUG: Attempting to update task. ID received:", id, "Type:", typeof id, "Updated data:", updatedTask); // DEBUG: Crucial log
    if (id === undefined || id === null) {
        console.error("ERROR: Attempted to update a task with undefined or null ID. This will cause backend error.");
        setError("Impossible de mettre à jour la tache: ID manquant.");
        return; // Prevent making the fetch call with an invalid ID
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })

      if (response.ok) {
        const updated = await response.json()
        // Changed task.id to task.taskId here
        setTasks(tasks.map((task) => (task.taskId === id ? updated : task)))
        setEditingTask(null)
        setError("")
      } else {
        setError("Erreur lors de la mise à jour de la tache")
      }
    } catch (err) {
      setError("Erreur de connexion au serveur")
    }
  }

  // Basculer le statut de completion
  const toggleComplete = async (task) => {
    console.log("DEBUG: Toggle complete called for task:", task); // DEBUG: Log task
    // Changed task.id to task.taskId here
    await updateTask(task.taskId, {
      ...task,
      completed: !task.completed,
    })
  }

  // Supprimer une tache
  const deleteTask = async (id) => {
    console.log("DEBUG: Delete task called for ID:", id); // DEBUG: Log ID
    if (id === undefined || id === null) {
        console.error("ERROR: Attempted to delete a task with undefined or null ID.");
        setError("Impossible de supprimer la tache: ID manquant.");
        return; // Prevent making the fetch call with an invalid ID
    }
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // Changed task.id to task.taskId here
        setTasks(tasks.filter((task) => task.taskId !== id))
        setError("")
      } else {
        setError("Erreur lors de la suppression de la tache")
      }
    } catch (err) {
      setError("Erreur de connexion au serveur")
    }
  }

  // Sauvegarder les modifications d'édition
  const saveEdit = (task) => {
    console.log("DEBUG: Save edit called for task:", task); // DEBUG: Log task
    // Changed task.id to task.taskId here
    updateTask(task.taskId, task)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des taches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ma Liste de Taches</h1>
          <p className="text-gray-600">Organisez vos taches efficacement</p>
        </div>

        {/* Message d'erreur */}
        {error && <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

        {/* Formulaire d'ajout */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter une nouvelle tache</h2>
          <form onSubmit={createTask} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Titre de la tache"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Description (optionnelle)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter la tache
            </button>
          </form>
        </div>

        {/* Liste des taches */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucune tache pour le moment</p>
              <p className="text-gray-400">Ajoutez votre première tache ci-dessus !</p>
            </div>
          ) : (
            tasks.map((task) => (
              // Changed key={task.id} to key={task.taskId}
              <TaskItem
                key={task.taskId}
                task={task}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
                onToggleComplete={toggleComplete}
                onDelete={deleteTask}
                onSave={saveEdit}
              />
            ))
          )}
        </div>

        {/* Statistiques */}
        {tasks.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{tasks.length}</p>
                <p className="text-gray-600">Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{tasks.filter((task) => task.completed).length}</p>
                <p className="text-gray-600">Terminées</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{tasks.filter((task) => !task.completed).length}</p>
                <p className="text-gray-600">En cours</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Composant pour chaque tache
function TaskItem({ task, editingTask, setEditingTask, onToggleComplete, onDelete, onSave }) {
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description || "",
    completed: task.completed,
  })

  // Changed editingTask === task.id to editingTask === task.taskId
  const isEditing = editingTask === task.taskId

  const handleEdit = () => {
    // Changed setEditingTask(task.id) to setEditingTask(task.taskId)
    setEditingTask(task.taskId)
    setEditForm({
      title: task.title,
      description: task.description || "",
      completed: task.completed,
    })
  }

  const handleSave = () => {
    if (editForm.title.trim()) {
      onSave({
        ...task, // The original 'task' object is passed here
        title: editForm.title,
        description: editForm.description,
        completed: editForm.completed,
      })
    }
  }

  const handleCancel = () => {
    setEditingTask(null)
    setEditForm({
      title: task.title,
      description: task.description || "",
      completed: task.completed,
    })
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all ${task.completed ? "opacity-75" : ""}`}>
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              Sauvegarder
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <h3 className={`text-lg font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                {task.title}
              </h3>
            </div>
            {task.description && (
              <p className={`text-gray-600 ml-8 ${task.completed ? "line-through" : ""}`}>{task.description}</p>
            )}
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={handleEdit}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Modifier"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              // Changed onDelete(task.id) to onDelete(task.taskId)
              onClick={() => onDelete(task.taskId)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
