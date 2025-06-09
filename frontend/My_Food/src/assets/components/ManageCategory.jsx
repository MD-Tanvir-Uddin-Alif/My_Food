import React, { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance';

const ManageCategory = () => {

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

  if (loading) {
    return <p className="text-lg text-gray-700 p-8">Loading...</p>;
  }
  return (
    <div>
        <div class="space-y-4">
            {product.map((item)=>(
                <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <div class="flex items-center gap-4">
                    <img src={item.food_image} alt={item.name} class="w-16 h-16 object-cover rounded-md" />
                    <h3 class="text-lg font-medium text-red-700">{item.name}</h3>
                </div>
                <div class="flex gap-2">
                    <button class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Update</button>
                    <button class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Delete</button>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default ManageCategory