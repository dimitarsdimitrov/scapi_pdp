
import React from 'react';
import { ProductHits }  from "../../interfaces";
import Image from 'next/image';
import Link from 'next/link';

const ProductList = ({productItems}: {productItems:ProductHits}) => {

    return (
        <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productItems && productItems.hits.map((productItem) =>
                <Link  href={`/product?pid=${encodeURIComponent(productItem.productId)}`} className="group" key={productItem.productId}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <Image src={productItem.image.link}  width={195}  height={295} alt={productItem.image.title}
                             className="h-full w-full object-cover object-center group-hover:opacity-75"></Image>
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{productItem.productName}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">${productItem.price.toFixed(2)}</p>
                </Link>
            )}
            </div>
        </div>
        </div>
      )
}

export default ProductList
