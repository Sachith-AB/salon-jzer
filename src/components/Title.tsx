import type { ReactNode } from 'react'

interface TitleProps {
    text: string
    size?: 'xs' | 'sm' | 'base' | 'large'| 'xl' | 'dxl' | 'txl' | 'fvxl' | 'fixl' | 'sxl' | 'sexl' | 'nxl'
    color?: 'primary' | 'white' | 'secondary' | 'accent'
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
    children?: ReactNode
}

export default function Title({ text, size = 'large', color = 'white', weight = 700, children }: TitleProps) {
    const sizeClass = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        large: 'text-lg',
        xl: 'text-xl',
        dxl: 'text-2xl',
        txl: 'text-3xl',
        fvxl: 'text-4xl',
        fixl: 'text-5xl',
        sxl: 'text-6xl',
        sexl: 'text-7xl',
        nxl: 'text-8xl',
    }

    const colorClass = {
        primary: 'text-primary',
        white: 'text-white',
        secondary: 'text-secondary',
        accent: 'text-accent',
    }

    const weightClass = {
        100: 'font-thin',
        200: 'font-extralight',
        300: 'font-light',
        400: 'font-normal',
        500: 'font-medium',
        600: 'font-semibold',
        700: 'font-bold',
        800: 'font-extrabold',
        900: 'font-black',
    }

    return (
        <div>
            <h1 className={`${sizeClass[size]} ${weightClass[weight]} ${colorClass[color]} mb-6`}>{text}</h1>
            {children}
        </div>
    )
}
