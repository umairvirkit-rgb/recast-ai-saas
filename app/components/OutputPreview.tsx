"use client";

type OutputPreviewProps = {
  linkedin: string;
  instagram: string;
};

const OutputPreview: React.FC<OutputPreviewProps> = ({ linkedin, instagram }) => {
  return (
    <div className="mt-6">
      <h2 className="font-bold">LinkedIn Post:</h2>
      <pre className="bg-gray-100 text-black p-2 rounded">{linkedin}</pre>

      <h2 className="font-bold mt-4">Instagram Caption:</h2>
      <pre className="bg-gray-100 text-black p-2 rounded">{instagram}</pre>
    </div>
  );
};

export default OutputPreview;
