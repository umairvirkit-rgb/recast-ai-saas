"use client";

import { jsPDF } from "jspdf";

type OutputPreviewProps = {
  linkedin: string;
  instagram: string;
  carousel: string[];
  brandColor?: string; // optional, default purple
  logoUrl?: string; // optional, user logo
};

// ---------------- HELPER FUNCTIONS ----------------

// Convert hex color to RGB array
function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

// Load image from URL and return base64 data for jsPDF
function getImageData(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas error");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (err) => reject(err);
  });
}

const OutputPreview: React.FC<OutputPreviewProps> = ({
  linkedin,
  instagram,
  carousel,
  brandColor = "#95a2a6", // default purple
  logoUrl,
}) => {
  // ---------------- PDF GENERATION FUNCTION ----------------
  const handleDownloadPDF = async () => {
    if (!carousel || carousel.length === 0) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [600, 600],
    });

    for (let index = 0; index < carousel.length; index++) {
      const slide = carousel[index];

      // ------------------ Background ------------------
      doc.setFillColor(...hexToRgb(brandColor));
      doc.rect(0, 0, 600, 600, "F");

      // ------------------ Slide Text ------------------
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");

      const lines = doc.splitTextToSize(slide, 560);
      const pageHeight = 600;
      const textHeight = lines.length * 20;
      const startY = (pageHeight - textHeight) / 2;

      doc.text(lines, 20, startY);

      // ------------------ Logo ------------------
      if (logoUrl) {
        try {
          const imgData = await getImageData(logoUrl);
          doc.addImage(imgData, "PNG", 250, 10, 100, 40);
        } catch (err) {
          console.warn("Logo load failed:", err);
        }
      }

      // ------------------ Footer ------------------
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text("@Recast", 300, 580, { align: "center" });

      // ------------------ Add page ------------------
      if (index < carousel.length - 1) doc.addPage();
    }

    doc.save("carousel.pdf");
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto space-y-8">
      {/* LinkedIn Post */}
      <div>
        <h2 className="font-bold mb-2 text-lg">LinkedIn Post</h2>
        <pre className="bg-gray-100 text-black p-4 rounded break-words whitespace-pre-wrap max-h-60 overflow-y-auto shadow-sm">
          {linkedin || "Your LinkedIn post will appear here..."}
        </pre>
      </div>

      {/* Instagram Caption */}
      <div>
        <h2 className="font-bold mb-2 text-lg">Instagram Caption</h2>
        <pre className="bg-gray-100 text-black p-4 rounded break-words whitespace-pre-wrap max-h-60 overflow-y-auto shadow-sm">
          {instagram || "Your Instagram caption will appear here..."}
        </pre>
      </div>

      {/* Carousel Slides */}
      {carousel && carousel.length > 0 && (
        <div>
          <h2 className="font-bold mb-4 text-lg">Carousel Slides</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {carousel.map((slide, index) => (
              <div
                key={index}
                className="min-w-[320px] h-[320px] bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-col justify-between p-6 hover:scale-105 transition-transform duration-200"
              >
                <div className="text-sm text-gray-500">
                  Slide {index + 1} / {carousel.length}
                </div>
                <div className="flex-1 flex items-center justify-center text-center">
                  <p className="text-lg font-semibold text-black break-words whitespace-pre-wrap">
                    {slide}
                  </p>
                </div>
                {logoUrl && (
                  <div className="flex justify-center mb-1">
                    <img src={logoUrl} alt="Logo" className="h-8 object-contain" />
                  </div>
                )}
                <div className="text-xs text-gray-400 text-center">@Recast</div>
              </div>
            ))}
          </div>

          {/* ---------------- PDF DOWNLOAD BUTTON ---------------- */}
          <button
            onClick={handleDownloadPDF}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default OutputPreview;
