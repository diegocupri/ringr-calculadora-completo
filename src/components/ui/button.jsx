
import React from "react";

export function Button({ children, className }) {
  return <button className={`bg-[#8857FC] hover:bg-[#7740db] text-white text-sm px-4 py-2 rounded-xl ${className}`}>{children}</button>;
}
