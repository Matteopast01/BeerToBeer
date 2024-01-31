import React, {useContext, useState} from "react";
import "../App.css"
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/Auth";
import CustomButton from "../components/CustomButton";
import theme from "../style/palette";
import Header from "../components/Header";

const Login = function () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const {handleLogin} = useContext(AuthContext);
    const [CorrectlySubmitted, setCorrectlySubmitted] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onLogin = async function  (e)  {
        const loginSuccess = await handleLogin(email, password, navigate)
        setFormSubmitted(true)
        setCorrectlySubmitted(loginSuccess)
    }

    return (
        <>
            <Header disableSearchBar/>
            <div className={"App"}>
            <div className="auth-form-container">
                <h2>Login:</h2>
                <form className="login-form" >
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                           type="email" placeholder="example@domain.com" id="email" name="email" />
                    <label htmlFor="password">Password:</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                           type="password" placeholder="********" id="password" name="password" />
                    <CustomButton variant="contained" text={"Log In"} type="submit" handleClick={onLogin}
                                  sx={{marginLeft: "35%",
                                      width: "auto",
                                      marginRight:"35%",
                                      backgroundColor: theme.palette.primary.dark,
                                      '&:hover': {
                                      backgroundColor: theme.palette.primary.main},
                                      color: "#ffffff"}}/>
                    {!CorrectlySubmitted && formSubmitted && <p className="error-message">
                        Email or password are not valid, please try again.</p>}
                </form>
                <button className="link-btn" onClick={() => {navigate("/signup")}}>
                    Don't have an account? Register here.</button>
            </div>
            </div>
        </>
    )
}
export default Login;