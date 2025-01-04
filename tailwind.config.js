/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        screens: {
            mob: '580px',
            // => @media (min-width: 640px) { ... }
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fadeIn 0.5s forwards',
            },
            lineClamp: {
                7: '7',
                8: '8',
                9: '9',
                10: '10',
                12: '12',
                14: '14',
                16: '16',
                20: '20',
            },
            fontFamily: {
                inter: ['var(--font-inter)', 'sans-serif'], // Default font (Inter)
                crimson: ['var(--font-crimson)', 'serif'], // Crimson Pro
            },
            boxShadow: {
                'btn-default':
                    '0px 1px 2px 0px rgba(0, 0, 0, 0.15), 0px -1px 1px 0px rgba(0, 0, 0, 0.20) inset',
                'btn-hover':
                    '0px -3px 3px 0px rgba(148, 163, 184, 0.20) inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.15)',
                'btn-active': '0px 1px 0px 0px rgba(0, 0, 0, 0.10) inset',
                'input-default': '0px -1px 3px 0px rgba(0, 0, 0, 0.05) inset',
                'input-hover': '0px 4px 16px 0px rgba(2, 6, 23, 0.04)',
                'card-light': '0px 4px 15px 0px rgba(0, 0, 0, 0.05)',
                'card-md': '0px 0px 4px 0px rgba(0, 0, 0, 0.05)',
                dialog: '0px 4px 8px 0px rgba(0, 0, 0, 0.05), 0px 8px 20px 0px rgba(0, 0, 0, 0.10)',
                'source-card': '0px 2px 4px 0px rgba(15, 23, 42, 0.05)',
            },
            backgroundImage: {
                'gradient-light':
                    'linear-gradient(180deg, #FFF 40%, #F9FAFB 100%)',
                'gradient-md':
                    'linear-gradient(180deg, #FFF -20.08%, #F9FAFB 100%)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
