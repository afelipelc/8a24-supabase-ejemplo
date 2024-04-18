"use client"

import { useEffect, useState } from "react";
import { getNote } from "../../actions";

export default function Page({ params }) {
  const [note, setNote] = useState({});

  // leer la nota desde la bd al cargar
  // la vista
  useEffect(() => {
    const loadNote = async () => {
      // cargar los datos de la nota
      const noteResult = await getNote(params.id);

      // pasar los datos de la nota al estado note
      setNote(noteResult.note);
      
      if (noteResult.error) {
        alert(noteResult.error.message);
      }
    };

    loadNote();
  }, []);

  // función para guardar para mandar a guardar o actualizar
  // la nota

  // formulario para editar la nota
  return (
    <form>
      <input 
        defaultValue={''}
        value={note?.note || ''}
      />
    </form>
  );
}
