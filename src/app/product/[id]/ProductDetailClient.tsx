'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Card, 
  CardContent,
  Badge,
} from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ProductCard } from '@/entities/product';

interface ProductDetailClientProps {
  productId: string;
}

export function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const [cartCount, setCartCount] = useState(3);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const router = useRouter();

  // Mock product data - in real app this would be fetched based on ID
  const product = {
    id: productId,
    name: 'Классическая мужская рубашка из премиального хлопка',
    price: 3299,
    originalPrice: 4299,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop&brightness=1.1',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop&brightness=0.9',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop&contrast=1.1',
    ],
    brand: 'ClothHub',
    rating: 4.6,
    reviewCount: 143,
    isNew: true,
    isOnSale: true,
    inStock: true,
    colors: [
      { id: 'white', name: 'Белый', hex: '#ffffff' },
      { id: 'light-blue', name: 'Голубой', hex: '#87ceeb' },
      { id: 'navy', name: 'Темно-синий', hex: '#1b4b6b' },
    ],
    sizes: [
      { id: 'xs', name: 'XS', measurements: 'Грудь: 86 см' },
      { id: 's', name: 'S', measurements: 'Грудь: 90 см' },
      { id: 'm', name: 'M', measurements: 'Грудь: 94 см' },
      { id: 'l', name: 'L', measurements: 'Грудь: 98 см' },
      { id: 'xl', name: 'XL', measurements: 'Грудь: 102 см' },
      { id: 'xxl', name: 'XXL', measurements: 'Грудь: 106 см' },
    ],
    description: 'Элегантная мужская рубашка из высококачественного египетского хлопка. Идеально подходит для офиса и особых случаев. Классический крой, который подчеркивает достоинства фигуры.',
    features: [
      'Материал: 100% хлопок премиум-класса',
      'Страна производства: Турция',
      'Классический крой',
      'Длинный рукав с манжетами',  
      'Воротник-стойка',
      'Застежка на пуговицы',
      'Подходит для машинной стирки',
    ],
    care: [
      'Машинная стирка при температуре до 30°C',
      'Не отбеливать',
      'Гладить при средней температуре',
      'Химчистка разрешена',
      'Не сушить в барабане',
    ],
    sizeGuide: {
      title: 'Таблица размеров (в см)',
      measurements: [
        { size: 'XS', chest: '86', waist: '78', length: '72' },
        { size: 'S', chest: '90', waist: '82', length: '74' },
        { size: 'M', chest: '94', waist: '86', length: '76' },
        { size: 'L', chest: '98', waist: '90', length: '78' },
        { size: 'XL', chest: '102', waist: '94', length: '80' },
        { size: 'XXL', chest: '106', waist: '98', length: '82' },
      ]
    }
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // Related products
  const relatedProducts = [
    {
      id: 'related1',
      name: 'Мужской галстук классический',
      price: 1590,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.4,
      reviewCount: 67,
      isNew: false,
      isOnSale: false,
      inStock: true,
    },
    {
      id: 'related2',
      name: 'Мужские брюки классические',
      price: 4890,
      originalPrice: 5890,
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
      brand: 'ClothHub',
      rating: 4.3,
      reviewCount: 89,
      isNew: false,
      isOnSale: true,
      inStock: true,
    },
    {
      id: 'related3',
      name: 'Мужской пиджак',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      brand: 'Formal Wear',
      rating: 4.8,
      reviewCount: 156,
      isNew: true,
      isOnSale: false,
      inStock: true,
    },
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    if (!selectedColor) {
      alert('Пожалуйста, выберите цвет');
      return;
    }
    setCartCount(prev => prev + quantity);
    alert(`Товар добавлен в корзину (${quantity} шт.)`);
  };

  const tabs = [
    { id: 'description', label: 'Описание' },
    { id: 'specifications', label: 'Характеристики' },
    { id: 'care', label: 'Уход' },
    { id: 'size-guide', label: 'Размерная сетка' },
    { id: 'reviews', label: `Отзывы (${product.reviewCount})` },
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
            <Link href="/men" className="hover:text-foreground">Мужская одежда</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-foreground/5">
              <img 
                src={selectedImage} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isOnSale && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 right-4 bg-red-500 text-white"
                >
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              )}
              {product.isNew && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 left-4 bg-green-500 text-white"
                >
                  Новинка
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === image ? 'border-foreground' : 'border-foreground/20'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - вид ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-foreground/60 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-foreground/20'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-foreground/60">({product.reviewCount} отзывов)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">{product.price.toLocaleString()} ₽</span>
                {product.originalPrice && (
                  <span className="text-xl text-foreground/50 line-through">
                    {product.originalPrice.toLocaleString()} ₽
                  </span>
                )}
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'В наличии' : 'Нет в наличии'}
                </span>
              </div>

              <p className="text-foreground/70 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Цвет: {selectedColor && product.colors.find(c => c.id === selectedColor)?.name}</h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.id ? 'border-foreground' : 'border-foreground/20'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Размер: {selectedSize}</h3>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.name)}
                    className={`px-4 py-2 border rounded-md text-center transition-colors ${
                      selectedSize === size.name 
                        ? 'border-foreground bg-foreground text-background' 
                        : 'border-foreground/20 hover:border-foreground/40'
                    }`}
                  >
                    <div className="font-medium">{size.name}</div>
                    <div className="text-xs opacity-70">{size.measurements}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Количество:</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-foreground/20 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-foreground/5"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-x border-foreground/20">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-foreground/5"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1">
                  ♡ В избранное
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Сравнить
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <div className="border-b border-foreground/10">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'border-foreground text-foreground' 
                      : 'border-transparent text-foreground/60 hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <CardContent className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-foreground/80 leading-relaxed mb-4">{product.description}</p>
                <p className="text-foreground/80 leading-relaxed">
                  Эта рубашка станет незаменимой частью вашего гардероба. Высококачественный хлопок обеспечивает комфорт на весь день, 
                  а классический крой подходит для любых мероприятий - от деловых встреч до торжественных событий.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-foreground/40 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3">
                {product.care.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-foreground/40 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground/80">{instruction}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'size-guide' && (
              <div>
                <h3 className="font-semibold mb-4">{product.sizeGuide.title}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-foreground/20">
                        <th className="text-left py-3 px-4 font-medium">Размер</th>
                        <th className="text-left py-3 px-4 font-medium">Грудь</th>
                        <th className="text-left py-3 px-4 font-medium">Талия</th>
                        <th className="text-left py-3 px-4 font-medium">Длина</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.sizeGuide.measurements.map((measurement, index) => (
                        <tr key={index} className="border-b border-foreground/10">
                          <td className="py-3 px-4 font-medium">{measurement.size}</td>
                          <td className="py-3 px-4 text-foreground/80">{measurement.chest}</td>
                          <td className="py-3 px-4 text-foreground/80">{measurement.waist}</td>
                          <td className="py-3 px-4 text-foreground/80">{measurement.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center text-foreground/60 py-8">
                <p>Функция отзывов будет доступна в ближайшее время</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onAddToCart={(id) => {
                  setCartCount(prev => prev + 1);
                  console.log('Added to cart:', id);
                }}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}