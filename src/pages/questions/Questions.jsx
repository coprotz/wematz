import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {  FiActivity } from "react-icons/fi";
// import { notifications, questions } from '../../data';
import moment from 'moment';
import useData from '../../hooks/useData';
import ViewCard from './ViewCard';

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
            {questions?.slice(-3).map(n => (
             <ViewCard n={n} key={n.id}/>
            ))}
           
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default Questions
