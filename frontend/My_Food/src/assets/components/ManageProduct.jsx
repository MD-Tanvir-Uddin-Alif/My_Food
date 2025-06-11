import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ManageProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get('/api/food/');
        setProduct(response.data);
      } catch (err) {
        console.error(err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleDelete = async (id) => {
    toast.custom((t) => (
      <div className="bg-white rounded-xl shadow-lg p-4 w-[320px] border border-gray-200">
        <h3 className="text-lg font-semibold text-red-600">Confirm Deletion</h3>
        <p className="text-sm text-gray-700 mt-2">
          Are you sure you want to delete this Food item? This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await axiosInstance.delete(`/api/food/${id}/`);
                setProduct((prev) => prev.filter((item) => item.id !== id));
                toast.success("Item deleted successfully!");
              } catch (err) {
                toast.error("Delete failed!");
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm transition duration-200"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-md text-sm transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity });
};


  if (loading) {
    return <p className="text-lg text-gray-700 p-8">Loading...</p>;
  }

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Available Foods</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {product.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <p className="text-red-600 font-bold mt-2">${item.price}</p>
              </div>
              <div className="mt-4 flex gap-3">
                <button onClick={()=> navigate('/admin/update-food', {state:{item}})} className="flex-1 bg-white hover:bg-red-600 text-red-500 hover:text-white font-medium py-2 px-4 rounded-lg transition">
                  Update
                </button>
                <button onClick={()=> handleDelete(item.id)} className="flex-1 bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
