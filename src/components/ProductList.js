import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList({ onOrder }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://43.204.142.97:3001/products')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  }, []);

  return (
    <div className="card p-3 my-3">
      <h4>Products</h4>
      <ul className="list-group">
        {products.map(product => (
          <li key={product.id} className="list-group-item d-flex justify-content-between">
            <span>
              <strong>{product.name}</strong> - ₹{product.price} (Stock: {product.stock})
            </span>
            <button className="btn btn-success btn-sm" onClick={() => onOrder(product)}>Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
