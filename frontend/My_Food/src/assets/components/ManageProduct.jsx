import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';

const ManageProduct = () => {

    const [product, setProduct] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchProduct = async()=>{
            try{
                const responce = await axiosInstance.get('/api/food/');
                setProduct(responce.data);
            } catch(err){
                console.log(err.responce);
            }finally{
                setLoading(false);
            }
        };

        fetchProduct();
    },[]);
  return (
    <div>
        <div className="flex">
            <aside className="w-64 min-h-screen bg-white shadow-xl p-6 space-y-6">
            <h2 className="text-2xl font-bold text-red-600">🍽️ Food Admin</h2>

            <button className="flex items-center gap-2 w-full bg-white text-red-600 border border-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition">
                <span className="text-xl">➕</span>
                <span className="font-semibold">Add Food</span>
            </button>

            <button className="flex items-center gap-2 w-full bg-white text-red-600 border border-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition">
                <span className="text-xl">📂</span>
                <span className="font-semibold">Manage Category</span>
            </button>
            </aside>

            <main className="flex-1 p-8 bg-red-100">
            <h1 className="text-3xl font-bold text-red-700 mb-6">Available Foods</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                
                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                    <p className="text-red-600 font-bold mt-2">${item.price}</p>
                    </div>

                    <div className="mt-4 flex gap-3">
                    <button className="flex-1 bg-white hover:bg-red-600 text-red-500 hover:text-white font-medium py-2 px-4 rounded-lg transition">Update</button>
                    <button className="flex-1 bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition">Delete</button>
                    </div>
                </div>
                </div>
            ))}
</div>

            </main>
  </div>
    </div>
  )
}

export default ManageProduct