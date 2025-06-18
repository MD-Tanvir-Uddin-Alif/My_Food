import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateFood = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;

  const [formData, setForm] = useState({
    id: item?.id || '',
    name: item?.name || '',
    price: item?.price || '',
    description: item?.description || '',
    category: item?.category?.id || item?.category || '', 
    image: item?.image || null,
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { id, type, files, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === 'file' ? files[0] : value,
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/category/');
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to load categories', err);
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      const formdatatosend = new FormData();

      for (const [key, value] of Object.entries(formData)) {
        if (key === 'image') {
          if (value instanceof File) {
            formdatatosend.append('image', value);
          }
        } else if (key === 'category') {
          formdatatosend.append('category_id', value);
        } else {
          formdatatosend.append(key, value);
        }
      }

      const response = await axiosInstance.patch(`/api/food/${formData.id}/`, formdatatosend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Food item updated successfully!', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/admin/products');
        }, 3000);
      }
    } catch (err) {
      toast.error('Failed to update food. Please try again.');
      console.error(err.response?.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-red-100">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center bg-gradient-to-r from-red-600 to-red-600 text-transparent bg-clip-text">
          Update Food Item
        </h2>

        <form onSubmit={handleSubmission} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-red-600 mb-1">Food Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-red-600 mb-1">Price</label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-red-600 mb-1">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-red-600 mb-1">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-red-600 mb-1">Food Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-red-500 file:text-white hover:file:bg-red-600"
            />
            {typeof formData.image === 'string' && (
              <img
                src={formData.image}
                alt="Current Food"
                className="mt-2 w-40 h-40 object-cover rounded"
              />
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Update Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
