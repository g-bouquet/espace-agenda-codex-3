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
                        lg: '1rem',
                        md: '0.75rem',
                        sm: '0.5rem'
                },
                colors: {
                        background: '#F9F6F0',
                        foreground: '#2C352D',
                        card: {
                                DEFAULT: '#FFFFFF',
                                foreground: '#2C352D'
                        },
                        popover: {
                                DEFAULT: '#FFFFFF',
                                foreground: '#2C352D'
                        },
                        primary: {
                                DEFAULT: '#5A7161',
                                foreground: '#FFFFFF',
                                hover: '#47594D'
                        },
                        secondary: {
                                DEFAULT: '#2C352D',
                                foreground: '#FFFFFF'
                        },
                        terracotta: {
                                DEFAULT: '#C27A62',
                                hover: '#A6654F',
                                foreground: '#FFFFFF'
                        },
                        muted: {
                                DEFAULT: '#F4F0E8',
                                foreground: '#5E6C60'
                        },
                        accent: {
                                DEFAULT: '#C27A62',
                                foreground: '#FFFFFF'
                        },
                        destructive: {
                                DEFAULT: '#ef4444',
                                foreground: '#ffffff'
                        },
                        border: '#E2DFD8',
                        input: '#E2DFD8',
                        ring: '#5A7161',
                        chart: {
                                '1': '#5A7161',
                                '2': '#C27A62',
                                '3': '#5E6C60',
                                '4': '#F4F0E8',
                                '5': '#2C352D'
                        }
                },
                keyframes: {
                        'accordion-down': {
                                from: { height: '0' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'accordion-up': {
                                from: { height: 'var(--radix-accordion-content-height)' },
                                to: { height: '0' }
                        },
                        'fade-in-up': {
                                '0%': { opacity: '0', transform: 'translateY(24px)' },
                                '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        'fade-in': {
                                '0%': { opacity: '0' },
                                '100%': { opacity: '1' }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'fade-in-up': 'fade-in-up 0.7s ease-out both',
                        'fade-in': 'fade-in 0.6s ease-out both'
                },
                fontFamily: {
                        'sans': ['Manrope', 'sans-serif'],
                        'heading': ['Cormorant Garamond', 'Georgia', 'serif']
                },
                boxShadow: {
                        'warm-sm': '0 2px 8px rgba(90, 113, 97, 0.06)',
                        'warm-md': '0 8px 24px rgba(90, 113, 97, 0.10)',
                        'warm-lg': '0 16px 40px rgba(90, 113, 97, 0.14)',
                        'warm-xl': '0 24px 60px rgba(90, 113, 97, 0.16)'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
