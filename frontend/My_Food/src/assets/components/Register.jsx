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
        setForm({
            ...formData,
            [e.target.id]: e.target.type === 'file'? e.target.files[0] : e.target.value
        });
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
    <div className='min-h-screen flex items-center justify-center'>
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Register</h2>
          <form onSubmit={handleSubmission} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label='First Name' id='first_name' value={formData.first_name} onChange={handelChange}/>
              <InputField label='Last Name' id='last_name' value={formData.last_name} onChange={handelChange}/>
              <InputField label='Username' id='username' value={formData.username} onChange={handelChange}/>
              <InputField label='Email' id='email' type='email' value={formData.email} onChange={handelChange}/>
              <InputField label='Phone Number' id='phone_number' type='tel' value={formData.phone_number} onChange={handelChange}/>
              <InputField label='Profile Image' id='profile_image' type='file' value={formData.profile_image} onChange={handelChange}/> 
              <InputField label="Gender"id="gender" value={formData.gender} onChange={handelChange} options={["Male", "Female", "Others"]}/>
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
          </form>
</div>

    </div>
  )
};


const InputField = ({ label, id, type = 'text', value, onChange, options = null }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">{label}</label>

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
            <option key={option} value={option}>{option}</option>
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