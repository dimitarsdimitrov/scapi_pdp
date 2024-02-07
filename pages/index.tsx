import React from 'react';
import Link from 'next/link';

export default function Page() {
    return (
        <div>
            <Link href="/list">
                List Product 
            </Link>
        </div>
    );
  }