'use client';

import { useState } from 'react';
import Link from 'next/link';
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

export default function BlogPage() {
  const [cartCount, setCartCount] = useState(3);
  const router = useRouter();

  const blogPosts = [
    {
      id: '1',
      title: 'Как выбрать идеальную рубашку: гид для мужчин',
      excerpt: 'Полное руководство по выбору мужской рубашки. Разбираем типы тканей, посадку, сочетания с другой одеждой и уход.',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=250&fit=crop',
      author: 'Алексей Морозов',
      date: '15 декабря 2024',
      readTime: '8 мин',
      category: 'Мужская мода',
      tags: ['рубашки', 'мужская мода', 'стиль'],
    },
    {
      id: '2',
      title: 'Тренды женской моды 2024: что носить этой зимой',
      excerpt: 'Обзор главных трендов зимнего сезона: от оверсайз пальто до ярких аксессуаров. Создайте стильный образ на каждый день.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=250&fit=crop',
      author: 'Мария Петрова',
      date: '12 декабря 2024',
      readTime: '6 мин',
      category: 'Женская мода',
      tags: ['тренды', 'зима 2024', 'женская мода'],
    },
    {
      id: '3',
      title: 'Детская мода: как одевать ребенка стильно и комфортно',
      excerpt: 'Советы по выбору детской одежды. Как совместить практичность, комфорт и стиль в детском гардеробе.',
      image: 'https://images.unsplash.com/photo-1519457431-44c20d4cce30?w=400&h=250&fit=crop',
      author: 'Елена Васильева',
      date: '10 декабря 2024',
      readTime: '5 мин',
      category: 'Детская мода',
      tags: ['дети', 'практичность', 'комфорт'],
    },
    {
      id: '4',
      title: 'Уход за одеждой: продлеваем жизнь любимых вещей',
      excerpt: 'Профессиональные советы по уходу за разными типами тканей. Стирка, сушка, глажка и хранение одежды.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      author: 'Дмитрий Соколов',
      date: '8 декабря 2024',
      readTime: '10 мин',
      category: 'Уход за одеждой',
      tags: ['уход', 'стирка', 'хранение'],
    },
    {
      id: '5',
      title: 'Базовый гардероб: 20 вещей, которые должны быть у каждого',
      excerpt: 'Составляем идеальный базовый гардероб. Универсальные вещи, которые легко сочетаются между собой.',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=250&fit=crop',
      author: 'Анна Козлова',
      date: '5 декабря 2024',
      readTime: '12 мин',
      category: 'Стиль',
      tags: ['базовый гардероб', 'капсула', 'стиль'],
    },
    {
      id: '6',
      title: 'Цветовая палитра в одежде: как создать гармоничный образ',
      excerpt: 'Изучаем теорию цвета в моде. Как правильно сочетать цвета в одежде и создавать стильные образы.',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=250&fit=crop',
      author: 'Ольга Никитина',
      date: '3 декабря 2024',
      readTime: '7 мин',
      category: 'Стиль',
      tags: ['цвет', 'сочетания', 'образы'],
    },
  ];

  const categories = [
    { id: 'all', name: 'Все статьи', count: blogPosts.length },
    { id: 'mens', name: 'Мужская мода', count: 1 },
    { id: 'womens', name: 'Женская мода', count: 1 },
    { id: 'kids', name: 'Детская мода', count: 1 },
    { id: 'care', name: 'Уход за одеждой', count: 1 },
    { id: 'style', name: 'Стиль', count: 2 },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'mens' && post.category === 'Мужская мода') ||
      (selectedCategory === 'womens' && post.category === 'Женская мода') ||
      (selectedCategory === 'kids' && post.category === 'Детская мода') ||
      (selectedCategory === 'care' && post.category === 'Уход за одеждой') ||
      (selectedCategory === 'style' && post.category === 'Стиль');
    
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

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
            <span className="text-foreground">Блог</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Блог ClothHub</h1>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Экспертные советы по выбору одежды, трендам моды и уходу за вещами. 
            Все, что нужно знать о стиле и моде.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-foreground/20 rounded-lg bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Категории</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors flex justify-between items-center ${
                        selectedCategory === category.id 
                          ? 'bg-foreground text-background' 
                          : 'hover:bg-foreground/5'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm opacity-70">({category.count})</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured */}
            <Card variant="bordered" className="mt-6">
              <CardHeader>
                <CardTitle>Рекомендуем</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80&h=60&fit=crop"
                      alt="Рекомендуемая статья"
                      className="w-16 h-12 object-cover rounded flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-medium text-sm mb-1">Секреты стиля от дизайнеров</h4>
                      <p className="text-xs text-foreground/60">2 дня назад</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=80&h=60&fit=crop"
                      alt="Рекомендуемая статья"
                      className="w-16 h-12 object-cover rounded flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-medium text-sm mb-1">Модные образы для работы</h4>
                      <p className="text-xs text-foreground/60">4 дня назад</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-foreground/60">
                Найдено статей: {filteredPosts.length}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <Card key={post.id} variant="bordered" className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      variant="secondary" 
                      className="absolute top-3 left-3 bg-background/90 text-foreground"
                    >
                      {post.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-3 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-foreground/70 text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Читать далее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <Card variant="bordered" className="text-center py-12">
                <CardContent>
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 mx-auto mb-4 bg-foreground/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Статьи не найдены</h3>
                    <p className="text-foreground/70 mb-6">Попробуйте изменить критерии поиска или выберите другую категорию</p>
                    <Button onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}>
                      Сбросить фильтры
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Загрузить еще статьи
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}