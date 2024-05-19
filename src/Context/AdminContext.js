import { createContext, useState } from "react";

export let AdminContext = createContext();

export default function AdminContextProvider(props) {
    let [AdminToken,setAdminToken]=useState(null);
    let [AdminOrganizationId,setAdminOrganizationId]=useState(null);
    let [AdminName,setAdminName]=useState(null);

   
    return <AdminContext.Provider value={{AdminToken,setAdminToken,AdminOrganizationId,setAdminOrganizationId,AdminName,setAdminName}}>
        {props.children}
    </AdminContext.Provider>
}