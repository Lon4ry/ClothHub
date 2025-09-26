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

export default function KidsCatalog() {
  const [cartCount, setCartCount] = useState(3);
  const [currentSort, setCurrentSort] = useState('popularity');

  // Mock data for kids' products
  const kidsProducts = [
    {
      id: 'kids1',
      name: 'Детская футболка с принтом',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=400&fit=crop',
      brand: 'Kids Fun',
      rating: 4.5,
      reviewCount: 87,
      isNew: true,
      isOnSale: false,
      inStock: true,
    },
    {
      id: 'kids2',
      name: 'Детские джинсы',
      price: 2299,
      originalPrice: 2999,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
      brand: 'ClothHub Kids',
      rating: 4.3,
      reviewCount: 64,
      isNew: false,
      isOnSale: true,
      inStock: true,
    },
    {
      id: 'kids3',
      name: 'Детское платье праздничное',
      price: 3599,
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop',
      brand: 'Kids Elegance',
      rating: 4.7,
      reviewCount: 132,
      isNew: false,
      isOnSale: false,
      inStock: true,
    },
    {
      id: 'kids4',
      name: 'Детские кроссовки',
      price: 2799,
      originalPrice: 3599,
      image: 'https://images.unsplash.com/photo-1515396121-ad5086750cde?w=400&h=400&fit=crop',
      brand: 'Kids Sport',
      rating: 4.6,
      reviewCount: 98,
      isNew: false,
      isOnSale: true,
      inStock: true,
    },
    {
      id: 'kids5',
      name: 'Детская куртка зимняя',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      brand: 'ClothHub Kids',
      rating: 4.8,
      reviewCount: 156,
      isNew: true,
      isOnSale: false,
      inStock: true,
    },
    {
      id: 'kids6',
      name: 'Детские шорты летние',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop',
      brand: 'Summer Kids',
      rating: 4.2,
      reviewCount: 43,
      isNew: false,
      isOnSale: false,
      inStock: false,
    },
  ];

  const kidsFilters = {
    categories: [
      { id: 'tshirts', label: 'Футболки', count: 28 },
      { id: 'jeans', label: 'Джинсы', count: 18 },
      { id: 'dresses', label: 'Платья', count: 22 },
      { id: 'shoes', label: 'Обувь', count: 25 },
      { id: 'jackets', label: 'Куртки', count: 15 },
      { id: 'shorts', label: 'Шорты', count: 12 },
    ],
    brands: [
      { id: 'clothhub-kids', label: 'ClothHub Kids', count: 32 },
      { id: 'kids-fun', label: 'Kids Fun', count: 18 },
      { id: 'kids-elegance', label: 'Kids Elegance', count: 14 },
      { id: 'kids-sport', label: 'Kids Sport', count: 21 },
      { id: 'summer-kids', label: 'Summer Kids', count: 9 },
    ],
    sizes: [
      { id: '2-3', label: '2-3 года', count: 12 },
      { id: '4-5', label: '4-5 лет', count: 18 },
      { id: '6-7', label: '6-7 лет', count: 22 },
      { id: '8-9', label: '8-9 лет', count: 25 },
      { id: '10-11', label: '10-11 лет', count: 19 },
      { id: '12-13', label: '12-13 лет', count: 15 },
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
            <span className="text-foreground">Детская одежда</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Детская одежда</h1>
          <p className="text-foreground/70 max-w-2xl">
            Качественная и удобная детская одежда для всех возрастов. 
            Безопасные материалы, яркие дизайны и практичные решения для активных детей.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground/60">Найдено товаров: {kidsProducts.length}</span>
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
                <ProductFilter filters={kidsFilters} />
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {kidsProducts.map(product => (
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