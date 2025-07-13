import React from 'react';
import TaskList from './TaskList'; // Importer le nouveau composant TaskList

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Bienvenue sur mon application Tasky !</h1>
      <p>Le frontend React démarre ici.</p>
      <TaskList />
    </div>
  );
}

export default App;