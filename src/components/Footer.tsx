import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-dark text-white/85 py-10">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-white font-bold text-lg mb-2">
            🌿 Akshaya Farms
          </h3>
          <p>
            Premium wholesale plant nursery supplying quality plants to
            landscapers, retailers, and institutions across South India.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <div className="flex flex-col gap-1.5">
            <Link href="/" className="hover:text-whatsapp transition-colors">Home</Link>
            <Link href="/catalog" className="hover:text-whatsapp transition-colors">Catalog</Link>
            <Link href="/order" className="hover:text-whatsapp transition-colors">Get a Quote</Link>
            <Link href="/contact" className="hover:text-whatsapp transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <p>Nerigam, Hosur, Tamil Nadu</p>
          <p className="mt-1">
            <a href="tel:+919448689033" className="hover:text-whatsapp transition-colors">
              +91 94486 89033
            </a>
          </p>
          <p className="mt-1">
            <a
              href="https://wa.me/919448689033"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-whatsapp transition-colors"
            >
              WhatsApp Us
            </a>
          </p>
        </div>
      </div>
      <div className="text-center mt-8 pt-6 border-t border-white/15 text-xs text-white/60">
        &copy; {new Date().getFullYear()} <strong className="text-white">Akshaya Nursery &amp; Farms</strong>. All rights reserved.
      </div>
    </footer>
  );
}
