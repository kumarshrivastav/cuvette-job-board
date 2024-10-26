import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
        <Header/>
        <div className='flex-1'>
            {children}
        </div>
        {/* <Footer/> */}
    </div>
  )
}

export default Layout