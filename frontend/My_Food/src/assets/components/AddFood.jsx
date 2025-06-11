import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axiosInstance';

const AddFood = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setForm] = useState({
    name: '',
    price: '',
    category: '',  // Will send as category_id below
    description: '',
    image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/category/');
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };

    fetchCategories();
  }, []);

  const handelChange = (e) => {
    const { id, type, files, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      const formdatatosend = new FormData();

      // Append all fields except category
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'category') {
          formdatatosend.append(key, value);
        }
      });

      // Append category_id explicitly (required by backend)
      formdatatosend.append('category_id', formData.category);

      const response = await axiosInstance.post('/api/food/', formdatatosend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Food item added successfully!', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/admin/products');
        }, 3000);

        setForm({
          name: '',
          price: '',
          category: '',
          description: '',
          image: null,
        });
      }
    } catch (err) {
      toast.error('Failed to add food. Please try again.');
      console.error(err.response?.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-red-100">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center bg-gradient-to-r from-red-600 to-red-600 text-transparent bg-clip-text">
          Add New Food Item
        </h2>

        <form onSubmit={handleSubmission} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-red-600 mb-1">
              Food Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handelChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-red-600 mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handelChange}
              required
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-red-600 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handelChange}
              rows="4"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
            ></textarea>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-red-600 mb-1">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handelChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
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
            <label htmlFor="image" className="block text-sm font-medium text-red-600 mb-1">
              Food Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handelChange}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0 file:text-sm file:font-semibold
                file:bg-red-500 file:text-white hover:file:bg-red-600"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
