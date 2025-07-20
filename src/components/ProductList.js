import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const baseImageUrl = 'http://43.204.142.97:3001/images/'; // Adjust if needed

function ProductList({ onOrder }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://43.204.142.97:3001/products')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  }, []);

  return (
    <div className="my-3">
      <h4>📦 Products</h4>
      <div className="row">
        {products.map(product => {
          // Defensive check for image_url
          const hasImage = product.image_url && product.image_url.trim() !== '';
          const imageSrc = hasImage
            ? (product.image_url.startsWith('http') ? product.image_url : baseImageUrl + product.image_url)
            : 'https://via.placeholder.com/300x180?text=No+Image';

          return (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="card-img-top"
                  style={{ maxHeight: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted" style={{ flexGrow: 1 }}>
                    {product.description || 'No description available.'}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{isNaN(Number(product.price)) ? 'N/A' : Number(product.price).toFixed(2)} <br />
                    <small className="text-muted">Stock: {product.stock}</small>
                  </p>

                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      title={product.stock === 0 ? "Out of stock" : "Add to Cart"}
                    >
                      Add to Cart
                    </button>
                    {onOrder && (
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => onOrder(product)}
                      >
                        Order
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
