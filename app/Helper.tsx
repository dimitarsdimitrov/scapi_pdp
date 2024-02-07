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

    static buildProductListURL(catId:string) {
        const siteId = process.env.siteId;
        const productURL = this.buildDomain() + '/search/shopper-search/v1/organizations/f_ecom_zzrl_059/product-search?q=' + catId + '&siteId=' + siteId + '&expand=prices,images';
        return productURL;
    }

    static buildProductURL(productID:string) {
        const siteId = process.env.siteId;
        const productURL = this.buildDomain() + '/product/shopper-products/v1/organizations/f_ecom_zzrl_059/products?ids=' + productID + '&siteId=' + siteId;
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
         var res = string.toString().replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
         return res;
    }

    static base64URL_w(wordArray: WordArray) {
        var res = Base64.stringify(wordArray).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
        return res;
    }
 
    static generateCodeChallenge(code_verifier:string) {
        return CryptoJS.SHA256(code_verifier);
    }
};


export default Helper;