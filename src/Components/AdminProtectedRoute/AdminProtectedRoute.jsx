import React from "react";
import { Navigate } from "react-router-dom";
function AdminProtectedRoute(props) {
    if(localStorage.getItem('orgAdminToken') !== null)
        {
            return props.children
        }
    else
    {
        return <Navigate to={'/'} />
    }
}

export default AdminProtectedRoute;