import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    // Prompt for AI
    const prompt = `
You are a content repurposing assistant.
Take the following text and generate:

1. LinkedIn post (with hook, line breaks, CTA)
2. Instagram/FB caption (shorter, punchy)
3. Carousel slides as an array of 5-10 concise slides (each slide max 1-2 sentences)

Input text:
${text}

Output strictly in valid JSON format like this:
{
  "linkedin": "LinkedIn post here...",
  "instagram": "Instagram/FB caption here...",
  "carousel": [
    "Slide 1: ...",
    "Slide 2: ...",
    "Slide 3: ...",
    "Slide 4: ...",
    "Slide 5: ..."
  ]
}
Do not add any extra text or commentary. Only return JSON.
`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or "gpt-4"
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    // Get AI text
    const aiText = data?.choices?.[0]?.message?.content;

    if (!aiText) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    // Safety: Remove any leading/trailing whitespace
    const cleanedText = aiText.trim();

    // Parse JSON safely
    let jsonData;
    try {
      jsonData = JSON.parse(cleanedText);
    } catch (err) {
      // If AI returns invalid JSON, fallback to placeholders
      console.error("JSON parse error:", err, cleanedText);
      jsonData = {
        linkedin: "LinkedIn post could not be generated.",
        instagram: "Instagram caption could not be generated.",
        carousel: ["Slide 1", "Slide 2", "Slide 3"],
      };
    }

    return NextResponse.json(jsonData);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
