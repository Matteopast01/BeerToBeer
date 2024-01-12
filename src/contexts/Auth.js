import { useEffect, useState, createContext } from "react";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate, Routes } from "react-router-dom";
import {store_doc} from "../services/persistence_manager"
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const auth = getAuth();

    const handleSignUp = async function (email, password,name, navigate) {
        const registeredUser = {}
        registeredUser["username"] = name
        registeredUser["role"] = false
        registeredUser["link-img"] = ""


        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                registeredUser["uid"] = user.uid
                store_doc(registeredUser,"User")
                console.log(user);
                navigate("/");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

            });
    }

    const handleLogin = async function (email, password, navigate) {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/");
                for (let property in user) {
                    if (user.hasOwnProperty(property)) {
                        console.log(property + ": " + user[property]);
                    }
                }

                return true
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                return false
            });
    }

    const handleLogout = async function (navigate) {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate("/");
                console.log("Signed out successfully");
            })
            .catch((error) => {
                // An error happened.
            });
    }

    const handleAuthChanged = function () {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false);
        });

        // Return a function to unsubscribe when the component unmounts
        return () => unsubscribe();
    }

    useEffect(() => {
        handleAuthChanged();
    }, []);

    if (pending) {
        return <>Loading...</>;
    }

    const valueToShare = {
        currentUser,
        handleSignUp,
        handleLogout,
        handleLogin,
         // include useNavigate in the context value
    }

    return (
        <AuthContext.Provider value={valueToShare}>
            {children}
        </AuthContext.Provider>
    );
};
