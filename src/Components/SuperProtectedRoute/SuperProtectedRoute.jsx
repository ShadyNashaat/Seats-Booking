import React from "react";
import { Navigate } from "react-router-dom";
function SuperProtectedRoute(props) {
    if(localStorage.getItem('superAdminToken') !== null)
        {
            return props.children
        }
    else
    {
        return <Navigate to={'/'} />
    }

}

export default SuperProtectedRoute;