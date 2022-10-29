import React from 'react'
import './home.css'
import { Outlet } from 'react-router-dom'
import HomeMenu from '../../components/menu/HomeMenu';
import Navbar from '../../components/navbar/Navbar';
import Prayer from '../prayerTimes/Prayer';
import { useState } from 'react';
import Footer from '../../components/footer/Footer';




const Home = () => {  

    const [active, setActive] = useState(false)
   

  return (
    <div className='container'>
        <Navbar active={active} setActive={setActive}/>
        <div className="home_wrapper">            
            <div className={active ? "home_sidebar" :  'no_sidebar'}>                
                <HomeMenu active={active} setActive={setActive}/> 
                <Prayer/>             
            </div>
            <div className="home_body"> 
                <div className="main_left" >
                    <Outlet />
                </div> 
                      
            </div>
       
        </div>
        <Footer/>  
    </div>
  )
}

export default Home