// tailwind doesn't quote fonts for you...
let cjkFallback = [
  "'Noto Sans CJK TC'",
  "'Microsoft Jhenghei'",
  "'Microsoft Yahei'",
  "Meiryo",
  "'Malgun Gothic'",
];

module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.js"],
  theme: {
    fontFamily: {
      sans: ["'M PLUS 1p'", ...cjkFallback, "sans-serif"],
      // serif: ["Equity"],
    },
    extend: {
      // https://github.com/tailwindlabs/tailwindcss/discussions/1361
      colors: {
        inherit: "inherit",
        gr: "#c9f5e8",
        gl: "#f8f0e1",
        pc: "#eed8f0",
      },
    },
  },
};
