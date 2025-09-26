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
import { ProductCard, ProductFilter } from '@/entities/product';

export default function MenCatalog() {
  const [cartCount, setCartCount] = useState(3);
  const [currentSort, setCurrentSort] = useState('popularity');

  // Mock data for men's products
  const menProducts = [
    {
      id: 'men1',
      name: 'Классическая мужская рубашка',
      price: 3299,
      originalPrice: 4299,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.6,
      reviewCount: 143,
      isNew: true,
      isOnSale: true,
      inStock: true,
    },
    {
      id: 'men2',
      name: 'Мужские джинсы прямого кроя',
      price: 4890,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      brand: 'Denim Co',
      rating: 4.4,
      reviewCount: 89,
      isNew: false,
      isOnSale: false,
      inStock: true,
    },
    {
      id: 'men3',
      name: 'Повседневная мужская футболка',
      price: 1590,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.2,
      reviewCount: 67,
      isNew: false,
      isOnSale: false,
      inStock: true,
    },
    {
      id: 'men4',
      name: 'Мужской пиджак классический',
      price: 8999,
      originalPrice: 12999,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      brand: 'Formal Wear',
      rating: 4.8,
      reviewCount: 234,
      isNew: false,
      isOnSale: true,
      inStock: true,
    },
    {
      id: 'men5',
      name: 'Спортивные мужские кроссовки',
      price: 6799,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      brand: 'SportWear',
      rating: 4.7,
      reviewCount: 198,
      isNew: true,
      isOnSale: false,
      inStock: true,
    },
    {
      id: 'men6',
      name: 'Мужские брюки чинос',
      price: 3790,
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.3,
      reviewCount: 112,
      isNew: false,
      isOnSale: false,
      inStock: false,
    },
  ];

  const menFilters = {
    categories: [
      { id: 'shirts', label: 'Рубашки', count: 32 },
      { id: 'jeans', label: 'Джинсы', count: 24 },
      { id: 'tshirts', label: 'Футболки', count: 18 },
      { id: 'blazers', label: 'Пиджаки', count: 15 },
      { id: 'shoes', label: 'Обувь', count: 28 },
      { id: 'pants', label: 'Брюки', count: 21 },
    ],
    brands: [
      { id: 'clothhub', label: 'ClothHub', count: 45 },
      { id: 'denim-co', label: 'Denim Co', count: 18 },
      { id: 'formal-wear', label: 'Formal Wear', count: 12 },
      { id: 'sportwear', label: 'SportWear', count: 25 },
    ],
    sizes: [
      { id: 'xs', label: 'XS', count: 8 },
      { id: 's', label: 'S', count: 22 },
      { id: 'm', label: 'M', count: 35 },
      { id: 'l', label: 'L', count: 28 },
      { id: 'xl', label: 'XL', count: 21 },
      { id: 'xxl', label: 'XXL', count: 12 },
    ],
  };

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
        onCartClick={() => console.log('Cart clicked')}
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

        {/* Filters and Sort */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground/60">Найдено товаров: {menProducts.length}</span>
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
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Фильтры</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductFilter filters={menFilters} />
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {menProducts.map(product => (
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}