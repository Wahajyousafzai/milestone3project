'use client';

import Link from 'next/link';
import Button from './ui/Button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getFashionImages } from '@/lib/unsplash';

export default function Hero() {
  const [heroImage, setHeroImage] = useState<string>('');

  useEffect(() => {
    async function loadHeroImage() {
      try {
        const image = await getFashionImages('fashion model');
        if (image?.urls?.regular) {
          setHeroImage(image.urls.regular);
        }
      } catch (error) {
        console.error('Error loading hero image:', error);
      }
    }

    loadHeroImage();
  }, []);

  return (
    <div className="relative h-[80vh] bg-gray-900">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {heroImage ? (
            <Image
              src={heroImage}
              alt="Hero background"
              fill
              priority
              className="object-cover object-center brightness-75"
              sizes="100vw"
              quality={100}
            />
          ) : (
            <div className="w-full h-full bg-gray-800 animate-pulse" />
          )}
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col justify-center h-full text-white">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Elevate Your Style
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl mb-8 text-gray-200"
          >
            Discover the latest trends in men's fashion. Premium quality, 
            unbeatable style, and exceptional comfort.
          </motion.p>
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4"
          >
            <Link href="/products">
              <Button 
                variant="primary" 
                size="lg"
              >
                Shop Now
              </Button>
            </Link>
            <Link href="/products">
              <Button 
                variant="outline" 
                size="lg"
              >
                View Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 