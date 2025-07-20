import React, { useState, useContext } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import OrderProduct from './components/OrderProduct';
import CartPage from './components/CartPage';
import Login from './components/Login';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CartProvider, CartContext } from './context/CartContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

function Sidebar({ user, logout, onShowHome, onShowAddProduct, onShowOrderProduct, cartCount }) {
  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#1a202c',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'fixed',
      top: 0,
      left: 0,
    }}>
      <div>
        <h2
          style={{ 
            color: '#FFA500', // orange-yellow
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={onShowHome}
          onMouseEnter={e => e.currentTarget.style.color = '#FFB732'}
          onMouseLeave={e => e.currentTarget.style.color = '#FFA500'}
        >
          SuperKart
        </h2>
        <p>Hello, {user.name}</p>
        <nav>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li
              style={{ marginBottom: '1rem', cursor: 'pointer', color: '#63b3ed' }}
              onClick={onShowHome}
            >
              Home
            </li>
            <li
              style={{ marginBottom: '1rem', cursor: 'pointer', color: '#63b3ed' }}
              onClick={onShowAddProduct}
            >
              Add Product
            </li>
            <li
              style={{ marginBottom: '1rem', cursor: 'pointer', color: '#63b3ed' }}
              onClick={onShowOrderProduct}
            >
              Order Product
            </li>
          </ul>
        </nav>
      </div>
      <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
    </div>
  );
}

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showOrderProduct, setShowOrderProduct] = useState(false);
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
      <div className="container mt-4" style={{ maxWidth: 400 }}>
        <h2 className="text-center mb-4">🛒 SuperKart - Please {showSignup ? 'Signup' : 'Login'}</h2>
        {showSignup ? (
          <>
            <Signup />
            <p className="mt-3 text-center">
              Already have an account?{' '}
              <button className="btn btn-link" onClick={() => setShowSignup(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login />
            <p className="mt-3 text-center">
              Don't have an account?{' '}
              <button className="btn btn-link" onClick={() => setShowSignup(true)}>Signup</button>
            </p>
          </>
        )}
      </div>
    );
  }

  // Sidebar button handlers
  const handleShowHome = () => {
    setShowAddProduct(false);
    setShowOrderProduct(false);
    setSelectedProduct(null);
    setShowCart(false);
  };

  const handleShowAddProduct = () => {
    setShowAddProduct(true);
    setShowOrderProduct(false);
    setSelectedProduct(null);
    setShowCart(false);
  };

  const handleShowOrderProduct = () => {
    setShowAddProduct(false);
    setShowOrderProduct(true);
    setSelectedProduct(null);
    setShowCart(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Sidebar
        user={user}
        logout={logout}
        onShowHome={handleShowHome}
        onShowAddProduct={handleShowAddProduct}
        onShowOrderProduct={handleShowOrderProduct}
        cartCount={cartItems.length}
      />

      <main style={{ marginLeft: 250, padding: '2rem', flexGrow: 1 }}>
        <div className="d-flex justify-content-end align-items-center mb-3">
          <button className="btn btn-outline-primary" onClick={() => setShowCart(!showCart)}>
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
        ) : showOrderProduct ? (
          <>
            <ProductList onOrder={setSelectedProduct} addToCart={addToCart} />
            {selectedProduct && (
              <OrderProduct
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            )}
          </>
        ) : (
          // Default: only product list, no add or order modal
          <ProductList addToCart={addToCart} />
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

export default App;
