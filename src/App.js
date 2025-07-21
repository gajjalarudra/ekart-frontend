import React, { useState, useContext } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import OrderProduct from './components/OrderProduct';
import CartPage from './components/CartPage';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CartProvider, CartContext } from './context/CartContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

function Sidebar({ user, logout, onShowHome, onShowAddProduct, onShowOrderProduct, onShowOrders, cartCount }) {
  return (
    <aside style={styles.sidebar}>
      <div>
        <h2
          style={styles.brand}
          onClick={onShowHome}
          onMouseEnter={e => e.currentTarget.style.color = '#FFB732'}
          onMouseLeave={e => e.currentTarget.style.color = '#FFA500'}
        >
          🛒 SuperKart
        </h2>
        <p style={styles.greeting}>Hello, {user.name}</p>

        {/* 🔲 Glassy Nav Container */}
        <div style={styles.navContainer}>
          <ul style={styles.navList}>
            <li style={styles.navItem} onClick={onShowHome} title="Home">🏠 Home</li>
            <li style={styles.navItem} onClick={onShowAddProduct} title="Add Product">➕ Add Product</li>
            <li style={styles.navItem} onClick={onShowOrderProduct} title="Order Product">🛍️ Order Product</li>
            <li style={styles.navItem} onClick={onShowOrders} title="Orders">📦 Orders</li>
          </ul>
        </div>
      </div>
      <button style={styles.logoutBtn} onClick={logout}>Logout</button>
    </aside>
  );
}

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showOrderProduct, setShowOrderProduct] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    alert('Checkout logic will be implemented');
    clearCart();
    setShowCart(false);
  };

  if (!user) {
    return (
      <div style={styles.authWrapper}>
        {showSignup ? (
          <>
            <Signup />
            <p style={styles.authToggleText}>
              Already have an account?{' '}
              <button style={styles.linkBtn} onClick={() => setShowSignup(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login />
            <p style={styles.authToggleText}>
              Don't have an account?{' '}
              <button style={styles.linkBtn} onClick={() => setShowSignup(true)}>Signup</button>
            </p>
          </>
        )}
      </div>
    );
  }

  const handleShowHome = () => {
    setShowAddProduct(false);
    setShowOrderProduct(false);
    setShowOrders(false);
    setSelectedProduct(null);
    setShowCart(false);
  };

  const handleShowAddProduct = () => {
    setShowAddProduct(true);
    setShowOrderProduct(false);
    setShowOrders(false);
    setSelectedProduct(null);
    setShowCart(false);
  };

  const handleShowOrderProduct = () => {
    setShowAddProduct(false);
    setShowOrderProduct(true);
    setShowOrders(false);
    setSelectedProduct(null);
    setShowCart(false);
  };

  const handleShowOrders = () => {
    setShowAddProduct(false);
    setShowOrderProduct(false);
    setShowOrders(true);
    setSelectedProduct(null);
    setShowCart(false);
  };

  return (
  <div style={styles.appContainer}>
    <Sidebar
      user={user}
      logout={logout}
      onShowHome={handleShowHome}
      onShowAddProduct={handleShowAddProduct}
      onShowOrderProduct={handleShowOrderProduct}
      onShowOrders={handleShowOrders}
      cartCount={cartItems.length}
    />

    <main style={styles.mainContent}>
      <div style={styles.cartBtnWrapper}>
        <button style={styles.cartBtn} onClick={() => setShowCart(!showCart)}>
          🧺 View Cart ({cartItems.length})
        </button>
      </div>

      {showCart ? (
        <CartPage
          cartItems={cartItems}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      ) : showAddProduct ? (
        <AddProduct />
      ) : showOrders ? (
        <OrderHistory />
      ) : (
        <>
          <ProductList
            addToCart={addToCart}
            onOrder={setSelectedProduct}  /* <-- Always here */
          />
          {selectedProduct && (
            <OrderProduct
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </>
      )}
    </main>
  </div>
);
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

// 🔧 Styles
const styles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  sidebar: {
    width: '260px',
    height: '100vh',
    backgroundColor: 'rgba(26, 32, 44, 0.85)',
    color: '#eee',
    padding: '1.5rem 1.2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(6px)',
  },
  brand: {
    color: '#FFA500',
    cursor: 'pointer',
    userSelect: 'none',
    fontWeight: '700',
    fontSize: '1.8rem',
    marginBottom: '0.6rem',
    transition: 'color 0.3s ease',
  },
  greeting: {
    marginBottom: '1.5rem',
    fontWeight: '500',
    fontSize: '1.05rem',
  },
  navContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '1rem',
    borderRadius: '12px',
  },
  navList: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: '1rem',
    cursor: 'pointer',
    color: '#63b3ed',
    fontWeight: '600',
    fontSize: '1.1rem',
    userSelect: 'none',
    padding: '0.5rem 0.8rem',
    borderRadius: '8px',
    transition: 'background-color 0.2s, color 0.2s',
  },
  logoutBtn: {
    backgroundColor: '#e53e3e',
    border: 'none',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    alignSelf: 'center',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
  authWrapper: {
    maxWidth: '420px',
    margin: '6rem auto',
    padding: '2rem',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
  },
  authToggleText: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#3182ce',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  mainContent: {
    marginLeft: '260px',
    padding: '2rem',
    flexGrow: 1,
  },
  cartBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1.5rem',
  },
  cartBtn: {
    border: '2px solid #63b3ed',
    backgroundColor: 'transparent',
    color: '#3182ce',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
};

export default App;
