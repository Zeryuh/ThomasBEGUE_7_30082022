import React from 'react';
import "./nav.css"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Nav = ({ page }) => {
    const navigate = useNavigate();
    return (
        <div>
            {
                // Permet de savoir sur quel page on se trouve
                page === 'login-signup' &&
                (<div className="nav-page">
                    <NavLink to="/" className={(nav) => (nav.isActive ? "active decale-nav" : "decale-nav")}>Inscription</NavLink>
                    <NavLink to="/login" className={(nav) => (nav.isActive ? "active" : "")} >Connexion</NavLink>
                </div>)
            }
            {
                page === 'online' &&
                (<div className="nav-page">
                    <NavLink to="/profil" className="decale-nav">Mon Profil</NavLink>
                    <NavLink to='/login' onClick={(e) => {
                        e.preventDefault();
                        sessionStorage.removeItem('userData');
                        navigate('/login')
                    }} className={(nav) => (nav.isActive ? "active" : "")} >Déconnexion</NavLink>
                </div>)
            }
            {
                page === 'profil' &&
                (<div className="nav-page">
                    <NavLink to="/home" className="decale-nav">Accueil</NavLink>
                    <NavLink to='/login' onClick={(e) => {
                        e.preventDefault();
                        sessionStorage.removeItem('userData');
                        navigate('/login')
                    }} className={(nav) => (nav.isActive ? "active" : "")} >Déconnexion</NavLink>
                </div>)
            }
        </div>
    );
};

export default Nav;