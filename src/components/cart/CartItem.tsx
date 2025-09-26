import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import Button from '../ui/Button';

interface CartItemProps extends HTMLAttributes<HTMLDivElement> {
  item: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    brand?: string;
    size: string;
    color?: string;
    quantity: number;
    inStock?: boolean;
  };
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
  onToggleFavorite?: (itemId: string) => void;
  isFavorite?: boolean;
  layout?: 'default' | 'compact';
}

const CartItem = forwardRef<HTMLDivElement, CartItemProps>(
  ({ 
    className,
    item,
    onQuantityChange,
    onRemove,
    onToggleFavorite,
    isFavorite = false,
    layout = 'default',
    ...props 
  }, ref) => {
    const {
      id,
      name,
      price,
      originalPrice,
      image,
      brand,
      size,
      color,
      quantity,
      inStock = true
    } = item;

    const handleQuantityChange = (newQuantity: number) => {
      if (newQuantity < 1) return;
      if (onQuantityChange) {
        onQuantityChange(id, newQuantity);
      }
    };

    const totalPrice = price * quantity;
    const totalOriginalPrice = originalPrice ? originalPrice * quantity : null;

    return (
      <div
        ref={ref}
        className={clsx(
          'flex gap-4 p-4 border-b border-foreground/10 last:border-b-0',
          {
            'opacity-60': !inStock,
          },
          className
        )}
        {...props}
      >
        {/* Product Image */}
        <div className={clsx(
          'flex-shrink-0 rounded-lg overflow-hidden',
          {
            'w-20 h-20': layout === 'compact',
            'w-24 h-24': layout === 'default',
          }
        )}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0 flex-1">
              {/* Brand */}
              {brand && (
                <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">
                  {brand}
                </p>
              )}

              {/* Product Name */}
              <h3 className={clsx(
                'font-medium text-foreground line-clamp-2 mb-1',
                {
                  'text-sm': layout === 'compact',
                  'text-base': layout === 'default',
                }
              )}>
                {name}
              </h3>

              {/* Attributes */}
              <div className="flex items-center gap-3 text-xs text-foreground/60 mb-2">
                <span>Размер: {size}</span>
                {color && <span>Цвет: {color}</span>}
              </div>

              {/* Stock Status */}
              {!inStock && (
                <p className="text-xs text-red-500 mb-2">
                  Нет в наличии
                </p>
              )}

              {/* Mobile Price & Actions */}
              <div className="sm:hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                    {totalOriginalPrice && totalOriginalPrice > totalPrice && (
                      <span className="text-sm text-foreground/50 line-through">
                        {totalOriginalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={!inStock || quantity <= 1}
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </Button>
                    <span className="min-w-8 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={!inStock}
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1">
                    {onToggleFavorite && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => onToggleFavorite(id)}
                      >
                        <svg 
                          className={clsx('h-4 w-4', {
                            'fill-red-500 text-red-500': isFavorite,
                            'text-foreground/50': !isFavorite,
                          })}
                          fill={isFavorite ? 'currentColor' : 'none'}
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </Button>
                    )}
                    {onRemove && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        onClick={() => onRemove(id)}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Price */}
            <div className="hidden sm:block text-right">
              <div className="flex flex-col items-end gap-1 mb-3">
                <span className="font-semibold text-lg">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
                {totalOriginalPrice && totalOriginalPrice > totalPrice && (
                  <span className="text-sm text-foreground/50 line-through">
                    {totalOriginalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>

              {/* Desktop Quantity Controls */}
              <div className="flex items-center gap-2 mb-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={!inStock || quantity <= 1}
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </Button>
                <span className="min-w-8 text-center text-sm font-medium">
                  {quantity}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={!inStock}
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Button>
              </div>

              {/* Desktop Action Buttons */}
              <div className="flex items-center gap-1 justify-end">
                {onToggleFavorite && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => onToggleFavorite(id)}
                  >
                    <svg 
                      className={clsx('h-4 w-4', {
                        'fill-red-500 text-red-500': isFavorite,
                        'text-foreground/50': !isFavorite,
                      })}
                      fill={isFavorite ? 'currentColor' : 'none'}
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Button>
                )}
                {onRemove && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    onClick={() => onRemove(id)}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CartItem.displayName = 'CartItem';

export default CartItem;