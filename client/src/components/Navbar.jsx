import React from 'react';

const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="navbar">
      <div className="logo">The Closet Showroom</div>
      <ul className="nav-links">
        <li><a href="#catalogo">Catálogo</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
      <button className="cart-btn" onClick={onOpenCart}>
        🛒 Carrito ({cartCount})
      </button>
    </nav>
  );
};

export default Navbar;

