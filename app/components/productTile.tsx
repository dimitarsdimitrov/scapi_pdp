
import React from 'react';

interface Product  {
   id: string;
   title: string;
   name: string;
};

const ProductTile = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    'cache': 'no-store'
  });
  const products: Product[] = await res.json(); 
   try {


  } catch(e) {
    console.log(e);
  }

  return (
    <>
      <h1>Product</h1>
      <ul>{products.map(product => <li key={product.id}>{product.id}, {product.name}</li>)}</ul>
    </>
    )
}

export default ProductTile