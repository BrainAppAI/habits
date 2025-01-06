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
                'source-card': '0px 2px 4px 0px rgba(15, 23, 42, 0.05)',

                // New ones from design. File - Shadows
                peck: '0px 3px 1px 0px rgba(0, 0, 0, 0.02), 0px 2px 1px 0px rgba(0, 0, 0, 0.01), 0px 1px 1px 0px rgba(0, 0, 0, 0.05)',
                stub: '0px 1px 0px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.08), 0px 2px 2px 0px rgba(0, 0, 0, 0.01), 0px 2px 4px 0px rgba(0, 0, 0, 0.04), 0px 1px 1px 0px rgba(0, 0, 0, 0.02)',
                'stub-inset':
                    '0px -16px 12px 0px rgba(0, 0, 0, 0.01) inset, 0px -8px 12px 0px rgba(0, 0, 0, 0.04) inset, 0px -1px 1px 0px rgba(0, 0, 0, 0.24) inset, 0px -1px 0px 0px rgba(0, 0, 0, 0.16) inset',
                bubble: '2px 20px 16px 0px rgba(0, 0, 0, 0.04) inset, 2px 13px 5px 0px rgba(0, 0, 0, 0.01) inset, 2px 7px 16px 0px rgba(0, 0, 0, 0.04) inset, 2px 3px 6px 0px rgba(0, 0, 0, 0.06) inset, 2px 1px 8px 0px rgba(0, 0, 0, 0.08) inset, 0px 20px 6px 0px rgba(0, 0, 0, 0.01), 0px 13px 5px 0px rgba(0, 0, 0, 0.02), 0px 7px 4px 0px rgba(0, 0, 0, 0.02), 0px 3px 5px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.10)',
                lozenge:
                    '-0.5px 1px 8px 0px rgba(255, 255, 255, 0.20) inset, 0.5px 1px 1px 0px rgba(255, 255, 255, 0.30) inset, 0px -1px 1px 0px rgba(255, 255, 255, 0.30) inset, 0px -16px 8px 0px rgba(0, 0, 0, 0.01) inset, 0px -7px 12px 0px rgba(0, 0, 0, 0.04) inset, 0px -4px 8px 0px rgba(0, 0, 0, 0.08) inset, 0px -1px 1px 0px rgba(0, 0, 0, 0.16) inset, 0px 0px 1px 0px rgba(0, 0, 0, 0.16) inset',
                raised: '0px 6px 3px 0px rgba(0, 0, 0, 0.04), 0px 2px 2px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.08), 0px -4px 1px 0px rgba(0, 0, 0, 0.01), 0px -2px 1px 0px rgba(0, 0, 0, 0.04), 0px -1px 1px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
                popup: '0px 5px 2px 0px rgba(0, 0, 0, 0.01), 0px 3px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 1px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
                dialog: '0px 40px 80px 0px rgba(0, 0, 0, 0.01), 0px 80px 24px 0px rgba(0, 0, 0, 0.03), 0px 48px 24px 0px rgba(0, 0, 0, 0.04), 0px 20px 20px 0px rgba(0, 0, 0, 0.12), 0px 4px 12px 0px rgba(0, 0, 0, 0.14)',
                'soft-inset':
                    '0px 16px 8px 0px rgba(0, 0, 0, 0.01) inset, 0px 8px 16px 0px rgba(0, 0, 0, 0.04) inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.12) inset',
                'hard-inset':
                    '0px 16px 8px 0px rgba(0, 0, 0, 0.04) inset, 0px 8px 16px 0px rgba(0, 0, 0, 0.12) inset, 0px 1px 4px 0px rgba(0, 0, 0, 0.24) inset',
                'bottom-light':
                    '0px -13px 5px 0px rgba(0, 0, 0, 0.01), 0px -8px 4px 0px rgba(0, 0, 0, 0.04), 0px -3px 3px 0px rgba(0, 0, 0, 0.08), 0px -1px 2px 0px rgba(0, 0, 0, 0.08)',
                'top-light':
                    '0px 13px 5px 0px rgba(0, 0, 0, 0.01), 0px 8px 4px 0px rgba(0, 0, 0, 0.04), 0px 3px 3px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.08)',
                'left-light':
                    '8px 12px 4px 0px rgba(0, 0, 0, 0.01), 4px 8px 4px 0px rgba(0, 0, 0, 0.01), 2px 6px 4px 0px rgba(0, 0, 0, 0.04), 1px 2px 2px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.08)',
                'right-light':
                    '-8px 12px 4px 0px rgba(0, 0, 0, 0.01), -4px 8px 4px 0px rgba(0, 0, 0, 0.01), -2px 6px 4px 0px rgba(0, 0, 0, 0.04), -1px 2px 2px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.08)',
                'hard-lift':
                    '0px 13px 5px 0px rgba(0, 0, 0, 0.01), 0px 8px 16px 0px rgba(0, 0, 0, 0.12), 0px 3px 3px 0px rgba(0, 0, 0, 0.16), 0px 1px 2px 0px rgba(0, 0, 0, 0.16)',
            },
            backgroundImage: {
                'gradient-light':
                    'linear-gradient(180deg, #FFF 40%, #F9FAFB 100%)',
                'gradient-md':
                    'linear-gradient(180deg, #FFF -20.08%, #F9FAFB 100%)',
                'gradient-brain-dark':
                    'linear-gradient(180deg, #0F172A 71.74%, #6366F1 110.37%)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
