'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Card, 
  CardContent,
} from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export default function AboutPage() {
  const [cartCount, setCartCount] = useState(3);
  const router = useRouter();

  const stats = [
    { number: '50,000+', label: 'Довольных клиентов' },
    { number: '10,000+', label: 'Товаров в каталоге' },
    { number: '500+', label: 'Брендов-партнеров' },
    { number: '4.8/5', label: 'Средний рейтинг' },
  ];

  const team = [
    {
      name: 'Алексей Морозов',
      position: 'Генеральный директор',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      description: 'Более 15 лет опыта в индустрии моды. Основатель ClothHub и ведущий эксперт по трендам.',
    },
    {
      name: 'Мария Петрова',
      position: 'Директор по маркетингу',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b332867c?w=300&h=300&fit=crop',
      description: 'Специалист по цифровому маркетингу с опытом работы в крупнейших fashion-брендах.',
    },
    {
      name: 'Дмитрий Соколов',
      position: 'Руководитель отдела закупок',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      description: 'Эксперт по качеству и международным поставкам. Отвечает за выбор лучших товаров.',
    },
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Качество',
      description: 'Мы тщательно отбираем каждый товар, работая только с проверенными поставщиками и брендами.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Забота о клиентах',
      description: 'Ваше удовлетворение - наш приоритет. Мы предоставляем персональный сервис и поддержку 24/7.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: 'Инновации',
      description: 'Мы постоянно развиваемся, внедряя новые технологии для улучшения вашего опыта покупок.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
      title: 'Устойчивость',
      description: 'Мы заботимся об экологии, поддерживая бренды с ответственным подходом к производству.',
    },
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
            <span className="text-foreground">О нас</span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center py-16 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ClothHub
          </h1>
          <p className="text-xl text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Мы создали ClothHub с одной простой целью — сделать качественную и стильную одежду 
            доступной для каждого. Наша миссия — помочь вам выражать свою индивидуальность 
            через одежду высокого качества.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => router.push('/men')}>
              Начать покупки
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/blog')}>
              Читать блог
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-foreground/70 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Наша история</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  ClothHub был основан в 2020 году группой энтузиастов моды, которые хотели 
                  изменить подход к онлайн-шопингу одежды. Мы заметили, что многие магазины 
                  сосредотачиваются только на продажах, забывая о качестве обслуживания и 
                  персональном подходе к каждому клиенту.
                </p>
                <p>
                  Сегодня ClothHub — это не просто интернет-магазин, а целая экосистема моды, 
                  где каждый найдет что-то особенное. Мы работаем с ведущими брендами и 
                  дизайнерами, чтобы предложить вам самые актуальные тренды и классические 
                  вещи на все случаи жизни.
                </p>
                <p>
                  Наша команда экспертов тщательно отбирает каждый товар, учитывая качество 
                  материалов, удобство носки и соответствие современным стандартам моды. 
                  Мы гордимся тем, что помогаем нашим клиентам создавать неповторимый стиль.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop"
                alt="О ClothHub"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} variant="bordered" className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} variant="bordered" className="text-center">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img 
                      src={member.photo}
                      alt={member.name}
                      className="w-24 h-24 object-cover rounded-full mx-auto"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <Card variant="bordered" className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Почему выбирают ClothHub?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div>
                  <div className="text-4xl mb-4">🚚</div>
                  <h3 className="font-semibold mb-2">Быстрая доставка</h3>
                  <p className="text-foreground/70 text-sm">
                    Доставляем по всей России за 1-3 дня. Бесплатная доставка от 3000 ₽
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4">💎</div>
                  <h3 className="font-semibold mb-2">Программа лояльности</h3>
                  <p className="text-foreground/70 text-sm">
                    Накапливайте бонусы с каждой покупки и получайте персональные скидки
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🔄</div>
                  <h3 className="font-semibold mb-2">Легкий возврат</h3>
                  <p className="text-foreground/70 text-sm">
                    Не подошел размер? Вернем деньги или обменяем товар в течение 30 дней
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Готовы начать покупки?</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам довольных клиентов ClothHub. 
            Откройте для себя мир качественной моды прямо сейчас.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => router.push('/men')}>
              Мужская одежда
            </Button>
            <Button size="lg" onClick={() => router.push('/women')}>
              Женская одежда
            </Button>
            <Button size="lg" onClick={() => router.push('/kids')}>
              Детская одежда
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}