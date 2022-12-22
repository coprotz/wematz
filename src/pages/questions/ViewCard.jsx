import React from 'react'
import useData from '../../hooks/useData'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const ViewCard = ({n}) => {
    const { users } = useData()
    const navigate = useNavigate()
    const author = users?.find(u => u.id === n?.userId) 
  return (
    <div className="activity_card" key={n.id} onClick={() =>navigate(`/questions/${n.id}`)}>
        <div className="activity_photo">
            <img src={author?.photo || process.env.PUBLIC_URL + author?.avatar} />
        </div>
        <div className="activies_inner_body">
            <h4>{n.name}</h4><span>{n.que}</span>
            <small className='q_date'>{moment(n.createdAt?.seconds * 1000).format('MMM Do YY, LT') }</small>
        </div>
    </div>
  )
}

export default ViewCard
