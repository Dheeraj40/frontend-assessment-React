import React, { useState } from 'react';
import useFetch from '../useFetch';

import { Link } from 'react-router-dom'; // Import Link from React Router
import ProductAddModal from '../ProductAddModal';
import Skeleton from './Skeleton';
import '../css files/ProductListing.css';

const ProductListingPage = () => {
  const { data: products, loading, error } = useFetch('/products');
 
  // const sortedProducts = products.sort((a, b) => a.cost_price - b.cost_price);
  const sortedProducts = React.useMemo(() => {
    if (products && products.length > 0) {
      // Sort products by cost_price (assuming cost_price is a numeric property)
      return [...products].sort((a, b) => a.cost_price - b.cost_price);
    }
    return [];
  }, [products]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false); // State to track product added status


  const handleAddProduct = async () => {
    // Optional: Implement logic to refresh product list after adding new product
    // refetchProducts();
    setIsProductAdded(true);
  };

  const handleCloseNotification = () => {
    // Reset product added state when notification is closed
    setIsProductAdded(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Product Listing Page</h1>

      {loading ? (
        <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
       </div>
      ) : (
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="product-tile">
                <img src={product.productImage} alt={product.name} className="product-image" />
                <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>Price: ${product.cost_price}</p>
                    {/* Add more product details here */}
                </div> 
           </Link>
          ))}
        </div>
      )}

        {/* Add Product Button*/}
      <button onClick={() => setIsModalOpen(true)}>Add Product</button>

      {/* Render Product Add Modal */}
        <ProductAddModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddProduct={handleAddProduct}
        />

      {/* Product Added Notification */}
      {isProductAdded && (
        <div className="product-added-notification">
          Product added successfully!
          <button onClick={handleCloseNotification}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
