import React, { useEffect, useState } from 'react';
import axiosPublic from '../../utils/axiospublic';
import { useNavigate } from 'react-router-dom';


const Food = () => {
  const [food, setFood] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [foodRes, catRes] = await Promise.all([
          axiosPublic.get('/api/food/'),
          axiosPublic.get('/api/category/')
        ]);

        setFood(foodRes.data);
        setCategories(catRes.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredFood = selectedCategory === 'All'
    ? food
    : food.filter(item => item.category?.name === selectedCategory);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg text-gray-600 mb-4">Loading food data...</p>
        <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-red-600 tracking-tight mb-12">
          🍽️ Our Signature Dishes
        </h1>

        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4">Select a Category:</h2>
          <div className="flex flex-wrap gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <input
                type="radio"
                id="all"
                name="category"
                className="peer hidden"
                checked={selectedCategory === 'All'}
                onChange={() => setSelectedCategory('All')}
              />
              <label
                htmlFor="all"
                className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-md cursor-pointer peer-checked:bg-red-500 peer-checked:text-white hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                All
              </label>
            </div>

            {categories.map((cat) => (
              <div className="flex items-center" key={cat.id}>
                <input
                  type="radio"
                  id={cat.name}
                  name="category"
                  className="peer hidden"
                  checked={selectedCategory === cat.name}
                  onChange={() => setSelectedCategory(cat.name)}
                />
                <label
                  htmlFor={cat.name}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-md cursor-pointer peer-checked:bg-red-500 peer-checked:text-white hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFood.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-red-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-200 hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                onClick={() => navigate(`/food/details/`, { state: { item } })}
                className="w-full h-36 object-cover cursor-pointer"
              />
              <div className="p-4">
                <p
                  onClick={() => navigate(`/food/details/`, { state: { item } })}
                  className="text-base font-semibold text-gray-800 mb-1 cursor-pointer line-clamp-1"
                >
                  {item.name}
                </p>
                <p className="text-red-500 text-sm font-medium mb-3">৳{item.price}</p>
                <button
                  onClick={() => navigate(`/food/add-to-card/`, { state: { item } })}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium transition"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error.message || error}</p>}
      </div>
    </div>
  );
};

export default Food;
