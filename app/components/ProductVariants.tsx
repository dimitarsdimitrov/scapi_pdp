"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { SFCCvariants } from "../../interfaces" ;

export const ProductVariants = ({variants}:{variants:[SFCCvariants]}) => {
    const router = useRouter();

    const handleClick = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        var size = e.target.dataset.value;
        const variantItem = variants.filter(function(v) { return size === v.variationValues.size });
        if (variantItem) {
            var productId = variantItem[0].productId;
            const selectedProduct = '/product?pid=' + productId;
            router.push(selectedProduct);
        }

        return false;
   }

   return (
        <div className="space-x-2 flex text-sm">
            {variants && variants.map(variant => 
                <label key={variant.productId}>
                    <input className="sr-only peer" name="size" type="radio" value={variant.variationValues.size} />
                    <button  data-value={variant.variationValues.size} 
                        onClick={handleClick}
                        className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900">{variant.variationValues.size}
                    </button>
            </label>
            )}
        </div>
   )
}
