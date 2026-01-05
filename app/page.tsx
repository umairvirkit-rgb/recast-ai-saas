"use client";

import { useState } from "react";
import TextInput from "./components/TextInput";
import OutputPreview from "./components/OutputPreview";

export default function Home() {
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [carousel, setCarousel] = useState<string[]>([]);

  const handleGenerate = async (text: string) => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      setLinkedin(data.linkedin);
      setInstagram(data.instagram);
      setCarousel(data.carousel);
    } catch (err) {
      console.error(err);
      alert("Error generating content");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Recast – Repurpose Content
      </h1>

      {/* Text input */}
      <TextInput onSubmit={handleGenerate} />

      {/* ALL outputs handled here */}
      <OutputPreview
        linkedin={linkedin}
        instagram={instagram}
        carousel={carousel}
      />
    </div>
  );
}
