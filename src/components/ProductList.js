import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const baseImageUrl = process.env.REACT_APP_API_URL || 'https://superkart.devopspedia.online';

function ProductList({ onOrder }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`${baseImageUrl}/products`)
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  }, []);

  return (
    <div className="my-3">
      <h4 className="mb-4" style={{ fontWeight: 600, color: '#2d3748' }}>📦 Products</h4>
      <div className="row g-4">
        {products.map(product => {
          const imageSrc = product.image_url
            ? (product.image_url.startsWith('http')
                ? product.image_url
                : `${baseImageUrl.replace(/\/$/, '')}/${product.image_url.replace(/^\//, '')}`)
            : 'https://via.placeholder.com/300x180?text=No+Image';

          return (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
              <div className="card w-100 shadow-sm border-0 d-flex flex-column" style={{ borderRadius: '12px' }}>
                <div className="card-img-wrapper" style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="card-img-top"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h5 className="card-title mb-1">{product.name}</h5>
                  <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                    {product.description || 'No description available.'}
                  </p>
                  <div className="mb-3">
                    <span className="fw-bold">₹{Number(product.price).toFixed(2)}</span><br />
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
