import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Likes from '../../components/reactions/Likes';
import Remarks from '../../components/remarks/Remarks';
import { news } from '../../data';




const NewsMain = () => {
  const navigate = useNavigate()
  const topView = news.find(n => n?.views?.length > '3')

  console.log('news', news)

  return (
    <div className='main_news'>
      {/* <div className="news_headlines">
        <span>All</span>
        <span>Africa</span>
        <span>Asia</span>
        <span>America</span>
        <span>Europe</span>
        <span>Tanzania</span>
      </div> */}
      <h2 className='sub_title'>Habari Kuu</h2>
      <div className="top_news" onClick={() => navigate(`/news/${topView?.id}`)}>
        <img src={process.env.PUBLIC_URL+`/${topView.photoUrl}`} />
        <div className="top_news_head">
          <div className="top_news_timer">
            <span></span>
            <small>12 hours ago</small>
          </div>
          <h1 className='top_title'>{topView?.title}</h1>
          <div className="news_actions">
            <Likes/>
          </div>
        </div>
      </div> 
      <div className="main_news_outlines">
        { news.map(n => (
            <div className="news_card" onClick={() =>navigate(`/news/${n.id}`)} key={n.id}>
            <img src={process.env.PUBLIC_URL+`/${n.photoUrl}`} /> 
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
