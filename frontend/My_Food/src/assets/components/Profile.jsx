import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Link } from 'react-router-dom';
import UserOrder from './UserOrder';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get('/api/user/profile/');
        setProfile(response.data);
        console.log(response.data);
        localStorage.setItem('img', response.data.profile_image);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p>Profile is loading...</p>;
  if (error) return <p className="text-bold text-red-600">{error}</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className=" min-h-screen flex flex-col items-center justify-start py-10">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center justify-center md:col-span-1">
          <img
            src={profile.profile_image_url}
            alt="Profile"
            className="w-40 h-40 rounded-full shadow-lg object-cover"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {profile.first_name} {profile.last_name}
          </h2>
          <p className="text-sm text-gray-500">{profile.username}</p>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-500">First Name</p>
            <p className="text-base font-semibold">{profile.first_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Last Name</p>
            <p className="text-base font-semibold">{profile.last_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Username</p>
            <p className="text-base font-semibold">{profile.username}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Gender</p>
            <p className="text-base font-semibold">{profile.gender}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-base font-semibold">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone</p>
            <p className="text-base font-semibold">{profile.phone_number}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="text-base font-semibold">{profile.address}</p>
          </div>

          <div className="sm:col-span-2 mt-4">
            <Link to="/profile/update/" state={{ user_info: profile }}>
              <button className="px-6 py-3 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition duration-300 w-full sm:w-auto">
                Update Profile
              </button>
            </Link>
          </div>

          {profile.role === 'ADMIN' && (
            <Link to="/admin/">
              <p className="text-lg font-semibold text-red-600 mb-4">
                Manage Product
              </p>
            </Link>
          )}
        </div>
      </div>

      <div className="w-full max-w-4xl mt-8">
        <UserOrder />
      </div>
    </div>
  );
};

export default Profile;
