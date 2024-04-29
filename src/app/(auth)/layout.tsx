
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="min-h-screen flex flex-col max-w-screen-sm md:max-w-full">
      <main>
      {children}
      </main>
    </div>
    </>
  );
}
