export function Hero() {
  return (
    <section 
      id="home"
      className="h-[600px] bg-cover bg-center flex items-center justify-center text-center text-white mt-16"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url('https://images.unsplash.com/photo-1606293926075-69a00dbfde81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`
      }}
    >
      <div className="max-w-3xl px-8">
        <h1 className="text-5xl font-bold mb-4">Discover Authentic Tribal Craftsmanship</h1>
        <p className="text-xl mb-8">Explore unique handcrafted treasures while supporting indigenous artisans</p>
        <button className="cta-button">Explore Collection</button>
      </div>
    </section>
  );
}