import React from 'react';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Login from './pages/signup-login/Login';
import Signup from './pages/signup-login/Signup';
import Home from './pages/home/Home';
import Error from './components/Error';
import Profil from './pages/profil/Profil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/login/' element={<Login />} />
      <Route path='*' element={<Error />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profil" element={<Profil />} />
    </Routes>
  </BrowserRouter>
);
