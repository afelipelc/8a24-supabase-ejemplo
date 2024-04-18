"use client"

import { useState } from "react";

// formulario para cambiar contraseña
// solo tiene acceso si se está auntenticado

// componente cliente
/// -- estado para: contraseña, confirmar contraseña
/// * validar que la contraseña tenga longitud mínima: 6 carácteres
/// *  que la contraseña y confirmar contraseña sean iguales
///  -- mandar  actualizar la contraseña desde una función por el lado del servidor.
import { changePassword  } from './actions';

export default function ChangePassword() {

  // estados para los inputs
  const [passwd, setPasswd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const [errors, setErrors] = useState({});

  function onSave(form) {
    // evitar el submit
    form.preventDefault();

    // objeto temporal para almacenar los errores
    let errorsList = {};

    // validar name
    if(!passwd) {
      errorsList.passwd = "La contraseña es obligatoria.";
    } else if (passwd.length < 6){
      errorsList.passwd = "La contraseña debe tener al menos 6 carácteres."
    }

    if(!confirmPwd) {
      errorsList.confirmPwd = "Confirmar contraseña es obligatorio.";
    } else  if (passwd && passwd != confirmPwd) {
      errorsList.confirmPwd = "La contraseña y confirmar contraseña no coinciden."
    }

    setErrors({ ...errorsList });

    if ( Object.keys(errorsList).length > 0 ) {
      return;
    }


    changePassword(passwd, confirmPwd)
    .then((result) => {
      // cuando la acción se ejecute correctamente
      // y retorne una respuesta
      console.log(result);
      
      alert(result.message);
      if (!result.success) {
        setErrors({ ...result.errors });
      } else {
        // limpiar el form
        setPasswd('');
        setConfirmPwd('');
        // limpiar errores
        setErrors({});
      }

    })
    .catch((error) => {
      alert(error.message);
    });
  }

  return(
    <div className="mt-8" onSubmit={onSave}>
      <form method="POST">
        <div className="mb-3 flex flex-col">
          <label htmlFor="name">Contraseña*</label>
          <input 
            type="password"
            name="passwd"
            className="border rounded p-2 text-black-700"
            value={passwd}
            onChange={(e) => {
              setPasswd(e.target.value);
              setErrors({
                ...errors,
                passwd: undefined,
              });
            }}
          />
          <p className="text-red-600">{errors.passwd || ''}</p>
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="confirmPwd">Cofirmar contraseña*</label>
          <input 
            type="password"
            name="confirmPwd"
            className="border rounded p-2 text-black-700"
            value={confirmPwd}
            onChange={(e) => {
              setConfirmPwd(e.target.value);
              setErrors({
                ...errors,
                confirmPwd: undefined,
              });
            }}
          />
          <p className="text-red-600">{errors.confirmPwd || ''}</p>
        </div>
        
        
        <div className="my-6 flex flex-col">
          <button
            type="submit"
            className="bg-sky-800 text-gray-100 p-2 rounded-md border hover:bg-blue-900"
          >Cambiar mi contraseña</button>
        </div>
      </form>
    </div>
  )
}