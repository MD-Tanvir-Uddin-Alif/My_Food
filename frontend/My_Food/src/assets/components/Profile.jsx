import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';


const Profile = () => {
    const [Profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      const ProfileData = async()=>{
        try{
          const response = await axiosInstance.get('api/user/profile/');
          // console.log(response.data);
          setProfile(response.data);
          localStorage.setItem('img', response.data.profile_image);
        } catch(err){
          // console.log(err.response?.data?.message);
          setError(err.response?.data?.message || 'Something went wrong');
        } finally{
          setLoading(false);
        }
      }

      ProfileData()
    },[]);

    if(loading){return <p>Profile is loading</p>}
    if(error){return <p className='text-bold text-red-600'>{error}</p>}
    if(!Profile){return <p>No profile is found</p>}

  return (
    <div className='bg-gray-200 min-h-screen flex items-center justify-center'>
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
    
        <div className="flex flex-col items-center justify-center md:col-span-1">
          <img src={Profile.profile_image} alt="Profile" className="w-40 h-40 rounded-full shadow-lg object-cover"/>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">{Profile.first_name} {Profile.last_name} </h2>
          <p className="text-sm text-gray-500">{Profile.username} </p>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-500">First Name</p>
            <p className="text-base font-semibold">{Profile.first_name} </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Name</p>
            <p className="text-base font-semibold">{Profile.last_name} </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Username</p>
            <p className="text-base font-semibold">{Profile.username}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-base font-semibold">{Profile.email} </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-base font-semibold">{Profile.phone_number} </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="text-base font-semibold">{Profile.address}</p>
          </div>

          <div className="sm:col-span-2 mt-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition duration-300 w-full sm:w-auto">Upgrade Profile </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile