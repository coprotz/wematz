import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Comments from '../../components/reactions/Comments'
import Likes from '../../components/reactions/Likes'
import View from '../../components/reactions/View'
import Reviews from '../../components/reviews/Reviews'
// import { news } from '../../data'
import useData from '../../hooks/useData'
import moment from 'moment'
import parser from 'html-react-parser'
import { GrClose } from 'react-icons/gr'

const ViewNews = () => {
    const { id } = useParams()
    const { news } = useData()
    const cuNews = news?.find(n => n.id === id)
    const navigate = useNavigate()
  return (
    <div className='view_main'>
        <button className='btn_btn' onClick={() => navigate(-1)}><GrClose/></button>
        <h1>{cuNews?.title}</h1>
        <div className="top_news_timer date_color">
            <span className='view_main_span date_color'></span>
            <small>{moment(cuNews?.createdAt?.toDate()).format('MMM Do YY, LT')}</small>
        </div>
        <img src={cuNews?.pic} />
        <div className="reaction_news">
            <Likes/>
            <View/>
            <Comments/>
        </div>
        
        <p className='view_main_body'>{parser(`${cuNews?.body}`)}</p>
        <Reviews doc={cuNews}/>
    </div>
  )
}

export default ViewNews
