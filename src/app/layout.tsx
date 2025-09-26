import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClothHub - Modern Clothing Store",
  description: "Quality clothing for teenagers and adults up to 40 years old",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
