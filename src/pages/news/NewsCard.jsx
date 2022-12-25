import React from 'react'
import { useNavigate } from 'react-router-dom'
import Remarks from '../../components/remarks/Remarks'

const NewsCard = ({n}) => {
    const navigate = useNavigate()   
  return (
    <div className="news_card" key={n.id}>
        <img src={n.pic} /> 
        <div className="news_details">            
            <h3 className='news_name' onClick={() =>navigate(`/news/${n.id}`)}>{n.title}</h3>
            <div className="new_actions">
                <Remarks p={n} type='news'/>
            </div>
        </div> 
    </div>
  )
}

export default NewsCard
