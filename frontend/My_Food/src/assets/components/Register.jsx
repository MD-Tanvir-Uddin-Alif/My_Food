import React from 'react';
import axiosPublic from '../../utils/axiospublic';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Password match validation
    if (data.password !== data.password2) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const formdatatosend = new FormData();

      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        // Handle file input
        if (value instanceof FileList) {
          if (value.length > 0) formdatatosend.append(key, value[0]);
        } else {
          formdatatosend.append(key, value);
        }
      });

      // Send POST request
      const response = await axiosPublic.post(`/api/user/register/`, formdatatosend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration Successful!", { autoClose: 3000 });
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      toast.error("Registration Failed. Please try again");
      console.log(err.response?.data); // check full server error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl m-5">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" id="first_name" register={register} errors={errors} validation={{ required: "First name is required" }} />
            <InputField label="Last Name" id="last_name" register={register} errors={errors} validation={{ required: "Last name is required" }} />
            <InputField label="Username" id="username" register={register} errors={errors} validation={{ required: "Username is required" }} />
            <InputField label="Email" id="email" type="email" register={register} errors={errors} validation={{ required: "Email is required" }} />
            <InputField label="Phone Number" id="phone_number" type="tel" register={register} errors={errors} validation={{ required: "Phone number is required" }} />
            <InputField label="Profile Image" id="profile_image" type="file" register={register} errors={errors} />
            <InputField
              label="Gender"
              id="gender"
              register={register}
              errors={errors}
              validation={{ required: "Gender is required" }}
              options={[
                { label: "Male", value: "M" },
                { label: "Female", value: "F" },
                { label: "Other", value: "O" },
              ]}
            />
          </div>

          <InputField label="Address" id="address" register={register} errors={errors} validation={{ required: "Address is required" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Password"
              id="password"
              type="password"
              register={register}
              errors={errors}
              validation={{ required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } }}
            />
            <InputField
              label="Confirm Password"
              id="password2"
              type="password"
              register={register}
              errors={errors}
              validation={{
                required: "Please confirm password",
                validate: (value) => value === watch("password") || "Passwords do not match",
              }}
            />
          </div>

          <div className="text-center mt-6">
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-lg transition-all duration-200">
              Register
            </button>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium text-gray-600">Already have an account?</p>
            <Link to="/login/" className="text-sm font-medium text-red-600 cursor-pointer">
              Login Yourself
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

// Updated InputField component
const InputField = ({ label, id, type = "text", register, errors, options = null, validation = {} }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-red-600">
        {label}
      </label>

      {options ? (
        <select
          id={id}
          {...register(id, validation)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          {...register(id, validation)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      )}

      {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
    </div>
  );
};

export default Register;
