"use client";

import { useState } from "react";
import { createClient } from "../utls/supabase/client";
import Styles from "./login-form.module.css";

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
        
       <div className={Styles.background}>
        <form className={Styles.form} onSubmit={(e) => {
            e.preventDefault();
            login();
        }}
       
        >
        <div className={Styles.container}>
            <h2>Login</h2>
        
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
            </div>
        </form>
        </div>
         
        
    )

    
    
    }