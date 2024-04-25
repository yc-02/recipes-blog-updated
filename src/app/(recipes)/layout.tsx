
import AuthNav from "../components/AuthNav";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="min-h-screen flex flex-col max-w-screen-sm md:max-w-full">
      <nav>
      <AuthNav/>
    <Navbar/>
      </nav>
      <main>
      {children}
      </main>
    </div>
    <footer className="w-full text-center">
      <Footer/>
    </footer>
    </>
  );
}
