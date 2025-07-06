import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login.tsx';
import { ToDoList } from './pages/ToDoList.tsx';
import { SignUp } from './pages/SignUp.tsx';


function App() {
  const userId = localStorage.getItem('userId');

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={userId ? "/todos" : "/login"} />}
      />
      <Route
        path="/login"
        element={userId ? <Navigate to="/todos" /> : <Login />}
      />
      <Route
        path="/signup"
        element={userId ? <Navigate to="/todos" /> : <SignUp />}
      />
      <Route
        path="/todos"
        element={userId ? <ToDoList /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App
