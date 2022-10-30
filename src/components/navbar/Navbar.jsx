import React from 'react'
import me from '../../assets/images/img8.jpg'
import './navbar.css'
import {  BsThreeDotsVertical,BsBell } from "react-icons/bs";
import Search from '../search/Search';
import { useNavigate } from 'react-router-dom'
import Button from '../button/Button';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';

const Navbar = ({active, setActive}) => {
    const navigate = useNavigate();

    const { user, logOut } = useAuth()
    const {users} = useData()
    const [show, setShow] = useState(null)
    const [photo, setPhoto] = useState(null)

    const cuUser = users?.find(u => u.id === user?.uid)

    console.log('photo', user)
   
  return (
    <div className="home_top">
        <div className="home_logo">
            <h1 onClick={() =>navigate('/')}>Wema</h1>
            <Button active={active} setActive={setActive} onClick={() =>setActive(false)}/>
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
                    <img src={cuUser?.photo} />
                </div>
                <div className="user_action" onMouseEnter={() =>setShow(true)} onMouseLeave={() =>setShow(false)}>
                    <button className='btn' ><BsThreeDotsVertical/></button>
                    {show &&
                    <div className="user_menu">
                        <span onClick={() => {navigate('/');setShow(null)}}>Nyumbani</span>
                        <span onClick={() => {navigate('/profile');setShow(null)}}>Badili Picha</span> 
                        <span onClick={() => {navigate('/subscriptions');setShow(null)}}>Unga Mkono</span>                       
                        <span onClick={() => logOut()}>ONDOKA</span>
                    </div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar