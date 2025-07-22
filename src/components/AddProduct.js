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

        const token = localStorage.getItem('token');
        const uploadRes = await axios.post(
          'https://superkart.devopspedia.online/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        if (uploadRes.data?.url) {
          imageUrl = uploadRes.data.url;
        } else if (uploadRes.data?.filename) {
          imageUrl = `https://superkart.devopspedia.online/images/${uploadRes.data.filename}`;
        } else {
          throw new Error('Invalid upload response');
        }

        setUploading(false);
      }

      const newProduct = {
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock, 10),
        image_url: imageUrl,
      };

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
    <div className="container mt-4">
      <div className="card shadow-sm p-4" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '16px' }}>
        <h4 className="mb-4 text-primary fw-bold">➕ Add New Product</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label fw-semibold">Product Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Product description"
              rows="2"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Price (₹)</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="e.g. 99.99"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Stock</label>
              <input
                className="form-control"
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="e.g. 100"
                required
                min="0"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Product Image</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imageFile && (
              <div className="mt-3 text-center">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  style={{ height: '120px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}
                />
              </div>
            )}
          </div>

          <div className="d-grid mt-4">
            <button className="btn btn-primary" type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : '✅ Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
