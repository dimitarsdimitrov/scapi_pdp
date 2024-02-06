var CryptoJS = require("crypto-js");

import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
type WordArray = CryptoJS.lib.WordArray;


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

    static base64URL_s(string: string) {
         return string.toString().replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');;
    }


    static base64URL_w(wordArray: WordArray) {
        return Base64.stringify(wordArray).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    }
 
    static generateCodeChallenge(code_verifier:string) {
        return CryptoJS.SHA256(code_verifier);
    }
};


export default Helper;