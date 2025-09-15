import { Product } from '../types';
import { useCart } from '../lib/cart';
import toast from 'react-hot-toast';

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section id="products" className="py-16 px-8 bg-amber-50">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600">{product.tribe}</p>
              <p className="text-amber-900 font-bold text-xl mt-2">₹{product.price}</p>
              <button 
                className="cta-button mt-4 w-full py-2 px-4"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}