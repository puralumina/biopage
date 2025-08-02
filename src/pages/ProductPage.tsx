import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

// Sample products - you can modify these manually
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'The Richest Habit',
    price: 19.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Forget the noise of complex financial advice. After analyzing the patterns of the world’s most successful people, one simple truth emerges: wealth isn\'t determined by a secret investment strategy, but by a single, non-negotiable daily habit. "The Richest Habit" cuts through the clutter to reveal this one core action that separates the financially independent from everyone else. This book is a short, powerful guide to understanding, adopting, and perfecting the single most profitable behavior you can implement in the next 48 hours.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_1',
  },
  {
    id: '2',
    name: 'The Compound Engine',
    price: 14.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'We all understand the power of compound interest for our money, but what about for our habits? This book reveals how to build your own "Compound Engine". This is a personal system where small acts of daily discipline don\'t just add up, they multiply exponentially. Learn to transform discipline from a struggle into an unstoppable force that generates momentum in your finances, career, and life. Stop trying to muscle your way to success and start building the engine that will drive you there automatically.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_2',
  },
  {
    id: '3',
    name: 'Money is a Language',
    price: 11.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Money isn’t just numbers. It’s a language you can learn. This book teaches you how to read, write, and think in financial fluency, turning confusion into clarity and fear into strategy. Discover how to "speak" saving, investing, and earning with purpose, so you can finally understand what your money is trying to tell you—and respond with power.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_3',
  },
  {
    id: '4',
    name: 'The Delayed Dividend',
    price: 11.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Forget instant gratification! Real wealth is earned through the quiet power of patience. The Delayed Dividend reveals how small, consistent choices today create outsized rewards tomorrow. From compounding investments to emotional discipline and long-term systems, this book reframes waiting not as sacrifice, but as strategy. The best returns don’t rush; they arrive when you’re ready.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_4',
  },
  {
    id: '5',
    name: 'The 7 Financial Rooms',
    price: 13.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Your financial life isn’t a spreadsheet, it’s a house with seven essential rooms. From the Foundation (emergency savings) to the Engine Room (passive income), each space plays a vital role in stability and growth. This book walks you through building, organizing, and maintaining your personal "Wealth Home," so you’re not just making money. Rather you’re creating a safe, sustainable, and scalable financial life.',
    category: 'books',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_5',
  },
  {
    id: '6',
    name: 'Professional Camera',
    price: 250,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    description: 'High-quality professional camera perfect for photography enthusiasts and professionals alike. Features advanced autofocus, excellent low-light performance, and durable construction that can withstand various shooting conditions.',
    category: 'cameras',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_6',
  },
  {
    id: '7',
    name: 'Camera Lens',
    price: 150,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
    description: 'Premium camera lens with excellent optical quality and superior build. Perfect for portrait photography, landscape shots, and professional work. Features fast autofocus and weather sealing.',
    category: 'lenses',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_7',
  },
  {
    id: '8',
    name: 'Photography Kit',
    price: 300,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
    description: 'Complete photography kit for beginners and professionals. Includes camera, lens, tripod, memory cards, and carrying case. Everything you need to start your photography journey.',
    category: 'accessories',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_8',
  },
  {
    id: '9',
    name: 'Vintage Camera',
    price: 180,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Beautiful vintage camera with classic design and timeless appeal. Fully functional with manual controls that provide an authentic photography experience. Perfect for collectors and film photography enthusiasts.',
    category: 'cameras',
    inStock: true,
    stripePaymentLink: 'https://buy.stripe.com/test_your_payment_link_9',
  },
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = sampleProducts.find(p => p.id === id);
    setProduct(foundProduct || null);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Direct Stripe payment instead of cart
      if (product.stripePaymentLink) {
        window.open(product.stripePaymentLink, '_blank');
      } else {
        alert('Payment link not configured for this product.');
      }
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-blue-600 hover:text-blue-700">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/shop" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Shop
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">
                {product.currency === 'USD' && '$'}
                {product.currency === 'EUR' && '€'}
                {product.currency === 'GBP' && '£'}
                {product.price}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-6">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.inStock && (
              <div className="space-y-4">
                {/* Pay Now Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Pay Now - {product.currency === 'USD' && '$'}{product.currency === 'EUR' && '€'}{product.currency === 'GBP' && '£'}{product.price}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;