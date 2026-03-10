"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export default function PlantCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
            product.available
              ? "bg-whatsapp text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {product.available ? "Available Now" : "Coming Soon"}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-green-dark mb-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Min: {product.minOrder}
          </span>
          {product.available && (
            <Link
              href={`/order?plant=${product.id}`}
              className="text-sm font-semibold text-whatsapp hover:text-green-dark transition-colors"
            >
              Get Quote →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
