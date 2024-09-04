import vidstack from "@vidstack/react/tailwind.cjs";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    screens: {
      xxs: "340px",
      // => @media (min-width: 640px) { ... }
      xs: "400px",
      // => @media (min-width: 640px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1920px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "3rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
      },
    },
    extend: {
      colors: {
        "dark-navy": "#181D3C",
        "royal-blue": "#3498DB",
        "mint-green": "#2ECC71",
        "neutral-gray": "#808080",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      transitionTimingFunction: {
        cubic: "cubic-bezier(0.645,0.045,0.355,1)",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(16rem, 1fr))",
        "auto-fit-19": "repeat(auto-fit, minmax(19rem, 1fr))",
      },
      boxShadow: {
        custom: "0px 4px 24px 0px #00000026",
      },
    },
  },
  plugins: [tailwindcssAnimate, vidstack, customVariants],
} satisfies Config;

export default config;

function customVariants({ addVariant, matchVariant }) {
  // Strict version of `.group` to help with nesting.
  matchVariant("parent-data", (value) => `.parent[data-${value}] > &`);

  addVariant("hocus", ["&:hover", "&:focus-visible"]);
  addVariant("group-hocus", [".group:hover &", ".group:focus-visible &"]);
}
