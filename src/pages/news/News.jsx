import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { news } from '../../data';
import './news.css'

const News = () => {
  const navigate = useNavigate()
  return (
    <div className='news_wrapper'>
      <div className="news_body">
        <Outlet/>
      </div>
      <div className="news_latest">
        <span>Habari Moto  Moto</span>
        {news?.slice(0,5).map(n => (
          <div className="latest_card latest_news" onClick={() => navigate(`/news/${n.id}`)}>
            <img src={process.env.PUBLIC_URL+`/${n.photoUrl}`} /> 
            <h4>{n.title}</h4>
          </div>
        ))}

      </div>
      
    </div>
  )
}

export default News
