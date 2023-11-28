import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { app } from './firebaseConfig';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Login from './components/login';
import Navbar from './components/navbar';
import Home from './components/home';
import ViewNote from './components/view-note';
import SignUp from './components/signup';
import NewNote from './components/new-note';
import LoadingScreen from './components/loading';

export default function App() {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const auth = getAuth(app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <LoadingScreen />;
  }

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/" element= {user ? <><Navbar /><Home /></> : <Navigate to="/login" />} />
        <Route path="/note/:id" element= {user ? <><Navbar /><ViewNote /></> : <Navigate to="/login" />} />\
        <Route path="/new" element= {user ? <><Navbar /><NewNote /></> : <Navigate to="/login" />} />\
      </Routes>
    </>
  );
}
