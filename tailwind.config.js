/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
        "./app/app.vue",
    ],
    theme: {
        extend: {
            colors: {
                'cinema-gold': '#F5B700',
                'cinema-dark': '#050510',
            },
            fontFamily: {
                display: ['"Special Gothic Expanded One"', 'sans-serif'],
                body: ['Lexend', 'sans-serif'],
                ibm: ['"IBM Plex Sans"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
