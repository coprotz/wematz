import React from 'react'
import { BsFilePostFill } from "react-icons/bs";
import { GiLovers } from "react-icons/gi";
import { IoIosChatbubbles } from "react-icons/io";
import { FaHeartbeat } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { RiTeamLine, RiQuestionnaireFill } from "react-icons/ri";
import './menu.css'
import { NavLink } from 'react-router-dom'

const HomeMenu = ({active, setActive}) => {
  return (
    <div className={active? 'home_no': "home_menu"}>
        <NavLink to='/home/posts' className="menu_item" onClick={() =>setActive(!active)}>
            <BsFilePostFill/>
            <span>Posts</span>
        </NavLink>
        <NavLink to='/home/stories' className="menu_item" onClick={() =>setActive(!active)}>
            <GoLaw/>
            <span>Sheria</span>
        </NavLink>
        <NavLink to='/home/nikah' className="menu_item" onClick={() =>setActive(!active)}>
            <GiLovers/>
            <span>Nikah</span>
        </NavLink>
        <NavLink to='/home/meetings' className="menu_item" onClick={() =>setActive(!active)}>
            <RiTeamLine/>
            <span>Meeting Room</span>
        </NavLink>
        <NavLink to='/home/madas' className="menu_item" onClick={() =>setActive(!active)}>
            <BsFilePostFill/>
            <span>Mada of the week</span>
        </NavLink>
        <NavLink to='/home/mapishi' className="menu_item" onClick={() =>setActive(!active)}>
            <BsFilePostFill/>
            <span>Mapishi</span>
        </NavLink>
        <NavLink to='/home/health' className="menu_item" onClick={() =>setActive(!active)}>
            <FaHeartbeat/>
            <span>Health & Fitness</span>
        </NavLink>
        <NavLink to='/home/news' className="menu_item" onClick={() =>setActive(!active)}>
            <BsFilePostFill/>
            <span>News</span>
        </NavLink>
        <NavLink to='/home/qna' className="menu_item" onClick={() =>setActive(!active)}>
            <RiQuestionnaireFill/>
            <span>Maswali na Majibu</span>
        </NavLink>
        <NavLink to='/home/messages' className="menu_item" onClick={() =>setActive(!active)}>
            <IoIosChatbubbles/>
            <span>Messages</span>
        </NavLink>
        <NavLink to='/needHelps' className="menu_item" onClick={() =>setActive(!active)}>
            <BsFilePostFill/>
            <span>Need Helps</span>
        </NavLink>
        <NavLink to='/home/opportunites' className="menu_item" onClick={() =>setActive(!active)}>
            <BsFilePostFill/>
            <span>Opportunites</span>
        </NavLink>       
    </div>
  )
}

export default HomeMenu