'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Card,
} from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ProductCard, ProductFilter } from '@/entities/product';
import { useProducts } from '@/hooks/useProducts';

export default function MenCatalog() {
  const [cartCount, setCartCount] = useState(3);
  const [currentSort, setCurrentSort] = useState('popularity');
  const router = useRouter();

  // Use the products hook
  const {
    products,
    filterOptions,
    priceRange,
    activeFilters,
    loading,
    error,
    handleFiltersChange,
    handlePriceChange,
    handleClearFilters
  } = useProducts('men');

  const handleAddToCart = (productId: string) => {
    setCartCount(prev => prev + 1);
    console.log('Added to cart:', productId);
  };

  const sortOptions = [
    { value: 'popularity', label: 'По популярности' },
    { value: 'price-asc', label: 'По цене: сначала дешевые' },
    { value: 'price-desc', label: 'По цене: сначала дорогие' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'newest', label: 'Сначала новинки' },
  ];

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
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <Link href="/" className="hover:text-foreground">Главная</Link>
            <span>/</span>
            <span className="text-foreground">Мужская одежда</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Мужская одежда</h1>
          <p className="text-foreground/70 max-w-2xl">
            Качественная мужская одежда для повседневной носки и особых случаев. 
            Классические и современные модели от проверенных брендов.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-4"></div>
            <p className="text-foreground/60">Загрузка товаров...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Ошибка: {error}</p>
            <Button onClick={() => window.location.reload()}>
              Попробовать снова
            </Button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Filters and Sort */}
            <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">Найдено товаров: {products.length}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">Сортировать по:</span>
                <select 
                  value={currentSort}
                  onChange={(e) => setCurrentSort(e.target.value)}
                  className="px-3 py-2 border border-foreground/20 rounded-md bg-background"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <ProductFilter
                  filters={filterOptions}
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
                {products.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {products.map(product => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-8">
                      <Button size="lg" variant="outline">
                        Загрузить еще товары
                      </Button>
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
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}