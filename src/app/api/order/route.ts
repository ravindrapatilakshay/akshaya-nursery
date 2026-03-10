import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, business, plant, quantity, notes } = body;

    if (!name || (!phone && !email) || !plant || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY || "YOUR_ACCESS_KEY";

    const emailRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `🌿 New Quote Request: ${plant} - ${quantity}`,
        from_name: "Akshaya Farms Website",
        name,
        phone: phone ? `+91 ${phone}` : "Not provided",
        email: email || "Not provided",
        business: business || "Not provided",
        plant,
        quantity,
        notes: notes || "None",
      }),
    });

    const emailData = await emailRes.json().catch(() => null);
    console.log("Web3Forms response:", emailRes.status, emailData);

    if (!emailRes.ok) {
      console.error("Web3Forms error:", emailData);
      return NextResponse.json(
        { error: "Email service failed", details: emailData },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
