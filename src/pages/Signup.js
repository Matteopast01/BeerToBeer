import React, { useState } from "react";
import "../App.css"
import { useNavigate} from "react-router-dom";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import {auth} from "../services/firebase/auth/manage_auth"


export const Signup = function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/login")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });


    }

    return (
        <div className={"App"}>
        <div className="auth-form-container">
            <h2>Register:</h2>
            <form className="register-form" >
                <label htmlFor="name">Full name:</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
                <label htmlFor="email">email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
                <label htmlFor="password">password:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password"  required/>
                <button type="submit" onSubmit={onSubmit}> Log In</button>
            </form>
            <button className="link-btn" onClick={() => {navigate("/login")}}>Already have an account? Login here.</button>
        </div>
        </div>
    )
}