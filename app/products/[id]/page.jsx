"use client"

import { useEffect, useState } from "react";
import { getProduct } from "../actions";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function Page({ params }) {
  const [product, setProduct] = useState({});

  // la vista
  useEffect(() => {
    const loadProduct = async () => {
      // cargar los datos de la nota
      const productResult = await getProduct(params.id);

      // pasar los datos de la nota al estado product
      setProduct(productResult.product);
      
      if (productResult.error) {
        alert(productResult.error.message);
      }
    };

    loadProduct();
  }, []);


  return (
    <div>
      <p>Acá los detalles del producto</p>
      {product?.gallery?.map((item) => <p>{item.original}</p>)}
      {!!product ? (
        <div className="max-w-[500px]">
          <ImageGallery 
            items={product?.gallery || []} 
          />
        </div>
      ) : null}
      
    </div>
  );
}
