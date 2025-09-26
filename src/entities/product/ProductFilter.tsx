import { HTMLAttributes, useState, forwardRef } from 'react';
import { clsx } from 'clsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Badge from '@/shared/ui/Badge';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface PriceRange {
  min: number;
  max: number;
}

interface ProductFilterProps extends HTMLAttributes<HTMLDivElement> {
  filters: {
    categories?: FilterOption[];
    brands?: FilterOption[];
    sizes?: FilterOption[];
    colors?: FilterOption[];
    materials?: FilterOption[];
  };
  priceRange?: {
    min: number;
    max: number;
    current: PriceRange;
  };
  onFiltersChange?: (filters: Record<string, string[]>) => void;
  onPriceChange?: (range: PriceRange) => void;
  onClearAll?: () => void;
  activeFilters?: Record<string, string[]>;
  isCollapsible?: boolean;
}

const ProductFilter = forwardRef<HTMLDivElement, ProductFilterProps>(
  ({ 
    className,
    filters,
    priceRange,
    onFiltersChange,
    onPriceChange,
    onClearAll,
    activeFilters = {},
    isCollapsible = false,
    ...props 
  }, ref) => {
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
    const [tempPriceRange, setTempPriceRange] = useState(priceRange?.current || { min: 0, max: 0 });

    const toggleSection = (section: string) => {
      setCollapsedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };

    const handleFilterChange = (filterType: string, optionId: string, checked: boolean) => {
      const currentValues = activeFilters[filterType] || [];
      const newValues = checked
        ? [...currentValues, optionId]
        : currentValues.filter(id => id !== optionId);
      
      if (onFiltersChange) {
        onFiltersChange({
          ...activeFilters,
          [filterType]: newValues
        });
      }
    };

    const handlePriceSubmit = () => {
      if (onPriceChange) {
        onPriceChange(tempPriceRange);
      }
    };

    const getActiveFilterCount = () => {
      return Object.values(activeFilters).reduce((total, values) => total + values.length, 0);
    };

    const FilterSection = ({ 
      title, 
      options, 
      filterKey 
    }: { 
      title: string; 
      options: FilterOption[]; 
      filterKey: string; 
    }) => {
      const isCollapsed = collapsedSections[filterKey];
      
      return (
        <div className="border-b border-foreground/10 last:border-b-0">
          <button
            className="flex items-center justify-between w-full py-3 text-left hover:text-foreground/80 transition-colors"
            onClick={() => toggleSection(filterKey)}
          >
            <span className="font-medium">{title}</span>
            {isCollapsible && (
              <svg
                className={clsx(
                  'h-5 w-5 transition-transform duration-200',
                  isCollapsed ? 'rotate-0' : 'rotate-180'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          
          <div className={clsx(
            'transition-all duration-200 overflow-hidden',
            isCollapsed ? 'max-h-0' : 'max-h-96 pb-3'
          )}>
            <div className="space-y-2">
              {options.map((option) => {
                const isActive = activeFilters[filterKey]?.includes(option.id) || false;
                
                return (
                  <label
                    key={option.id}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => handleFilterChange(filterKey, option.id, e.target.checked)}
                      className="rounded border-foreground/20 text-foreground focus:ring-foreground focus:ring-offset-0"
                    />
                    <span className="text-sm group-hover:text-foreground/80 transition-colors flex-1">
                      {option.label}
                    </span>
                    {option.count && (
                      <span className="text-xs text-foreground/50">
                        ({option.count})
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      );
    };

    return (
      <Card ref={ref} className={clsx('sticky top-4', className)} variant="bordered" {...props}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Фильтры</CardTitle>
            {getActiveFilterCount() > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="sm">
                  {getActiveFilterCount()}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearAll}
                  className="text-xs"
                >
                  Очистить все
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-0">
          {/* Price Range */}
          {priceRange && (
            <div className="border-b border-foreground/10 pb-4 mb-4">
              <h4 className="font-medium mb-3">Цена</h4>
              <div className="flex gap-2 mb-3">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="От"
                    value={tempPriceRange.min}
                    onChange={(e) => setTempPriceRange(prev => ({
                      ...prev,
                      min: parseInt(e.target.value) || 0
                    }))}
                    className="text-sm"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="До"
                    value={tempPriceRange.max}
                    onChange={(e) => setTempPriceRange(prev => ({
                      ...prev,
                      max: parseInt(e.target.value) || 0
                    }))}
                    className="text-sm"
                  />
                </div>
              </div>
              <Button
                size="sm"
                fullWidth
                variant="outline"
                onClick={handlePriceSubmit}
              >
                Применить
              </Button>
            </div>
          )}

          {/* Filter Sections */}
          {filters.categories && (
            <FilterSection
              title="Категории"
              options={filters.categories}
              filterKey="categories"
            />
          )}

          {filters.brands && (
            <FilterSection
              title="Бренды"
              options={filters.brands}
              filterKey="brands"
            />
          )}

          {filters.sizes && (
            <FilterSection
              title="Размеры"
              options={filters.sizes}
              filterKey="sizes"
            />
          )}

          {filters.colors && (
            <FilterSection
              title="Цвета"
              options={filters.colors}
              filterKey="colors"
            />
          )}

          {filters.materials && (
            <FilterSection
              title="Материалы"
              options={filters.materials}
              filterKey="materials"
            />
          )}
        </CardContent>
      </Card>
    );
  }
);

ProductFilter.displayName = 'ProductFilter';

export default ProductFilter;