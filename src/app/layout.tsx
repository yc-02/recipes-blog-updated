import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthNav from "./components/AuthNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "02 Recipes",
  description: "Homemade recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="md:grid grid-cols-6">
          <nav className="md:col-span-1">
          <Navbar/>
          </nav>
          <div className="md:col-span-5 flex flex-col min-h-screen bg-neutral-50">
            <AuthNav/>
            {children}
          </div>
          <footer className="w-full text-center md:col-span-6">
            <Footer/>
          </footer>
        </div>
      </body>
    </html>
  );
}
