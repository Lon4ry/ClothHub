import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error = false, fullWidth = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          'flex h-10 rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-red-500 focus:ring-red-500': error,
            'w-full': fullWidth,
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;