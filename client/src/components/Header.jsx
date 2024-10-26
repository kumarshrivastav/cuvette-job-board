import React from 'react'
import Dropdown from './Dropdown'
import {useSelector} from "react-redux"
const Header = () => {
  const {isAuthenticated}=useSelector(state=>state.user)
  return (
    <div className='flex flex-row mx-1 my-2 justify-between md:mx-10 md:my-4 items-center'>
        <div className='ml-3'>
            <img src='/images/cuvetteLogo.png' className='h-7 w-full' alt='brand-logo' title='cuvette-image'/>
        </div>
        
        <div className='flex flex-row items-center'>
        <div className=' text-gray-400 font-mono font-semibold text-[18px]'>Contact</div>
        {isAuthenticated && <Dropdown/>}
        </div>
    </div>
  )
}

export default Header