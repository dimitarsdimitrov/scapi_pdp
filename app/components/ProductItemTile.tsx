
import React, { use } from 'react';
import style from './ProductItemTile.module.css';
import { ProductVariants } from './ProductVariants';
import { ProductImages } from './ProductImages';
import { Product } from "../../interfaces";
import Image from 'next/image';

const debug = process.env.debug;

const ProductItemTile = ({productJSON, index}:{productJSON:Product, index: number}) => {
    const productItem = productJSON;
    const imageGroups = productItem.imageGroups;
    const imageLink = productItem.imageGroups[0].images[index].link;
    const variants = productItem.variants;

    return (
      <main className="flex font-sans">
            <div className="flex-none w-48 relative">
              <Image  alt="alt"  src={imageLink}   width={395} height={295} className="absolute inset-0 w-full h-full object-cover"  />
            </div>

            <div className="flex-none w-48 relative">
                  <ProductImages ImageGroups={imageGroups[0]} />
            </div>

            <form className="flex-auto p-6">
              <div className="flex flex-wrap">
                <h1 className="flex-auto text-lg font-semibold text-slate-900">
                  {productItem.name} ({JSON.stringify(productItem.variationValues)})
                </h1>
                <div className="text-lg font-semibold text-slate-500">
                   ${productItem.price.toFixed(2)} 
                </div>
                <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                  In stock
                </div>
              </div>
              <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                <div className="space-x-2 flex text-sm">
                    <ProductVariants variants={variants} />
                </div>
              </div>
              <div className="flex space-x-4 mb-6 text-sm font-medium">
                <div className="flex-auto flex space-x-4">
                  <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                    Buy now
                  </button>
                  <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                    Add to bag
                  </button>
                </div>
                <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
                  <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-slate-700">
                  ${productItem.longDescription}
              </p>
            </form>
        </main>
      )
}

export default ProductItemTile