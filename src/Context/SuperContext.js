import { createContext, useState } from "react";

export let SuperContext = createContext();

export default function SuperContextProvider(props) {
    let [superToken,setSuperToken]=useState(null);
    let [superName,setsuperName]=useState(null);

   
    return <SuperContext.Provider value={{superToken,setSuperToken,setsuperName,superName}}>
        {props.children}
    </SuperContext.Provider>
}