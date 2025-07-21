import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const baseImageUrl = 'http://43.204.142.97:3001/images/';

function ProductList({ onOrder }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL || 'http://43.204.142.97:3001'}/products`)
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  }, []);

  return (
    <div className="my-3">
      <h4 className="mb-4" style={{ fontWeight: 600, color: '#2d3748' }}>📦 Products</h4>
      <div className="row">
        {products.map(product => {
          const hasImage = product.image_url && product.image_url.trim() !== '';
          const imageSrc = hasImage
            ? (product.image_url.startsWith('http') ? product.image_url : baseImageUrl + product.image_url)
            : 'https://via.placeholder.com/300x180?text=No+Image';

          return (
            <div key={product.id} className="col-md-4 mb-4">
              <div
                className="card h-100 shadow-sm border-0"
                style={{ borderRadius: '12px', overflow: 'hidden' }}
              >
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-1">{product.name}</h5>
                  <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                    {product.description || 'No description available.'}
                  </p>
                  <div className="mb-3">
                    <span className="fw-bold">₹{Number(product.price).toFixed(2)}</span>
                    <br />
                    <small className="text-muted">Stock: {product.stock}</small>
                  </div>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      title={product.stock === 0 ? "Out of stock" : "Add to Cart"}
                    >
                      🛒 Add to Cart
                    </button>
                    {onOrder && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => onOrder(product)}
                      >
                        🛍️ Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
