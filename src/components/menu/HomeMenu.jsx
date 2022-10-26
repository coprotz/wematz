import React from 'react'
import { BsFilePostFill } from "react-icons/bs";
import { GiLovers, GiCook, GiTeacher } from "react-icons/gi";
import { IoIosChatbubbles } from "react-icons/io";
import { FaHeartbeat, FaRegNewspaper } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { RiTeamLine, RiQuestionnaireFill } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
import { TbBusinessplan } from "react-icons/tb";
import './menu.css'
import { NavLink } from 'react-router-dom'



const HomeMenu = ({active, setActive}) => {
  return (
    <div className={active? "home_menu" : 'home_no'}>
        <NavLink to='/' className="menu_item" onClick={() =>setActive(!active)}>
            <HiHome/>
            <span>Nyumbani</span>
        </NavLink>
        <NavLink to='/legals' className="menu_item" onClick={() =>setActive(!active)}>
            <GoLaw/>
            <span>Sheria</span>
        </NavLink>
        <NavLink to='/nikah' className="menu_item" onClick={() =>setActive(!active)}>
            <GiLovers/>
            <span>Ukumbi wa Nikah</span>
        </NavLink>
        <NavLink to='/meetings' className="menu_item" onClick={() =>setActive(!active)}>
            <RiTeamLine/>
            <span>Mikutano</span>
        </NavLink>
        <NavLink to='/madas' className="menu_item" onClick={() =>setActive(!active)}>
            <GiTeacher/>
            <span>Mada ya Wiki</span>
        </NavLink>
        <NavLink to='/recipies' className="menu_item" onClick={() =>setActive(!active)}>
            <GiCook/>
            <span>Mapishi</span>
        </NavLink>
        <NavLink to='/health' className="menu_item" onClick={() =>setActive(!active)}>
            <FaHeartbeat/>
            <span>Afya</span>
        </NavLink>
        <NavLink to='/news' className="menu_item" onClick={() =>setActive(!active)}>
            <FaRegNewspaper/>
            <span>Habari</span>
        </NavLink>
        <NavLink to='/questions' className="menu_item" onClick={() =>setActive(!active)}>
            <RiQuestionnaireFill/>
            <span>Maswali na Majibu</span>
        </NavLink>
        <NavLink to='/messages' className="menu_item" onClick={() =>setActive(!active)}>
            <IoIosChatbubbles/>
            <span>Meseji</span>
        </NavLink>
        {/* <NavLink to='/needHelps' className="menu_item" onClick={() =>setActive(active)}>
            <SiHomeassistant/>
            <span>Wanaohitaji</span>
        </NavLink>
        <NavLink to='/opportunites' className="menu_item" onClick={() =>setActive(active)}>
            <TbBusinessplan/>
            <span>Fursa na Biashara</span>
        </NavLink>        */}
    </div>
  )
}

export default HomeMenu