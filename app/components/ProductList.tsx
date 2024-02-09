
import React from 'react';
import { ProductHits } from "../../interfaces";
import Image from 'next/image';
import Link from 'next/link';
import style from './ProductList.module.css';


const ProductList = ({productItems, sort}: {productItems:ProductHits, sort: string}) => {
    const sortingOptions = productItems.sortingOptions;
    const productHits = productItems.hits;
    const refinements = productItems.refinements;
    const selectedSort = "font-medium text-gray-900 block px-4 py-2 text-sm";
    const unselectedSort = "text-gray-500 block px-4 py-2 text-sm";

    return (
        <div className="bg-white">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    {/* refinements start */}
                    <div className={`flex items-center`} >
                            <div className="relative inline-block text-left">
                        
                                <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                                    <div className="py-1" role="none">
                                        {refinements && refinements.map((refinement, index) =>
                                            <a href={`attributeId:${refinement.attributeId}`} key={index}  className="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" id={`menu-item-${index}`} >{refinement.label}</a>
                                         )}
                                    </div>
                                </div>
                            </div> 
                    </div>
                    {/* refinements end */}

                    {/* Products start */}
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {productHits && productHits.map((productItem) =>
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
                    {/* Products end */}

                    {/* Sort start */}
                    <div className={`flex items-center ${style.sortOpt}`} >
                        <div className="relative inline-block text-left">
                            <div>
                                <button type="button" className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                                    Sort
                                    <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                                <div className="py-1" role="none">
                                    {sortingOptions && sortingOptions.map((sortOpt, index) => 
                                        <a href={`/?sort=${encodeURIComponent(sortOpt.id)}`} key={index}  className="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" id={`menu-item-${index}`} >{sortOpt.label}</a>
                                    )}
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* Sort end */}

                </div>
            </main>
        </div>

      )
}

export default ProductList
