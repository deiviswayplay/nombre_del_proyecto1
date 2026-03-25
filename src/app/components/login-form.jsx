"use client";

import { useState } from "react";
import { createClient } from "../utls/supabase/client";
import Styles from "./login-form.module.css";
import { useRouter } from "next/navigation";
import CustomInput from "./custom-input";

export default function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    if (!user.email || !user.password) {
      alert("Por favor, ingresa tu email y contraseña");
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) throw error;
      if (data) {
        alert("Inicio de sesión exitoso");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión: " + error.message);
    }
  };
  return (
    <div className={Styles.background}>
      <form
        className={Styles.form}
        onSubmit={(e) => {
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
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <CustomInput
          placeholder={"Ingresa tu contraseña"}
            secure
            onChange={(value) => setUser({ ...user, password: value })}
          />

          <button>Iniciar sesión</button>
          <p>
            No tienes cuenta?{" "}
            <button
              className={Styles.buttonn}
              type="button"
              onClick={() => router.push("/registre")}
            >
              Registrarse ahora
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
