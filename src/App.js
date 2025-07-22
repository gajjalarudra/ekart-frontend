import React, { useState, useContext } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import OrderProduct from './components/OrderProduct';
import CartPage from './components/CartPage';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import ManageProduct from './components/ManageProduct';

import { Routes, Route, useNavigate } from 'react-router-dom';
import BlogPage from './components/BlogPage';
import Profile from './components/Profile';
import AboutPage from './components/AboutPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { CartProvider, CartContext } from './context/CartContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Sidebar must be a child of Router to use useNavigate
function Sidebar({ user, logout, onShowHome, onShowAddProduct, onShowOrderProduct, onShowOrders }) {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <aside style={styles.sidebar}>
      <div>
        <h2
          style={styles.brand}
          onClick={() => { onShowHome(); navigate('/'); }}
          onMouseEnter={e => e.currentTarget.style.color = '#FFB732'}
          onMouseLeave={e => e.currentTarget.style.color = '#FFA500'}
        >
          <i className="fas fa-shopping-cart me-2"></i> SuperKart
        </h2>
        <p style={styles.greeting}>Hello, {user.name || 'User'}</p>

        <div style={styles.navContainer}>
          <ul style={styles.navList}>
            <li style={styles.navItem} onClick={() => { onShowHome(); navigate('/'); }}>
              <i className="fas fa-home me-2"></i> Home
            </li>
            <li style={styles.navItem} onClick={onShowAddProduct}>
              <i className="fas fa-plus me-2"></i> Add Product
            </li>
            <li style={styles.navItem} onClick={onShowOrderProduct}>
              <i className="fas fa-shopping-bag me-2"></i> Order Product
            </li>
            <li style={styles.navItem} onClick={onShowOrders}>
              <i className="fas fa-box-open me-2"></i> Orders
            </li>
            <li style={styles.navItem} onClick={() => navigate('/blog')}>
              <i className="fas fa-blog me-2"></i> Blog
            </li>
            <li style={styles.navItem} onClick={() => navigate('/profile')}>
              <i className="fas fa-user me-2"></i> Profile
            </li>
            <li style={styles.navItem} onClick={() => navigate('/about')}>
              <i className="fas fa-info-circle me-2"></i> About
            </li>
            <li style={styles.navItem} onClick={() => navigate('/manage-products')}>
              <i className="fas fa-cogs me-2"></i> Manage Product
            </li>
          </ul>
        </div>
      </div>

      <button style={styles.logoutBtn} onClick={logout}>
        <i className="fas fa-sign-out-alt me-2"></i> Logout
      </button>
    </aside>
  );
}

function HomeContent({
  selectedProduct,
  setSelectedProduct,
  showAddProduct,
  showOrderProduct,
  showOrders,
  showCart,
  setShowCart,
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
  handleCheckout,
}) {
  return (
    <main style={styles.mainContent}>
      <div style={styles.cartBtnWrapper}>
        <button style={styles.cartBtn} onClick={() => setShowCart(!showCart)}>
          <i className="fas fa-shopping-cart me-2"></i> View Cart ({cartItems.length})
        </button>
      </div>

      {showCart ? (
        <CartPage cartItems={cartItems} onRemove={removeFromCart} onCheckout={handleCheckout} />
      ) : showAddProduct ? (
        <AddProduct />
      ) : showOrders ? (
        <OrderHistory />
      ) : (
        <>
          <ProductList addToCart={addToCart} onOrder={setSelectedProduct} />
          {selectedProduct && (
            <OrderProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />
          )}
        </>
      )}
    </main>
  );
}

// ✅ Wrapper for consistent spacing on all non-Home pages
const PageLayout = ({ children }) => (
  <main style={styles.mainContent}>
    {children}
  </main>
);

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
      <Navbar />
      <Sidebar
        user={user}
        logout={logout}
        onShowHome={handleShowHome}
        onShowAddProduct={handleShowAddProduct}
        onShowOrderProduct={handleShowOrderProduct}
        onShowOrders={handleShowOrders}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomeContent
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              showAddProduct={showAddProduct}
              showOrderProduct={showOrderProduct}
              showOrders={showOrders}
              showCart={showCart}
              setShowCart={setShowCart}
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              handleCheckout={handleCheckout}
            />
          }
        />
        <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />
        <Route path="/profile" element={<PageLayout><Profile /></PageLayout>} />
        <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
        <Route path="/manage-products" element={<PageLayout><ManageProduct /></PageLayout>} />
      </Routes>
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
    backgroundColor: 'transparent',
    border: '2px solid #e53e3e',
    color: '#e53e3e',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    alignSelf: 'center',
    width: '100%',
    transition: 'all 0.3s ease',
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
    padding: '5rem 2rem 2rem',
    flexGrow: 1,
    minHeight: '100vh',
    boxSizing: 'border-box',
    width: 'auto',
    maxWidth: '100%',
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
