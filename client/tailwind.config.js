/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "radial-gradient":
          "radial-gradient( 604.28% 144.07% at 3.13% 0%, #742138 23.43%, #A878BF 100%)",
        "gradient-radial":
          "radial-gradient( 604.28% 144.07% at 3.13% 0%, #820025 35.64%, #A95BCD 100%)",
      },
      colors: {
        red: {
          default: "AF2758",
          100: "#FFE1EA",
          200: "#FFB1C8",
          300: "#FF6390",
          400: "#FF1659",
          500: "#C70039",
          600: "#95002B",
          700: "#64001D",
          800: "#32000E",
          900: "#200009",
        },
        purple: {
          100: "#F4EBF2",
          200: "#EFC4E2",
          300: "#DF89C6",
          400: "#CF4FA9",
          500: "#A62D82",
          600: "#7D2262",
          700: "#531741",
          800: "#411032",
          900: "#2A0B21",
        },
        beige: {
          100: "#FAF1ED",
          200: "#F3E4DD",
          300: "#E8CABB",
          400: "#DCAF99",
          500: "#D19477",
          600: "#B8653E",
          700: "#7B4429",
          800: "#612F16",
          900: "#3D2215",
        },
        gray: {
          100: "#F6F7FC",
          200: "#F1F2F6",
          300: "#E4E6ED",
          400: "#D6D9E4",
          500: "#C8CCDB",
          600: "#9AA1B9",
          700: "#646D89",
          800: "#424C6B",
          900: "#2A2E3F",
        },
        yellow: {
          100: "#FFF6D4",
          500: "#393735",
        },
        green: {
          100: "#E7FFE7",
          500: "#197418",
        },
        blue: {
          500: "#191C77",
        },
        white: "#FFF",
        black: "#000",
        bg: "#160404",
        main: "#FCFCFE",
      },
    },
  },
  plugins: [require("daisyui")],
};
