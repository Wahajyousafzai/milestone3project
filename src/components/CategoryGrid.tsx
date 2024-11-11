'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getFashionImages } from '@/lib/unsplash';
import Link from 'next/link';
import Image from 'next/image'; 

const FEATURED_CATEGORIES = [
  { name: 'Formal Wear', query: 'mens suit formal' },
  { name: 'Casual Style', query: 'mens casual streetwear' },
  { name: 'Accessories', query: 'mens fashion accessories' },
  { name: 'Footwear', query: 'mens luxury shoes' },
  { name: 'Outerwear', query: 'mens luxury jacket' },
  { name: 'Designer', query: 'mens luxury fashion' },
];

interface CategoryImage {
  name: string;
  imageUrl: string;
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<CategoryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryImages() {
      try {
        const categoryPromises = FEATURED_CATEGORIES.map(async (category) => {
          const image = await getFashionImages(category.query);
          return {
            name: category.name,
            imageUrl: image?.urls?.regular || '',
          };
        });

        const loadedCategories = await Promise.all(categoryPromises);
        setCategories(loadedCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error loading category images:', error);
        setLoading(false);
      }
    }

    loadCategoryImages();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative h-64 group cursor-pointer overflow-hidden rounded-lg"
        >
          <Link href={`/products?category=${category.name.toLowerCase()}`}>
            <div className="relative w-full h-full">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300"
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.h3 
                    className="text-white text-2xl font-bold text-center px-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {category.name}
                  </motion.h3>
                  <motion.span
                    className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    Shop Now →
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
} 