import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Quote | Akshaya Nursery & Farms",
  description:
    "Request a wholesale plant quote from Akshaya Nursery & Farms. Simple form, quick response within 24 hours.",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
