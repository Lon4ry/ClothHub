// Database-like data structure for products
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isOnSale: boolean;
  inStock: boolean;
  category: string;
  categoryGroup: 'all' | 'men' | 'women' | 'kids';
  size: string[];
  color: string[];
  materials?: string[];
  description?: string;
}

// Mock database with more realistic data
export const products: Product[] = [
  // Men's products
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
    category: 'shirts',
    categoryGroup: 'men',
    size: ['S', 'M', 'L', 'XL'],
    color: ['white', 'blue', 'black'],
    materials: ['cotton', 'polyester'],
    description: 'Классическая рубашка из высококачественного хлопка'
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
    category: 'jeans',
    categoryGroup: 'men',
    size: ['S', 'M', 'L', 'XL'],
    color: ['blue', 'black'],
    materials: ['denim', 'cotton'],
    description: 'Комфортные джинсы прямого кроя'
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
    category: 'tshirts',
    categoryGroup: 'men',
    size: ['S', 'M', 'L', 'XL'],
    color: ['white', 'black', 'gray'],
    materials: ['cotton'],
    description: 'Базовая футболка из мягкого хлопка'
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
    category: 'blazers',
    categoryGroup: 'men',
    size: ['S', 'M', 'L', 'XL'],
    color: ['black', 'navy', 'gray'],
    materials: ['wool', 'polyester'],
    description: 'Элегантный классический пиджак'
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
    category: 'shoes',
    categoryGroup: 'men',
    size: ['40', '41', '42', '43', '44'],
    color: ['white', 'black'],
    materials: ['synthetic', 'rubber'],
    description: 'Спортивные кроссовки для активного образа жизни'
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
    category: 'pants',
    categoryGroup: 'men',
    size: ['S', 'M', 'L', 'XL'],
    color: ['khaki', 'navy', 'black'],
    materials: ['cotton', 'elastane'],
    description: 'Стильные брюки чинос для повседневной носки'
  },

  // Women's products
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
    category: 'dresses',
    categoryGroup: 'women',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    color: ['black', 'red', 'blue'],
    materials: ['polyester', 'elastane'],
    description: 'Элегантное платье для особых случаев'
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
    category: 'blouses',
    categoryGroup: 'women',
    size: ['XS', 'S', 'M', 'L'],
    color: ['white', 'cream', 'pink'],
    materials: ['silk'],
    description: 'Изысканная блузка из натурального шелка'
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
    category: 'jeans',
    categoryGroup: 'women',
    size: ['XS', 'S', 'M', 'L'],
    color: ['blue', 'black'],  
    materials: ['denim', 'cotton', 'elastane'],
    description: 'Стильные джинсы скинни с высокой посадкой'
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
    category: 'cardigans',
    categoryGroup: 'women',
    size: ['S', 'M', 'L', 'XL'],
    color: ['beige', 'gray', 'pink'],
    materials: ['wool', 'acrylic'],
    description: 'Уютный вязаный кардиган для прохладной погоды'
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
    category: 'shoes',
    categoryGroup: 'women',
    size: ['35', '36', '37', '38', '39', '40'],
    color: ['black', 'red', 'nude'],
    materials: ['leather'],
    description: 'Элегантные туфли на каблуке для особых случаев'
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
    category: 'skirts',
    categoryGroup: 'women',
    size: ['XS', 'S', 'M', 'L'],
    color: ['black', 'navy', 'burgundy'],
    materials: ['polyester', 'viscose'],
    description: 'Стильная юбка миди универсального кроя'
  },

  // Kids products
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
    category: 'tshirts',
    categoryGroup: 'kids',
    size: ['2-3', '4-5', '6-7', '8-9'],
    color: ['blue', 'red', 'yellow'],
    materials: ['cotton'],
    description: 'Яркая футболка с веселым принтом для детей'
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
    category: 'jeans',
    categoryGroup: 'kids',
    size: ['2-3', '4-5', '6-7', '8-9', '10-11'],
    color: ['blue', 'black'],
    materials: ['denim', 'cotton'],
    description: 'Прочные детские джинсы для активной игры'
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
    category: 'dresses',
    categoryGroup: 'kids',
    size: ['2-3', '4-5', '6-7', '8-9'],
    color: ['pink', 'white', 'purple'],
    materials: ['polyester', 'tulle'],
    description: 'Нарядное детское платье для праздников'
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
    category: 'shoes',
    categoryGroup: 'kids',
    size: ['25', '26', '27', '28', '29', '30'],
    color: ['white', 'pink', 'blue'],
    materials: ['synthetic', 'rubber'],
    description: 'Удобные детские кроссовки для спорта и игр'
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
    category: 'jackets',
    categoryGroup: 'kids',
    size: ['2-3', '4-5', '6-7', '8-9', '10-11'],
    color: ['red', 'blue', 'green'],
    materials: ['polyester', 'down'],
    description: 'Теплая зимняя куртка с утеплителем'
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
    category: 'shorts',
    categoryGroup: 'kids',
    size: ['2-3', '4-5', '6-7', '8-9'],
    color: ['blue', 'green', 'orange'],
    materials: ['cotton'],
    description: 'Легкие летние шорты для детей'
  },

  // Additional products for main page
  {
    id: 'all1',
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
    categoryGroup: 'all',
    size: ['40', '41', '42', '43', '44'],
    color: ['white', 'black'],
    materials: ['synthetic', 'rubber'],
    description: 'Универсальные кроссовки для города'
  },
  {
    id: 'all2',
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
    categoryGroup: 'all',
    size: ['S', 'M', 'L', 'XL'],
    color: ['gray', 'black', 'navy'],
    materials: ['cotton', 'polyester'],
    description: 'Стильное худи с модным принтом'
  },
  {
    id: 'all3',
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
    categoryGroup: 'all',
    size: ['S', 'M', 'L', 'XL'],
    color: ['black', 'khaki', 'navy'],
    materials: ['polyester'],
    description: 'Легкая куртка для межсезонья'
  }
];

