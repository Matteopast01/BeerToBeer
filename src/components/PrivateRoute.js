import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";
import Homepage from "../pages/Homepage";

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext);
    const ProvideRoute = function (){

        if (!!currentUser){
            return (<RouteComponent { ...rest }/>)
        }
        else{
            return <Navigate to={"/"} />
        }




    }
    return (
       ProvideRoute()
    );
};

