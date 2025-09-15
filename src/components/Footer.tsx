import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-amber-900 text-white pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">TribalTreasures</h3>
          <p>Preserving and promoting tribal culture through authentic handcrafted products.</p>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <div className="flex flex-col space-y-2">
            <a href="#about" className="hover:text-yellow-300 transition-colors">About Us</a>
            <a href="#tribes" className="hover:text-yellow-300 transition-colors">Our Tribes</a>
            <a href="#products" className="hover:text-yellow-300 transition-colors">Products</a>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 text-center border-t border-white/10">
        <p>&copy; 2024 TribalTreasures. All rights reserved.</p>
      </div>
    </footer>
  );
}