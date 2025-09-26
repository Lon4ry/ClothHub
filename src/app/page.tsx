'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Card, 
  CardContent,
} from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ProductCard, ProductFilter } from '@/entities/product';
import { useProducts } from '@/hooks/useProducts';

export default function Home() {
  const [cartCount, setCartCount] = useState(3);
  const router = useRouter();
  
  // Use the products hook for the main page
  const {
    products: allProducts,
    filterOptions: filters,
    priceRange,
    activeFilters,
    loading,
    error,
    handleFiltersChange,
    handlePriceChange,
    handleClearFilters
  } = useProducts('all');

  const handleAddToCart = (productId: string) => {
    setCartCount(prev => prev + 1);
    console.log('Added to cart:', productId);
  };

  const featuredProducts = allProducts.filter(p => p.isNew || p.isOnSale).slice(0, 3);

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
            <Button size="lg" onClick={() => router.push('/men')}>
              Перейти в каталог
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/about')}>
              Узнать больше
            </Button>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="mb-12">
          <Card variant="elevated" className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-none">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">🔥 Весенняя распродажа</h2>
              <p className="text-lg text-foreground/70 mb-4">Скидки до 50% на всю коллекцию</p>
              <Button size="lg" variant="primary" onClick={() => router.push('/sale')}>
                Посмотреть скидки
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Новинки и скидки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={(id) => router.push(`/product/${id}`)}
              />
            ))}
          </div>
        </section>

        {/* Product Catalog with Filters */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Каталог товаров</h2>
          
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-4"></div>
              <p className="text-foreground/60">Загрузка товаров...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Ошибка: {error}</p>
              <Button onClick={() => window.location.reload()}>
                Попробовать снова
              </Button>
            </div>
          )}

          {!loading && !error && (
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <ProductFilter
                  filters={filters}
                  priceRange={priceRange}
                  activeFilters={activeFilters}
                  onFiltersChange={handleFiltersChange}
                  onPriceChange={handlePriceChange}
                  onClearAll={handleClearFilters}
                  isCollapsible={true}
                />
              </div>
              
              {/* Products Grid */}
              <div className="lg:col-span-3">
                {allProducts.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-foreground/70">
                        Найдено товаров: {allProducts.length}
                      </p>
                      <select className="px-3 py-2 border border-foreground/20 rounded-lg bg-background">
                        <option>По популярности</option>
                        <option>По цене: низкая → высокая</option>
                        <option>По цене: высокая → низкая</option>
                        <option>Сначала новинки</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onQuickView={(id) => router.push(`/product/${id}`)}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <Card variant="bordered" className="p-12 text-center">
                    <div className="text-foreground/60">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                      <p className="mb-4">Попробуйте изменить параметры фильтрации</p>
                      <Button variant="outline" onClick={handleClearFilters}>
                        Сбросить фильтры
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Качественные товары</h3>
                <p className="text-sm text-foreground/70">Тщательно отобранная одежда от проверенных производителей</p>
              </div>
            </Card>
            
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H20a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-sm text-foreground/70">Доставка по всей России в течение 1-3 дней</p>
              </div>
            </Card>
            
            <Card variant="elevated" padding="lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
