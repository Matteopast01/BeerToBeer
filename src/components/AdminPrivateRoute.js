import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";
import useAsync from "../hooks/useAsync";


export const AdminPrivateRoute = () => {
    const {currentUser} = useContext(AuthContext);

    const role = useAsync(async ()=> {
        if(currentUser != null) {
            return currentUser.role
        }
    })

    if(currentUser != null){
        return ({role} ? <Outlet />  : <Navigate to="/" />);

    }
    else {
        return (<Navigate to="/login"/>);
    }
};


