import React from 'react';
import Slider from 'react-slick';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductCarouselProps {
  products: Product[];
  title: string;
  onProductClick: (productId: string) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, title, onProductClick }) => {
  const { addToCart } = useCart();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <div 
              className="bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-300"
              onClick={() => onProductClick(product.id)}
            >
              <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-white text-sm mb-1 truncate">{product.name}</h4>
                <p className="text-white/70 text-xs mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">
                    {product.currency === 'USD' && '$'}
                    {product.currency === 'EUR' && '€'}
                    {product.currency === 'GBP' && '£'}
                    {product.price}
                  </span>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;