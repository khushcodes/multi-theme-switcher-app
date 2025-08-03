
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, Theme } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { theme } = useTheme();

  const truncatedDescription = product.description.length > 60 
    ? product.description.substring(0, 60) + '...' 
    : product.description;

  const baseClasses = 'overflow-hidden transition-all duration-300 ease-in-out';

  const themeStyles = {
    [Theme.MINIMALIST]: {
      container: 'bg-white border border-gray-200 rounded-lg flex flex-col p-4 hover:shadow-lg hover:-translate-y-1 h-full',
      imageContainer: 'w-full flex-shrink-0',
      image: 'w-full h-48 object-contain',
      content: 'flex-1 flex flex-col pt-4',
      title: 'text-lg font-bold text-gray-800',
      description: 'text-sm text-gray-600 mt-2',
      price: 'text-base font-bold text-gray-800 mt-auto pt-4',
    },
    [Theme.DARK]: {
      container: 'bg-gray-800 border border-gray-700 rounded-md p-5 hover:border-indigo-500 hover:bg-gray-700 h-full flex flex-col',
      imageContainer: 'w-full',
      image: 'w-full h-56 object-contain bg-white/5 rounded-t-md p-2',
      content: 'pt-4 flex-1 flex flex-col',
      title: 'text-xl font-bold text-white font-lora',
      description: 'text-sm text-gray-400 mt-3 font-inter',
      price: 'text-lg font-bold text-indigo-400 mt-auto pt-4 font-inter',
    },
    [Theme.COLORFUL]: {
      container: 'bg-white/80 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 p-6 h-full flex flex-col',
      imageContainer: 'w-full',
      image: 'w-full h-64 object-contain',
      content: 'text-center pt-5 flex-1 flex flex-col',
      title: 'text-2xl text-pink-700',
      description: 'text-base text-gray-600 mt-3 font-inter',
      price: 'text-xl font-bold text-purple-800 mt-auto pt-5 font-inter',
    },
  };

  const styles = themeStyles[theme];

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <div className={`${baseClasses} ${styles.container}`}>
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.title} className={styles.image} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.description}>{truncatedDescription}</p>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
