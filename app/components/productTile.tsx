
//"use client";
import React from 'react';
var CryptoJS = require("crypto-js");

interface Product {
    id: string;
    brand: string;
    currency: string;
};

interface ProductRes {
    limit: number;
    data: Product[];
};

function generateRandomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function generateCodeVerifier() {
  return generateRandomString(96);
}

function generateCodeChallenge(code_verifier) {
  return CryptoJS.SHA256(code_verifier);
}

function base64URL(string) {
  return string.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

const productID = 'ASP-Milk-009';
const domain = process.env.domain;
const siteId = process.env.siteId;
const SFCC_SCAPI_TENANTID =  process.env.SFCC_SCAPI_TENANTID;

function buildDomain() {
    const domain = process.env.domain;
    const shortCode = process.env.SFCC_SCAPI_SHORTCODE;
    const url = 'https://' + shortCode + '.' + domain;

    return url;
}

function buildProductURL() {
    const productURL = buildDomain() +  'products?ids='  + productID + '&siteId=' + siteId;
    return productURL;
}


var authorizeURL = buildDomain() + '/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/authorize?redirect_uri=`http://localhost:3000/callback&response_type=code&client_id=aeef000c-c4c6-4e7e-96db-a98ee36c6292&hint=guest&code_challenge=TCPh5VMsjmw1iUwMYa_Yxpp7gHVNhBddsYARWdKQLYg`';
const oauth2TokenURL =  buildDomain() + '/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/token';




const ProductTile = async () => {
  const AuthorizationToken = process.env.Authorization;
  const productURL = buildProductURL();

  authorizeURL = 'https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/authorize';


  var verifier = base64URL(generateCodeVerifier());
  var challenge = base64URL(generateCodeChallenge(verifier));



  var searchParams = 
  {
    "redirect_uri": "http://localhost:3000/callback",
    "client_id": "aeef000c-c4c6-4e7e-96db-a98ee36c6292",
    "response_type": "code",
    "hint": "guest",
    "code_challenge": challenge
  };

  const authorizeRes = await fetch('https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/authorize?' +  new URLSearchParams(searchParams)   , {
      cache: "no-cache",
      method: "GET"
  }).then((response) => {
        ///console.log("response.authorizeRes.status =",  response.status ); // response.status = 200
  }).then((myBlob) => {
  });

  return;
  fetch(oauth2TokenURL, {
    method: "POST",
    cache: "no-cache",
    headers: {
         'grant_type': "authorization_code_pkce",
        "redirect_uri": "http://localhost:3000/callback"
    }
   }).then((response) => {
    console.log("response.status222 =",  response.status); // response.status = 200
  });



 /// const authorizeResJSON = await authorizeRes.json();
  //console.log(authorizeResJSON);



  const res = await fetch(productURL, {
    headers: {'Authorization': AuthorizationToken},
    'cache': 'no-store'
  });

  const productJSON: ProductRes[] = await res.json();
  const productList = productJSON.data;
  const productItem = productList[0];

// delete productItem.imageGroups;
//  delete productItem.inventory;
//  delete productItem.promotionId;

  // let arr = Object.keys(productItem).map(key => {
    ///console.log( key, productItem[key]);
  //  if (key !=='imageGroups' || key !== 'inventory' )
  //  return {key: key, value: productItem[key]}
 //});
  ///const k = Object.keys(productItem);
  //console.log(productItem.id);
  //const productItem = productJSON.map(product => product.data);
  //   <ul>{productItem.map(item => <li key={product.id}>{product.id}, {product.name}</li>)}</ul>
  //console.log('zzz', k);
// {k.forEach(key => <li key={key} >{productItem[key]}</li>)}

  return (
    <>
      <h1>Product</h1>
      <ul>
          <li>ID: {productItem.id}</li>
          <li>Name: {productItem.name}</li>
          <li>Brand: {productItem.brand}</li>
      </ul>
    </>
    )
}

export default ProductTile