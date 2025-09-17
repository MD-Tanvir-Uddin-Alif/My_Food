import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state?.item; 
  return (
    <div>
        <div className="max-w-5xl mx-auto py-16 px-6 bg-white rounded-3xl shadow-lg shadow-red-100 border border-red-100">
            <div className="flex flex-col md:flex-row items-start gap-10">
                
                <div className="md:w-1/2">
                <img 
                    src={item.image_url}     
                    alt="Product Image" 
                    className="w-75 h-75 rounded-2xl object-cover shadow-md hover:shadow-lg transition-shadow duration-300"/>
                </div>

                <div className="md:w-1/2 flex flex-col justify-between h-full">
                <div>
                    <p className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-2"></p>
                    
                    <h1 className="text-4xl font-bold text-gray-900 leading-snug mb-4">
                    {item.name}
                    </h1>

                    <p class="text-gray-600 text-base leading-relaxed mb-6">
                    {item.description}
                    </p>
                </div>

                <div>
                    <p class="text-3xl font-bold text-red-600 mb-3">{item.price} Tk</p>
                    <button
                    onClick={() => navigate(`/food/add-to-card/`, { state: { item } })}
                    class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                    Add to Cart
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Details