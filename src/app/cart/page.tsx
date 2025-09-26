'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
} from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { CartItem } from '@/features/cart';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Классическая рубашка из хлопка',
      price: 2999,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      size: 'M',
      color: 'Белый',
      quantity: 2,
      inStock: true,
    },
    {
      id: '2',
      name: 'Мужские джинсы прямого кроя',
      price: 4890,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      brand: 'Denim Co',
      size: 'L',
      color: 'Синий',
      quantity: 1,
      inStock: true,
    },
    {
      id: '3',
      name: 'Спортивные кроссовки',
      price: 6799,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      brand: 'SportWear',
      size: '42',
      color: 'Черный',
      quantity: 1,
      inStock: true,
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  // Smart cart suggestions based on current items
  const smartSuggestions = [
    {
      id: 'suggest1',
      name: 'Носки мужские (3 пары)',
      price: 899,
      image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.3,
      reviewCount: 156,
      isNew: false,
      isOnSale: false,
      inStock: true,
      reason: 'Идеально подойдет к вашим кроссовкам',
    },
    {
      id: 'suggest2',
      name: 'Ремень кожаный классический',
      price: 1590,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      brand: 'Leather Co',
      rating: 4.5,
      reviewCount: 89,
      isNew: false,
      isOnSale: false,
      inStock: true,
      reason: 'Отлично дополнит ваши джинсы',
    },
    {
      id: 'suggest3',
      name: 'Футболка базовая белая',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.4,
      reviewCount: 234,
      isNew: false,
      isOnSale: true,
      inStock: true,
      reason: 'Базовая вещь для вашего гардероба',
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const deliveryFee = subtotal >= 3000 ? 0 : 299;
  const total = subtotal - discount + deliveryFee;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setIsPromoApplied(true);
    } else {
      alert('Неверный промокод');
    }
  };

  const handleAddSuggestion = (productId: string) => {
    console.log('Adding suggestion to cart:', productId);
    // In real app, this would add the suggested item to cart
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        user={{ name: 'Иван Петров' }}
        onSearch={(query) => console.log('Search:', query)}
        onCartClick={() => console.log('Cart clicked')}
        onProfileClick={() => console.log('Profile clicked')}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <Link href="/" className="hover:text-foreground">Главная</Link>
            <span>/</span>
            <span className="text-foreground">Корзина</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Корзина покупок</h1>
          <p className="text-foreground/70">
            {cartItems.length} {cartItems.length === 1 ? 'товар' : 'товара'} в корзине
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.id} variant="bordered">
                <CardContent className="p-4">
                  <CartItem
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    onToggleFavorite={(id) => console.log('Toggle favorite:', id)}
                    isFavorite={false}
                  />
                </CardContent>
              </Card>
            ))}

            {cartItems.length === 0 && (
              <Card variant="bordered" className="text-center py-12">
                <CardContent>
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 mx-auto mb-4 bg-foreground/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5.4M7 13v8a2 2 0 01-2 2H3m2-10h12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ваша корзина пуста</h3>
                    <p className="text-foreground/70 mb-6">Добавьте товары в корзину, чтобы оформить заказ</p>
                    <Link href="/men">
                      <Button size="lg">Перейти к покупкам</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card variant="bordered" className="sticky top-4">
              <CardHeader>
                <CardTitle>Итого по заказу</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span>{subtotal.toLocaleString()} ₽</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Скидка по промокоду</span>
                      <span>-{discount.toLocaleString()} ₽</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                      {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}
                    </span>
                  </div>
                  
                  {deliveryFee > 0 && (
                    <p className="text-sm text-foreground/60">
                      Бесплатная доставка от 3000 ₽
                    </p>
                  )}
                </div>

                <hr className="border-foreground/10" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>К оплате</span>
                  <span>{total.toLocaleString()} ₽</span>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-foreground/20 rounded-md text-sm bg-background"
                      disabled={isPromoApplied}
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleApplyPromo}
                      disabled={isPromoApplied || !promoCode}
                    >
                      {isPromoApplied ? 'Применен' : 'Применить'}
                    </Button>
                  </div>
                  {isPromoApplied && (
                    <p className="text-sm text-green-600">✓ Промокод WELCOME10 применен</p>
                  )}
                </div>

                <Button size="lg" className="w-full" disabled={cartItems.length === 0}>
                  Оформить заказ
                </Button>

                <div className="text-center">
                  <Link href="/men" className="text-sm text-foreground/60 hover:text-foreground">
                    Продолжить покупки
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Smart Suggestions */}
        {cartItems.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Умные рекомендации</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {smartSuggestions.map(product => (
                <Card key={product.id} variant="bordered">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md"
                      />
                      {product.isOnSale && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                          -{Math.round((1 - product.price / (product.originalPrice || product.price)) * 100)}%
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-foreground/60">{product.brand}</p>
                      <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
                      
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-foreground/20'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-foreground/60">({product.reviewCount})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{product.price.toLocaleString()} ₽</span>
                        {product.originalPrice && (
                          <span className="text-sm text-foreground/50 line-through">
                            {product.originalPrice.toLocaleString()} ₽
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                        💡 {product.reason}
                      </p>

                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleAddSuggestion(product.id)}
                      >
                        Добавить в корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}