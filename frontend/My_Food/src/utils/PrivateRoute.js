import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children})=>{
    const accessToken = localStorage.getItem('accessToken');

    return accessToken ? Children : <Navigate to='/login'/>
}

export default PrivateRoute;