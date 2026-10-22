import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { getProductos } from './services/api';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    getProductos().then(data => setProductos(data)).catch(console.error);
  }, []);

  const handleAddToCart = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <div className="App">
      <Navbar cartCount={carrito.length} />
      <header className="hero">
        <h1>Bienvenido a The Closet Showroom</h1>
        <p>Explora nuestras prendas exclusivas</p>
      </header>
      <main className="catalog-grid">
        {productos.map(p => (
          <ProductCard key={p.id} producto={p} onAddToCart={handleAddToCart} />
        ))}
      </main>
    </div>
  );
}

export default App;
