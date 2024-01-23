import { useEffect, useState, createContext } from "react";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {get_docs_by_attribute, store_doc} from "../services/persistence_manager"
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const auth = getAuth();

    const handleSignUp = async function (email, password,name, navigate) {
        const registeredUser = {}
        registeredUser["username"] = name
        registeredUser["role"] = false
        registeredUser["link_img"] = ""


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
                navigate("/");
                console.log("chiamata handleLogout")
            })
            .catch((error) => {
                // An error happened.
            });
    }

    const handleAuthChanged = function () {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            
            if (user !== null) {
                console.log("ciao")
                const result = await get_docs_by_attribute(user.uid, "User", "uid")
                const Modifieduser = {
                    ...user,
                    role: result[0].role
                };
                setCurrentUser(Modifieduser);
                setPending(false);
               
            }
            else {
                setCurrentUser(user);
                setPending(false)
            }
        });


    }

    useEffect(() => {
        handleAuthChanged();
        console.log("chiamata useEffect")
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
