import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'inline-flex items-center rounded-full font-medium',
          
          // Size styles
          {
            'px-2 py-1 text-xs': size === 'sm',
            'px-3 py-1.5 text-sm': size === 'md',
          },
          
          // Variant styles
          {
            'bg-foreground text-background': variant === 'default',
            'bg-foreground/10 text-foreground': variant === 'secondary',
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': variant === 'success',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': variant === 'warning',
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': variant === 'danger',
          },
          
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;