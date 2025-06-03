import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [fromData, setformData] = useState({
        email:'',
        password:''
    })

    const handleChange = (e)=>{
        setformData({
            ...fromData,
            [e.target.id] : e.target.value
        });    
    };

    const handleSubmission = async (e)=>{
        e.preventDefault();

        console.log(fromData)

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/user/login/`,{
                email: fromData.email,
                password: fromData.password
            });

            // console.log(response.data)
            const {refresh, access, role} = response.data;

            if (refresh && access) {
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('accessToken', access);
            localStorage.setItem('role', role);

            toast.success('Login sucessfull');
            window.dispatchEvent(new Event('login'));
            }else {
                toast.error('Login token not provided');
            }
        } catch (err){
            toast.error("Login faild . Please provide the correct informations")
            console.log(err.response?.data || err.message);
        };

    };



  return (
    <div className='min-h-screen flex items-center justify-center'>
        <ToastContainer/>
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Login</h2>
            <form onSubmit={handleSubmission} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input id='email' value={fromData.email} onChange={handleChange} type="email" name="username" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"/>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input id='password' value={fromData.password} onChange={handleChange} type="password" name="password" required class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"/>
                </div>

                <div className="text-center mt-6">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-lg transition-all duration-200">
                    Login
                </button>
                </div>
                <div className='flex flex-col items-center text-center'>
                    <p className='text-sm font-medium text-gray-600'>Don't have an account?</p>
                    <Link to='/register/' className='text-sm font-medium text-red-600 cursor-pointer'>Register Yourself</Link >
                </div>

            </form>
        </div>
    </div>
  )
}

export default Login