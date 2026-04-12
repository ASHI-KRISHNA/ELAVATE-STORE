import React, { useEffect, useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to optimize Cloudinary URLs on the fly
  const optimizeUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    // Inserts optimization parameters after '/upload'
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_600,c_scale/');
  };

  useEffect(() => {
    fetch('https://api.npoint.io/97e4992f49ffa25befab')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <nav className="border-b border-gray-100 py-6 px-8 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <span className="font-bold tracking-tighter text-xl">COLLECTION</span>
        <div className="space-x-8 text-xs font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-gray-500 text-black">Shop</a>
          <a href="#" className="hover:text-gray-500">Cart ({products.length})</a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-16">
          <h1 className="text-4xl font-light tracking-tight uppercase mb-2">The Essentials</h1>
          <p className="text-gray-400 font-light italic">Frank and Oak Inspired Aesthetics</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <div key={product.id} className="group relative flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                {/* Main Image */}
                <img
                  src={optimizeUrl(product.image[0])}
                  alt={product.name}
                  loading={index < 4 ? "eager" : "lazy"} // Eager load the first row for better LCP
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                />
                
                {/* Optimized Hover Image */}
                {product.image[1] && (
                  <img
                    src={optimizeUrl(product.image[1])}
                    alt={`${product.name} alternate`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}

                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.sustainable && (
                    <span className="bg-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 shadow-sm border border-gray-100">
                      Sustainable
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[14px] font-medium tracking-tight text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-[14px] font-light text-gray-900">
                    ${product.price}
                  </p>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                  {product.color}
                </p>
              </div>

              <button className="mt-4 border border-black py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-black hover:text-white">
                Quick Add
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-100 mt-20 py-20 px-8 text-center text-[10px] text-gray-400 tracking-[0.3em] uppercase">
        Sustainability at our Core
      </footer>
    </div>
  );
}