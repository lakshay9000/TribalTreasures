import { Tribe } from '../types';

interface TribesProps {
  tribes: Tribe[];
}

export function Tribes({ tribes }: TribesProps) {
  return (
    <section id="tribes" className="py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our Tribes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tribes.map((tribe, index) => (
          <div key={index} className="tribe-card">
            <img 
              src={tribe.image} 
              alt={tribe.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-xl font-semibold mb-2">{tribe.name}</h3>
              <p>{tribe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}