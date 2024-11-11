'use client';

import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import Button from './ui/Button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg"
    >
      <Link href={`/products/${product.id}`}>
        <motion.div 
          className="relative h-64"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </motion.div>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center mb-4">
          <motion.span 
            className="text-xl font-bold text-blue-600"
            whileHover={{ scale: 1.1 }}
          >
            ${product.price.toFixed(2)}
          </motion.span>
          <span className="text-sm text-gray-500 capitalize">
            {product.category}
          </span>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="primary"
            className="w-full"
            onClick={() => addItem(product)}
          >
            Add to Cart
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
} 