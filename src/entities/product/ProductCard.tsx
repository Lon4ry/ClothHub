import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { Card, CardContent, CardFooter } from '@/shared/ui/Card';
import Button from '@/shared/ui/Button';
import Badge from '@/shared/ui/Badge';

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    brand?: string;
    rating?: number;
    reviewCount?: number;
    isNew?: boolean;
    isOnSale?: boolean;
    inStock?: boolean;
  };
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  layout?: 'grid' | 'list';
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ 
    className, 
    product, 
    onAddToCart, 
    onQuickView, 
    layout = 'grid',
    ...props 
  }, ref) => {
    const {
      id,
      name,
      price,
      originalPrice,
      image,
      brand,
      rating,
      reviewCount,
      isNew,
      isOnSale,
      inStock = true
    } = product;

    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
      <Card
        ref={ref}
        className={clsx(
          'group cursor-pointer transition-all duration-200 hover:shadow-md',
          {
            'opacity-60': !inStock,
          },
          className
        )}
        variant="bordered"
        padding="none"
        {...props}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={name}
            className={clsx(
              'w-full object-cover transition-transform duration-300 group-hover:scale-105',
              {
                'h-48 sm:h-56': layout === 'grid',
                'h-32 sm:h-40': layout === 'list',
              }
            )}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && <Badge variant="success" size="sm">Новинка</Badge>}
            {isOnSale && discount > 0 && (
              <Badge variant="danger" size="sm">-{discount}%</Badge>
            )}
            {!inStock && <Badge variant="secondary" size="sm">Нет в наличии</Badge>}
          </div>

          {/* Quick actions */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {onQuickView && (
              <Button
                size="sm"
                variant="secondary"
                className="h-9 w-9 p-0 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(id);
                }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Button>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          {/* Brand */}
          {brand && (
            <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">
              {brand}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-foreground/80 transition-colors">
            {name}
          </h3>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={clsx(
                      'h-6 w-6',
                      i < Math.floor(rating) ? 'text-yellow-400' : 'text-foreground/20'
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {reviewCount && (
                <span className="text-xs text-foreground/60">({reviewCount})</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-semibold text-lg">
              {price.toLocaleString('ru-RU')} ₽
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-foreground/50 line-through">
                {originalPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            fullWidth
            disabled={!inStock}
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart && inStock) {
                onAddToCart(id);
              }
            }}
          >
            {inStock ? 'В корзину' : 'Нет в наличии'}
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;