"use client"
import { useState } from "react";
import { addProduct  } from './actions';

export default function AddProduct() {
  // formulario para agregar producto
  // nombre, descripcion, precio
  // todos son obligatorios

  // estados para los inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // estado donde conservar los mensajes de error
  const [errors, setErrors] = useState({});

  /*
  cuando haya errores:

  errors = {
    name: "Nombre es obligatorio.",
    description: "Descripción es obligatorio.",
  }
  */

  function onSave(form) {
    // evitar el submit
    form.preventDefault();

    // validar los campos obligatorio
    // - name
    // - description
    // - price

    // objeto temporal para almacenar los errores
    let errorsList = {};

    // validar name
    if(!name) {
      errorsList.name = "El nombre es obligatorio.";
    }

    // validar description
    if(!description) {
      errorsList.description = "La descripción es obligatoria.";
    }

    if(!price) {
      errorsList.price = "El precio es obligatorio.";
    } /*else {
      if (!price.match("^[0-9]+$")) {
        errorsList.price = "El precio debe ser un número."
      }
    }*/

    // pasar la lista de errores al estado
    setErrors({ ...errorsList });

    //console.log(Object.keys(errors).length);
    // si hay mensajes de error, interrumpir el flujo
    if ( Object.keys(errorsList).length > 0 ) {
      return;
    }

    //alert("Se guardan los datos");
    // mandar a guardar el producto
    addProduct({
      name,
      description,
      price,
    })
    .then((result) => {
      // cuando la acción se ejecute correctamente
      // y retorne una respuesta
      console.log(result);

      // hacer algo con el resultado
      if (!result.success) {
        // hay errores
        alert(result.message);
        // mostrar los mensajes de error
        setErrors({ ...result.errors });
      } else {
        // Si se guardó
        // ????
        alert(result.message);
        // limpiar el form
        setName('');
        setDescription('');
        setPrice('');
        // limpiar errores
        // setErrors({});
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
          <label htmlFor="name">Nombre*</label>
          <input 
            type="text"
            name="name"
            className="border rounded p-2 text-black-700"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({
                ...errors,
                name: undefined,
              });
            }}
          />
          <p className="text-red-600">{errors.name || ''}</p>
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="description">Descripción*</label>
          <input 
            type="text"
            name="description"
            className="border rounded p-2 text-black-700"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({
                ...errors,
                description: undefined,
              });
            }}
          />
          <p className="text-red-600">{errors.description || ''}</p>
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="price">Precio*</label>
          <input 
            type="text"
            name="price"
            className="border rounded p-2 text-black-700"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setErrors({
                ...errors,
                price: undefined,
              });
            }}
          />
          <p className="text-red-600">{errors.price || ''}</p>
        </div>
        
        <div className="my-6 flex flex-col">
          <button
            type="submit"
            className="bg-sky-800 text-gray-100 p-2 rounded-md border hover:bg-blue-900"
          >Registrar Producto</button>
        </div>
      </form>
    </div>
  )
}