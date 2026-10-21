function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `color-mix(in srgb, var(${variableName}) calc(${opacityValue} * 100%), transparent)`;
    }
    return `var(${variableName})`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
    "!./js/tailwind.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          300: withOpacity("--brand-300"),
          400: withOpacity("--brand-400"),
          500: withOpacity("--brand-500"),
          600: withOpacity("--brand-600"),
          700: withOpacity("--brand-700"),
          800: withOpacity("--brand-800"),
          900: withOpacity("--brand-900"),
          950: withOpacity("--brand-950")
        }
      }
    }
  },
  plugins: []
};
