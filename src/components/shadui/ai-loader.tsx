import * as React from "react";

interface LoaderProps {
  size?: number;
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 180,
  text = "Generating",
}) => {
  const letters = text.split("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1a3379] via-[#0f172a] to-black">
      <div
        className="relative flex flex-col items-center justify-center select-none"
        style={{ width: size, height: size }}
      >
        {/* Texto animado */}
        <div className="flex gap-1 mb-6">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="text-white opacity-40 animate-loader-letter"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Círculo animado */}
        <div className="absolute inset-0 rounded-full animate-loader-circle" />
      </div>
    </div>
  );
};
