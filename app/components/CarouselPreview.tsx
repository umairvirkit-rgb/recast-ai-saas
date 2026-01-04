"use client";

type CarouselPreviewProps = {
  slides: string[];
};

const CarouselPreview: React.FC<CarouselPreviewProps> = ({ slides }) => {
  return (
    <div className="mt-6">
      <h2 className="font-bold">Carousel Slides:</h2>
      <ul className="bg-gray-100 p-2 rounded">
  {slides.map((slide, index) => (
    <li key={index} className="text-black p-1 border-b border-gray-200">
      {slide}
    </li>
  ))}
</ul>
    </div>
  );
};

export default CarouselPreview;
