import ProductItemTile from "../app/components/ProductItemTile";
import Authorize from '../app/Authorize';
import Helper from "../app/Helper";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Layout from '../app/layout';
import { Product, ProductRes }  from "../interfaces";
import React, { ReactNode } from 'react';

async function doAuthorize() {
    var authorize = new Authorize();
    const authParam = await authorize.getAuth();
    process.env.Authorization = await authorize.getToken(authParam);
    const AuthorizationToken = process.env.Authorization;

    return AuthorizationToken;
}

async function fetchProduct(productURL: string, AuthorizationToken: string) {
   const res = await fetch(productURL, {
      'headers': {
        Authorization: AuthorizationToken
      },
      'cache': 'no-store'
    });

    const productJSON: ProductRes = await res.json();
    console.log(productJSON);

    return productJSON.data[0];
}

export const getServerSideProps = (async (context) => {
  var pid = '';
  var index = 0;
  if (context && context.query && context.query.pid) {
      pid = context.query.pid.toString();
  }

  if (context && context.query && context.query.index) {
     index = (context.query.index instanceof Array) ? parseInt(context.query.index[0],10) : parseInt(context.query.index);
  }

  const authorizationToken = await doAuthorize();
  var productURL = Helper.buildProductURL(pid.toString());
  var productJSON = await fetchProduct(productURL, authorizationToken);

  return { props: { productJSON, index } };

}) satisfies GetServerSideProps<{ productJSON: Product, index:number }>

export default function Page({
  productJSON, index
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
      <main className="font-sans antialiased text-gray-600 min-h-full flex flex-col">
        <header></header>
          <div className="relative mx-auto mt-20 w-full max-w-container px-4 sm:px-6 lg:px-8">
              <ProductItemTile productJSON={productJSON} index={index} />
          </div>
        <footer></footer>
      </main>
  )
}

Page.getLayout = function getLayout(page:ReactNode) {
  return (
    <Layout>
        {page}
    </Layout>
  )
}




 