"use client";

import { useState } from "react";
import PlantCard from "@/components/PlantCard";
import { products, categories } from "@/data/products";

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-dark text-center mb-2">
          Our Plant Catalog
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Browse our full range of wholesale plants
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-green-dark text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-green-dark hover:text-green-dark"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Plant Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <PlantCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No plants in this category yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
