import type { ReactNode } from 'react'

interface ButtonProps {
    text?: string
    onClick?: () => void
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'accent' | 'danger'
    className?: string
    children?: ReactNode
}

export default function Button({
    text,
    onClick,
    disabled = false,
    size = 'md',
    variant = 'primary',
    className = '',
    children
}: ButtonProps) {
    const sizeClass = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
    }

    const variantClass = {
        primary: 'bg-primary text-white hover:bg-opacity-90',
        secondary: 'bg-secondary text-white hover:bg-opacity-90',
        accent: 'bg-accent text-primary hover:bg-opacity-90',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    }

    const baseClass = 'rounded-lg font-semibold transition-all duration-200 bg-primary text-white'
    const disabledClass = disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60' : 'cursor-pointer'

    const finalClass = disabled 
        ? `${baseClass} ${sizeClass[size]} ${disabledClass} ${className}`
        : `${baseClass} ${sizeClass[size]} ${variantClass[variant]} ${className}`

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={finalClass}
        >
            {children || text}
        </button>
    )
}
