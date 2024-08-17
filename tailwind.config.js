/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/**.tsx"],
  theme: {
    extend: {
       screens: {
        mbl: { max: "630px" },
      },
      fontFamily: {
        urbaneLight:'Urbane Light, Roboto, sans-serif',
        urbaneBold:'Urbane Bold, Roboto, sans-serif',
      },
      backgroundImage: {
        heroSection:'url(../src/assets/hero-img-mbl.webp)',
      },
      colors: {
        green: {
          100: "#e0f5f5",
          200: "#c1ebeb",
          300: "#a1e2e0",
          400: "#82d8d6",
          500: "#63cecc",
          600: "#4fa5a3",
          700: "#3b7c7a",
          800: "#285252",
          900: "#142929"
        },
        blue: {
          100: "#ccd7df",
          200: "#99aebf",
          300: "#66869e",
          400: "#335d7e",
          500: "#00355e",
          600: "#002a4b",
          700: "#002038",
          800: "#001526",
          900: "#000b13"
        },
        gray: {
          50: "#eeeeee",
          100: "#d2d2d2",
          200: "#b5b5b5",
          300: "#777777",
          400: "#494949",
          500: "#1c1c1c",
          600: "#161616",
          700: "#111111",
          800: "#0b0b0b",
          900: "#060606"
},
      }
    },
  },
  plugins: [],
}

