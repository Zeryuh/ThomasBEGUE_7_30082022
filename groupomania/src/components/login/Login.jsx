import React, { useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';

const LoginTemplate = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    // Fonction appeler quand on se log
    function loginFunction(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/auth/login',
            data: {
                email: email,
                password: password
            }
        })
            .then((res) => {
                const now = new Date();
                const userData = [res.data.userId, email, res.data.token, now];
                sessionStorage.setItem('userData', JSON.stringify(userData));
                navigate('/home')
            })
            .catch(error => { alert(`Email ou mot de passe incorrect`); })
    }
    return (
        <div className="">
            <Header currentPage='login-signup' />
            <div className="login-signup-body">
                <div className="input-container">
                    <form onSubmit={loginFunction} className="">
                        <div className="info-signup-login">
                            <h1 className="title-login-signup">Connexion</h1>
                            <div className="email-content">
                                <label htmlFor="email">E-mail:</label>
                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }
                                } placeholder="exemple@gmail.com" className="email-input" id="email" />
                            </div>
                            <div className="password-content">
                                <label htmlFor="password">Mot de passe:</label>
                                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }
                                } id="password" className="password-input" placeholder="********"/>
                            </div>
                        </div>
                        <button type='submit' className="submit-btn">Connexion</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginTemplate;