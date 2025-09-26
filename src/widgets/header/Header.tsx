import { HTMLAttributes, useState, forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { clsx } from 'clsx';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Badge from '@/shared/ui/Badge';

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  cartItemsCount?: number;
  user?: {
    name: string;
    avatar?: string;
  } | null;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  onLoginClick?: () => void;
}

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ 
    className,
    cartItemsCount = 0,
    user,
    onSearch,
    onCartClick,
    onProfileClick,
    onLoginClick,
    ...props 
  }, ref) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSearch && searchQuery.trim()) {
        onSearch(searchQuery.trim());
      }
    };

    const navigationItems = [
      { label: 'Мужская одежда', href: '/men' },
      { label: 'Женская одежда', href: '/women' },
      { label: 'Детская одежда', href: '/kids' },
      { label: 'Аксессуары', href: '/accessories' },
      { label: 'Распродажа', href: '/sale' },
    ];

    return (
      <header 
        ref={ref}
        className={clsx(
          'sticky top-0 z-50 bg-background border-b border-foreground/10',
          className
        )}
        {...props}
      >
        {/* Top Bar */}
        <div className="border-b border-foreground/5">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-sm">
              <div className="flex items-center gap-4">
                <span className="text-foreground/60">Бесплатная доставка от 3000 ₽</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="/help" className="text-foreground/60 hover:text-foreground transition-colors">
                  Помощь
                </a>
                <a href="/contacts" className="text-foreground/60 hover:text-foreground transition-colors">
                  Контакты
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-foreground">
                ClothHub
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                    fullWidth
                  />
                  <Button
                    type="submit"
                    size="sm"
                    variant="ghost"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </Button>
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden h-8 w-8 p-0"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Button>

              {/* Favorites */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative h-8 w-8 p-0"
                onClick={onCartClick}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H19" />
                </svg>
                {cartItemsCount > 0 && (
                  <Badge
                    variant="danger"
                    size="sm"
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center min-w-4"
                  >
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onProfileClick}
                  className="flex items-center gap-2 h-8"
                >
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  <span className="hidden sm:inline text-sm">{user.name}</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLoginClick}
                  className="flex items-center gap-1 h-8"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline text-sm">Войти</span>
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden h-8 w-8 p-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:block border-t border-foreground/5">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-8 h-12">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-foreground/5 bg-background">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                />
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    );
  }
);

Header.displayName = 'Header';

export default Header;