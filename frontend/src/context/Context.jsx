import { createContext, useState } from "react";


const isLoggedInLocal = localStorage.getItem("isLoggedIn")
export const CounterContext =createContext()


export const CounterProvider =({children})=>{

    const[count,setCount]=useState(0)
    const[isLoggedIn,setIsLoggedIn] = useState(isLoggedInLocal ==="true"?true:false)

    function login(){
        localStorage.setItem("isLoggedIn","true")
        setIsLoggedIn(true)
    }

    function logout(){        
        localStorage.clear()
        setIsLoggedIn(false)
    }


    return(
        <CounterContext.Provider value={{count,setCount,isLoggedIn,login,logout}}>
            {children}
        </CounterContext.Provider>
    )
}