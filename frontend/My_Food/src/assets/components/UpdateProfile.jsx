import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const location = useLocation();
  const user_info = location.state?.user_info;
  const navigate = useNavigate();

  const [profile, setProfile] = useState(user_info);

  const handelChange = (e) => {
    const { id, type, value, files } = e.target;
    setProfile((prev) => ({
      ...prev,
      [id]: type === 'file' ? files[0] : value,
    }));
  };

  const handelSubmission = async (e) => {
    e.preventDefault();

    try {
      const formdatatosend = new FormData();

      Object.entries(profile).forEach(([key, value]) => {
        if (key === 'profile_image' && !(value instanceof File)) return; // skip if no new image
        formdatatosend.append(key, value);
      });

      const response = await axiosInstance.patch(
        'api/user/profile/update/',
        formdatatosend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success('Profile Updated Successfully.', { autoClose: 3000 });
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      }
    } catch (err) {
      toast.error('Updating Failed. Please try again.');
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-red-200">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
          Update Your Profile
        </h2>

        <form
          onSubmit={handelSubmission}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <InputField
            label="First Name"
            id="first_name"
            value={profile.first_name}
            onChange={handelChange}
          />
          <InputField
            label="Last Name"
            id="last_name"
            value={profile.last_name}
            onChange={handelChange}
          />
          <InputField
            label="Phone Number"
            id="phone_number"
            type="tel"
            value={profile.phone_number}
            onChange={handelChange}
          />
          <InputField
            label="Profile Image"
            id="profile_image"
            type="file"
            value={profile.profile_image}
            onChange={handelChange}
            preview={profile.profile_image}
          />
          <InputField
            label="Gender"
            id="gender"
            value={profile.gender}
            onChange={handelChange}
            options={[
              { label: 'Male', value: 'M' },
              { label: 'Female', value: 'F' },
              { label: 'Other', value: 'O' },
            ]}
          />
          <InputField
            label="Address"
            id="address"
            value={profile.address}
            onChange={handelChange}
          />

          <div className="md:col-span-2 text-center mt-2">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition duration-300"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  options = null,
  preview,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-red-600">
        {label}
      </label>

      {options ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'file' ? (
        <>
          {typeof preview === 'string' && (
            <img
              src={preview}
              alt="Current Profile"
              className="mt-2 w-24 h-24 object-cover rounded-full border"
            />
          )}
          <input
            id={id}
            type="file"
            onChange={onChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      )}
    </div>
  );
};

export default UpdateProfile;
