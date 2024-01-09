import React, {useContext, useState} from "react";
import "../App.css"
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/Auth";
import customButton from "../components/CustomButton";




export const Login = function  () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const {handleLogin} = useContext(AuthContext);
    const [CorrectlySubmitted, setCorrectlySubmitted] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);


    const onLogin = async function  (e)  {
        e.preventDefault();
        const loginSuccess = await handleLogin(email, password, navigate)
        setFormSubmitted(true)
        setCorrectlySubmitted(loginSuccess)
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
                <button type="submit" onClick={onLogin}>Log In </button>
                {!CorrectlySubmitted && formSubmitted && <p className="error-message">Email or password are not valid, please try again.</p>}
            </form>
            <button className="link-btn" onClick={() => {navigate("/signup")}}>Don't have an account? Register here.</button>
        </div>
        </div>
    )
}