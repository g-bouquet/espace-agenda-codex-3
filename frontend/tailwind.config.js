/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: '10px',
  			md: '8px',
  			sm: '6px'
  		},
  		colors: {
  			background: '#ffffff',
  			foreground: '#1a1a1a',
  			card: {
  				DEFAULT: '#ffffff',
  				foreground: '#1a1a1a'
  			},
  			popover: {
  				DEFAULT: '#ffffff',
  				foreground: '#1a1a1a'
  			},
  			primary: {
  				DEFAULT: '#3b4fe4',
  				foreground: '#ffffff',
  				hover: '#2e3fb8'
  			},
  			secondary: {
  				DEFAULT: '#243673',
  				foreground: '#ffffff'
  			},
  			muted: {
  				DEFAULT: '#FAFAFA',
  				foreground: '#6e7180'
  			},
  			accent: {
  				DEFAULT: '#3b4fe4',
  				foreground: '#ffffff'
  			},
  			destructive: {
  				DEFAULT: '#ef4444',
  				foreground: '#ffffff'
  			},
  			border: '#EEEEEE',
  			input: '#EEEEEE',
  			ring: '#3b4fe4',
  			chart: {
  				'1': '#3b4fe4',
  				'2': '#243673',
  				'3': '#6e7180',
  				'4': '#FAFAFA',
  				'5': '#1a1a1a'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in-up': 'fade-in-up 0.6s ease-out',
  			'fade-in': 'fade-in 0.6s ease-out'
  		},
  		fontFamily: {
  			'sans': ['Open Sans', 'sans-serif'],
  			'heading': ['Poppins', 'sans-serif']
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};