import { NextRequest, NextResponse } from 'next/server';
import { getProductsByCategory, getFilterOptions, applyFilters } from '@/lib/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const categoryGroup = searchParams.get('category') as 'all' | 'men' | 'women' | 'kids';
  const filtersParam = searchParams.get('filters');
  const priceRangeParam = searchParams.get('priceRange');

  try {
    // Get products by category
    let products = getProductsByCategory(categoryGroup || 'all');

    // Apply filters if provided
    if (filtersParam && priceRangeParam) {
      const filters = JSON.parse(filtersParam);
      const priceRange = JSON.parse(priceRangeParam);
      products = applyFilters(products, filters, priceRange);
    }

    // Get filter options for the category
    const filterOptions = getFilterOptions(categoryGroup || 'all');

    // Get price range for the category
    const prices = products.map(p => p.price);
    const priceRange = {
      min: Math.min(...prices) || 0,
      max: Math.max(...prices) || 50000
    };

    return NextResponse.json({
      products,
      filterOptions,
      priceRange,
      total: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}