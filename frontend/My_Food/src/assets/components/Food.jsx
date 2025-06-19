import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Food = () => {
    const [food, setFood] = useState([]);
    const [loading, setLoadning] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(()=>{
        const laodFood = async ()=>{
            try{
                const res = await axios.get('http://127.0.0.1:8000/api/food/');
                setFood(res.data);
                setError(null);
            }catch(err){
                setError(err || 'something went wrong');
                console.log(err);
            }finally{
                setLoadning(false);
            }
        };

        laodFood();
    },[]);

    if (loading) {
    return (
        <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg text-gray-600 mb-4">Loading food data...</p>
            <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
    );
}



  return (
    <div className="bg-gradient-to-br min-h-screen py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-extrabold text-center text-red-600 tracking-tight mb-14">
            🍽️ Our Signature Dishes
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {food.map((item) => (
                <div
                key={item.id}
                className="bg-white/60 backdrop-blur-lg border border-red-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]"
                >
                <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => navigate(`/food/details/`,{state:{item}})}
                    className="w-full h-44 object-cover rounded-t-2xl"
                />
                <div className="p-5">
                    <p onClick={() => navigate(`/food/details/`,{state:{item}})} className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {item.name}
                    </p>
                    <p className="text-red-500 text-sm font-medium mb-4">
                    {item.price} TK
                    </p>
                    <button onClick={() => navigate(`/food/add-to-card/`,{state:{item}})} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300">
                    Add to Order
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
    </div>


  )
}

export default Food