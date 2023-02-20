/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '1040px',
			xl: '1440px',
		},
		colors: {
			'main-bg': '#151821',
			'main-accent': '#ea3957',
			'main-accent-hover': '#9d263a',
			'main-text': '#c0c8c6',
			'main-text-hover': '#767b7a',
			'alt-accent': '#dd8970',
			'main-subtle': '#454f6d',
			'main-subtle-hover': '#2d3347',
			'main-code-bg': '#282a36',
			// 'footer-text'
		},
		fontFamily: {
			sans: ['sans-serif'],
			serif: ['Times New Roman', 'serif'],
		},
		extend: {
			spacing: {
			'128': '32rem',
			'144': '36rem',
			},
			borderRadius: {
			'4xl': '2rem',
			}
		}
	},
	
	plugins: [],
}
