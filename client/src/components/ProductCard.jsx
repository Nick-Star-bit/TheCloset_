import React from 'react';

const ProductCard = ({ producto, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={producto.imagen || 'https://via.placeholder.com/200'} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <div className="card-footer">
        <span className="price">${producto.precio}</span>
        <button onClick={() => onAddToCart(producto)}>Añadir al carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;
