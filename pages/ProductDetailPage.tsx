
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, Theme } from '../types';
import { useTheme } from '../context/ThemeContext';
import Spinner from '../components/Spinner';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      setIsDescriptionExpanded(false); // Reset on new product
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const themeStyles = {
    [Theme.MINIMALIST]: {
      container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
      backLink: 'text-blue-600 hover:underline mb-6 inline-block',
      card: 'bg-white border border-gray-200 rounded-lg overflow-hidden md:flex gap-6',
      image: 'md:w-1/2 w-full h-96 object-contain p-4 bg-white',
      content: 'p-6 flex flex-col',
      category: 'text-sm text-gray-500 uppercase tracking-wider',
      title: 'text-3xl font-bold text-gray-900 my-2',
      rating: 'flex items-center my-2',
      ratingText: 'text-gray-600 ml-2',
      description: 'text-base text-gray-700 leading-relaxed my-4',
      detailsButton: 'text-sm font-semibold text-blue-600 hover:underline self-start',
      price: 'text-3xl font-bold text-gray-800 mt-auto pt-4',
    },
    [Theme.DARK]: {
      container: 'w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
      backLink: 'text-indigo-400 hover:underline mb-6 inline-block',
      card: 'bg-gray-800 border border-gray-700 rounded-md overflow-hidden md:flex gap-6',
      image: 'md:w-1/2 w-full h-96 object-contain bg-white/5 p-4 rounded-l-md',
      content: 'p-8 flex flex-col',
      category: 'text-sm text-gray-400 uppercase tracking-wider font-inter',
      title: 'text-4xl font-bold text-white font-lora my-2',
      rating: 'flex items-center my-2',
      ratingText: 'text-gray-300 ml-2 font-inter',
      description: 'text-lg text-gray-300 leading-relaxed my-4 font-inter',
      detailsButton: 'text-sm font-semibold text-indigo-400 hover:underline self-start font-inter',
      price: 'text-3xl font-bold text-indigo-400 mt-auto pt-4 font-inter',
    },
    [Theme.COLORFUL]: {
      container: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12',
      backLink: 'text-purple-600 hover:text-pink-600 font-bold mb-8 inline-block font-inter',
      card: 'bg-white/80 rounded-2xl shadow-xl overflow-hidden',
      image: 'w-full h-96 object-contain p-8',
      content: 'p-10 text-center flex flex-col',
      category: 'text-md text-purple-700 uppercase font-inter font-bold',
      title: 'text-5xl text-pink-700 my-3',
      rating: 'flex items-center justify-center my-4',
      ratingText: 'text-purple-800 ml-3 font-inter',
      description: 'text-xl text-gray-700 leading-relaxed my-6 font-inter',
      detailsButton: 'text-sm font-bold bg-white/80 text-purple-700 py-2 px-5 rounded-full hover:bg-white transition-all mt-2 self-center',
      price: 'text-4xl font-bold text-purple-800 mt-auto pt-5 font-inter',
    },
  };

  const styles = themeStyles[theme];

  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.25;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {[...Array(fullStars)].map((_, i) => <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
        {halfStar && <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 15.585l-3.328 1.748c-.97.51-2.16-.36-1.886-1.464l.636-3.706-2.69-2.624c-.793-.775-.364-2.13.784-2.22l3.72-.54L8.114 3.03c.472-.948 1.898-.948 2.37 0L12.35 6.77l3.72.54c1.148.09 1.577 1.445.784 2.22l-2.69 2.624.636 3.706c.274 1.104-1.008 1.884-1.886 1.464L10 15.585z" clipRule="evenodd" /></svg>}
        {[...Array(emptyStars)].map((_, i) => <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
      </>
    );
  };


  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!product) return <p className="text-center text-gray-500 py-10">Product not found.</p>;

  const descriptionCutoff = 150;
  const isDescriptionLong = product.description.length > descriptionCutoff;
  const descriptionToShow = isDescriptionExpanded
    ? product.description
    : product.description.substring(0, descriptionCutoff) + (isDescriptionLong ? '...' : '');

  return (
    <div className={`${styles.container} page-container`}>
      <Link to="/" className={styles.backLink}>&larr; Back to Products</Link>
      <div className={styles.card}>
        <div className={theme !== Theme.COLORFUL ? 'md:w-1/2 w-full' : ''}>
           <img src={product.image} alt={product.title} className={styles.image} />
        </div>
        <div className={styles.content}>
            <p className={styles.category}>{product.category}</p>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.rating}>
                {renderStars(product.rating.rate)}
                <span className={styles.ratingText}>{product.rating.rate} ({product.rating.count} reviews)</span>
            </div>
            <p className={styles.description}>{descriptionToShow}</p>
            {isDescriptionLong && (
                <button
                    onClick={() => setIsDescriptionExpanded(prev => !prev)}
                    className={styles.detailsButton}
                    aria-expanded={isDescriptionExpanded}
                >
                    {isDescriptionExpanded ? 'Show Less' : 'View Details'}
                </button>
            )}
            <p className={styles.price}>${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
