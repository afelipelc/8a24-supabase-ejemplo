"use client"
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

/*
export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Mis notas - Mi App",
  description: "Listado de notas del usuario",
};
*/

export default function Page() {

  const router = useRouter();

  const [notes, setNotes] = useState(null) 
  
  const supabase = createClient();

  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const getData = async () => {

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      }

      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  function handleSearch(e) {
    e.preventDefault(); // impedir que se envíe el form
    // para poder ejecuta una función sin recargargar la página

    console.log("buscar: ", search);

    const getData = async () => {
      const { data } = await supabase
        .from('notes')
        .select()
        .like('title', `%${search}%`); // '%some%'

      setNotes(data); // actualizar el estado: mostrar resultados
    }
    getData()

  }

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
