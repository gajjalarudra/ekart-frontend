import React, { useState } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import OrderProduct from './components/OrderProduct';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="text-center">🛒 eKart</h2>
      <AddProduct />
      <ProductList onOrder={setSelectedProduct} />
      {selectedProduct && (
        <OrderProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

export default App;
