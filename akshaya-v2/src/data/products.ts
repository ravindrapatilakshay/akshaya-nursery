export interface Product {
  id: string;
  name: string;
  category: "herbs" | "ornamental" | "seasonal";
  description: string;
  image: string;
  available: boolean;
  minOrder: string;
}

export const products: Product[] = [
  {
    id: "rosemary",
    name: "Rosemary",
    category: "herbs",
    description:
      "Aromatic herb perfect for culinary and landscaping use. Hardy and drought-tolerant.",
    image: "/images/rosemary-greenhouse.jpg",
    available: true,
    minOrder: "100 plants",
  },
  {
    id: "rosemary-seedlings",
    name: "Rosemary Seedlings",
    category: "herbs",
    description:
      "Young rosemary plants ready for transplanting. Ideal for bulk landscaping projects.",
    image: "/images/rosemary-seedlings.jpg",
    available: true,
    minOrder: "200 plants",
  },
  {
    id: "poinsettia-red",
    name: "Poinsettia – Red",
    category: "seasonal",
    description:
      "Classic red poinsettias, vibrant and full. Perfect for festive season sales.",
    image: "/images/poinsettia-red-closeup.jpg",
    available: true,
    minOrder: "50 plants",
  },
  {
    id: "poinsettia-white",
    name: "Poinsettia – White",
    category: "seasonal",
    description:
      "Elegant white poinsettias for premium holiday displays and gifting.",
    image: "/images/poinsettia-white.jpg",
    available: true,
    minOrder: "50 plants",
  },
  {
    id: "poinsettia-variegated",
    name: "Poinsettia – Variegated",
    category: "seasonal",
    description:
      "Stunning variegated poinsettias with unique pink-white patterns.",
    image: "/images/poinsettia-variegated.jpg",
    available: true,
    minOrder: "50 plants",
  },
  {
    id: "croton",
    name: "Croton Plants",
    category: "ornamental",
    description:
      "Colorful foliage plants in assorted varieties. Great for landscaping and decoration.",
    image: "/images/croton-plants.jpg",
    available: true,
    minOrder: "100 plants",
  },
];

export const categories = [
  { id: "all", name: "All Plants" },
  { id: "herbs", name: "Herbs" },
  { id: "ornamental", name: "Ornamental" },
  { id: "seasonal", name: "Seasonal" },
];
