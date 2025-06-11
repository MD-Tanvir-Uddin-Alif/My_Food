import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axiosInstance';

const CreateCategory = () => {
    const navigate = useNavigate();

    const [formData, setForm] = useState({
            name: '',
            food_image: null,
        });

        const handelChange = (e)=>{
        setForm({
            ...formData,
            [e.target.id]: e.target.type === 'file'? e.target.files[0] : e.target.value
        });
    };

    const handleSubmission = async (e)=>{
        e.preventDefault();
        console.log(formData);

        const { name, food_image } = formData;


        if (!name || !food_image) {
            toast.error("Please enter category name and select an image.");
            return;
        }

        try{
        
        const formdatatosend = new FormData();

        formdatatosend.append("name", name);
        formdatatosend.append("food_image", food_image);


          const responce = await axiosInstance.post('/api/category/',formdatatosend,{
            headers: {
              "Content-Type": 'multipart/form-data',
            },
          });
          console.log(responce);
          if (responce.status === 201 || responce.status === 200){
            toast.success('New category added sucessfully.', {autoClose: 3000});

            setTimeout(()=>{
            navigate('/admin/categorys');
            },3000)
          }
          setForm({
            name: '',
            food_image: null,
          });
        } catch (err) {
          toast.error('Failed to create Category');
          console.log(err.responce?.data?.message);
        }

    };


  return (
    <div className='min-h-screen flex items-center justify-center'>
        <ToastContainer/>
        <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-red-800 text-center">Create New Category</h2>

            <form onSubmit={handleSubmission} action="#" method="POST" enctype="multipart/form-data" className="space-y-6">
            
            <div>
                <label for="category-name" className="block text-sm font-medium text-red-700 mb-1">Category Name</label>
                <input type="text" name="category-name" value={formData.name} onChange={handelChange} id="name" className="w-full px-4 py-2 border border-red-600 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out" placeholder="e.g., Electronics" required />
            </div>

            <div>
                <label className="block text-sm font-medium text-red-700 mb-1">Category Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-red-600 border-dashed rounded-lg">
                <div className="space-y-5 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                    <label for="food_image" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="food_image" name="image-upload" onChange={handelChange} type="file" className="" accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
                </div>
            </div>

            <div>
                <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out">Create Category</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default CreateCategory