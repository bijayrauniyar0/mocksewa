"use client";
import React, { useState } from "react";

interface RatingProps {
  value: number; // 0.5 to 5
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "small" | "medium" | "large";
}

const starPath =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

const sizeClassMap = {
  small: "w-5 h-5",
  medium: "w-7 h-7",
  large: "w-10 h-10",
};

const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  readonly = false,
  size = "medium",
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const Star = ({
    fillPercent,
    onClick,
    onMouseEnter,
    onMouseLeave,
    index,
  }: {
    fillPercent: 0 | 50 | 100;
    onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    index: number;
  }) => {
    return (
      <svg
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`${sizeClassMap[size]} ${
          readonly ? "cursor-default" : "cursor-pointer"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Empty star */}
        <path d={starPath} fill="none" stroke="#d1d5db" />

        {fillPercent > 0 && (
          <defs>
            <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="100%" y2="0">
              <stop
                offset={fillPercent === 50 ? "50%" : "100%"}
                stopColor="#fbbf24"
              />
              <stop
                offset={fillPercent === 50 ? "50%" : "100%"}
                stopColor="transparent"
              />
            </linearGradient>
          </defs>
        )}
        {fillPercent === 50 && (
          <path d={starPath} fill={`url(#grad-${index})`} stroke="none" />
        )}
        {fillPercent === 100 && (
          <path d={starPath} fill="#fbbf24" stroke="none" />
        )}
      </svg>
    );
  };

  const displayedValue = hoverValue ?? value;

  const getFillPercent = (starIndex: number): 0 | 50 | 100 => {
    if (displayedValue >= starIndex) return 100;
    if (displayedValue >= starIndex - 0.5) return 50;
    return 0;
  };

  if (readonly) {
    return (
      <div
        className="flex space-x-1 select-none"
        aria-label={`Rating: ${value} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} fillPercent={getFillPercent(i)} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex space-x-1 select-none"
      aria-valuenow={value}
      aria-valuemin={0.5}
      aria-valuemax={5}
      aria-label="Rating"
    >
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const fillPercent = getFillPercent(starIndex);

        const handleClick = (
          event: React.MouseEvent<SVGSVGElement, MouseEvent>
        ) => {
          if (!onChange) return;

          const { left, width } = event.currentTarget.getBoundingClientRect();
          const clickX = event.clientX - left;
          const clickedHalf = clickX < width / 2 ? 0.5 : 1;

          const newRating = starIndex - 1 + clickedHalf;
          onChange(newRating);
        };

        const handleMouseEnter = () => setHoverValue(starIndex);
        const handleMouseLeave = () => setHoverValue(null);

        return (
          <Star
            key={starIndex}
            index={starIndex}
            fillPercent={fillPercent}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default Rating;
