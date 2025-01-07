import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex transition-all ease-in-out duration-150 items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                    'border border-red-600 bg-red-500 hover:bg-red-600 active:bg-red-600 text-white shadow-btn-default hover:shadow-btn-hover active:shadow-btn-active',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',

                ghost: 'hover:bg-slate-100 dark:hover:bg-slate-700',
                link: 'hover:text-slate-900 text-slate-700 underline-offset-4 hover:underline',
                primary:
                    'border border-indigo-700 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white shadow-peck hover:shadow-popup active:shadow-soft-inset',
                secondary:
                    'border border-slate-950 bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white shadow-peck hover:shadow-popup active:shadow-soft-inset',
                tertiary:
                    'border border-slate-300 bg-white text-slate-950 shadow-peck hover:shadow-popup active:shadow-soft-inset',
            },
            size: {
                default: 'text-base rounded-xl h-10 px-4 py-1',
                sm: 'text-sm rounded-xl h-8 px-2.5 py-1',
                xs: 'text-xs rounded-lg h-6 px-3',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            props?.onClick?.(e)
        }

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
                onClick={handleClick}
            />
        )
    }
)
Button.displayName = 'Button'

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
