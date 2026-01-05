"use client";

type OutputPreviewProps = {
  linkedin: string;
  instagram: string;
  carousel: string[];
};

const OutputPreview: React.FC<OutputPreviewProps> = ({
  linkedin,
  instagram,
  carousel,
}) => {
  return (
    <div className="mt-8 max-w-4xl mx-auto space-y-8">
      {/* ================= LinkedIn Post ================= */}
      <div>
        <h2 className="font-bold mb-2 text-lg">LinkedIn Post</h2>
        <pre className="bg-gray-100 text-black p-4 rounded break-words whitespace-pre-wrap max-h-60 overflow-y-auto shadow-sm">
          {linkedin || "Your LinkedIn post will appear here..."}
        </pre>
      </div>

      {/* ================= Instagram Caption ================= */}
      <div>
        <h2 className="font-bold mb-2 text-lg">Instagram Caption</h2>
        <pre className="bg-gray-100 text-black p-4 rounded break-words whitespace-pre-wrap max-h-60 overflow-y-auto shadow-sm">
          {instagram || "Your Instagram caption will appear here..."}
        </pre>
      </div>

      {/* ================= Carousel Slides ================= */}
      {carousel && carousel.length > 0 && (
        <div>
          <h2 className="font-bold mb-4 text-lg">Carousel Slides</h2>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {carousel.map((slide, index) => (
              <div
                key={index}
                className="min-w-[300px] h-[300px] bg-white border border-gray-300 rounded-xl shadow-md flex flex-col justify-between p-6"
              >
                {/* Slide Number */}
                <div className="text-sm text-gray-500">
                  Slide {index + 1} / {carousel.length}
                </div>

                {/* Slide Content */}
                <div className="flex-1 flex items-center justify-center text-center">
                  <p className="text-lg font-semibold text-black break-words whitespace-pre-wrap">
                    {slide}
                  </p>
                </div>

                {/* Footer Branding */}
                <div className="text-xs text-gray-400 text-center">
                  @Recast
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputPreview;
