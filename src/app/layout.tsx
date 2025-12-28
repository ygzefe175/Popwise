import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '700', '900'], // Including 900 for that ultra-bold look
});

export const metadata: Metadata = {
  title: "PoopUp - Wake Up Your Visitors",
  description: "Stop passive browsing. Turn visitors into customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased bg-cream-50 text-coffee-900 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
