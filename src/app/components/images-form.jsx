"use client";

import { useState } from "react";
import { createClient } from "../utls/supabase/client";

export default function ImagesForm() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    try {
      if (!file) {
        alert("Selecciona una imagen");
        return;
      }

      const supabase = createClient();

      const fileName = `${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file);

      if (error) throw error;

      alert("Imagen subida correctamente");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
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
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button>Subir</button>
    </form>
  );
}