"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

// backend

/**
 * Función para registrar un nuevo producto.
 * @param {*} product datos del producto
 */
export async function addProduct(product) {
  // validar los datos
  // objeto temporal para almacenar los errores
  let errorsList = {};

  // validar name
  if(!product.name) {
    errorsList.name = "El nombre es obligatorio.";
  }

  // validar description
  if(!product.description) {
    errorsList.description = "La descripción es obligatoria.";
  }

  if(!product.price) {
    errorsList.price = "El precio es obligatorio.";
  } else {
    if (!product.price.match("^[0-9]+$")) {
      errorsList.price = "El precio debe ser un número."
    }
  }

  if ( Object.keys(errorsList).length > 0 ) {
    return {
      success: false,
      message: 'Ingresar los datos correctamente.',
      errors: errorsList,
    };
  }

  // si no hay errores en los datos
  // mandar a insertar
  // manejar error al insertar
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
  .from('products')
  .insert([
    product,
  ])
  .select();

  // si hay error al insertar, retornar aviso al cliente
  if (error) {
    
    console.log(error);

    return {
      success: false,
      message: `Ocurrió un error al guardar el producto. 
        Error: ${error.message}`,
      errors: null,
    };
  }

  // si todo está OK, 
  return {
    success: true,
    message: 'El producto se ha registrado correctamente.',
    errors: null,
  };
}