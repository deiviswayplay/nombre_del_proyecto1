"use client";

import { useState } from "react";
import { createClient } from "../utls/supabase/client";

export default function  LoginForm() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const login = async () => {
        try {
            const supabase = createClient();
            const { data, error } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: user.password,
            });
            if (error) throw error;
            if (data) {
                alert("Inicio de sesión exitoso");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            login();
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
            <button>Iniciar sesión</button>
        </form>
    )

    
    
    }