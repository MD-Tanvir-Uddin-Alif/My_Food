import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
    const location = useLocation();
    const user_info = location.state?.user_info;

    // console.log(user_info);

    const navigate = useNavigate();

    const [profile, setProfile] = useState(user_info)

    const handelChange = (e)=>{
      setProfile({
        ...profile,
          [e.target.id]: e.target.type === 'file'? e.target.files[0] : e.target.value
      });
    };

    const handelSubmission = async(e)=>{
      e.preventDefault();

      try{
        
        const formdatatosend = new FormData();

        Object.entries(profile).forEach(([key, value])=>{
          formdatatosend.append(key, value);
        });


          const responce = await axiosInstance.patch('/api/user/profile/update/',formdatatosend,{
            headers: {
              "Content-Type": 'multipart/form-data',
            },
          });
          console.log(responce);
          if (responce.status === 201 || responce.status === 200){
            // setsucess('Registration sucessfull!');
            toast.success('Profile Updated Sucessfully.', {autoClose: 3000});

            setTimeout(()=>{
            navigate('/profile');
            },3000)
          }
        } catch (err) {
          // seterror(err.responce)
          toast.error('updating Failed. Please try again');
          console.log(err.responce?.data?.message);
        }
    }

  return (
    <div className='bg-gray-200 flex items-center justify-center min-h-screen'>
      <ToastContainer/>
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-red-200">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Update Your Profile</h2>

        <form onSubmit={handelSubmission} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputField label='First Name' id='first_name' value={profile.first_name} onChange={handelChange}/>
          <InputField label='Last Name' id='last_name' value={profile.last_name} onChange={handelChange}/>
          {/* <InputField label='Username' id='username' value={profile.username} onChange={handelChange}/>
          <InputField label='Email' id='email' type='email' value={profile.email} onChange={handelChange}/> */}
          <InputField label='Phone Number' id='phone_number' type='tel' value={profile.phone_number} onChange={handelChange}/>
          <InputField label='Profile Image' id='profile_image' type='file' value={profile.profile_image} onChange={handelChange}/> 
          <InputField label="Gender"id="gender" value={profile.gender} onChange={handelChange} options={[{ label: "Male", value: "M" },{ label: "Female", value: "F" },{ label: "Other", value: "O" },]}/>
          <InputField label='Address' id='address' value={profile.address} onChange={handelChange}/>

          <div class="md:col-span-2 text-center mt-2">
            <button type="submit" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition duration-300">
              Update Profile
            </button>
          </div>
        </form>
  </div>
    </div>
  )
}


const InputField = ({ label, id, type = 'text', value, onChange, options = null }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-red-600">{label}</label>

      {options ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="" disabled>Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={type === 'file' ? undefined : value}
          onChange={onChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      )}
    </div>
  );
};

export default UpdateProfile