import React, { useState, useContext, useEffect } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import OrderDelivered from './OrderDelivered';
import axios from 'axios'; // Add axios import for making HTTP requests

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [showOrder, setShowOrder] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const totalAmount = `Rs.${cartCtx.totalAmount.toFixed(0)}`;
  const hasItems = cartCtx.items.length > 0;

  useEffect(() => {
    const body = document.body;
    if (showOrder || showLogin) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    return () => {
      body.style.overflow = 'auto';
    };
  }, [showOrder, showLogin]);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }
    cartCtx.clearall();
    setShowOrder(true);
  };

  const showLoginModal = () => {
    setShowLogin(true);
  };

  const closeLoginModal = () => {
    setShowLogin(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', loginCredentials);
  
      if (response.data && response.data.token) {
        setIsLoggedIn(true);
        localStorage.setItem('token', response.data.token);
        closeLoginModal();
        alert('Login sucessfull.Place Your order!!');
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 403) {
        alert('Access Denied: Invalid credentials or unauthorized access.');
      } else {
        alert('Login failed. Please try again later.');
      }
    }
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {!showOrder ? (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
          {showLogin && (
            <div className={`${classes.loginModal} ${classes['login-theme']}`}>
              <h2>Login</h2>
              <form onSubmit={loginSubmitHandler}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={loginCredentials.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginCredentials.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button type="submit">Login</button>
                  <button type="button" onClick={closeLoginModal}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      ) : (
        <OrderDelivered onClose={props.onClose} />
      )}
    </Modal>
  );
};

export default Cart;