import React from 'react'
import me from '../../assets/images/img8.jpg'
import './navbar.css'
import {  BsThreeDotsVertical,BsBell } from "react-icons/bs";
import Search from '../search/Search';
import { useNavigate } from 'react-router-dom'
import Button from '../button/Button';
import { useState } from 'react';

const Navbar = ({active, setActive}) => {
    const navigate = useNavigate();
   
  return (
    <div className="home_top">
        <div className="home_logo">
            <h1 onClick={() =>navigate('/')}>Forum</h1>
            <Button active={active} setActive={setActive} onClick={() =>setActive(true)}/>
        </div>
        <div className="home_profile">
            {/* <div className="search">
                <Search/>
            </div> */}
            <div className="profile">
                {/* <span>Message</span> */}
                <div className="notify">
                    <button className='btn'><BsBell /></button>                    
                </div>               
                <div className="profile_img">
                    <img src={me} alt="" />
                </div>
                <div className="user_action">
                    <button className='btn'><BsThreeDotsVertical/></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar