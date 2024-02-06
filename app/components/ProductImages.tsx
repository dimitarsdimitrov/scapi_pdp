"use client";
import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SFCCImageGroups }   from "../../interfaces";
import Image from 'next/image';

const debug = process.env.debug;

export const ProductImages = ({ImageGroups}:{ImageGroups:SFCCImageGroups}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams() || '';
    const location = pathname + '?' + searchParams;

    const handleClick = (e: React.ChangeEvent<any>) => {
        var index = e.target.dataset.index;
        e.preventDefault();
         const currentSearchParams = new URLSearchParams(searchParams);
        if (currentSearchParams.has("index")) {
            currentSearchParams.set("index", index);
            router.push(pathname + '?' + currentSearchParams.toString());
        } else {
            var newLocation = location + '&index=' + index;
            router.push(newLocation);
        }

        return false;
    }

  return (
     <>
      {ImageGroups && ImageGroups.images.map((item, index) => 
        <div className="p-2"  key={item.title}>
            <div className="black border border-blue-100">
                <Image width={195} height={300} src={item.disBaseLink} alt={item.title}  onClick={handleClick}  data-index={index} />
            </div>
        </div>
        )}
     </>
    )
}
