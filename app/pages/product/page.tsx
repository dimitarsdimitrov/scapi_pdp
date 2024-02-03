import ProductItemTile from "../../components/ProductItemTile";
import Authorize from '../../Authorize';
import Helper from "../../Helper";

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

    const productJSON: ProductRes[] = await res.json();
    return productJSON.data[0];
}

export default async function Page() {
    const authorizationToken = await doAuthorize();
    var productURL = Helper.buildProductURL('25517958M');
    var productJSON = await fetchProduct(productURL, authorizationToken);

    return (
      <body className="font-sans antialiased text-gray-600 min-h-full flex flex-col">
        <header></header>
          <div className="relative mx-auto mt-20 w-full max-w-container px-4 sm:px-6 lg:px-8">
              <ProductItemTile productJSON={productJSON} />
          </div>
        <footer></footer>
      </body>
    );
}
