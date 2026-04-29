import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--inter-font",
});

export const metadata: Metadata = {
  title: "Franchise",
  description: "Franchise and lots prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
