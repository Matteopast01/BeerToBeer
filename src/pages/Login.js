import React, { useState } from "react";
import "../App.css"
import {useNavigate} from "react-router-dom";
import {  signInWithEmailAndPassword  } from 'firebase/auth';
import {auth} from "../services/firebase/auth/manage_auth"
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }

    return (
        <div className={"App"}>
        <div className="auth-form-container">
            <h2>Login:</h2>
            <form className="login-form" >
                <label htmlFor="email">email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" onSubmit={onLogin}>Log In </button>
            </form>
            <button className="link-btn" onClick={() => {navigate("/signup")}}>Don't have an account? Register here.</button>
        </div>
        </div>
    )
}