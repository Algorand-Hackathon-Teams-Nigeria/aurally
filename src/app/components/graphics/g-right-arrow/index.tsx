import { cn } from "@/app/lib/styles/utils";
import React from "react";

interface Props {
  className?: string;
}

const RightArrow: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex items-center relative w-full", className)}>
      <div className="h-[2px] w-full bg-white rounded" />
      <div className="text-3xl absolute -right-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.172 18.657a1 1 0 0 1-.707-1.707l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414l5.656 5.657a1 1 0 0 1 0 1.414L9.88 18.364a.997.997 0 0 1-.707.293Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default RightArrow;
