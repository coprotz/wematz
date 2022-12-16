import React from 'react'
import { Outlet } from 'react-router-dom'
import img1 from '../../assets/images/img3.jpg'
import { BsChatLeftDotsFill,BsFillPersonFill } from "react-icons/bs";

const MainMada = () => {
  return (
    <div className='news_wrapper'>
        <div className='news_body'>
            <Outlet/>
        </div>
        <div className="mada_right">
            <div className="madas_photo">
                <img src={img1} alt="" />
            </div>
            <h3>Na: Shukuru Comrade</h3>
            <button className='btn_btn'><BsChatLeftDotsFill/></button>
        </div>
    </div>
  )
}

export default MainMada
