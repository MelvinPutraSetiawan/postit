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
          <header>
            <Nav />
          </header>

          <div className="fixed w-full min-h-[100vh] bg-gray-300 flex justify-center">
            <div className="gradient" />
          </div>
          <main className="app">{children}</main>
        </body>
      </Provider>
    </html>
  );
}
