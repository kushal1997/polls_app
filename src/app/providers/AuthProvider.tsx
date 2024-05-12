import { createContext, useContext } from "react";
import React, { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabsee";
import { Alert } from "react-native";
import { Poll } from "../../types/db";

  
  type AuthContext = {
    session: Session | null;
    user: User | null;
    polls: Poll[];
    fetchPolls: () => Promise<void>;
  };
  
  const AuthContext = createContext<AuthContext>({
    session: null,
    user: null,
    polls: [],
    fetchPolls: async () => {}, // Empty async function as default
  });
  
export default function AuthProvider({ children }) {
  const [session, setSession] = useState<Session | null>(null);
  const [polls, setPolls] = useState<Poll[]>([]);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const fetchPolls = async (): Promise<void> => {
    try {
      const { data, error } = await supabase.from("polls").select("*");
  
      if (error) {
        throw new Error("Error fetching data");
      }
  
      if (data) {
        setPolls(data);
      }
    } catch (error) {
      Alert.alert("Error fetching data");
    }
  };
  
  return (
    <AuthContext.Provider value={{ session, user: session?.user, polls,fetchPolls}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
