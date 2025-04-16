
import React from "react";

export function Slider({ value, min, max, step, onValueChange, className }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([+e.target.value])}
      className={`w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer ${className}`}
    />
  );
}
