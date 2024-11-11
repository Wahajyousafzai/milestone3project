import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import CategoryGrid from '@/components/CategoryGrid';

export default function Home() {
  return (
    <div>
      <Hero />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <ProductGrid />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <CategoryGrid />
        </div>
      </section>
    </div>
  );
} 