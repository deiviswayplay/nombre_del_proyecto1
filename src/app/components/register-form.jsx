"use client";

import { useState } from "react";
import { createClient } from "../utls/supabase/client";
import Styles from "./registre-form.module.css";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();
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
                router.push("/login");
        }
    } catch (error) {
        console.error(error);
    }
    }
    
    return (
        <div className="abuelo">
        <div className={Styles.background}>
        <form className={Styles.form} onSubmit={(e) => {
            e.preventDefault();
            registar();
        }}
     
        >
            <div className={Styles.container}>
            <h2>Registro</h2>
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
            </div>
        </form> </div></div> 
    )
}