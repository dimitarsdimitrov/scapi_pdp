import Helper from './Helper';

var clientId =  "aeef000c-c4c6-4e7e-96db-a98ee36c6292";
var verifier = Helper.base64URL(Helper.generateCodeVerifier());
var challenge = Helper.base64URL(Helper.generateCodeChallenge(verifier));

class Authorize  {

    constructor() {
  
    }

    async getAuth() : any { 
            var params = {
              code: null,
              usid: null
            };

          //  var clientId =  "aeef000c-c4c6-4e7e-96db-a98ee36c6292";
            var searchParams = {
                "redirect_uri": "http://localhost:3000/callback",
                "response_type": "code",
                "client_id": clientId,
                "hint": "guest",
                "code_challenge": challenge
            };
          
            var authorizeURL = 'https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/authorize?' 
            + new URLSearchParams(searchParams);

            const authorizeRes = await fetch(authorizeURL , {
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
                  const searchParams = new URLSearchParams(urlPrams);
                  params.code = searchParams.get('code');
                  params.usid = searchParams.get('usid');
                }
              });

              return params;
     }

     async getToken(params) : any { 

          var code = params.code;
          var usid = params.usid;

          var AuthorizationToken = null;
          var oauth2TokenURL = 'https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/token';

          const postParams = new URLSearchParams();
          postParams.append("code", code);
          postParams.append("grant_type", "authorization_code_pkce");
          postParams.append("redirect_uri", "http://localhost:3000/callback");
          postParams.append("code_verifier", verifier);
          postParams.append("channel_id", "RefArch");
          postParams.append("client_id", clientId);
          postParams.append("usid", usid);

          const response = await fetch(oauth2TokenURL, {
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
         ///  console.log('JSON', data);
            if (data && data.access_token) {
               AuthorizationToken = data.access_token;
            }
  
          }) 
          .catch(error => console.error(error));

          return AuthorizationToken;
     }
}



export default Authorize