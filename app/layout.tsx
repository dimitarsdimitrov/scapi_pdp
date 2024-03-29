import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-300">
          
                      <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                      </div>

                      <div className="flex-1 px-2 mx-2 content-center">
                        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                          <li><Link  href={`/list?catId=shirt`} >List shirt </Link></li>
                          <li><Link  href={`/list?catId=groceries`}>List groceries</Link></li>
                          <li><Link  href={`/list?catId=household-supplies`}>List household-supplies</Link></li>
                        </ul>
                      </div>

                      <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                          {/* Navbar menu content here */}
                          <li><a>Navbar Item 1</a></li>
                          <li><a>Navbar Item 2</a></li>
                        </ul>
                      </div>
                </div>

                <div className={inter.className}>
                     {children}
                </div>

            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                  {/* Sidebar content here */}
                  <li><a>Sidebar Item 1</a></li>
                  <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>

        </div>
      </>
  );
}
