import { useState, useEffect } from 'react';
import { Product } from '@/lib/data';

interface FilterOptions {
  categories: Array<{ id: string; label: string; count: number }>;
  brands: Array<{ id: string; label: string; count: number }>;
  sizes: Array<{ id: string; label: string; count: number }>;
  colors: Array<{ id: string; label: string; count: number }>;
  materials?: Array<{ id: string; label: string; count: number }>;
}

interface ProductsResponse {
  products: Product[];
  filterOptions: FilterOptions;
  priceRange: { min: number; max: number };
  total: number;
}

export const useProducts = (categoryGroup: 'all' | 'men' | 'women' | 'kids') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    materials: []
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [currentPriceRange, setCurrentPriceRange] = useState({ min: 0, max: 50000 });
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial products and filter options
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products?category=${categoryGroup}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: ProductsResponse = await response.json();
        
        setProducts(data.products);
        setFilteredProducts(data.products);
        setFilterOptions(data.filterOptions);
        setPriceRange(data.priceRange);
        setCurrentPriceRange(data.priceRange);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryGroup]);

  // Apply filters locally
  const applyFilters = async (filters: Record<string, string[]>, priceFilter: { min: number; max: number }) => {
    try {
      const response = await fetch(`/api/products?category=${categoryGroup}&filters=${encodeURIComponent(JSON.stringify(filters))}&priceRange=${encodeURIComponent(JSON.stringify(priceFilter))}`);
      if (!response.ok) {
        throw new Error('Failed to apply filters');
      }
      const data: ProductsResponse = await response.json();
      setFilteredProducts(data.products);
    } catch (err) {
      console.error('Error applying filters:', err);
      setError(err instanceof Error ? err.message : 'Failed to apply filters');
    }
  };

  const handleFiltersChange = (newFilters: Record<string, string[]>) => {
    setActiveFilters(newFilters);
    applyFilters(newFilters, currentPriceRange);
  };

  const handlePriceChange = (newPriceRange: { min: number; max: number }) => {
    setCurrentPriceRange(newPriceRange);
    applyFilters(activeFilters, newPriceRange);
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setCurrentPriceRange(priceRange);
    setFilteredProducts(products);
  };

  return {
    products: filteredProducts,
    filterOptions,
    priceRange: {
      min: priceRange.min,
      max: priceRange.max,
      current: currentPriceRange
    },
    activeFilters,
    loading,
    error,
    handleFiltersChange,
    handlePriceChange,
    handleClearFilters
  };
};