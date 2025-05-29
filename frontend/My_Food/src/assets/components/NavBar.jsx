import React from 'react';
const NavBar = () => {
  return (
    <div>
      <nav className='bg-white/80 backdrop-blur sticky top-0 z-0 p-'>
        <div className='mx-auto flex items-center justify-between px-8'>
          <div className='px-8'>
            <img className='h-16 w-16' src="/images/fork.png" alt="" />
          </div>

          <div className='flex items-center space-x-8 px-8 md:space-x-8'>
            <p className='font-medium text-sm transition text-black'>Home</p>
            <p className='font-medium text-sm transition text-black'>Food</p>
            <p className='font-medium text-sm transition text-black'>Extra</p>
          </div>

          <div className='flex justify-between space-x-8 md:space-x-8'>
            <p>
              <button className="rounded-md px-4 py-2 text-black text-sm font-medium hover:bg-red-500 hover:text-white">
                Login
              </button>
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
