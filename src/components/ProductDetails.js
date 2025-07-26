import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const baseImageUrl = process.env.REACT_APP_API_URL || 'https://superkart.devopspedia.online';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL || 'https://superkart.devopspedia.online'}/products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(() => alert('Failed to load product details'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Loading...</p>;

  if (!product) return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Product not found</p>;

  const imageSrc = product.image_url
    ? (product.image_url.startsWith('http')
      ? product.image_url
      : `${baseImageUrl.replace(/\/$/, '')}/${product.image_url.replace(/^\//, '')}`)
    : 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back to Products</button>

      <div style={styles.productWrapper}>
        <img src={imageSrc} alt={product.name} style={styles.productImage} />
        <div style={styles.details}>
          <h2 style={styles.title}>{product.name}</h2>
          <p style={styles.description}>{product.description || 'No description available.'}</p>

          <div style={styles.priceStock}>
            <span style={styles.price}>₹{Number(product.price).toFixed(2)}</span>
            <span style={styles.stock}>
              {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
            </span>
          </div>

          <div style={styles.buttons}>
            <button
              style={{ ...styles.button, ...styles.cartBtn }}
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              title={product.stock === 0 ? 'Out of stock' : 'Add to Cart'}
            >
              🛒 Add to Cart
            </button>
            <button
              style={{ ...styles.button, ...styles.orderBtn }}
              onClick={() => alert('Order placed! (simulate)')}
              disabled={product.stock === 0}
              title={product.stock === 0 ? 'Out of stock' : 'Order Now'}
            >
              🛍️ Order Now
            </button>
          </div>

          <div style={styles.marketing}>
            <h3>Why Choose This Product?</h3>
            <ul>
              <li>✅ High quality and durable</li>
              <li>✅ Fast delivery and easy returns</li>
              <li>✅ Best price guaranteed</li>
              <li>✅ 24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '3rem auto',
    padding: '1rem 1.5rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#2d3748',
  },
  backBtn: {
    backgroundColor: '#2b6cb0',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  },
  productWrapper: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  productImage: {
    flex: '1 1 400px',
    maxWidth: '400px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    objectFit: 'cover',
    height: 'auto',
  },
  details: {
    flex: '1 1 400px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#2b6cb0',
  },
  description: {
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
    lineHeight: 1.5,
  },
  priceStock: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '600',
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  price: {
    color: '#38a169',
  },
  stock: {
    fontStyle: 'italic',
    color: '#718096',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  button: {
    flex: '1',
    padding: '0.8rem',
    borderRadius: '10px',
    border: 'none',
    fontWeight: '700',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  cartBtn: {
    backgroundColor: '#3182ce',
    color: 'white',
  },
  orderBtn: {
    backgroundColor: '#38a169',
    color: 'white',
  },
  marketing: {
    backgroundColor: '#bee3f8',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    color: '#2c5282',
    fontWeight: '600',
    fontSize: '1.1rem',
  },
};

export default ProductDetails;
