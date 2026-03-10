import Image from "next/image";
import Link from "next/link";
import PlantCard from "@/components/PlantCard";
import { products } from "@/data/products";

export default function Home() {
  const featured = products.filter((p) => p.available).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/poinsettia-rows.jpg"
          alt="Akshaya Farms nursery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Premium Wholesale
            <br />
            <span className="text-whatsapp">Plant Nursery</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl mx-auto">
            Quality plants grown with care in Nerigam, Hosur. Supplying
            landscapers, retailers, and institutions across South India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="px-8 py-3.5 bg-whatsapp text-white rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Browse Plants
            </Link>
            <Link
              href="/order"
              className="px-8 py-3.5 bg-white text-green-dark rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
              About Akshaya Farms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Located in the fertile lands of Nerigam, Hosur, Akshaya Nursery
              &amp; Farms is a wholesale plant nursery dedicated to growing
              premium quality plants for bulk buyers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              From aromatic herbs like Rosemary to vibrant seasonal Poinsettias
              and colorful Crotons, we ensure every plant meets the highest
              standards before it leaves our nursery.
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: "🌱",
                  title: "Wholesale Only",
                  desc: "Bulk orders for businesses",
                },
                {
                  icon: "🚛",
                  title: "Pan South India",
                  desc: "Reliable delivery network",
                },
                {
                  icon: "✅",
                  title: "Quality Assured",
                  desc: "Healthy, nursery-fresh plants",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 p-3 bg-green-light rounded-xl"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <strong className="text-green-dark">{item.title}</strong>
                    <span className="text-gray-500 text-sm ml-2">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/rosemary-greenhouse.jpg"
              alt="Rosemary greenhouse at Akshaya Farms"
              width={600}
              height={500}
              className="rounded-2xl object-cover w-full max-h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="py-20 px-6 bg-green-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-green-dark text-center mb-2">
            Featured Plants
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Our most popular varieties, ready for wholesale orders
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((product) => (
              <PlantCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/catalog"
              className="inline-block px-8 py-3.5 bg-green-dark text-white rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              View All Plants →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-green-dark text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Request a quote or reach out on WhatsApp. We&apos;ll
            get back to you within 24 hours with pricing &amp; availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="px-8 py-3.5 bg-whatsapp text-white rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Request a Quote
            </Link>
            <a
              href="https://wa.me/919448689033"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white/15 text-white rounded-lg font-semibold hover:bg-white/25 transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
