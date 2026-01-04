"use client";

type OutputPreviewProps = {
  linkedin: string;
  instagram: string;
};

const OutputPreview: React.FC<OutputPreviewProps> = ({ linkedin, instagram }) => {
  return (
    <div className="mt-6 max-w-2xl mx-auto">
      {/* LinkedIn Post */}
      <h2 className="font-bold mb-2">LinkedIn Post:</h2>
      <pre className="bg-gray-100 text-black p-4 rounded break-words whitespace-pre-wrap max-h-60 overflow-y-auto shadow-sm">
        {linkedin || "Your LinkedIn post will appear here..."}
      </pre>

      {/* Instagram Caption */}
      <h2 className="font-bold mt-6 mb-2">Instagram Caption:</h2>
      <pre className="bg-gray-100 text-black p-4 rounded break-words whitespace-pre-wrap max-h-60 overflow-y-auto shadow-sm">
        {instagram || "Your Instagram caption will appear here..."}
      </pre>
    </div>
  );
};

export default OutputPreview;
