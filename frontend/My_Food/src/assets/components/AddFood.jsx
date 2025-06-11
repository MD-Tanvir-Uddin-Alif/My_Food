import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axiosInstance';

const AddFood = () => {
    const navigate = useNavigate();

    const [formData, setForm] = useState({
        food_name:'',
        price:'',
        category:'',
        description:'',
        image:null,
        
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

        try{
        
        const formdatatosend = new FormData();

        Object.entries(formData).forEach(([key, value])=>{
          formdatatosend.append(key, value);
        });


          const responce = await axiosInstance.post('/api/food/',formdatatosend,{
            headers: {
              "Content-Type": 'multipart/form-data',
            },
          });
          console.log(responce);
          if (responce.status === 201 || responce.status === 200){
            // setsucess('Registration sucessfull!');
            toast.success('Food Item Sucessfully.', {autoClose: 3000});

            setTimeout(()=>{
            navigate('/admin/products');
            },3000)
          }
          setForm({
            food_name:'',
        price:'',
        category:'',
        description:'',
        image:null,
          });
        } catch (err) {
          // seterror(err.responce)
          toast.error('Food added Failed. Please try again');
          console.log(err.responce?.data?.message);
        }
    };
  return (
    <div>
        <p>this is add food component</p>
        <p>this is add food component</p>
        <p>this is add food component</p>
    </div>
  )
}

export default AddFood