"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import Link from "next/link";
import { Suspense } from "react";

function OrderForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    plant: "",
    quantity: "",
    notes: "",
  });

  useEffect(() => {
    const plantParam = searchParams.get("plant");
    if (plantParam) {
      setForm((prev) => ({ ...prev, plant: plantParam }));
    }
  }, [searchParams]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    update("phone", digits);
  };

  const isValidPhone = (phone: string) => /^\d{10}$/.test(phone);
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone && !form.email) {
      newErrors.contact = "Please provide a phone number or email";
    }
    if (form.phone && !isValidPhone(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }
    if (form.email && !isValidEmail(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canNext =
    step === 1
      ? form.plant && form.quantity.trim()
      : form.name.trim() && (form.phone || form.email);

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setSubmitting(true);
    try {
      const selectedName = products.find((p) => p.id === form.plant)?.name || form.plant;
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "bd35e59d-b7f3-43c6-b070-40eaaaa1c99e",
          subject: `🌿 New Quote Request: ${selectedName} - ${form.quantity}`,
          from_name: "Akshaya Farms Website",
          name: form.name,
          phone: form.phone ? `+91 ${form.phone}` : "Not provided",
          email: form.email || "Not provided",
          business: form.business || "Not provided",
          plant: selectedName,
          quantity: form.quantity,
          notes: form.notes || "None",
        }),
      });
      if (!res.ok) {
        console.error("Web3Forms error:", await res.json().catch(() => null));
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong. Please try again or reach us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPlant = products.find((p) => p.id === form.plant);

  if (submitted) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-10">
          <div className="text-6xl mb-6">🌿</div>
          <h2 className="text-2xl font-bold text-green-dark mb-3">
            Quote Request Received!
          </h2>
          <p className="text-gray-600 mb-2">
            Thank you, <strong>{form.name}</strong>! We&apos;ve received your request for:
          </p>
          <div className="bg-green-light rounded-xl p-4 my-4 text-left">
            <p className="text-green-dark font-semibold">{selectedPlant?.name || form.plant}</p>
            <p className="text-gray-600 text-sm">Quantity: {form.quantity}</p>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Our team will review your request and get back to you
            within <strong>24 hours</strong> with availability and pricing details.
            {form.phone && ` We'll reach you at +91 ${form.phone}.`}
            {form.email && !form.phone && ` We'll reach you at ${form.email}.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/919448689033"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-whatsapp text-white rounded-lg font-semibold hover:-translate-y-0.5 transition-all"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/catalog"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Browse More Plants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-dark text-center mb-2">
          Request a Quote
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Tell us what you need and we&apos;ll get back with pricing &amp; availability
        </p>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s
                    ? "bg-green-dark text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {s}
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= s ? "text-green-dark" : "text-gray-400"
                }`}
              >
                {s === 1 ? "Plant Details" : "Your Info"}
              </span>
              {s < 2 && (
                <div
                  className={`w-16 h-0.5 ${
                    step > 1 ? "bg-green-dark" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Plant Details */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Plant *
              </label>
              <select
                value={form.plant}
                onChange={(e) => update("plant", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-dark/30 focus:border-green-dark transition-all bg-white"
              >
                <option value="">Choose a plant...</option>
                {products
                  .filter((p) => p.available)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Min: {p.minOrder})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="text"
                placeholder="e.g., 500 plants"
                value={form.quantity}
                onChange={(e) => update("quantity", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-dark/30 focus:border-green-dark transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                rows={3}
                placeholder="Any specific requirements..."
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-dark/30 focus:border-green-dark transition-all resize-none"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canNext}
              className="w-full py-3.5 bg-green-dark text-white rounded-xl font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Next — Your Details
            </button>
          </div>
        )}

        {/* Step 2: Contact Info */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-dark/30 focus:border-green-dark transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number {!form.email && "*"}
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-gray-600 text-sm font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  value={form.phone}
                  onChange={(e) => updatePhone(e.target.value)}
                  maxLength={10}
                  className={`w-full px-4 py-3 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-green-dark/30 focus:border-green-dark transition-all ${
                    errors.phone ? "border-red-400" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>
              )}
              {form.phone && isValidPhone(form.phone) && (
                <p className="text-xs text-green-600 mt-1.5">Valid number</p>
              )}
            </div>

            <div className="text-center text-gray-400 text-xs">
              — or —
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email {!form.phone && "*"}
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                onBlur={() => {
                  if (form.email && !isValidEmail(form.email)) {
                    setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
                  }
                }}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-dark/30 focus:border-green-dark transition-all ${
                  errors.email ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
              )}
              {form.email && isValidEmail(form.email) && !errors.email && (
                <p className="text-xs text-green-600 mt-1.5">Valid email</p>
              )}
              {errors.contact && (
                <p className="text-xs text-amber-600 mt-1.5">{errors.contact}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Name (optional)
              </label>
              <input
                type="text"
                placeholder="Your nursery or business"
                value={form.business}
                onChange={(e) => update("business", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-dark/30 focus:border-green-dark transition-all"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canNext || submitting}
                className="flex-2 py-3.5 bg-whatsapp text-white rounded-xl font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Submit Quote Request"}
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-gray-400 text-xs mt-8">
          This is a quote request — not a confirmed purchase. We&apos;ll reach out
          to confirm availability, pricing, and delivery details.
        </p>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading...</div>}>
      <OrderForm />
    </Suspense>
  );
}
