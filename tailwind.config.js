/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        mynord: {
          "color-scheme": "light",
          "primary": "#5E81AC",
          "secondary": "#D8DEE9",
          "accent": "#88C0D0",
          "neutral-content": "#4C566A",
          "neutral": "#D8DEE9",
          "base-100": "#ECEFF4",
          "base-200": "#E5E9F0",
          "base-300": "#D8DEE9",
          "base-content": "#2E3440",
          "info": "#B48EAD",
          "success": "#A3BE8C",
          "warning": "#EBCB8B",
          "error": "#BF616A",
        }
      },
      {
        panrdark: {
          "color-scheme": "dark",
          "primary": "#9FE88D",
          "secondary": "#3b3d42",
          "accent": "#C792E9",
          "neutral": "#1c212b",
          "neutral-content": "#696a70",
          "base-100": "#292a2d",
          "base-200": "#252627",
          "base-content": "#a9a9b3",
          "info": "#28ebff",
          "success": "#62efbd",
          "warning": "#efd057",
          "error": "#ffae9b",
        }
      }
    ],
    "darkTheme": "panrdark"
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
  ],
}
