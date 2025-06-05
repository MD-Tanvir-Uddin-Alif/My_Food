import React from 'react'
import { useLocation } from 'react-router-dom';

const UpdateProfile = () => {
    const location = useLocation();
    const user_info = location.state?.user_info;

    console.log(user_info);

  return (
    <div></div>
  )
}

export default UpdateProfile