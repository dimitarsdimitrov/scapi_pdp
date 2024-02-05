var CryptoJS = require("crypto-js");
const base64url = require('base64url');

function toBinary(string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}


class Helper {

    static buildDomain() {
        const domain = process.env.domain;
        const shortCode = process.env.SFCC_SCAPI_SHORTCODE;
        const url = 'https://' + shortCode + '.' + domain;

        return url;
    }

    static buildProductURL(productID:string) {
        const siteId = process.env.siteId;
        const productURL = this.buildDomain() +  'products?ids='  + productID + '&siteId=' + siteId;
        return productURL;
    }

    static generateRandomString(length:number) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    static generateCodeVerifier() {
        return this.generateRandomString(96);
    }

    static base64URL(string: any) {
        return string.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
        return string.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    }

    static generateCodeChallenge(code_verifier:string) {
        return CryptoJS.SHA256(code_verifier);
    }
};


export default Helper;