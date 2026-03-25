"use client";
import Image from "next/image";
import Style from "./pageprincipal.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className={Style.header}>
        <Image
          src="/logo.png"
          alt="Logo de la aplicación"
          width={100}
          height={100}
        />
        <h1 className={Style.title}>Bienvenido a tu aplicación de tareas</h1>
      </div>
      <div className={Style.background}>
        <div className={Style.content}>
          <button
            className={Style.button}
            onClick={() => router.push("/login")}
          >
            Iniciar sesión
          </button>
          <p> O </p>
          <button
            className={Style.buttonSecondary}
            onClick={() => router.push("/registre")}
          >
            Registrarse
          </button>
          <p className={Style.subtitle}>
            Organiza tus tareas de manera eficiente y sencilla.
          </p>
        </div>
      </div>
    </>
  );
}
