/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: { 
        'mybg': "url(img/Background.png)"
      },
      textColor:{
        'pinky' : "#f98ca4",
        'greeny': "#65f283",
        'orangy':"#f5b10b",
        'skyblue':"#4ad9db",
        'indigo': "#722458"
      }
    },
  },
  plugins: [],
}
