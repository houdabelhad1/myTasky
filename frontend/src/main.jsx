//Premier fichier exéuté lors du démarage de mon app
//Importe les biblios nécessaires pour que React fonctionne et pour interagir avec le DOM
//Il cherche App.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)