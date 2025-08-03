
import React, { useState, useEffect, useRef } from 'react';
import { Product, Theme } from '../types';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  const handleBrowseClick = () => {
    productListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const themeStyles = {
    [Theme.MINIMALIST]: {
        container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
        title: 'text-4xl font-bold text-gray-900 mb-2',
        paragraph: 'text-lg text-gray-600 mb-6',
        button: 'bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors',
        listContainer: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    },
    [Theme.DARK]: {
        container: 'w-full px-4 sm:px-6 lg:px-8 py-8',
        title: 'text-5xl font-bold text-white mb-3 font-lora',
        paragraph: 'text-xl text-gray-300 mb-8',
        button: 'bg-indigo-500 text-white font-bold py-3 px-8 rounded-md hover:bg-indigo-600 transition-colors',
        listContainer: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    },
    [Theme.COLORFUL]: {
        container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12',
        title: 'text-6xl text-center text-pink-800 mb-4',
        paragraph: 'text-2xl text-center text-purple-800 mb-10 font-inter',
        button: 'bg-pink-500 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all shadow-lg block mx-auto mb-12',
        listContainer: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
    },
  };

  const styles = themeStyles[theme];

  return (
    <div className={`${styles.container} page-container`}>
      <h1 className={styles.title}>Welcome to Our Store</h1>
      <p className={styles.paragraph}>
        Discover our collection of unique and stylish products.
      </p>
      {theme === Theme.COLORFUL && <button className={styles.button}>Get Inspired!</button>}

      {loading && <Spinner />}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!loading && !error && (
        <>
        {theme !== Theme.COLORFUL && <button onClick={handleBrowseClick} className={styles.button}>Browse Products</button>}
        <div ref={productListRef} className={`mt-12 ${styles.listContainer}`}>
            {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in-up" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
            ))}
        </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
