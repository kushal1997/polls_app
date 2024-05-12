import { createContext, useContext } from "react";
import React,{useState,useEffect} from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from "../../lib/supabsee";

type AuthContext={
    session:Session | null;
    user:User | null;
}

const AuthContext = createContext<AuthContext>({
    session:null,
    user:null
});

export default function AuthProvider({ children }) {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])
  return <AuthContext.Provider value={{session,user:session?.user}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);