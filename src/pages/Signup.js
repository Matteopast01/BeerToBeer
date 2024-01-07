import React, {useContext, useState} from "react";
import "../App.css"
import { useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/Auth";





export const Signup = function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();
    const {handleSignUp} = useContext(AuthContext);



    const onSubmit = async (e) => {
        e.preventDefault()
        await handleSignUp(email, password, navigate)

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