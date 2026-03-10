import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plant Catalog | Akshaya Nursery & Farms",
  description:
    "Browse our wholesale plant catalog — Rosemary, Poinsettias, Crotons and more. Filter by category and request a quote.",
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
