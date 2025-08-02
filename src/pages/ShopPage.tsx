import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Filter } from 'lucide-react';
import { Product, Category } from '../types';
import { useCart } from '../contexts/CartContext';

// Sample products - you can modify these manually
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'The Richest Habit',
    price: 19.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'The single daily action that separates the wealthy.',
    category: 'books',
    inStock: true,
  },
  {
    id: '2',
    name: 'The Compound Engine',
    price: 14.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Fuel your wealth with the power of discipline.',
    category: 'books',
    inStock: true,
  },
  {
    id: '3',
    name: 'Money is a Language',
    price: 11.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Become Fluent and Start Speaking Wealth.',
    category: 'books',
    inStock: true,
  },
  {
    id: '4',
    name: 'The Delayed Dividend',
    price: 11.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Why the Best Returns Come from Patience, Not Pressure.',
    category: 'books',
    inStock: true,
  },
  {
    id: '5',
    name: 'The Richest Habit',
    price: 13.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'The single daily action that separates the wealthy.',
    category: 'books',
    inStock: true,
  },
  {
    id: '6',
    name: 'Professional Camera',
    price: 250,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    description: 'High-quality professional camera for photography enthusiasts',
    category: 'cameras',
    inStock: true,
  },
  {
    id: '7',
    name: 'Camera Lens',
    price: 150,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
    description: 'Premium camera lens with excellent optical quality',
    category: 'lenses',
    inStock: true,
  },
  {
    id: '8',
    name: 'Photography Kit',
    price: 300,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
    description: 'Complete photography kit for beginners and professionals',
    category: 'accessories',
    inStock: true,
  },
  {
    id: '9',
    name: 'Vintage Camera',
    price: 180,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg',
    description: 'Beautiful vintage camera with classic design',
    category: 'cameras',
    inStock: true,
  },
];

const sampleCategories: Category[] = [
  {
    id: 'all',
    name: 'All Products',
    description: 'Browse all available products',
    image: '',
  },
  {
    id: 'books',
    name: 'Books',
    description: 'Professional and vintage cameras',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
  },
  {
    id: 'cameras',
    name: 'Cameras',
    description: 'Professional and vintage cameras',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
  },
  {
    id: 'lenses',
    name: 'Lenses',
    description: 'Camera lenses and optical equipment',
    image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Photography accessories and kits',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
  },
];

const ShopPage: React.FC = () => {
  const [products] = useState<Product[]>(sampleProducts);
  const [categories] = useState<Category[]>(sampleCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const { addToCart } = useCart();

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Home
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {product.currency === 'USD' && '$'}
                    {product.currency === 'EUR' && '€'}
                    {product.currency === 'GBP' && '£'}
                    {product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;