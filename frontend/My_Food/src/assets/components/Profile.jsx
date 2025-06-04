import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';


const Profile = () => {
    const [Profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      const ProfileData = async()=>{
        try{
          const response = await axiosInstance.get('api/usser/profile/');
          console.log(response.data);
        } catch(err){
          console.log(err.response?.data?.message);
          setError(err.response?.data?.message || 'Something went wrong');
        } finally{
          setLoading(true);
        }
      }
    },[]);

  return (
    <div>
      <p>This is profile</p>
    </div>
  )
}

export default Profile