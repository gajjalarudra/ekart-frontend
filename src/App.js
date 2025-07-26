import React, { useState, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import OrderProduct from './components/OrderProduct';
import CartPage from './components/CartPage';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import ManageProduct from './components/ManageProduct';
import BlogPage from './components/BlogPage';
import Profile from './components/Profile';
import AboutPage from './components/AboutPage';
import HomePage from './components/HomePage';
import SummerEssentials from './pages/SummerEssentials';
import ChooseGadget from './pages/ChooseGadget';
import AboutSuperKart from './pages/AboutSuperKart';
import CheckoutPending from './pages/CheckoutPending';
import ProductDetails from './components/ProductDetails';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import { CartProvider, CartContext } from './context/CartContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

function Sidebar({ user, logout, onShowHome, onShowAddProduct, onShowOrderProduct, onShowOrders }) {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <aside style={styles.sidebar}>
      <div>
        <p style={styles.greeting}>Hello, {user.name || 'User'}</p>

        <ul style={styles.navList}>
          <li className="sidebar-nav-item" onClick={() => { onShowHome(); navigate('/'); }}>
            <i className="fas fa-home me-2"></i> Home
          </li>
          <li className="sidebar-nav-item" onClick={() => { onShowAddProduct(); navigate('/add-product'); }}>
            <i className="fas fa-plus me-2"></i> Add Product
          </li>
          <li className="sidebar-nav-item" onClick={() => { onShowOrderProduct(); navigate('/shop'); }}>
            <i className="fas fa-shopping-bag me-2"></i> Shop
          </li>
          <li className="sidebar-nav-item" onClick={() => { onShowOrders(); navigate('/orders'); }}>
            <i className="fas fa-box-open me-2"></i> Orders
          </li>
          <li className="sidebar-nav-item" onClick={() => navigate('/manage-products')}>
            <i className="fas fa-cogs me-2"></i> Manage Product
          </li>
        </ul>
      </div>
    </aside>
  );
}

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const handleShowHome = () => setSelectedProduct(null);
  const handleShowAddProduct = () => setSelectedProduct(null);
  const handleShowOrderProduct = () => setSelectedProduct(null);
  const handleShowOrders = () => setSelectedProduct(null);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      {user ? (
        <Route
          path="*"
          element={
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
              <main style={styles.mainContent}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/shop" element={<ProductList addToCart={addToCart} onOrder={setSelectedProduct} />} />
                  <Route path="/orders" element={<OrderHistory />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/manage-products" element={<ManageProduct />} />
                  <Route path="/blog/summer-essentials" element={<SummerEssentials />} />
                  <Route path="/blog/choose-gadget" element={<ChooseGadget />} />
                  <Route path="/blog/about-superkart" element={<AboutSuperKart />} />
                  <Route
                    path="/cart"
                    element={
                      <CartPage cartItems={cartItems} onRemove={removeFromCart} onCheckout={() => { alert('Checkout'); clearCart(); }} />
                    }
                  />
                  <Route path="/checkout" element={<CheckoutPending />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                </Routes>
                {selectedProduct && (
                  <OrderProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                )}
              </main>
            </div>
          }
        />
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
    minHeight: '100vh',
  },
  sidebar: {
    position: 'fixed',
    top: '60px',
    left: 0,
    width: '220px',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#e0f0ff',
    padding: '1rem',
    overflowY: 'auto',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    zIndex: 1099,
  },
  greeting: {
    fontWeight: '600',
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  mainContent: {
    marginLeft: '220px',
    paddingTop: '60px',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    flexGrow: 1,
    minHeight: 'calc(100vh - 60px)',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
};

export default App;
