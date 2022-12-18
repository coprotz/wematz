import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Likes from '../../components/reactions/Likes';
import Remarks from '../../components/remarks/Remarks';
// import { news } from '../../data';
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import moment from 'moment'
import { BsArrowLeft } from 'react-icons/bs';
import NewsCard from './NewsCard';




const NewsMain = () => {
  const navigate = useNavigate()
  const { news } = useData()



  // console.log('news', news)

  return (
    <div className='main_news'> 
      <div className="meeting_top">            
        <button onClick={() => navigate(-1)} className='btn_btn'><BsArrowLeft/></button>
        <h4 className='title'>Habari</h4> 
      </div> 
      <div className="main_news_outlines">
        { news.map(n => (
           <NewsCard n={n} key={n.id}/>
        )) }
      </div>     
    </div>
  )
}

export default NewsMain
