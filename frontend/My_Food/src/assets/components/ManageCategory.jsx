import React, { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ManageCategory = () => {

  const navigete = useNavigate();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get('/api/category/');
        setProduct(response.data);
        console.log(response);
      } catch (err) {
        console.error(err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleDelate = async(id)=>{
    toast.custom((t) => (
  <div className="bg-white rounded-xl shadow-lg p-4 w-[320px] border border-gray-200">
    <h3 className="text-lg font-semibold text-red-600">Confirm Deletion</h3>
    <p className="text-sm text-gray-700 mt-2">
      Are you sure you want to delete this category? This action cannot be undone.
    </p>
    <div className="mt-4 flex justify-end gap-2">
      <button
        onClick={async () => {
          toast.dismiss(t.id);
          try {
            await axiosInstance.delete(`/api/category/${id}/`);
            setProduct((prev) => prev.filter((item) => item.id !== id));
            toast.success("Category deleted successfully!");
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
    <div>
        <div className="space-y-4">
            {product.map((item)=>(
                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                    <img src={item.food_image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <h3 className="text-lg font-medium text-red-700">{item.name}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>navigete('/admin/update-category/', {state:{item}})} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Update</button>
                  <button onClick={() => handleDelate(item.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Delete</button>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default ManageCategory