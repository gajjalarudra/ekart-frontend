import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image_url: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      let imageUrl = '';

      if (imageFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', imageFile);

        const token = localStorage.getItem('token'); // if auth is needed

        const uploadRes = await axios.post('https://superkart.devopspedia.online/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (uploadRes.data && uploadRes.data.url) {
          imageUrl = uploadRes.data.url;
        } else if (uploadRes.data && uploadRes.data.filename) {
          // If API returns filename, construct URL
          imageUrl = `https://superkart.devopspedia.online/
          images/${uploadRes.data.filename}`;
        } else {
          throw new Error('Invalid upload response');
        }
        setUploading(false);
      }

      // Create product payload
      const newProduct = {
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock, 10),
        image_url: imageUrl,
      };

      // Send product creation request
      const token = localStorage.getItem('token');
      await axios.post('https://superkart.devopspedia.online/products', newProduct, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      alert('✅ Product added!');
      setProduct({ name: '', description: '', price: '', stock: '', image_url: '' });
      setImageFile(null);
    } catch (err) {
      setUploading(false);
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
          min="0"
          step="0.01"
        />
        <input
          className="form-control my-1"
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          required
          min="0"
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
        <button className="btn btn-primary mt-2" type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
