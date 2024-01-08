import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddItemForm.css';

const AddItemForm = ({ onClose, onAdd, user }) => {
  const [itemData, setItemData] = useState({
    title: '',
    categories: '',
    description: '',
    price: 0,
    quantity: 0,
    images: [],
  });

  const [navbarCategories, setNavbarCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = [
          'Womens fashion',
          'Mens fashion',
          'Bags and accessories',
          'Baby care',
          'Health care and beauty',
          'Electronic Accessories',
          'Home and lifestyle',
          'Art and crafts',
        ];

        setNavbarCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setItemData({
      ...itemData,
      images: files,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!itemData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!itemData.categories) {
      newErrors.categories = 'Category is required';
    }

    if (!itemData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (itemData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (itemData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append('title', itemData.title);
      formData.append('categories', itemData.categories);
      formData.append('description', itemData.description);
      formData.append('price', itemData.price);
      formData.append('quantity', itemData.quantity);
      formData.append('userEmail', user.email);

      for (let i = 0; i < itemData.images.length; i++) {
        formData.append('images', itemData.images[i]);
      }

      const response = await axios.post('http://localhost:3001/products/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const newItem = response.data.item;
        onAdd(newItem);
        onClose();
      } else {
        console.error('Add Item failed');
        onClose();
      }
    } catch (error) {
      console.error('Error adding item:', error);
      onClose();
    }
  };

  return (
    <div className="add-item-form-container">
      <h2>Add Item</h2>
      <div className='form-box'>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Title:
          <input type="text" name="title" value={itemData.title} onChange={handleChange} required />
          {errors.title && <div className="error-text">{errors.title}</div>}
        </label>

        <label>
          Categories:
          <select name="categories" value={itemData.categories} onChange={handleChange} required>
            <option value="" disabled>Select a category</option>
            {navbarCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.categories && <div className="error-text">{errors.categories}</div>}
        </label>

        <label>
          Description:
          <textarea name="description" value={itemData.description} onChange={handleChange} required />
          {errors.description && <div className="error-text">{errors.description}</div>}
        </label>

        <label>
          Price:
          <input type="number" name="price" value={itemData.price} onChange={handleChange} required />
          {errors.price && <div className="error-text">{errors.price}</div>}
        </label>

        <label>
          Quantity:
          <input type="number" name="quantity" value={itemData.quantity} onChange={handleChange} required />
          {errors.quantity && <div className="error-text">{errors.quantity}</div>}
        </label>

        <label>
          Images:
          <input type="file" name="images" onChange={handleImageChange} accept="image/*" multiple />
        </label>
        <div className='button-container'>
        <button type="submit">Add Item</button>
        <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AddItemForm;
