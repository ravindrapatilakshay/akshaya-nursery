import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Akshaya Nursery & Farms",
  description:
    "Get in touch with Akshaya Nursery & Farms for wholesale plant inquiries. Call, WhatsApp, or visit us in Nerigam, Hosur.",
};

export default function ContactPage() {
  const contactCards = [
    {
      icon: "📞",
      title: "Call Us",
      detail: "+91 94486 89033",
      href: "tel:+919448689033",
      cta: "Call now",
    },
    {
      icon: "💬",
      title: "WhatsApp",
      detail: "Quick response",
      href: "https://wa.me/919448689033?text=Hi%2C%20I%27m%20interested%20in%20wholesale%20plants",
      cta: "Chat now",
      external: true,
    },
    {
      icon: "📍",
      title: "Visit Us",
      detail: "Nerigam, Hosur, Tamil Nadu",
      href: "https://maps.app.goo.gl/P7vT1c9Q67hmo7oV8",
      cta: "Get directions",
      external: true,
    },
    {
      icon: "🕐",
      title: "Working Hours",
      detail: "Mon – Sat: 8 AM – 6 PM",
      href: null,
      cta: null,
    },
  ];

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-dark text-center mb-2">
          Contact Us
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Get in touch for wholesale inquiries and orders
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Cards */}
          <div className="grid grid-cols-2 gap-4">
            {contactCards.map((card) => {
              const content = (
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col gap-1">
                  <span className="text-3xl mb-2">{card.icon}</span>
                  <strong className="text-green-dark">{card.title}</strong>
                  <span className="text-gray-500 text-sm">{card.detail}</span>
                  {card.cta && (
                    <span className="text-whatsapp font-semibold text-sm mt-2">
                      {card.cta} →
                    </span>
                  )}
                </div>
              );

              if (card.href) {
                return (
                  <a
                    key={card.title}
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                  >
                    {content}
                  </a>
                );
              }
              return <div key={card.title}>{content}</div>;
            })}
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.0!2d77.8!3d12.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae718c498e9e1d%3A0x2345a396f4f4e4a2!2sAkshaya%20Nursery%20And%20Farms!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 350 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Akshaya Farms location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
