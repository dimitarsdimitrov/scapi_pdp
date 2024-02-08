import ProductList from "../app/components/ProductList";
import Authorize from '../app/Authorize';
import Helper from "../app/Helper";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Layout from '../app/layout';
import { ProductHits }  from "../interfaces";
import React, { ReactNode } from 'react';

async function doAuthorize() {
    var authorize = new Authorize();
    const authParam = await authorize.getAuth();
    process.env.Authorization = await authorize.getToken(authParam);
    const AuthorizationToken = process.env.Authorization;

    return AuthorizationToken;
}

async function fetchProductList(productListURL: string, AuthorizationToken: string) {
    const res = await fetch(productListURL, {
         'headers': {
             Authorization: AuthorizationToken
         },
         'cache': 'no-store'
     });
 
     const productItems = await res.json();
     return productItems;
 }
 
 export const getServerSideProps = (async (context) => {

   const productListURL = Helper.buildProductListURL('shirt');
   const authorizationToken = await doAuthorize();
   const productItems = await fetchProductList(productListURL, authorizationToken);

 
   return {
       props: {
           productItems
       }
   };
 
 }) satisfies GetServerSideProps<{ productItems: ProductHits}>

 export default function Page({
    productItems
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
        <div className="relative mx-auto mt-20 w-full max-w-container px-4 sm:px-6 lg:px-8">
            <ProductList productItems={productItems} />
        </div>
    </Layout>
    )
}

Page.getLayout = function getLayout(page:ReactNode) {
  return (
    <Layout>
        {page}
    </Layout>
  )
}