
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ManageProductEdit.css';

const ManageProductEdit = ({ product, setSelectedEdit }) => {
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    quantity: product.quantity,
  });

  const [previewImages, setPreviewImages] = useState(product?.images?.map((image) => image.url));

  useEffect(() => {
    setPreviewImages(product?.images?.map((image) => image.url));
  }, [product?.images]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const handleclose = async () => {
    setSelectedEdit(null);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProduct = {
        productId: product._id,
        updatedInfo: {
          title: editedProduct.title,
          description: editedProduct.description,
          price: editedProduct.price,
          quantity: editedProduct.quantity,
        },
      };
  
      const response = await axios.put('http://localhost:3005/inventory/updateProduct', { updatedProduct });
      setSelectedEdit(null);
  
      if (response.data.success) {
        console.log()
      } else {
        console.error('Failed to update product:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  

  return (
    <div className="manage-product-edit-container">
      <div className="image-carousel">
        <Slider {...settings}>
          {previewImages?.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={`http://localhost:3002/uploads/${image}`}
                alt={`Image ${index + 1}`}
                className="image-preview"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="product-details">
        <h3>Edit Product</h3>

        <label htmlFor="title">Title:</label>
        <input type="text" name="title" value={editedProduct.title} onChange={handleInputChange} />
        <label htmlFor="description">Description:</label>
        <textarea name="description" value={editedProduct.description} onChange={handleInputChange} />
        <p>Category:</p>
        <p>{editedProduct.category}</p>
        <label htmlFor="price">Price:</label>
        <input type="number" name="price" value={editedProduct.price} onChange={handleInputChange} />
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" name="quantity" value={editedProduct.quantity} onChange={handleInputChange} />
        <div className='button-wrapper'>
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button id='close' onClick={handleclose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ManageProductEdit;
