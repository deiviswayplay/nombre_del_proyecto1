"use client";

import { useState } from "react";
import { createClient } from "../utls/supabase/client";


export default function ImagesForm() {
  const [file, setFile] = useState(null);
  //el estado file se utiliza para almacenar el archivo 

  // Función para subir la imagen a Supabase Storage
  const handleUpload = async () => {
    try {
      if (!file) {
        alert("Selecciona una imagen");
        return;
      }

      const supabase = createClient();

      // Obtener el usuario logueado 
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        alert("Debes iniciar sesión para subir una imagen");
        return;
      }

      // Crear ruta única usando el ID del usuario + timestamp + nombre
      const filePath = `${user.id}/${Date.now()}-${file.name}`;

      // Subir la imagen a Supabase Storage
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      alert("Imagen subida correctamente");
      console.log("Datos de la subida:", data);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert(error.message || "Error desconocido al subir la imagen");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpload();
      }}
      className="flex flex-col"
    >
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button type="submit">Subir</button>
    </form>
  );
}

