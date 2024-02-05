var CryptoJS = require("crypto-js");
var aa = CryptoJS.enc.Base64;

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

    static base64URL(string:string) {
        return CryptoJS.enc.Base64.stringify(string.toString().replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'));
    }

    static generateCodeChallenge(code_verifier: string) {
        return CryptoJS.SHA256(code_verifier);
    }
};

/*

  
 /// authorizeURL = 'https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/authorize';

  var clientId =  "aeef000c-c4c6-4e7e-96db-a98ee36c6292";

  var searchParams = 
  {
    "redirect_uri": "http://localhost:3000/callback",
    "client_id": clientId,
    "response_type": "code",
    "hint": "guest",
    "code_challenge": challenge
  };

  //var redirectUri = 'http://localhost:3000/callback' + new URLSearchParams(searchParams);

  var authorizeURL = 'https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/authorize' 
  + new URLSearchParams(searchParams);
  authorizeURL = 'https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/authorize?redirect_uri=http://localhost:3000/callback&response_type=code&client_id=aeef000c-c4c6-4e7e-96db-a98ee36c6292&hint=guest&code_challenge=dWnJY1KrLJJu6clZgaUaW14WBvdfeQ0-GKJSG1DY9mo';
  
    console.log( challenge, authorizeURL );

  const authorizeRes = fetch(authorizeURL , {
      redirect: 'follow',
      cache: "no-cache",
      mode: 'cors',
      method: "GET",
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
         console.log("response.status Location :=", response.status);//.headers.get("location"));
         return response.blob();
    }) .then(data => {
      console.log('DATA BLOB', data);

      var oauth2TokenURL =  buildDomain() + '/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/token';

        const response = fetch(oauth2TokenURL, {
          method: "POST",
          cache: "no-cache",
          headers: {
              'code': '7YGxwW2bhJtfiMVtG9JP9RhUlD8_KvnvnJ1VZJeHNH0' ,
              'grant_type': "authorization_code_pkce",
              'redirect_uri': "http://localhost:3000/callback",
              'code_verifier' : challenge,
              'channel_id': 'RefArch',
              'client_id': clientId,
              'usid': '8fcc0e6c-07f6-4c9a-937e-b1b5f77de0cc'
          }
        }).then(response => response.json())
      .then(data => {
            console.log('data TOKEN', data);
        }) 
        .catch(error => console.error(error));
        

    });;


  return;


  
  return;


  const productURL = buildProductURL();

  var verifier = Helper.base64URL(Helper.generateCodeVerifier());
  var challenge = Helper.base64URL(Helper.generateCodeChallenge(verifier));
  var clientId =  "aeef000c-c4c6-4e7e-96db-a98ee36c6292";

  var searchParams = 
  {
    "redirect_uri": "http://localhost:3000/callback",
    "response_type": "code",
    "client_id": clientId,
    "hint": "guest",
    "code_challenge": challenge
  };

  var authorizeURL = 'https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/authorize?' 
  + new URLSearchParams(searchParams);

  var AuthorizationToken = null;

  const authorizeRes = fetch(authorizeURL , {
      method: "GET",  // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin,
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      redirect: "manual",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
         const locationHeader = response.headers.get("location");
         console.log("Location header", locationHeader);
         return locationHeader;
    }).then((data) => {
      if (data) {
        var urlPrams = data.split('?')[1];
        const params = new URLSearchParams(urlPrams);
        const code = params.get('code');
        const usid = params.get('usid');


        var oauth2TokenURL =  'https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/token';

        const postParams = new URLSearchParams();

        postParams.append("code", code);
        postParams.append("grant_type", "authorization_code_pkce");
        postParams.append("redirect_uri", "http://localhost:3000/callback");
        postParams.append("code_verifier", verifier);
        postParams.append("channel_id", "RefArch");
        postParams.append("client_id", clientId);
        postParams.append("usid", usid);

        const response = fetch(oauth2TokenURL, {
          mode: "cors", // no-cors, *cors, same-origin,
          redirect: "manual",
          method: "POST",
          cache: "no-cache",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: postParams
        }).then(response => response.json())
       .then(data => {
            console.log('JSON', data);

            AuthorizationToken = data.access_token;

            console.log(AuthorizationToken);
        }) 
        .catch(error => console.error(error));

      }




    });




    
  */

export default Helper;