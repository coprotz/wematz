import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Nav from '../../components/nav/Nav'
import Navbar from '../../components/navbar/Navbar'


const AllOppo = () => {
  return (
    <div className='opportunit'>
        <div className="opprt_inner">
          <Nav/>
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
