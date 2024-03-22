import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { Header } from "@/components/header";
import NextTopLoader from 'nextjs-toploader'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Finder",
  description: "Find developers to work with",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NextTopLoader />
          <Header />
          {children}
        </Provider>
      </body>
    </html >
  );
}
