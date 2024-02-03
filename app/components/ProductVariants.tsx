"use client";
import React from 'react'
import { redirect } from 'next/navigation';
import { useRouter } from "next/router";

export const ProductVariants = ({variants }) => {

    const router = useRouter();

    function onClickProductSize(size) {
        const variantItem = variants.filter(function(v) { return size === v.variationValues.size });
        if (variantItem) {
            var productId = variantItem[0].productId;
            document.location.href = 'product?pid=' + productId;
            router.push( 'product?pid=' + productId);
        }

        return false;
    }

  return (
        <div className="space-x-2 flex text-sm">
            {variants && variants.map(variant => 
                <label key={variant}>
                    <input className="sr-only peer" name="size" type="radio" value={variant.variationValues.size} />
                    <button
                        onClick={() => onClickProductSize(variant.variationValues.size) }
                        className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900">{variant.variationValues.size}
                    </button>
            </label>
            )}
        </div>
  )
}
