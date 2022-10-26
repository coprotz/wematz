import React from 'react'
import { useParams } from 'react-router-dom'
import Comments from '../../components/reactions/Comments'
import Likes from '../../components/reactions/Likes'
import View from '../../components/reactions/View'
import Reviews from '../../components/reviews/Reviews'
import { news } from '../../data'

const ViewNews = () => {
    const { id } = useParams()
    const cuNews = news?.find(n => n.id === id)
  return (
    <div className='view_main'>
        <h1>{cuNews?.title}</h1>
        <div className="top_news_timer date_color">
            <span className='view_main_span date_color'></span>
            <small>12 hours ago</small>
        </div>
        <img src={process.env.PUBLIC_URL+`/${cuNews.photoUrl}`} />
        <div className="reaction_news">
            <Likes/>
            <View/>
            <Comments/>
        </div>
        
        <p className='view_main_body'>{cuNews?.body}</p>
        <Reviews doc={cuNews}/>
    </div>
  )
}

export default ViewNews
