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
            @keyframes slide {
              0% { transform: translateX(100%); opacity: 0; z-index: 1; }
              33.33% { transform: translateX(0); opacity: 1; z-index: 2; }
              66.66% { transform: translateX(-100%); opacity: 0; z-index: 1; }
              100% { transform: translateX(100%); opacity: 0; z-index: 1; }
            }

            .fade-slider img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: contain;
              opacity: 0;
              transform: translateX(100%);
              animation: slide 12s infinite;
              animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1.0);
              transition: opacity 1s ease;
            }

            .fade-slider img:nth-child(1) {
              animation-delay: 0s;
            }

            .fade-slider img:nth-child(2) {
              animation-delay: 4s;
            }

            .fade-slider img:nth-child(3) {
              animation-delay: 8s;
            }

            .blurred::before {
              content: '';
              position: absolute;
              inset: 0;
              backdrop-filter: blur(8px);
              transition: backdrop-filter 0.3s ease, background-color 0.3s ease;
              z-index: 1;
            }

            .blurred:hover::before {
              backdrop-filter: blur(0);
              background-color: rgba(0, 0, 0, 0);
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
          <section className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Welcome to <span className="text-red-600">My Food</span> Where Every <span className="text-red-600">Bite</span> Wins!
            </h1>
            <p className="mt-6 text-lg md:text-xl">
              <span className="text-red-600">Hits different.</span> Don’t miss out.
            </p>
          </section>
        </div>

        <div className="md:w-1/2 relative w-full max-w-md h-64 md:h-80 overflow-hidden">
          <div className="fade-slider w-full h-full relative">
            <img src="/images/swarma.png" alt="Slide 1" />
            <img src="/images/ICE cream.png" alt="Slide 2" />
            <img src="/images/Shake.png" alt="Slide 3" />
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