// Filter utility functions
export const getProductsByCategory = (categoryGroup: 'all' | 'men' | 'women' | 'kids') => {
  if (categoryGroup === 'all') {
    return products;
  }
  return products.filter(product => product.categoryGroup === categoryGroup);
};

export const getUniqueValues = (products: Product[], field: keyof Product) => {
  const values = new Set<string>();
  
  products.forEach(product => {
    const value = product[field];
    if (Array.isArray(value)) {
      value.forEach(v => values.add(v));
    } else if (typeof value === 'string') {
      values.add(value);
    }
  });
  
  return Array.from(values);
};

export const getFilterOptions = (categoryGroup: 'all' | 'men' | 'women' | 'kids') => {
  const categoryProducts = getProductsByCategory(categoryGroup);
  
  const categories = getUniqueValues(categoryProducts, 'category').map(cat => ({
    id: cat,
    label: getCategoryLabel(cat),
    count: categoryProducts.filter(p => p.category === cat).length
  }));
  
  const brands = getUniqueValues(categoryProducts, 'brand').map(brand => ({
    id: brand.toLowerCase().replace(/\s+/g, '-'),
    label: brand,
    count: categoryProducts.filter(p => p.brand === brand).length
  }));
  
  const sizes = getUniqueValues(categoryProducts, 'size').map(size => ({
    id: size,
    label: size,
    count: categoryProducts.filter(p => p.size.includes(size)).length
  }));
  
  const colors = getUniqueValues(categoryProducts, 'color').map(color => ({
    id: color,
    label: getColorLabel(color),
    count: categoryProducts.filter(p => p.color.includes(color)).length
  }));
  
  const materials = getUniqueValues(categoryProducts, 'materials').map(material => ({
    id: material,
    label: getMaterialLabel(material),
    count: categoryProducts.filter(p => p.materials?.includes(material)).length
  }));
  
  return {
    categories,
    brands,
    sizes,
    colors,
    materials: materials.length > 0 ? materials : undefined
  };
};

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    'shirts': 'Рубашки',
    'jeans': 'Джинсы', 
    'tshirts': 'Футболки',
    'blazers': 'Пиджаки',
    'shoes': 'Обувь',
    'pants': 'Брюки',
    'dresses': 'Платья',
    'blouses': 'Блузки',
    'cardigans': 'Кардиганы',
    'skirts': 'Юбки',
    'jackets': 'Куртки',
    'shorts': 'Шорты',
    'hoodies': 'Худи'
  };
  return labels[category] || category;
};

const getColorLabel = (color: string): string => {
  const labels: Record<string, string> = {
    'white': 'Белый',
    'black': 'Черный',
    'blue': 'Синий',
    'red': 'Красный',
    'gray': 'Серый',
    'navy': 'Темно-синий',
    'pink': 'Розовый',
    'green': 'Зеленый',
    'yellow': 'Желтый',
    'purple': 'Фиолетовый',
    'beige': 'Бежевый',
    'cream': 'Кремовый',
    'khaki': 'Хаки',
    'burgundy': 'Бордовый',
    'nude': 'Телесный',
    'orange': 'Оранжевый'
  };
  return labels[color] || color;
};

const getMaterialLabel = (material: string): string => {
  const labels: Record<string, string> = {
    'cotton': 'Хлопок',
    'polyester': 'Полиэстер',
    'wool': 'Шерсть',
    'silk': 'Шелк',
    'denim': 'Деним',
    'leather': 'Кожа',
    'synthetic': 'Синтетика',
    'rubber': 'Резина',
    'elastane': 'Эластан',
    'acrylic': 'Акрил',
    'viscose': 'Вискоза',
    'tulle': 'Фатин',
    'down': 'Пух'
  };
  return labels[material] || material;
};

export const applyFilters = (
  products: Product[],
  filters: Record<string, string[]>,
  priceRange: { min: number; max: number }
) => {
  let filtered = [...products];

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

  // Apply size filter
  if (filters.sizes && filters.sizes.length > 0) {
    filtered = filtered.filter(product => {
      return filters.sizes.some(size => product.size.includes(size));
    });
  }

  // Apply color filter
  if (filters.colors && filters.colors.length > 0) {
    filtered = filtered.filter(product => {
      return filters.colors.some(color => product.color.includes(color));
    });
  }

  // Apply material filter
  if (filters.materials && filters.materials.length > 0) {
    filtered = filtered.filter(product => {
      return product.materials && filters.materials.some(material => product.materials?.includes(material));
    });
  }

  // Apply price filter
  filtered = filtered.filter(product => 
    product.price >= priceRange.min && product.price <= priceRange.max
  );

  return filtered;
};