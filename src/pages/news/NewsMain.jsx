import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Likes from '../../components/reactions/Likes';
import Remarks from '../../components/remarks/Remarks';
// import { news } from '../../data';
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import moment from 'moment'
import { BsArrowLeft } from 'react-icons/bs';




const NewsMain = () => {
  const navigate = useNavigate()
  const { news, users } = useData()
  const { user } = useAuth()
  
  const topView = news.slice(0,1).find(n => n?.views?.length > '3')

  console.log('news', news)

  return (
    <div className='main_news'> 
      <div className="meeting_top">            
                <button onClick={() => navigate(-1)} className='btn_btn'><BsArrowLeft/></button>
                <h4 className='title'>Habari Kuu</h4> 
            </div>    
      {/* <h2 className='sub_title'>Habari Kuu</h2> */}
      {news?.slice(0,1).map(n => (      
      <div className="top_news" onClick={() => navigate(`/news/${topView?.id}`)} key={n.id}>
        <img src={n.pic} />
        <div className="top_news_head">
          <div className="top_news_timer">
            <span></span>
            <small>{moment(n?.createdAt?.toDate()).format('MMM Do YY, LT')}</small>
          </div>
          <h1 className='top_title'>{n.title}</h1>
          <div className="news_actions">
            <Likes/>
          </div>
        </div>
      </div> 
      ))}
      <div className="main_news_outlines">
        { news.map(n => (
            <div className="news_card" onClick={() =>navigate(`/news/${n.id}`)} key={n.id}>
            <img src={n.pic} /> 
            <div className="news_details">            
                <h3 className='news_name'>{n.title}</h3>
                <div className="new_actions">
                    <Remarks/>
                </div>
            </div> 
        </div>
        )) }
      </div>     
    </div>
  )
}

export default NewsMain
