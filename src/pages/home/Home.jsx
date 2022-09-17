import React from 'react'
import {  BsArrowRight } from "react-icons/bs";
import './home.css'
// import { useNavigate, NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import img1 from '../../assets/images/img1.png'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
import img4 from '../../assets/images/img4.jpg'
import img5 from '../../assets/images/img5.jpg'
import img6 from '../../assets/images/img6.jpg'
import img7 from '../../assets/images/img7.jpg'
import img9 from '../../assets/images/img9.jpg'
// import img10 from '../../assets/images/img10.jpg'
import HomeMenu from '../../components/menu/HomeMenu';
import Navbar from '../../components/navbar/Navbar';
// import SharePost from '../posts/SharePost';
// import PostCard from '../posts/PostCard';
import NikahCard from '../nikah/NikahCard';
import MadaCard from '../mada/MadaCard';
import MeetingCard from '../meetings/MeetingCard';
import Remarks from '../../components/remarks/Remarks';
// import VideoCard from '../posts/VideoCard';
// import AudioPlayer from '../posts/AudioPlayer';
import Prayer from '../../components/prayer/Prayer';
import { useState } from 'react';

const nikahs = [
    {name: 'Asha Juma', url: img1,  live: 'Tanga', tribe: 'Zaramo', age:'25'},
    {name: 'Juma Rashid', url: img2,  live: 'Moshi', tribe: 'Haya', age:'30'},
    {name: 'Mwana Achi', url: img3,  live: 'Kisarawe', tribe: 'Fipa', age:'18'},
    {name: 'Haruna Shani', url: img4,  live: 'Dar es Salaam', tribe: 'Ruguru', age:'40'},
    {name: 'Shykuru Hamisi', url: img5,  live: 'Zanzibar', tribe: 'Pare', age:'55'},
    {name: 'Mwanaisha Abdul', url: img6,  live: 'Pemba', tribe: 'Sukuma', age:'27'},
    {name: 'Hamisa Mbeto', url: img7,  live: 'Mbeya', tribe: 'Hehe', age:'80'},
    {name: 'Bob Marley', url: img9,  live: 'Iringa', tribe: 'Chaga', age:'12'},
]



const Home = () => {  

    const [active, setActive] = useState(true)

  return (
    <div className='container'>
        <Navbar active={active} setActive={setActive}/>
        <div className="home_wrapper">            
            <div className={active ? 'no_sidebar' : "home_sidebar"}>                
                <HomeMenu active={active} setActive={setActive}/>              
            </div>
            <div className="home_body"> 
                <div className="main_left" >
                    <Outlet />
                </div>           
                
                <div className="main_right">
                        <div className="main_right_item">
                            <h3 className="card_title">
                                Nikah Chember
                                <button className='btn_view'><BsArrowRight/></button>
                            </h3>                          
                            <div className="nikah_imgs">
                              {nikahs && nikahs.map((item, index) => (
                                <NikahCard key={index} item={item}/>
                              ))}
                            </div>
                            
                           
                        </div>
                        <div className="donate">
                            Donate to support us
                            <button className='btn_next'><BsArrowRight/></button>
                        </div>
                        <div className="main_right_item">
                            <h3 className="card_title">
                                Mada of the week
                                <button className='btn_view'><BsArrowRight/></button>
                            </h3>                            
                            <MadaCard/>
                            
                        </div>
                        <div className="main_right_item">
                            <h3 className="card_title">
                                Meeting room
                                <button className='btn_view'><BsArrowRight/></button>
                            </h3>
                                
                            <div className="meeting_grids">
                               <MeetingCard/>
                               <MeetingCard/>
                               {/* <MeetingCard/> */}
                              
                            </div>
                            
                        </div>
                        <div className="main_right_item">
                            <h3 className="card_title">
                                Wanahitaji Msaada 
                                <button className='btn_view'><BsArrowRight/></button>
                            </h3>
                           
                            <div className="help">
                                <div className="help_sender">
                                    <img src={img7} alt="" />
                                </div>
                                <div className="help_text">
                                  <h4>Waislamu wa Kilwa waombwa kujengewa Misikiti na Madrasa.</h4> 
                                  <small>12 June 2022</small> 
                                </div>
                                
                            </div>
                            <Remarks/>
                            
                        </div>
                </div>
            </div>
       
        </div>
    </div>
  )
}

export default Home