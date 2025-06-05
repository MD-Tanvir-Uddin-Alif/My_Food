import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
const NavBar = () => {

  const navigate = useNavigate(!!localStorage.getItem('accessToken'));

  const [isLogin, setLogin] = useState(false);
  const [image, setImage] = useState('');

  useEffect(()=>{
    const checkLogin = ()=>{
      const token = localStorage.getItem('accessToken');
      setImage(localStorage.getItem('img'));
      setLogin(!!token);
    };

    checkLogin();
    window.addEventListener('storage', checkLogin);
    window.addEventListener('login', checkLogin);

    return ()=> {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('login', checkLogin);
    };
  },[]);

  const LogouHandel = async()=>{
    try{
      const refreshToken = localStorage.getItem('refreshToken');
      await axiosInstance.post('/api/user/logout/',{
        refresh : refreshToken,
      });

      localStorage.clear();
      setLogin(false);
      navigate('/login');
    }catch(err){
      console.log(err);

      localStorage.clear();
      setLogin(false);
      navigate('/login');
    }
  }


  return (
    <div>
      <nav className='bg-white/80 backdrop-blur sticky top-0 z-0 p-2'>
        <div className='mx-auto flex items-center justify-between px-8'>
          <div className='px-8'>
            <img className='h-16 w-16' src="/images/fork.png" alt="" />
          </div>

          <div className='flex items-center space-x-8 px-8 md:space-x-8'>
            <NavLink to="/"className={({isActive})=>`font-medium text-sm transition ${isActive? 'text-red-500' :'text-black'}`}>Home</NavLink>
            <p className='font-medium text-sm transition text-black'>Food</p>
            <p className='font-medium text-sm transition text-black'>Extra</p>
          </div>

          <div className='flex justify-between space-x-8 md:space-x-8'>
            {isLogin?
            (<div className="relative">
              <input type="checkbox" id="profile-toggle" className="peer hidden" />

              <label for="profile-toggle" className="cursor-pointer">
                <img src={image} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-600 shadow"/>
              </label>

              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 hidden peer-checked:flex flex-col z-10">
                  <Link to='/profile/' className="px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                  <button onClick={LogouHandel} className="px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            </div>) :
            (<NavLink to="login/">
              <button className="rounded-md px-4 py-2 text-black text-sm font-medium hover:bg-red-500 hover:text-white">Login</button>
            </NavLink>)}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
