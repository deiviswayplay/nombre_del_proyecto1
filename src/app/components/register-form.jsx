"use client";

import { useState } from "react";
import { createClient } from "../utls/supabase/client";

export default function RegisterForm() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const registar = async () => {
    try {
        const supabese = createClient();
        const { data, error } = await supabese.auth.signUp({
            email: user.email,
            password: user.password,
        });
        if (error) throw error;
        if (data) {
            alert ("te registraste correctamente");
        }
    } catch (error) {
        console.error(error);
    }
    }
    
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            registar();
        }}
        className="flex flex-col"
        >

            <input 
                type="text" 
                placeholder="Ingresa tu email" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
            <input 
                type="password" 
                placeholder="Ingresa tu contraseña" 
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <button>Registrar</button>
        </form>
    )
}