import React from 'react';
import { Dialog } from '@headlessui/react';
import { useCart } from '../contexts/CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems,
    isOpen, 
    setIsOpen 
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors z-40"
      >
        <ShoppingBag className="w-6 h-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-semibold">Shopping Cart</Dialog.Title>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-gray-600 text-sm">
                          {item.product.currency === 'USD' && '$'}
                          {item.product.currency === 'EUR' && '€'}
                          {item.product.currency === 'GBP' && '£'}
                          {item.product.price}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {items.length > 0 && (
              <div className="border-t p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total: ${getTotalPrice().toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Checkout
                </button>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Cart;