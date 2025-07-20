import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

function ProductList({ onOrder }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://43.204.142.97:3001/products')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  }, []);

  return (
    <div className="card p-3 my-3">
      <h4>📦 Products</h4>
      <ul className="list-group">
        {products.map(product => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{product.name}</strong> - ₹{product.price} <br />
              <small className="text-muted">Stock: {product.stock}</small>
            </div>
            <div>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              {onOrder && (
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => onOrder(product)}
                >
                  Order
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
