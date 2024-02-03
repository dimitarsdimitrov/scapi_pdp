import Helper from './Helper';


class Authorize {
    clientId: string;
    verifier: string;
    challenge: string;
    channelId: string;
    debug: boolean;

    constructor() {
        this.clientId = process.env.client_id;
        this.channelId = process.env.siteId;
        this.verifier = Helper.base64URL(Helper.generateCodeVerifier());
        this.challenge = Helper.base64URL(Helper.generateCodeChallenge(this.verifier));
        this.debug = false;
    }

    async getAuth(): any { 
        var params = {
            code: null,
            usid: null
        };

        var searchParams = {
            "redirect_uri": "http://localhost:3000/callback",
            "response_type": "code",
            "client_id": this.clientId,
            "hint": "guest",
            "code_challenge": this.challenge
        };
      
        var authorizeURL = 'https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/authorize?'
        + new URLSearchParams(searchParams);
        var debug = this.debug;

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
                if (debug) {
                    console.log("Location header", locationHeader);
                }
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

     async getToken(params: any): string { 
          var AuthorizationToken = 'Bearer ';
          var oauth2TokenURL = 'https://kv7kzm78.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/f_ecom_zzrl_059/oauth2/token?';

          const postParams = new URLSearchParams();
          postParams.append("code", params.code);
          postParams.append("grant_type", "authorization_code_pkce");
          postParams.append("redirect_uri", "http://localhost:3000/callback");
          postParams.append("code_verifier", this.verifier);
          postParams.append("channel_id", this.channelId);
          postParams.append("client_id",  this.clientId);
          postParams.append("usid", params.usid);

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
              if (data && data.access_token) {
                  AuthorizationToken += data.access_token;
                  //process.env.Authorization = 'Bearer ' + data.access_token;
              }
          }) 
          .catch(error => console.error(error));

          return AuthorizationToken;
     }

}

export default Authorize