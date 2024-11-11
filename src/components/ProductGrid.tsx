'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { getFashionImages } from '@/lib/unsplash';
import { motion } from 'framer-motion';

const PRODUCTS = [
  {
    category: 'Suits & Formal',
    items: [
      { name: 'Classic Wool Suit', query: 'mens classic suit' },
      { name: 'Modern Slim Fit Suit', query: 'mens slim suit modern' },
      { name: 'Business Dress Shirt', query: 'mens formal shirt' },
      { name: 'Tailored Dress Pants', query: 'mens dress pants' }
    ]
  },
  {
    category: 'Casual Wear',
    items: [
      { name: 'Premium Cotton T-Shirt', query: 'mens premium tshirt' },
      { name: 'Casual Denim Jacket', query: 'mens denim jacket casual' },
      { name: 'Slim Fit Jeans', query: 'mens designer jeans' },
      { name: 'Casual Sneakers', query: 'mens casual sneakers' }
    ]
  },
  {
    category: 'Accessories',
    items: [
      { name: 'Luxury Watch', query: 'mens luxury watch' },
      { name: 'Designer Sunglasses', query: 'mens designer sunglasses' },
      { name: 'Leather Belt', query: 'mens leather belt' },
      { name: 'Designer Wallet', query: 'mens luxury wallet' }
    ]
  }
];

const PRICE_RANGES = {
  'Suits & Formal': { min: 300, max: 1200 },
  'Casual Wear': { min: 30, max: 150 },
  'Accessories': { min: 100, max: 500 }
};

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(PRODUCTS[0].category);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productPromises = PRODUCTS.flatMap(categoryGroup => 
          categoryGroup.items.map(async (item) => {
            const image = await getFashionImages(item.query);
            const priceRange = PRICE_RANGES[categoryGroup.category as keyof typeof PRICE_RANGES];
            const price = Math.floor(
              Math.random() * (priceRange.max - priceRange.min) + priceRange.min
            );

            const sanitizedName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            const sanitizedCategory = categoryGroup.category.toLowerCase().replace(/[^a-z0-9]/g, '');
            
            return {
              id: `${sanitizedCategory}-${sanitizedName}`,
              title: item.name,
              price,
              image: image?.urls?.regular || '/placeholder.jpg',
              category: categoryGroup.category,
            };
          })
        );

        const fetchedProducts = await Promise.all(productPromises);
        localStorage.setItem('fashionstore_products', JSON.stringify(fetchedProducts));
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div 
            key={`skeleton-${i}`}
            className="bg-gray-200 rounded-lg h-96 animate-pulse"
          >
            <div className="h-64 bg-gray-300" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-8 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex space-x-4">
          {PRODUCTS.map((categoryGroup) => (
            <motion.button
              key={categoryGroup.category}
              onClick={() => setActiveCategory(categoryGroup.category)}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                ${activeCategory === categoryGroup.category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryGroup.category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {products
          .filter(product => product.category === activeCategory)
          .map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
} 