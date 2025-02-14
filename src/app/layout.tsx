import { Providers } from "./providers";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Foooter";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased min-h-screen flex flex-col"
      >
        <Providers>
          <Header />
          <main className="flex-grow bg-gradient-to-tl from-gray-100 to-gray-300">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
