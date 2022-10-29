import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'


const AllOppo = () => {
  return (
    <div className='opportunit'>
        <div className="opprt_inner">
          <Navbar/>
        </div>
        <div className='all_oppo'>
            <Outlet/>
        </div>
        <div className="oppo_footer">
          <Footer/> 
        </div>       
      </div>
  )
}

export default AllOppo
