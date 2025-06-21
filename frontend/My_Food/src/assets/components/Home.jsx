import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/category/');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fade {
              0%   { opacity: 1; z-index: 1; }
              32%  { opacity: 1; z-index: 1; }
              33%  { opacity: 0; z-index: 0; }
              98%  { opacity: 0; z-index: 0; }
              99%  { opacity: 1; z-index: 1; }
              100% { opacity: 1; z-index: 1; }
            }

            .fade-slider {
              position: relative;
              width: 100%;
              height: 100%;
            }

            .fade-slider img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              animation: fade 9s linear infinite;
              transition: opacity 1s ease;
            }

            .fade-slider img:nth-child(2) {
              animation-delay: 3s;
            }

            .fade-slider img:nth-child(3) {
              animation-delay: 6s;
            }

            .blurred::before {
              content: '';
              position: absolute;
              inset: 0;
              backdrop-filter: blur(8px);
              background-color: rgba(255, 0, 0, 0.3); /* red tint */
              transition: backdrop-filter 0.3s ease, background-color 0.3s ease;
              z-index: 1;
            }

            .blurred:hover::before {
              backdrop-filter: blur(0);
              background-color: rgba(255, 0, 0, 0); /* remove red tint */
            }

            .category-text {
              z-index: 2;
              transition: opacity 0.3s ease;
            }

            .blurred:hover .category-text {
              opacity: 0;
            }
          `,
        }}
      />

      <section className="flex flex-col md:flex-row items-center justify-between px-6 py-20 max-w-7xl mx-auto">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg mb-6 text-gray-700">
            Discover amazing features and services designed to elevate your experience. We're here to help you succeed.
          </p>
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
            Learn More
          </button>
        </div>

        <div className="md:w-1/2 relative w-full max-w-md h-64 md:h-80 overflow-hidden rounded-lg shadow-lg">
          <div className="fade-slider">
            <img src="https://picsum.photos/seed/slider1/800/600" alt="Slide 1" />
            <img src="https://picsum.photos/seed/slider2/800/600" alt="Slide 2" />
            <img src="https://picsum.photos/seed/slider3/800/600" alt="Slide 3" />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-12">Explore Our Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group rounded-lg h-64 cursor-pointer blurred overflow-hidden transition-all duration-500"
              style={{
                backgroundImage: `url(${category.food_image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center category-text">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
