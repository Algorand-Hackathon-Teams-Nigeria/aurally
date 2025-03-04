"use client";
import * as React from "react";
import { cn } from "@/app/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    }

    return (
      <motion.div
        className="relative w-full rounded-lg transition duration-300 group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? `${radius}px` : "0px"} circle at ${mouseX}px ${mouseY}px,
              rgba(138, 43, 226, 0.4),
              transparent 80%
            )
          `,
        }}
      >
        <input
          type={type}
          className={cn(
            `w-full h-12 border-none bg-gray-50 dark:bg-zinc-800 
             text-black dark:text-white rounded-md px-3 py-2 text-sm 
             placeholder-gray-400 dark:placeholder-gray-600 
             focus:outline-none focus:ring-2 focus:ring-[#8a2be2]
             transition duration-300`,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export { Input };
