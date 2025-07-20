import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://43.204.142.97:3001/products', product);
      alert('Product added!');
      setProduct({ name: '', description: '', price: '', stock: '' });
    } catch (err) {
      alert('Failed to add product');
    }
  };

  return (
    <div className="card p-3 my-3">
      <h4>Add New Product</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-1" type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
        <input className="form-control my-1" type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        <input className="form-control my-1" type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
        <input className="form-control my-1" type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} required />
        <button className="btn btn-primary mt-2" type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
