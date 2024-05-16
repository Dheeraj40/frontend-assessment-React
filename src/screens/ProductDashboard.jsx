import React, { useState, useEffect } from 'react';
import useFetch from '../useFetch'; // Import custom hook for data fetching
// import Skeleton from './Skeleton';
// import ProductAddModal from './ProductAddModal';
import '../css files/ProductDashboard.css';

const ProductDashboard = () => {
  const { data: products, loading, error } = useFetch('/dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedField, setSortedField] = useState(null);
  const [productList, setProductList] = useState([]); // State for products list

  useEffect(() => {
    if (products) {
      setProductList(products); // Set productList with fetched products
    }
  }, [products]);

  const handleSort = (field) => {
    // Toggle sort order for the selected field
    if (sortedField === field) {
      setProductList([...productList].reverse()); // Reverse current order
    } else {
      // Sort products by the selected field
      const sorted = [...productList].sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      });
      setProductList(sorted);
      setSortedField(field);
    }
  };

  const handleDelete = (productId) => {
    // Filter out the product with the specified ID
    const updatedProducts = productList.filter((product) => product.id !== productId);
    setProductList(updatedProducts);
  };

  const filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(product.id).includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-dashboard">
      <h1>Product Dashboard</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by product name or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('selling_price')}>Selling Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.selling_price}</td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDashboard;
