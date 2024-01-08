import React, { useState, useEffect } from 'react';
import ClientSignin from './components/Authentication/ClientSignin';
import ClientSignup from './components/Authentication/ClientSignup';
import VendorSignin from './components/Authentication/VendorSignin';
import VendorSignup from './components/Authentication/VendorSignup';
import AddItemForm from './components/Products/AddItemForm';
import ProductGrid from './components/Products/ProductGrid';
import ManageProductGrid from './components/Products/ManageProductGrid.js';
import ProductDetails from './components/Products/ProductDetails';
import ManageProductEdit from './components/Products/ManageProductEdit.js';
import Cart from './components/Orders/Cart'
import ClientNavbar from './components/Navigation/ClientNavbar.js';
import VendorNavbar from './components/Navigation/VendorNavbar';
import RecommendedProducts from './components/Products/RecommendedProducts';
import axios from 'axios';
import './App.css';


const App = () => {
  const [user, setUser] = useState(null);
  const [showClientSignin, setShowClientSignin] = useState(false);
  const [showClientSignup, setShowClientSignup] = useState(false);
  const [showVendorSignin, setShowVendorSignin] = useState(false);
  const [showVendorSignup, setShowVendorSignup] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [products, setProducts] = useState([]);
  const [managables, setManagable] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUser(storedUser);
      fetchManagables(storedUser);
      fetchRecommended(storedUser);
      fetchProducts();
    } else {
      setShowClientSignin(false);
      setShowClientSignup(false);
      setShowVendorSignin(false);
      setShowVendorSignup(false);
    }
  }, []);

  const handleClientSigninClick = () => {
    setShowClientSignin(true);
    setShowClientSignup(false);
  };

  const handleClientSignupClick = () => {
    setShowClientSignup(true);
    setShowClientSignin(false);
  };

  const handleVendorSigninClick = () => {
    setShowVendorSignin(true);
    setShowVendorSignup(false);
  };

  const handleVendorSignupClick = () => {
    setShowVendorSignup(true);
    setShowVendorSignin(false);
  };

  const handleClientSignin = async (signedInUser) => {
    setUser(signedInUser);
    setShowClientSignin(false);
    localStorage.setItem('user', JSON.stringify(signedInUser));
    fetchProducts();
    fetchManagables(user);
    fetchRecommended(user);
    window.location.reload()
  };

  const handleClientSignup = async (signedUpUser) => {
    setUser(signedUpUser);
    setShowClientSignup(false);
    setShowClientSignin(true);
    localStorage.setItem('user', JSON.stringify(signedUpUser));
    fetchProducts();
    fetchManagables(user);
    fetchRecommended(user);
  };

  const handleVendorSignin = async (signedInUser) => {
    setUser(signedInUser);
    setShowVendorSignin(false);
    localStorage.setItem('user', JSON.stringify(signedInUser));
    fetchProducts();
    fetchManagables(user);
    fetchRecommended(user);
    window.location.reload()
  };

  const handleVendorSignup = async (signedUpUser) => {
    setUser(signedUpUser);
    setShowVendorSignup(false);
    setShowVendorSignin(true);
    localStorage.setItem('user', JSON.stringify(signedUpUser));
    fetchProducts();
    fetchManagables(user);
    fetchRecommended(user);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowClientSignin(false);
    setShowClientSignup(false);
    setShowVendorSignin(false);
    setShowVendorSignup(false);
  };

  const handleAddItemClick = async () => {
    setShowAddItem(true);
    setIsAddingProduct(true);


  };

  

  const handleAddItemClose = async () => {
    setShowAddItem(false);
    setIsAddingProduct(false);
    window.location.reload();
  };

  const handleCartIconClick = () => {
    setShowCart(!showCart); 
    if (!showCart){
      setCheckout(false);
    }
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };
  const handleEditClick = (product) => {
    setSelectedEdit(product);
  };
  
  const handleAddToCart = (product) => {

  };
  
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    fetchProducts(selectedCategory, ''); 
  };
  
  const handleSearch = (searchQuery) => {
    console.log(searchQuery,category,'handlesearch');
    fetchProducts(category, searchQuery);
  };
  const fetchProducts = async (category, searchQuery) => {
    try {
      const response = await axios.get('http://localhost:3001/products/getAll', {
        category: category,
        searchQuery: searchQuery,
      });
      const data = response.data;
      console.log('product',data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchManagables = async (user) => {
    try {
      if (user && user.email) {
        const response = await axios.get('http://localhost:3001/products/manage', { params: {
            userEmail: user.email,
          }, });
        const data = response.data;
        console.log( "data from backend", data[0] );
        setManagable(data);

        //setManagable(data.items);
      } else {
        console.warn('User is not defined or does not have an email property.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };



  const fetchRecommended = async (user) => {
    try {
      if (user && user.email) {
        const response = await axios.post('http://localhost:3001/recommended', { userEmail: user.email });
        const data = response.data;
        console.log('recommended',data);
        setRecommended(data.recommended);
      } else {
        console.warn('User is not defined or does not have an email property.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };





  return (
    <div>
      {showClientSignin && <ClientSignin onSignin={handleClientSignin} onToggleSignup={handleClientSignupClick} />}
      {showClientSignup && <ClientSignup onSignup={handleClientSignup} onToggleSignin={handleClientSigninClick} />}
      {showVendorSignin && <VendorSignin onSignin={handleVendorSignin} onToggleSignup={handleVendorSignupClick} />}
      {showVendorSignup && <VendorSignup onSignup={handleVendorSignup} onToggleSignin={handleVendorSigninClick} />}


      {user?.role === 'client' && user && (
        <ClientNavbar
          user={user}
          onLogout={handleLogout}
          onCartIconClick={handleCartIconClick}
          onCategorySelect={handleCategorySelect}
          addClick={() => handleAddItemClick()}
          onSearch={(searchQuery) => handleSearch(searchQuery)}
        />
      )}      
      {user?.role === 'vendor' && user && (
        <VendorNavbar
          user={user}
          onLogout={handleLogout}
          onCartIconClick={handleCartIconClick}
          onCategorySelect={handleCategorySelect}
          addClick={() => handleAddItemClick()}
        />
      )}


      {isAddingProduct && <AddItemForm user={user} onClose={handleAddItemClose} onAdd={() => fetchManagables(user)} />}
      
      {showCart && <Cart cartItems={cartItems} user={user} checkout={checkout} setCheckout={setCheckout} onclose={() => setShowCart(false) } />}

      {selectedProduct && <ProductDetails user={user} product={selectedProduct}  setSelectedProduct={setSelectedProduct} />}
      {selectedEdit && <ManageProductEdit user={user} product={selectedEdit}  setSelectedEdit={setSelectedEdit} />}
      

      {!isAddingProduct && !showClientSignin && !showClientSignup && !showVendorSignin && !showVendorSignup && user && user.role === 'vendor' && (
        <div>          
          <ManageProductGrid category={category} managables={managables} user={user} onEditClick={handleEditClick} />
        </div>
      )}

      {!isAddingProduct && !showClientSignin && !showClientSignup && !showVendorSignin && !showVendorSignup && user && user.role === 'client' && recommended && (
        <div>          
          <RecommendedProducts category={category} recommended={recommended} user={user} onCardClick={handleCardClick} handleAddToCart />
        </div>
      )}


      {!isAddingProduct && !showClientSignin && !showClientSignup && !showVendorSignin && !showVendorSignup && user && user.role === 'client' && (
        <div>          
          <ProductGrid category={category} products={products} user={user} onCardClick={handleCardClick} handleAddToCart />
        </div>
      )}


      {!showClientSignin && !showClientSignup && !showVendorSignin && !showVendorSignup && !user && (
        
        <div className='welcome-box'>
          <div className="logo">Ecom</div>
          <div class="welcome-container">
            <div class="column left">
              <h2>As a Buyer</h2>
              <p>Join us to explore and shop amazing products!</p>
              <div className="button-container">
                <button className="button" onClick={handleClientSigninClick}>
                  Client Sign in
                </button>
                <button className="button" onClick={handleClientSignupClick}>
                  Client Sign up
                </button>
              </div>
            </div>
            <div class="column right">
              <h2>As a Seller</h2>
              <p>Join us to showcase and sell your products!</p>
              <div className="button-container">
                <button className="button" onClick={handleVendorSigninClick}>
                  Vendor Sign in
                </button>
                <button className="button" onClick={handleVendorSignupClick}>
                  Vendor Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default App;
