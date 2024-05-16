import React, { useState } from 'react';
import { postRequest } from './axios';
import './css files/ProductAddModal.css';

const ProductAddModal = ({ isOpen, onClose, onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productAllergenInfo, setProductAllergenInfo] = useState('');

  const handleAddProduct = async () => {
    try {
      // Validate input fields (optional)
      if (!productName || !productDescription || !productAllergenInfo) {
        alert('Please fill in all fields.');
        return;
      }

      // Create new product data object
      const newProduct = {
        name: productName,
        description: productDescription,
        allergen_info: productAllergenInfo,
      };

      // Send POST request to add new product
      await postRequest('/products', newProduct, { contentType: 'application/json' });

      // Reset input fields
      setProductName('');
      setProductDescription('');
      setProductAllergenInfo('');

      // Close the modal and trigger callback function (optional)
      onClose();
      onAddProduct(); // Optionally trigger a callback to update product list after adding
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Add New Product</h2>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Product Description:
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </label>
        <label>
          Product Allergen Info:
          <input
            type="text"
            value={productAllergenInfo}
            onChange={(e) => setProductAllergenInfo(e.target.value)}
          />
        </label>
        <button onClick={handleAddProduct}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ProductAddModal;
