import { HTMLAttributes, useState, forwardRef } from 'react';
import { clsx } from 'clsx';

interface FooterProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (email.trim()) {
        console.log('Newsletter subscription:', email.trim());
        // Here you would typically send the email to your backend
        alert(`Спасибо за подписку! Email: ${email.trim()}`);
        setEmail(''); // Clear the form
      }
    };
    const footerSections = [
      {
        title: 'Каталог',
        links: [
          { label: 'Мужская одежда', href: '/men' },
          { label: 'Женская одежда', href: '/women' },
          { label: 'Детская одежда', href: '/kids' },
          { label: 'Аксессуары', href: '/accessories' },
          { label: 'Распродажа', href: '/sale' },
        ],
      },
      {
        title: 'Покупателям',
        links: [
          { label: 'Доставка и оплата', href: '/delivery' },
          { label: 'Возврат и обмен', href: '/returns' },
          { label: 'Размерная сетка', href: '/sizes' },
          { label: 'Уход за одеждой', href: '/care' },
          { label: 'FAQ', href: '/faq' },
        ],
      },
      {
        title: 'Компания',
        links: [
          { label: 'О нас', href: '/about' },
          { label: 'Контакты', href: '/contacts' },
          { label: 'Вакансии', href: '/careers' },
          { label: 'Блог', href: '/blog' },
          { label: 'Партнерам', href: '/partners' },
        ],
      },
      {
        title: 'Помощь',
        links: [
          { label: 'Связаться с нами', href: '/support' },
          { label: 'Отследить заказ', href: '/track-order' },
          { label: 'Личный кабинет', href: '/account' },
          { label: 'Бонусная программа', href: '/loyalty' },
          { label: 'Подарочные карты', href: '/gift-cards' },
        ],
      },
    ];

    const socialLinks = [
      {
        name: 'ВКонтакте',
        href: 'https://vk.com/clothhub',
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15.684 0H4.316C1.934 0 0 1.934 0 4.316v11.368C0 18.066 1.934 20 4.316 20h11.368C18.066 20 20 18.066 20 15.684V4.316C20 1.934 18.066 0 15.684 0zM16.5 14.5h-1.5c-.5 0-.9-.3-1.2-.8-.4-.6-.8-1.2-1.3-1.7-.3-.3-.6-.4-.9-.4-.6 0-.8.5-.8 1.1v1.4c0 .4-.1.6-.6.6-1.1 0-2.3-.7-3.2-1.9-1.4-1.8-2.5-4.2-2.5-4.2s-.1-.3 0-.4c.1-.2.4-.2.4-.2H6c.4 0 .5.2.6.4 0 0 .6 1.4 1.4 2.6.6 1 1 1.1 1.2 1.1.2 0 .3-.1.3-.4v-2.5c-.1-.9-.5-1-.5-1s-.1-.2.1-.3c.2-.1.5-.1.9-.1h1.4c.4 0 .5.2.5.4v3.2c0 .4.2.5.3.5.2 0 .5-.1 1-1 .8-1.2 1.4-2.6 1.4-2.6s.1-.2.4-.3c.2-.1.5 0 .5 0h1.5c.5 0 .6.3.5.4-.2.6-1.8 2.9-1.8 2.9-.2.3-.2.4 0 .7.2.2.8.8 1.2 1.3.7.8 1.2 1.5 1.3 2 .2.5-.1.7-.1.7z"/>
          </svg>
        ),
      },
      {
        name: 'Телеграм',
        href: 'https://t.me/clothhub',
        icon: (
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18.384,2.297c0.265,0.265,0.264,0.697-0.001,0.961L8.464,13.177c-0.265,0.264-0.695,0.264-0.96,0L2.554,8.225c-0.265-0.264-0.265-0.696,0-0.96c0.265-0.265,0.695-0.265,0.96,0l4.47,4.469L17.424,2.296C17.689,2.032,18.12,2.032,18.384,2.297z"/>
          </svg>
        ),
      },
      {
        name: 'Instagram',
        href: 'https://instagram.com/clothhub',
        icon: (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.478 0 0 4.478 0 10c0 5.522 4.478 10 10 10 5.522 0 10-4.478 10-10C20 4.478 15.522 0 10 0zM8.2 14.8h-1.6v-5.4h1.6v5.4zm-.8-6.1c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm5.4 6.1h-1.6v-2.6c0-.6 0-1.4-.8-1.4s-.9.6-.9 1.3v2.7h-1.6v-5.4h1.5v.7c.2-.4.7-.8 1.5-.8 1.6 0 1.9 1.1 1.9 2.5v3z" clipRule="evenodd"/>
          </svg>
        ),
      },
    ];

    return (
      <footer 
        ref={ref}
        className={clsx('bg-foreground/5 border-t border-foreground/10', className)}
        {...props}
      >
        <div className="container mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4 text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="border-t border-foreground/10 pt-8 mb-8">
            <div className="max-w-md">
              <h3 className="font-semibold mb-2 text-foreground">
                Подпишитесь на новости
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                Получайте информацию о новинках, скидках и специальных предложениях
              </p>
              <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-foreground/20 rounded-md bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                >
                  Подписаться
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-foreground/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright & Info */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-foreground/60">
                <span>© 2024 ClothHub. Все права защищены.</span>
                <div className="flex gap-4">
                  <a href="/privacy" className="hover:text-foreground transition-colors">
                    Политика конфиденциальности
                  </a>
                  <a href="/terms" className="hover:text-foreground transition-colors">
                    Условия использования
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">Мы в соцсетях:</span>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment & Delivery Info */}
            <div className="mt-6 pt-6 border-t border-foreground/10">
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-foreground/50">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Безопасные платежи</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Гарантия качества</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H20a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span>Быстрая доставка</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export default Footer;