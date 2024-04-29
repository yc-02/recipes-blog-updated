import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import AuthNav from "./components/AuthNav";

const myFont = Quicksand

({
  subsets: ['latin']
})

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
      <body className={myFont.className}>
        <div className="min-h-screen">
        <AuthNav/>
          {children}
       <footer className="w-full text-center">
        <Footer/>
      </footer>
        </div>
      </body>
    </html>
  );
}
