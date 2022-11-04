import React from 'react'
import './home.css'
import { Outlet } from 'react-router-dom'
import HomeMenu from '../../components/menu/HomeMenu';
import Navbar from '../../components/navbar/Navbar';
import Prayer from '../prayerTimes/Prayer';
import { useState } from 'react';
import {motion} from 'framer-motion'
import Footer from '../../components/footer/Footer';
import useData from '../../hooks/useData';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../../components/loading/Loading';
import LoadingPage from '../../components/loading/LoadingPage';




const Home = () => {  

    const [active, setActive] = useState(false)

    const { users } = useData()
    const { user, db } = useAuth()

    const cuUser = users.find((u) => u?.id === user?.uid)

    const RenderHome = () => {
        if(cuUser){
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
        }else {
            return (
                <div className="loading_wrapper">
                    <LoadingPage/>
                </div>
                
            )
        }
    }
   

  return (
    <motion.div 
        initial={{ opacity: 0}}
        animate={{opacity: 1}} 
        transition={{ ease: "easeOut", duration: 0.5 }}
        className='msg_alert'>
        {RenderHome()}
    </motion.div>
  )
}

export default Home