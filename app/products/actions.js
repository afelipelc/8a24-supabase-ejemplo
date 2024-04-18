"use server"

// archivo de acciones para: notas

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

function supabaseClient() {
  const cookieStore = cookies();
  return createClient(cookieStore);
}


// función para leer un producto por id
export async function getProduct(id) {
  const supabase = supabaseClient();

  const { data, error} = await supabase
  .from('products')
  .select()
  .eq('id', id)
  .single();

  return({
    product: data,
    error,
  });
}