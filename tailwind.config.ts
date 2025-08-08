import type { Config } from "tailwindcss"
import lineClamp from '@tailwindcss/line-clamp'

const config: Config = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
}
export default config
