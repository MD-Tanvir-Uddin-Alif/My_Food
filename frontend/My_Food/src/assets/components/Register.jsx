import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const navigate = useNavigate();

    const [formData, setForm] = useState({
        first_name:'',
        last_name:'',
        username:'',
        email:'',
        phone_number:'',
        profile_image:null,
        gender:'',
        address:'',
        password:'',
        password2:'',
        
    });

    // const [sucess, setsucess] = useState(null);
    // const [error, seterror] = useState(null);

    const handelChange = (e)=>{
        setForm({
            ...formData,
            [e.target.id]: e.target.type === 'file'? e.target.files[0] : e.target.value
        });
    };

    const handleSubmission = async (e)=>{
        e.preventDefault();
        // seterror('');
        // setsucess('');

        if(formData.password != formData.password2){
            // seterror('password did not match');
            toast.error('Password did not match');
            return
        }

        // console.log(formData);

        try{
        
        const formdatatosend = new FormData();

        Object.entries(formData).forEach(([key, value])=>{
          formdatatosend.append(key, value);
        });


          const responce = await axios.post(`http://127.0.0.1:8000/api/user/register/`,formdatatosend,{
            headers: {
              "Content-Type": 'multipart/form-data',
            },
          });
          console.log(responce);
          if (responce.status === 201 || responce.status === 200){
            // setsucess('Registration sucessfull!');
            toast.success('Registrations Sucessfully.', {autoClose: 3000});

            setTimeout(()=>{
            navigate('/login');
            },3000)
          }
          setForm({
            first_name:'',
            last_name:'',
            username:'',
            email:'',
            phone_number:'',
            profile_image:null,
            gender:'',
            address:'',
            password:'',
            password2:'',
          });
        } catch (err) {
          // seterror(err.responce)
          toast.error('registrations Failed. Please try again');
          console.log(err.responce?.data?.message);
        }
    };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <ToastContainer/>
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl m-5">
          <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Register</h2>
          <form onSubmit={handleSubmission} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label='First Name' id='first_name' value={formData.first_name} onChange={handelChange}/>
              <InputField label='Last Name' id='last_name' value={formData.last_name} onChange={handelChange}/>
              <InputField label='Username' id='username' value={formData.username} onChange={handelChange}/>
              <InputField label='Email' id='email' type='email' value={formData.email} onChange={handelChange}/>
              <InputField label='Phone Number' id='phone_number' type='tel' value={formData.phone_number} onChange={handelChange}/>
              <InputField label='Profile Image' id='profile_image' type='file' value={formData.profile_image} onChange={handelChange}/> 
              <InputField label="Gender"id="gender" value={formData.gender} onChange={handelChange} options={[{ label: "Male", value: "M" },{ label: "Female", value: "F" },{ label: "Other", value: "O" },]}/>
            </div>
            <InputField label='Address' id='address' value={formData.address} onChange={handelChange}/>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label='Password' id='password' type='password' value={formData.password} onChange={handelChange}/>
              <InputField label='Confirm Password' id='password2' type='password' value={formData.password2} onChange={handelChange}/>
            </div>

            <div className="text-center mt-6">
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-lg transition-all duration-200">
                Register
              </button>
            </div>
            <div className='flex flex-col items-center text-center'>
              <p className='text-sm font-medium text-gray-600'>Already have an account?</p>
              <Link to='/login/' className='text-sm font-medium text-red-600 cursor-pointer'>Login Yourself</Link >
            </div>
          </form>
</div>

    </div>
  )
};


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


export default Register;