import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Tribes } from './components/Tribes';
import { Footer } from './components/Footer';
import { Dashboard } from './pages/Dashboard';
import { SellerDashboard } from './pages/SellerDashboard';
import { products, tribes } from './data';
import { useEffect, useState } from 'react';
import { auth } from './lib/auth';

function HomePage() {
  return (
    <>
      <Hero />
      <Products products={products} />
      <Tribes tribes={tribes} />
    </>
  );
}

// Protected Route component
function ProtectedRoute({ children, requireSeller = false }: { children: React.ReactNode, requireSeller?: boolean }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState(auth.getCurrentUser());

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = auth.getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requireSeller && !user?.isSeller) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/seller" 
            element={
              <ProtectedRoute requireSeller={true}>
                <SellerDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App