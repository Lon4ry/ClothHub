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

export default function Home() {
  const [cartCount, setCartCount] = useState(3);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const router = useRouter();
  
  // Expanded product catalog data for a real store
  const allProducts = [
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
      category: 'shirts',
      size: ['S', 'M', 'L', 'XL'],
      color: ['white', 'blue', 'black'],
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
      category: 'jeans',
      size: ['S', 'M', 'L', 'XL'],
      color: ['blue', 'black'],
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
      category: 'shoes',
      size: ['40', '41', '42', '43', '44'],
      color: ['white', 'black'],
    },
    {
      id: '4',
      name: 'Худи с принтом',
      price: 3499,
      originalPrice: 4299,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.6,
      reviewCount: 94,
      isNew: true,
      isOnSale: true,
      inStock: true,
      category: 'hoodies',
      size: ['S', 'M', 'L', 'XL'],
      color: ['gray', 'black', 'navy'],
    },
    {
      id: '5',
      name: 'Легкая куртка',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
      brand: 'OutdoorWear',
      rating: 4.3,
      reviewCount: 67,
      isNew: false,
      isOnSale: false,
      inStock: true,
      category: 'jackets',
      size: ['S', 'M', 'L', 'XL'],
      color: ['black', 'khaki', 'navy'],
    },
    {
      id: '6',
      name: 'Базовая футболка',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.4,
      reviewCount: 203,
      isNew: false,
      isOnSale: false,
      inStock: true,
      category: 'tshirts',
      size: ['S', 'M', 'L', 'XL'],
      color: ['white', 'black', 'gray', 'navy'],
    }
  ];

  const filters = {
    categories: [
      { id: 'shirts', label: 'Рубашки', count: 1 },
      { id: 'jeans', label: 'Джинсы', count: 1 },
      { id: 'shoes', label: 'Обувь', count: 1 },
      { id: 'hoodies', label: 'Худи', count: 1 },
      { id: 'jackets', label: 'Куртки', count: 1 },
      { id: 'tshirts', label: 'Футболки', count: 1 },
    ],
    brands: [
      { id: 'clothhub', label: 'ClothHub', count: 3 },
      { id: 'denim-co', label: 'Denim Co', count: 1 },
      { id: 'sportwear', label: 'SportWear', count: 1 },
      { id: 'outdoorwear', label: 'OutdoorWear', count: 1 },
    ],
    sizes: [
      { id: 's', label: 'S', count: 5 },
      { id: 'm', label: 'M', count: 5 },
      { id: 'l', label: 'L', count: 5 },
      { id: 'xl', label: 'XL', count: 5 },
    ],
    colors: [
      { id: 'white', label: 'Белый', count: 3 },
      { id: 'black', label: 'Черный', count: 5 },
      { id: 'blue', label: 'Синий', count: 2 },
      { id: 'gray', label: 'Серый', count: 2 },
      { id: 'navy', label: 'Темно-синий', count: 3 },
    ],
  };

  // Initialize filtered products
  useState(() => {
    setFilteredProducts(allProducts);
  });

  const handleAddToCart = (productId: string) => {
    setCartCount(prev => prev + 1);
    console.log('Added to cart:', productId);
  };

  const handleFiltersChange = (newFilters: Record<string, string[]>) => {
    setActiveFilters(newFilters);
    applyFilters(newFilters, priceRange);
  };

  const handlePriceChange = (newPriceRange: { min: number; max: number }) => {
    setPriceRange(newPriceRange);
    applyFilters(activeFilters, newPriceRange);
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setPriceRange({ min: 0, max: 50000 });
    setFilteredProducts(allProducts);
  };

  const applyFilters = (filters: Record<string, string[]>, priceFilter: { min: number; max: number }) => {
    let filtered = [...allProducts];

    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    // Apply brand filter
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product => {
        const brandKey = product.brand.toLowerCase().replace(/\s+/g, '-');
        return filters.brands.includes(brandKey);
      });
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceFilter.min && product.price <= priceFilter.max
    );

    setFilteredProducts(filtered);
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
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilter
                filters={filters}
                priceRange={{
                  min: 0,
                  max: 50000,
                  current: priceRange
                }}
                activeFilters={activeFilters}
                onFiltersChange={handleFiltersChange}
                onPriceChange={handlePriceChange}
                onClearAll={handleClearFilters}
                isCollapsible={true}
              />
            </div>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-foreground/70">
                      Найдено товаров: {filteredProducts.length}
                    </p>
                    <select className="px-3 py-2 border border-foreground/20 rounded-lg bg-background">
                      <option>По популярности</option>
                      <option>По цене: низкая → высокая</option>
                      <option>По цене: высокая → низкая</option>
                      <option>Сначала новинки</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
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
