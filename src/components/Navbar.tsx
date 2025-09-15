import { ShoppingCart, User, Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthModal } from './Auth/AuthModal';
import { CartModal } from './Cart/CartModal';
import { auth } from '../lib/auth';
import { useCart } from '../lib/cart';
import toast from 'react-hot-toast';

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isSellerAuth, setIsSellerAuth] = useState(false);
  const navigate = useNavigate();
  const { items } = useCart();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleUserClick = async () => {
    const user = auth.getCurrentUser();
    
    if (user && !user.isSeller) {
      navigate('/dashboard');
    } else {
      setIsSellerAuth(false);
      setIsAuthModalOpen(true);
    }
  };

  const handleSellerClick = () => {
    const user = auth.getCurrentUser();
    
    if (user && user.isSeller) {
      navigate('/seller');
    } else {
      setIsSellerAuth(true);
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    toast.success('Successfully logged out');
    navigate('/');
  };

  return (
    <>
      <nav className="bg-amber-900 py-4 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-white">
          <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition-colors">
            TribalTreasures
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/tribes" className="nav-link">Tribes</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:text-yellow-300 transition-colors relative"
              onClick={() => setIsCartModalOpen(true)}
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button 
              onClick={handleUserClick}
              className="p-2 hover:text-yellow-300 transition-colors"
            >
              <User size={24} />
            </button>
            <button 
              onClick={handleSellerClick}
              className="p-2 hover:text-yellow-300 transition-colors"
            >
              <Store size={24} />
            </button>
            {auth.getCurrentUser() && (
              <button
                onClick={handleLogout}
                className="text-sm hover:text-yellow-300 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        isSeller={isSellerAuth}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
}