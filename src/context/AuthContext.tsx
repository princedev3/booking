"use client"
import React, { useState,createContext, useEffect, useContext  } from 'react'

type user ={
    id: number,
    email: string;
    names: string;
    active: boolean;
} |null
type users ={
    currentUser:user,
    setCurrentUser:(item:user)=>void
    updateUser:(item:user)=>void
}
export const AuthContextProvider = createContext<users|null>(null)
const AuthContext = ({children}:{children:React.ReactNode}) => {
    const [currentUser,setCurrentUser]=useState<user>(null)
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser)); 
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user"); 
        }
    }, [currentUser]);

    const updateUser = (user: user) => {
        setCurrentUser(user);
    };

  return (
    <AuthContextProvider.Provider value={{currentUser,setCurrentUser,updateUser}}>{children}</AuthContextProvider.Provider>
  )
}

export default AuthContext

export const RemoveNullContext = ()=>{
     const context = useContext(AuthContextProvider)
     if(context === null){
        throw new Error("context is null")
     }
     return context
}