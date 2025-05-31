import React, { useState } from 'react'

const Register = () => {

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

    const [sucess, setsucess] = useState(null);
    const [error, seterror] = useState(null);

    const handelChange = (e)=>{
        setForm[{
            ...formData,
            [e.target.id]: e.target.value
        }];
    };

    const handleSubmission = async (e)=>{
        e.preventDefault();
        seterror('');
        setsucess('');

        if(formData.password != formData.password2){
            seterror('password did not match');
            return
        }

        console.log(formData);
    };

  return (
    <div>
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
  <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Register</h2>
  <form action="#" method="POST" enctype="multipart/form-data" className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label='First Name' id='first_name' value={formData.first_name} onChange={handelChange}/>
      <InputField label='Last Name' id='last_name' value={formData.last_name} onChange={handelChange}/>
      <InputField label='Username' id='username' value={formData.username} onChange={handelChange}/>
      <InputField label='Email' id='email' type='email' value={formData.email} onChange={handelChange}/>
      <InputField label='Phone Number' id='phone_number' type='tel' value={formData.phone_number} onChange={handelChange}/>
      <InputField label='Profile Image' id='profile_image' type='file' value={formData.profile_image} onChange={handelChange}/> 

      <div>
        <label className="block text-sm font-medium text-gray-600">Profile Image</label>
        <input type="file" name="image" accept="image/*" className="mt-1 block w-full text-sm text-gray-600 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-gray-50 file:text-sm file:text-gray-700 hover:file:bg-gray-100" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Gender</label>
        <select name="gender" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="" disabled selected>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
      </div>
    </div>

    <InputField label='Address' id='address' value={formData.address} onChange={handelChange}/>


    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label='Password' id='password' type='password' value={formData.password} onChange={handelChange}/>
      <InputField label='Confirm Password' id='password2' type='password' value={formData.password2} onChange={handelChange}/>
    </div>

    <div class="text-center mt-6">
      <button type="submit" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-lg transition-all duration-200">
        Register
      </button>
    </div>
  </form>
</div>

    </div>
  )
};


const InputField = ({label, id, type='text', value ,onChange})=> {
    <div>
        <label htmlFor={id} class="block text-sm font-medium text-gray-600">{label}</label>
        <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
    </div>
};




export default Register;