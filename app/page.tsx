

import ProductItemTile from "./components/ProductItemTile";

export default function Home() {
  return (
    <body className="font-sans antialiased text-gray-600 min-h-full flex flex-col">
      <header></header>
        <div className="relative mx-auto mt-20 w-full max-w-container px-4 sm:px-6 lg:px-8">
            <ProductItemTile/>
        </div>
      <footer></footer>
    </body>
  );
}
