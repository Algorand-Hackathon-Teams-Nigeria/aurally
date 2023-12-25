import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "music-card": "repeat(auto-fill, minmax(238px, auto))",
        "music-card-sm": "repeat(auto-fill, minmax(180px, auto))",
        roadmap: "1fr 4px 1fr",
        "roadmap-sm": "4px 1fr",
      },
      backgroundImage: {
        "shadow-gradient":
          "linear-gradient(0deg, #111 0%, rgba(17, 17, 17, 0.10) 98.63%)",
        "shadow-gradient2":
          "linear-gradient(0deg, #111 41.55%, rgba(17, 17, 17, 0.00) 98.63%)",
        pageGrad:
          "linear-gradient(180deg, rgba(138, 43, 226, 0.40) 0%, #111 70%)",
      },
      fontFamily: {
        space: ["var(--font-space)"],
      },
      colors: {
        primary: "#8A2BE2",
        borderColor: "#444444",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
export default config;
