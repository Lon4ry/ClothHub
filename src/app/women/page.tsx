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

export default function WomenCatalog() {
  const [cartCount, setCartCount] = useState(3);
  const [currentSort, setCurrentSort] = useState('popularity');

  // Mock data for women's products
  const womenProducts = [
    {
      id: 'women1',
      name: 'Элегантное женское платье',
      price: 4599,
      originalPrice: 6299,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.7,
      reviewCount: 189,
      isNew: true,
      isOnSale: true,
      inStock: true,
    },
    {
      id: 'women2',
      name: 'Женская блузка из шелка',
      price: 3890,
      image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&h=400&fit=crop',
      brand: 'Elegant Style',
      rating: 4.5,
      reviewCount: 142,
      isNew: false,
      isOnSale: false,
      inStock: true,
    },
    {
      id: 'women3',
      name: 'Женские джинсы скинни',
      price: 3299,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
      brand: 'Denim Co',
      rating: 4.3,
      reviewCount: 98,
      isNew: false,
      isOnSale: false,
      inStock: true,
    },
    {
      id: 'women4',
      name: 'Женский кардиган вязаный',
      price: 2799,
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop',
      brand: 'Cozy Knits',
      rating: 4.6,
      reviewCount: 167,
      isNew: false,
      isOnSale: false,
      inStock: true,
    },
    {
      id: 'women5',
      name: 'Женские туфли на каблуке',
      price: 5999,
      originalPrice: 8999,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
      brand: 'Elegant Shoes',
      rating: 4.8,
      reviewCount: 256,
      isNew: false,
      isOnSale: true,
      inStock: true,
    },
    {
      id: 'women6',
      name: 'Женская юбка миди',
      price: 2590,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.4,
      reviewCount: 87,
      isNew: true,
      isOnSale: false,
      inStock: false,
    },
  ];

  const womenFilters = {
    categories: [
      { id: 'dresses', label: 'Платья', count: 45 },
      { id: 'blouses', label: 'Блузки', count: 32 },
      { id: 'jeans', label: 'Джинсы', count: 28 },
      { id: 'cardigans', label: 'Кардиганы', count: 19 },
      { id: 'shoes', label: 'Обувь', count: 38 },
      { id: 'skirts', label: 'Юбки', count: 24 },
      { id: 'accessories', label: 'Аксессуары', count: 35 },
    ],
    brands: [
      { id: 'clothhub', label: 'ClothHub', count: 52 },
      { id: 'elegant-style', label: 'Elegant Style', count: 28 },
      { id: 'denim-co', label: 'Denim Co', count: 22 },
      { id: 'cozy-knits', label: 'Cozy Knits', count: 18 },
      { id: 'elegant-shoes', label: 'Elegant Shoes', count: 15 },
    ],
    sizes: [
      { id: 'xs', label: 'XS', count: 12 },
      { id: 's', label: 'S', count: 28 },
      { id: 'm', label: 'M', count: 42 },
      { id: 'l', label: 'L', count: 35 },
      { id: 'xl', label: 'XL', count: 24 },
      { id: 'xxl', label: 'XXL', count: 15 },
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
            <span className="text-foreground">Женская одежда</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Женская одежда</h1>
          <p className="text-foreground/70 max-w-2xl">
            Стильная женская одежда для всех случаев жизни. 
            Элегантные платья, удобные повседневные вещи и модные аксессуары.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground/60">Найдено товаров: {womenProducts.length}</span>
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
                <ProductFilter filters={womenFilters} />
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {womenProducts.map(product => (
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