import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {  FiActivity } from "react-icons/fi";
import { notifications } from '../../data';

const Questions = () => {
  const navigate = useNavigate()
  return (
    <div className='news_wrapper'>
      <div className="news_body">
        <Outlet/>
      </div>
      <div className="news_latest">
        <div className="main_ques_top">
            <button className='btn_que' onClick={() =>navigate('/questions/createQue')}>Uliza Swali</button>
        </div>
        <div className="recent_activies_wrapper">
          <div className="recent_activities">
            <FiActivity/>
            <h4>Matukio ya Hivi Karibuni</h4>
          </div>
          <div className="activies_body">
            {notifications?.map(n => (
              <div className="activity_card">
                <div className="activity_photo">
                  <img src={process.env.PUBLIC_URL+`/${n.photo}`} />
                </div>
                <div className="activies_inner_body">
                  <h4>{n.name}</h4><span>{n.text}</span>
                  <small>{n.time}</small>
                </div>
              </div>
            ))}
           
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default Questions
