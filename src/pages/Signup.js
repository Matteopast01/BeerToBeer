import React, { useContext, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";

export const Signup = function () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const navigate = useNavigate();
    const { handleSignUp } = useContext(AuthContext);

    const isEmailValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = () => {
        return password.length >= 6;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (isEmailValid() && isPasswordValid()) {
            await handleSignUp(email, password, navigate);
        }
    };

    return (
        <div className={"App"}>
            <div className="auth-form-container">
                <h2>Register:</h2>
                <form className="register-form">
                    <label htmlFor="name">Full name:</label>
                    <input
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        placeholder="full Name"
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="youremail@gmail.com"
                        id="email"
                        name="email"
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        title="Please enter a valid email address."
                    />
                    {formSubmitted && !isEmailValid() && <p className="error-message">Please enter a valid email address.</p>}
                    <label htmlFor="password">Password:</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="********"
                        id="password"
                        name="password"
                        required
                    />
                    {formSubmitted && !isPasswordValid() && <p className="error-message">Password must be at least 6 characters long.</p>}
                    <button type="submit" onClick={onSubmit}>
                        Sign up
                    </button>
                </form>
                <button
                    className="link-btn"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Already have an account? Login here.
                </button>
            </div>
        </div>
    );
};
