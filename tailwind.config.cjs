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

			'main-bg': '#434A42',
			'main-accent': '#586156',
			'main-accent-hover': '#9d263a',
			'main-text': '#C4BBAF',
			'main-text-hover': '#626C66',
			'alt-accent': '#ACA885',
			'main-subtle': '#586156',
			'main-subtle-hover': '#626C66',
			'main-code-bg': '#586156',
 
			// Browns
			// 'main-bg': '#5A2A27',
			// 'main-accent': '#A5978B',
			// 'main-accent-hover': '#5C4742',
			// 'main-text': '#C4BBAF',
			// 'main-text-hover': '#A5978B',
			// 'alt-accent': '#8D5B4C',
			// 'main-subtle': '#8D5B4C',
			// 'main-subtle-hover': '#5C4742',
			// 'main-code-bg': '#8D5B4C'
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
