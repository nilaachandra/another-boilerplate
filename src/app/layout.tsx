import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Providers } from "./provider";
import { ViewTransitions } from "next-view-transitions";
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "800"],
});

export const metadata: Metadata = {
  title: "Another Boilerplate",
  description: "Nothing, it's Just Another Boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={bricolage.className}>
      <body className="lg:max-w-[712px] w-full p-4 mx-auto min-h-screen">
        <Providers>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
    </ViewTransitions>
  );
}
