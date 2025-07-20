import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image_url: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadRes = await axios.post('http://43.204.142.97:3001/upload', formData);
        product.image_url = uploadRes.data.url;
      }

      // Step 2: Add product
      await axios.post('http://43.204.142.97:3001/products', product);
      alert('✅ Product added!');

      // Reset
      setProduct({ name: '', description: '', price: '', stock: '', image_url: '' });
      setImageFile(null);
    } catch (err) {
      console.error('Product add failed:', err);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div className="card p-3 my-3">
      <h4>Add New Product</h4>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          className="form-control my-1"
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control my-1"
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <input
          className="form-control my-1"
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          className="form-control my-1"
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          required
        />
        <input
          className="form-control my-1"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            style={{ height: '100px', objectFit: 'cover', marginTop: '10px' }}
          />
        )}
        <button className="btn btn-primary mt-2" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
