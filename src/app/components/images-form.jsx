"use client";

import { createClient } from "../utls/supabase/client";

export function ImagesForm() {
const handleSubmit = (e) => {
    e.preventDefault(); 


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit}>
            <input type="file" name="image" accept="image/*" />
            <button type="submit">Subir Imagen</button>
        </form>
        </div>
    );

}
}