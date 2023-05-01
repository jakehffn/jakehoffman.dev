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
			// Original
			// 'main-bg': '#151821',
			// 'main-accent': '#ea3957',
			// 'main-accent-hover': '#9d263a',
			// 'main-text': '#c0c8c6',
			// 'main-text-hover': '#767b7a',
			// 'alt-accent': '#dd8970',
			// 'main-subtle': '#454f6d',
			// 'main-subtle-hover': '#2d3347',
			// 'main-code-bg': '#282a36',

			'main-bg': '#2C363F',
			'main-accent': '#E75A7C',
			'main-accent-hover': '#E75A7C',
			'main-text': '#F2F5EA',
			'main-text-hover': '#9fa0a1',
			'alt-accent': '#ACA885',
			'main-subtle': '#4C5C6B',
			'main-subtle-hover': '#667B8F',
			'main-code-bg': '#3B4854'
		},
		fontFamily: {
			sans: ['Roboto', 'Helvetica', 'sans-serif'],
			serif: ['Times New Roman', 'serif'],
			mono: ['Roboto-Mono', 'Courier', 'sans-serif']
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
