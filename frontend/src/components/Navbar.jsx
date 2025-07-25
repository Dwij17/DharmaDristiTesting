import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  // 👇 Detect current route
  const location = useLocation();
  const isCategoryPage = location.pathname === "/categories"; // checks if URL is exactly /categories

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p className='hover:text-[#c95c2d]'>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#c95c2d] hidden' />
        </NavLink>
        <NavLink to='/categories' className='flex flex-col items-center gap-1'>
          <p className='hover:text-[#c95c2d]'>Categories</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#c95c2d] hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p className='hover:text-[#c95c2d]'>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#c95c2d] hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p className='hover:text-[#c95c2d]'>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#c95c2d] hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        {/* 👇 Only show on /categories */}
        {isCategoryPage && (
          <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-4 cursor-pointer' alt="search" />
        )}

        <div className='group relative'>
          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer' />
          {token && 
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rouded'>
              <p className='cursor-pointer hover:text-[#c95c2d]'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-[#c95c2d]'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-[#c95c2d]'>Logout</p>
            </div>
          </div>
          }
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="menu" />
      </div>

      {/* Mobile Sidebar */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-[#f8eddf] transition-all ${visible ? 'w-full' : 'w-0'} sm:hidden`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/categories'>Categories</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
        </div>
      </div>

    </div>
  )
}

export default Navbar
