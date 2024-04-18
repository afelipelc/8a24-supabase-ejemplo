"use client"
// vista para mostrar notas

import { useEffect, useState } from "react";
import { getNotes, searchNotes } from './actions';

export default function Page() {
  const [notes, setNotes] = useState(null);
  
  const [search, setSearch] = useState('');

  function handleSearch(e) {
    e.preventDefault(); // impedir que se envíe el form
    // para poder ejecuta una función sin recargargar la página
    const getData = async () => {
      
      const notesResult = await searchNotes(search);
      setNotes(notesResult.notes);
      // falta mostrar la info del error en caso de que se tenga
      //   notesResult.error
      if (notesResult.error) {
        alert(notesResult.error.message);
      }
    }

    getData();
  }

  // al cargar la lista, leer la lista de notas o mostrar error si ocurre
  useEffect(() => {
    const getData = async () => {
      const notesResult = await getNotes();
      setNotes(notesResult.notes);
      // falta mostrar la info del error en caso de que se tenga
      //   notesResult.error
      if (notesResult.error) {
        alert(notesResult.error.message);
      }
    }
    getData();
  }, []);

  return (
    <div className='my-6'>
      <h1 className='text-center text-lg font-bold text-sky-800 mb-4'>Mis Notas</h1>
      
      <form
        className='mb-4'
        onSubmit={handleSearch}
      >
        <input 
          type='text'
          placeholder='Buscar...'
          className='border rounded px-2'
          defaultValue={search}
          onChange={(e) => {
            setSearch(e.target.value); // tomar el valor ingresado, y guardarlo en search
          }}
        />
        <button
          type='submit'
          className='rounded bg-blue-300 px-2 ml-3'
        >
          Buscar
        </button>
      </form>

      {!notes || notes?.length == 0 
        ? <p>Ninguna nota para mostrar.</p> 
        : null
      }

      <ul>
        {notes?.map((note) => (
          <li
            key={note.id} 
            className='border rounded mb-2 p-2'
          >
            {note.note}
          </li>
        ))}
      </ul>
    </div>
  );
}