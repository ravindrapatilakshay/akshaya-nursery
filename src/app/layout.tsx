import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Akshaya Nursery & Farms | Wholesale Plant Nursery",
  description:
    "Premium wholesale plant nursery in Nerigam, Hosur. Rosemary, Poinsettias, Crotons and more. Bulk orders for landscapers, retailers and institutions.",
  keywords:
    "wholesale nursery, bulk plants, rosemary, poinsettia, croton, Hosur, Tamil Nadu",
  openGraph: {
    title: "Akshaya Nursery & Farms",
    description: "Premium wholesale plant nursery in Nerigam, Hosur",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
