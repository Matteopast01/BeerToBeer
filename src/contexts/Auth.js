import { useEffect, useState, createContext } from "react";
import auth from "../services/firebase/conf-firebase";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    const handleLogin = function (){

    }
     const handleLogout = function (){


     }
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if(pending){
        return <>Loading...</>
    }

    const valueToShare = {
        currentUser,
        handleLogin,
        handleLogout
    }

    return (
        <AuthContext.Provider value={valueToShare}>
            {children}
        </AuthContext.Provider>
    );
};