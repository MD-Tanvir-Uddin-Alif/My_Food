import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newItem = location.state?.item;

  // 🧩 Load items from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const addRef = useRef(false);

  // 🧠 Save cart to localStorage when updated
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 🛒 Add new item once
  useEffect(() => {
    if (newItem && !addRef.current) {
      addRef.current = true;

      setCartItems((prevItems) => {
        const exist = prevItems.find((item) => item.id === newItem.id);
        if (exist) {
          return prevItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { ...newItem, quantity: 1 }];
        }
      });

      navigate(location.pathname, { replace: true });
    }
  }, [newItem, navigate, location.pathname]);

  // ♻️ Memoized calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const tax = useMemo(() => parseFloat((subtotal * 0.05).toFixed(2)), [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  // ♻️ Memoized functions
  const removeItem = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const decreaseQty = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const increaseQty = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast.error("Please add at least one item to your cart.");
      return;
    }

    const orderData = {
      payment_method: paymentMethod,
      transaction_id: null,
      subtotal,
      tax,
      total,
      status: "paid",
      items: cartItems.map((item) => ({
        food: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast.success("Order placed successfully!");
        setCartItems([]);
        localStorage.removeItem('cart');
        navigate('/profile/');
      } else {
        const error = await response.json();
        console.error(error);
        toast.error("Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  }, [cartItems, paymentMethod, subtotal, tax, total, navigate]);

  // 🧾 UI Section
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-12 text-red-600">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-xl border"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.price} TK each</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="w-8 h-8 flex items-center justify-center border rounded-full text-red-600 hover:bg-red-100 border-red-400"
              >
                -
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => increaseQty(item.id)}
                className="w-8 h-8 flex items-center justify-center border rounded-full text-red-600 hover:bg-red-100 border-red-400"
              >
                +
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add More */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/food/')}
          className="px-6 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
        >
          + Add More Items
        </button>
      </div>

      {/* Order Summary */}
      <div className="mt-12 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>

        <div className="space-y-2 mb-4 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{subtotal} TK</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%):</span>
            <span>{tax} TK</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
            <span>Total:</span>
            <span className="text-red-600">{total} TK</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-6">
          <h3 className="font-medium mb-2 text-gray-800">Payment Method</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-red-50">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-red-600"
              />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-6 w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold text-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default AddCard;
