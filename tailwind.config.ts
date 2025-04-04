import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      gridTemplateColumns: {
        "music-card": "repeat(auto-fill, minmax(238px, auto))",
        "music-card-sm": "repeat(auto-fill, minmax(180px, auto))",
        "landing-card-1": "repeat(3, 230px)",
        roadmap: "1fr 4px 1fr",
        "roadmap-sm": "4px 1fr",
      },
      maxWidth: {
        containerXs: "20rem",
        containerSm: "36rem",
        containerMd: "48rem",
        containerLg: "60rem",
        containerXl: "72rem",
        container2xl: "84rem",
        container3xl: "96rem",
        containerFull: "100%",
      },
      backgroundImage: {
        "aural-waves": "url('/images/aural_waves.svg')",
        "shadow-gradient":
          "linear-gradient(0deg, #111 0%, rgba(17, 17, 17, 0.10) 98.63%)",
        "shadow-gradient2":
          "linear-gradient(0deg, #111 41.55%, rgba(17, 17, 17, 0.00) 98.63%)",
        pageGrad:
          "linear-gradient(180deg, rgba(138, 43, 226, 0.40) 0%, #111 70%)",
      },
      fontFamily: {
        space: ["var(--font-space)"],
        roboto: ["var(--font-roboto)"],
      },
      colors: {
        secondaryPink: "#E22BCC",
        secondaryYellow: "#FBB03B",
        secondaryYellowDark: "#D28C75",
        subBackground: "#140425",
        dark01: "#0A0212",
        borderColor: "#444444",
        yellow: "#FBB03B",
        "grey-02": "#AFAFAF",
        dark: "#111111",
        "grey-04": "#EBEBEB",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          // Added specific primary color from the first config
          'spec': '#8a2be2',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          // Added specific secondary color from the first config
          'spec': '#ebebeb',
          'foregroundSpec': '#0a0212'
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          // Added specific muted color from the first config
          'spec': '#d7d7d7',
          'foregroundSpec': '#595959',
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function (api: any) {
      const { addUtilities } = api;
      addUtilities({
        ".truncate-lines-3": {
          display: "-webkit-box",
          "-webkit-line-clamp": "3",
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "normal",
        },
      });
    },
  ],
} satisfies Config;

export default config;