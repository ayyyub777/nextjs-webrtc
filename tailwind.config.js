/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2572ED",
          bright: "#538DFF",
          dim: "#002D6D",
          disabled: "#004299",
        },
        onPrimary: {
          DEFAULT: "#CCDAFF",
          disabled: "#8F9099",
        },
        secondary: {
          DEFAULT: "#444954",
          bright: "#70778B",
          dim: "#293042",
          disabled: "#404759",
        },
        onSecondary: {
          DEFAULT: "#D3D9F0",
          disabled: "#A4ABC0",
        },
        surface: {
          DEFAULT: "#191B23",
          bright: "#272A31",
          brighter: "#2E3038",
          dim: "#11131A",
        },
        onSurface: {
          DEFAULT: "#C5C6D0",
          mid: "#C5C6D0",
          disabled: "#8F9099",
        },
        background: {
          DEFAULT: "#0B0E15",
          dim: "#000000",
          dim64: "#141414",
        },
        border: {
          dark: "#1D1F27",
          light: "#2D3440",
        },
        accent: {
          green: "#36B37E",
          warning: "#FFAB00",
          error: {
            DEFAULT: "#C74E5B",
            bright: "#FFB2B6",
            brighter: "#FFEDEC",
            dim: "#270005",
          },
        },
      },
    },
  },
  plugins: [],
};
