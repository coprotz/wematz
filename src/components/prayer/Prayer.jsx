import React from 'react'
import {  BsArrowRight } from "react-icons/bs";
import './prayer.css'

const Prayer = () => {
  return (
    <div className='prayer'>
      <div className="prayer_top">
        <small>Prayer Time - DODOMA</small>
        <button className='btn_next btn'><BsArrowRight/></button>
      </div>
      <div className="prayer_details">        
        <h1 className='time_remaining'>03:55:24</h1>
        <small>11 Sept 2022 - 15 Safar 1444</small>
        <div className="prayer_grids">
            <div className="prayer_time">
                <span>FAJR</span>
                <h4>05:23</h4>
            </div>
            <div className="prayer_time current_time">
                <span>SUNRISE</span>
                <h4>06:32</h4>
            </div>
            <div className="prayer_time">
                <span>DHUHR</span>
                <h4>12:33</h4>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Prayer
