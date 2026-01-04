"use client";
import { useState } from "react";

type TextInputProps = {
  onSubmit: (text: string) => void;
};

const TextInput: React.FC<TextInputProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your long content here..."
        rows={6}
        className="border p-2 w-full"
      />
      <button
        onClick={() => onSubmit(text)}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Generate
      </button>
    </div>
  );
};

export default TextInput;
