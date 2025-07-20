import React, { useState, useContext } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import OrderProduct from './components/OrderProduct';
import CartPage from './components/CartPage';
import Login from './components/Login'; // your login component
import Signup from './components/Signup'; // your signup component
import 'bootstrap/dist/css/bootstrap.min.css';

import { CartProvider, CartContext } from './context/CartContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    alert('Checkout logic will be implemented');
    clearCart();
  };

  if (!user) {
    // If not logged in, show Login or Signup forms
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">🛒 eKart - Please {showSignup ? 'Signup' : 'Login'}</h2>
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

  // If logged in, show the main app UI
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>🛒 eKart</h2>
        <div>
          <span className="me-3">Hello, {user.name}</span>
          <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="text-end mb-2">
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
      ) : (
        <>
          <AddProduct />
          <ProductList onOrder={setSelectedProduct} addToCart={addToCart} />
        </>
      )}

      {selectedProduct && (
        <OrderProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

// Wrap your app with both AuthProvider and CartProvider
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
