import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PostIt",
  description: "Simple Note App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.variable}  antialiased`}>
          <header className="fixed top-0 left-0 w-full bg-gray-300 z-20 shadow-md">
            <Nav />
          </header>

          <div className="fixed w-full min-h-[100vh] bg-gray-300 flex justify-center z-0">
            <div className="gradient" />
          </div>

          <main className="w-full pt-[64px] relative z-10">
            <div className="app">{children}</div>
          </main>
        </body>
      </Provider>
    </html>
  );
}
