import './App.css';
import { Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login.tsx';
import { ToDoList } from './pages/ToDoList.tsx';


function App() {
  const userId = localStorage.getItem('uderId');

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to={ userId? "/todos" : "/login" } />} 
        />
        <Route 
          path="/login" 
          element={ userId ? <Navigate to = "/todos" /> : <Login />} 
        />
        <Route 
          path="/todos" 
          element={ userId ? <ToDoList /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App
