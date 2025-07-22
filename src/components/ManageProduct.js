import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL || 'https://superkart.devopspedia.online';

function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(`${baseUrl}/products`)
      .then((res) => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditData({ ...product });
    setImageFile(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setImageFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${baseUrl}/products/${editingId}`, editData);

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        await axios.post(`${baseUrl}/products/${editingId}/upload-image`, formData);
      }

      fetchProducts();
      handleCancel();
    } catch (err) {
      alert('Failed to update product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${baseUrl}/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  return (
    <div>
      <h4 className="mb-4" style={{ fontWeight: 600, color: '#2d3748' }}>🛠️ Manage Products</h4>
      <div className="row g-4">
        {products.map((product) => {
          const imageSrc = product.image_url
            ? (product.image_url.startsWith('http')
                ? product.image_url
                : `${baseUrl.replace(/\/$/, '')}/${product.image_url.replace(/^\//, '')}`)
            : 'https://via.placeholder.com/300x180?text=No+Image';

          return (
            <div key={product.id} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
              <div className="card w-100 shadow-sm border-0 d-flex flex-column" style={{ borderRadius: '12px' }}>
                <div className="card-img-wrapper" style={{ height: '180px', overflow: 'hidden' }}>
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="card-img-top"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body d-flex flex-column flex-grow-1">
                  {editingId === product.id ? (
                    <>
                      <input className="form-control mb-2" name="name" value={editData.name} onChange={handleChange} />
                      <input className="form-control mb-2" name="description" value={editData.description} onChange={handleChange} />
                      <input className="form-control mb-2" name="price" type="number" value={editData.price} onChange={handleChange} />
                      <input className="form-control mb-2" name="stock" type="number" value={editData.stock} onChange={handleChange} />
                      <input className="form-control mb-2" type="file" accept="image/*" onChange={handleImageChange} />
                      <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <div>₹{Number(product.price).toFixed(2)}</div>
                      <div>Stock: {product.stock}</div>
                      <button className="btn btn-primary btn-sm me-2 mt-2" onClick={() => handleEdit(product)}>Edit</button>
                      <button className="btn btn-danger btn-sm mt-2" onClick={() => handleDelete(product.id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageProduct;
