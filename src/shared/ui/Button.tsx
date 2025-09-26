import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    loading = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        className={clsx(
          // Base styles
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          
          // Variant styles
          {
            'bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground': variant === 'primary',
            'bg-background text-foreground border border-foreground hover:bg-foreground hover:text-background focus:ring-foreground': variant === 'secondary',
            'border border-foreground/20 hover:bg-foreground/5 hover:border-foreground/40 focus:ring-foreground': variant === 'outline',
            'hover:bg-foreground/5 focus:ring-foreground': variant === 'ghost',
            'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500': variant === 'danger',
          },
          
          // Size styles
          {
            'text-sm px-3 py-1.5 min-h-8': size === 'sm',
            'text-sm px-4 py-2 min-h-10': size === 'md',
            'text-base px-6 py-3 min-h-12': size === 'lg',
          },
          
          // Full width
          {
            'w-full': fullWidth,
          },
          
          // Loading state
          {
            'cursor-not-allowed': loading,
          },
          
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;