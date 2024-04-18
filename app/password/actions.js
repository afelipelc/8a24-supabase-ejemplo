"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function changePassword(passwd, confirmPwd) {
  let errorsList = {};

  if(!passwd) {
    errorsList.name = "La contraseña es obligatoria.";
  }else if (passwd.length < 6){
    errorsList.passwd = "La contraseña debe tener al menos 6 carácteres."
  }

  if(!confirmPwd) {
    errorsList.confirmPwd = "Confirmar contraseña es obligatorio.";
  } else  if (passwd && passwd != confirmPwd) {
    errorsList.confirmPwd = "La contraseña y confirmar contraseña no coinciden."
  }

  if ( Object.keys(errorsList).length > 0 ) {
    return {
      success: false,
      message: 'Ingresar los datos correctamente.',
      errors: errorsList,
    };
  }

  // pasar a guardar la contraseña
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const result = await supabase.auth.updateUser({ password: passwd });

  if (result.error) {
    console.log(error);
    return {
      success: false,
      message: `No se pudo actualizar la contraseña. ${error.message}`,
      errors: [],
    };
  }

  return {
    success: true,
    message: "La contraseña ha sido actualizada.",
    errors: [],
  }
}