import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance'; 

const UserOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/api/user/orders/');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen p-6">
        {/* {orders.map((item, index) => (
    <p key={index}>৳{item.total}</p>  // or item.price if that's the field
  ))} */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-red-100">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-red-500 inline-block pb-1">
          My Orders
        </h2>

        <div className="space-y-4 mt-4">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-white border border-red-100 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">Order #{order.id}</p>
                  <p className="text-sm text-red-500 font-medium">
                    Date: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-gray-900 font-bold text-lg">৳{order.total}</div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-red-500 text-red-600 font-semibold text-sm rounded-lg hover:bg-red-500 hover:text-white transition">
                    View
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white font-semibold text-sm rounded-lg hover:bg-red-600 transition">
                    Download
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
