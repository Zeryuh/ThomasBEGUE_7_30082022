import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import axios from "axios"

const SignupTemplate = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function signupFunction(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/auth/signup',
            data: {
                email: email,
                password: password
            }
        })
            .then(() => {
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
                    .catch(error => { console.log(error); })
            })
            .catch((error) => { alert(`email déja inscrit`) })
    }

 
    return (
        <div className="">
            <Header currentPage='login-signup' />
            <div className="login-signup-body">
                <div className="input-container">
                    <form onSubmit={signupFunction} className="">
                        <div className="info-signup-login">
                            <h1 className="title-login-signup">Inscription</h1>
                            <div className="email-content">
                                <label htmlFor="email">E-mail:</label>
                                <input type="email" value={email} onChange={
                                    (e) => { setEmail(e.target.value) }
                                } placeholder="exemple@gmail.com" className="email-input" id="email" />
                            </div>
                            <div className="password-content">
                                <label htmlFor="password">Mot de passe:</label>
                                <input type="password" value={password} onChange={
                                    (e) => { setPassword(e.target.value) }
                                } id="password" className="password-input" placeholder="********"/>
                            </div>
                        </div>
                        <button type='submit' className="submit-btn">S'inscrire</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupTemplate;