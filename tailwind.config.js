/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            white: '#ffffff',
            black: '#000000',
            primary: '#000000',    // Black
            secondary: '#FFD700',  // Gold
            accent: '#E8E8E8',     // Brighter Silver
            danger: '#E74C3C',     // Red-Pink
        },
    },
    plugins: [],
}
