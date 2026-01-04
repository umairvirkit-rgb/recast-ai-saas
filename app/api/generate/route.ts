import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    // Fake response for now
    const response = {
      linkedin: "🚀 LinkedIn post generated from API",
      instagram: "Short Instagram/FB caption from API",
      carousel: ["Slide 1: Hook", "Slide 2: Point", "Slide 3: CTA"],
    };

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
