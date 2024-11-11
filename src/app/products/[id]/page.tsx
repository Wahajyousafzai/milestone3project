'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');

  const sizes = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    async function loadProduct() {
      try {
        const storedProducts = localStorage.getItem('fashionstore_products');
        if (!storedProducts) {
          setLoading(false);
          return;
        }

        const products: Product[] = JSON.parse(storedProducts);
        const found = products.find((p: Product) => p.id === params.id);
        
        if (found) {
          setProduct(found);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading product:', error);
        setLoading(false);
      }
    }

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8" />
          <div className="h-8 bg-gray-200 w-1/2 mb-4" />
          <div className="h-4 bg-gray-200 w-1/4 mb-8" />
          <div className="h-24 bg-gray-200 mb-8" />
          <div className="h-12 bg-gray-200 w-1/3" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">
          The product you're looking for doesn't exist.
        </p>
        <Link href="/products">
          <Button variant="primary">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative h-[600px] rounded-lg overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Select Size</h3>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors
                    ${selectedSize === size 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Description</h3>
            <p className="text-gray-600">
              Premium quality {product.title.toLowerCase()} made with the finest materials. 
              Perfect for any occasion, this piece combines style, comfort, and durability.
            </p>
          </div>

          <Button
            variant="primary"
            className="w-full py-4"
            onClick={() => addItem(product)}
          >
            Add to Cart
          </Button>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>30-day return policy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 