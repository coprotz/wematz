import React from 'react'
// import { BsFilePostFill } from "react-icons/bs";
import { GiLovers, GiCook, GiTeacher } from "react-icons/gi";
import { IoIosChatbubbles } from "react-icons/io";
import { FaHeartbeat, FaRegNewspaper } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { RiTeamLine, RiQuestionnaireFill } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import {  FiActivity } from "react-icons/fi";
// import { TbBusinessplan } from "react-icons/tb";
import './menu.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';



const HomeMenu = ({active, setActive}) => {
    const { user } = useAuth()
    const { marriages, users } = useData();
    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(m => m.userId === user.uid)
    const isMarry = user.uid === marry?.userId
    const admin = cuUser?.isAdmin == true

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
        {isMarry &&
        <NavLink to='/activities' className="menu_item" onClick={() =>setActive(!active)}>
            <FiActivity/>
            <span>Matukio</span>
        </NavLink>}
        <NavLink to='/members' className="menu_item" onClick={() =>setActive(!active)}>
            <RiTeamLine/>
            <span>WanaWema</span>
        </NavLink>
        <NavLink to='/meetings' className="menu_item" onClick={() =>setActive(!active)}>
            <RiTeamLine/>
            <span>Ukumbi wa Midahalo</span>
        </NavLink>
        <NavLink to='/madas' className="menu_item" onClick={() =>setActive(!active)}>
            <GiTeacher/>
            <span>Mada ya Wiki</span>
        </NavLink>
        {/* <NavLink to='/recipies' className="menu_item" onClick={() =>setActive(!active)}>
            <GiCook/>
            <span>Mapishi</span>
        </NavLink> */}
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
        <NavLink to='/mjaheed' className="menu_item" onClick={() =>setActive(!active)}>
            <MdOutlineVerifiedUser/>
            <span>Kuwa Mjaheed</span>
        </NavLink>
        <NavLink to='/ibada' className="menu_item" onClick={() =>setActive(!active)}>
            <MdOutlineVerifiedUser/>
            <span>Ibada Zangu</span>
        </NavLink>
        {admin &&
        <NavLink to='/admin' className="menu_item" onClick={() =>setActive(!active)}>
            <MdOutlineVerifiedUser/>
            <span>Admin</span>
        </NavLink>}
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