import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {  FiActivity } from "react-icons/fi";
// import { notifications, questions } from '../../data';
import moment from 'moment';
import useData from '../../hooks/useData';

const Questions = () => {
  const navigate = useNavigate()
  const { questions } = useData()
  return (
    <div className='news_wrapper'>
      <div className="news_body">
        <Outlet/>
      </div>
      <div className="news_latest">
        <div className="main_ques_top">
          <div className="recent_activities">
            <FiActivity/>
            <h4>Maswali ya Hivi Karibuni</h4>
          </div>
        </div>
        <div className="recent_activies_wrapper">
          
          <div className="activies_body">
            {questions?.slice(0,5).map(n => (
              <div className="activity_card" key={n.id} onClick={() =>navigate(`/questions/${n.id}`)}>
                <div className="activity_photo">
                  <img src={n.photo} />
                </div>
                <div className="activies_inner_body">
                  <h4>{n.name}</h4><span>{n.que}</span>
                  <small className='q_date'>{moment(n.createdAt?.seconds * 1000).format('MMM Do YY, LT') }</small>
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
