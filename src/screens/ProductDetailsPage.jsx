import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import '../css files/ProductDetailsPage.css';

const ProductDetailsPage = ({ match }) => {
  const { id } = useParams();

  const [showDescription, setShowDescription] = useState(true);
  const [showAllergens, setShowAllergens] = useState(true);
  const [showUsage, setShowUsage] = useState(true);
  
  const { data: product, loading, error } = useFetch(`/products/${id}`);

  if(error){
    return<p>{error}</p>;
  }

  return (
    <div className='overlay'>
      <div className='product-details-container'>
        <h1 className='product-name'>Product Details Page</h1>
        {loading ? (
          <p className='loading-message'>Loading...</p>
        ) : (
          <div>
            <h2 className='product-name'>{product.name}</h2>
            <img src={product.productImage} alt={product.name} className="product-image" />
            <p className="section-content">Product Price: ${product.cost_price}</p>
            {/* Description section (expandable/collapsible) */}
            <h3 className="section-header" onClick={() => setShowDescription(!showDescription)}>Description</h3>
            {showDescription && <p className="section-content">{product.description}</p>}

            {/* Allergens section (expandable/collapsible) */}
            <h3 className="section-header" onClick={() => setShowAllergens(!showAllergens)}>Allergens</h3>
            {showAllergens && <p className="section-content">{product.allergen_info}</p>}

            {/* Usage instructions section (expandable/collapsible) */}
            <h3 className="section-header" onClick={() => setShowUsage(!showUsage)}>Usage Instructions</h3>
            {showUsage && <p className="section-content">{product.cooking_instruction}</p>}
            {/* Add more product details here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
