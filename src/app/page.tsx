'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Badge,
} from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ProductCard, ProductFilter } from '@/entities/product';
import { CartItem } from '@/features/cart';

export default function Home() {
  const [cartCount, setCartCount] = useState(3);
  const router = useRouter();
  
  // Mock data for demonstration
  const sampleProducts = [
    {
      id: '1',
      name: 'Классическая рубашка из хлопка',
      price: 2999,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      isOnSale: true,
      inStock: true,
    },
    {
      id: '2',
      name: 'Джинсы slim fit',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      brand: 'Denim Co',
      rating: 4.2,
      reviewCount: 89,
      isNew: false,
      isOnSale: false,
      inStock: true,
    },
    {
      id: '3',
      name: 'Кроссовки городские',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      brand: 'SportWear',
      rating: 4.8,
      reviewCount: 256,
      isNew: false,
      isOnSale: false,
      inStock: false,
    },
  ];

  const sampleFilters = {
    categories: [
      { id: 'shirts', label: 'Рубашки', count: 45 },
      { id: 'jeans', label: 'Джинсы', count: 32 },
      { id: 'shoes', label: 'Обувь', count: 78 },
    ],
    brands: [
      { id: 'clothhub', label: 'ClothHub', count: 12 },
      { id: 'denim-co', label: 'Denim Co', count: 8 },
      { id: 'sportwear', label: 'SportWear', count: 15 },
    ],
    sizes: [
      { id: 'xs', label: 'XS', count: 5 },
      { id: 's', label: 'S', count: 15 },
      { id: 'm', label: 'M', count: 28 },
      { id: 'l', label: 'L', count: 22 },
      { id: 'xl', label: 'XL', count: 18 },
    ],
  };

  const sampleCartItem = {
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
  };

  const handleAddToCart = (productId: string) => {
    setCartCount(prev => prev + 1);
    console.log('Added to cart:', productId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartCount}
        user={{ name: 'Иван Петров' }}
        onSearch={(query) => console.log('Search:', query)}
        onCartClick={() => router.push('/cart')}
        onProfileClick={() => console.log('Profile clicked')}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ClothHub
          </h1>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Современный интернет-магазин качественной одежды для подростков и взрослых до 40 лет
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg">
              Перейти в каталог
            </Button>
            <Button size="lg" variant="outline">
              Узнать больше
            </Button>
          </div>
        </section>

        {/* Component Showcase */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Компоненты ClothHub</h2>
          
          {/* UI Components Demo */}
          <Card className="mb-8" variant="bordered">
            <CardHeader>
              <CardTitle>Базовые UI компоненты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Buttons */}
                <div>
                  <h4 className="font-medium mb-3">Кнопки</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="primary">Основная</Button>
                    <Button variant="secondary">Вторичная</Button>
                    <Button variant="outline">Контурная</Button>
                    <Button variant="ghost">Прозрачная</Button>
                    <Button variant="danger">Опасная</Button>
                    <Button loading>Загрузка</Button>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <h4 className="font-medium mb-3">Значки</h4>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="default">По умолчанию</Badge>
                    <Badge variant="secondary">Вторичный</Badge>
                    <Badge variant="success">Успех</Badge>
                    <Badge variant="warning">Предупреждение</Badge>
                    <Badge variant="danger">Опасность</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Cards Demo */}
          <Card className="mb-8" variant="bordered">
            <CardHeader>
              <CardTitle>Карточки товаров</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={(id) => console.log('Quick view:', id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filter Demo */}
          <div className="grid lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-1">
              <ProductFilter
                filters={sampleFilters}
                priceRange={{
                  min: 0,
                  max: 50000,
                  current: { min: 1000, max: 10000 }
                }}
                onFiltersChange={(filters) => console.log('Filters:', filters)}
                onPriceChange={(range) => console.log('Price range:', range)}
                onClearAll={() => console.log('Clear all filters')}
                isCollapsible={true}
              />
            </div>
            <div className="lg:col-span-3">
              <Card variant="bordered" className="h-64 flex items-center justify-center">
                <div className="text-center text-foreground/60">
                  <p className="text-lg mb-2">Здесь будет каталог товаров</p>
                  <p className="text-sm">с примененными фильтрами</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Cart Item Demo */}
          <Card className="mb-8" variant="bordered">
            <CardHeader>
              <CardTitle>Элемент корзины</CardTitle>
            </CardHeader>
            <CardContent>
              <CartItem
                item={sampleCartItem}
                onQuantityChange={(id, quantity) => console.log('Quantity changed:', id, quantity)}
                onRemove={(id) => console.log('Remove item:', id)}
                onToggleFavorite={(id) => console.log('Toggle favorite:', id)}
                isFavorite={false}
              />
            </CardContent>
          </Card>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Качественные товары</h3>
                <p className="text-sm text-foreground/70">Тщательно отобранная одежда от проверенных производителей</p>
              </div>
            </Card>
            
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H20a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-sm text-foreground/70">Доставка по всей России в течение 1-3 дней</p>
              </div>
            </Card>
            
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Выгодные цены</h3>
                <p className="text-sm text-foreground/70">Конкурентные цены и регулярные скидки для клиентов</p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
