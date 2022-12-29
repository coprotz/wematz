import React, { useState } from 'react'
import useData from '../../hooks/useData'
import Likes from '../remarks/Likes'
import CreateReview from '../reviews/CreateReview'
import './replies.css'
import moment from 'moment'

const Replies = ({p, type}) => {
    const [reply, setReply] = useState(null)
    const { comments } = useData()
    const revs = comments?.filter(r =>r.docId === p?.id)
  return (
    <div className='replies_container'>
        <div className="replies_inner">
            <Likes p={p} type={type}/>
            {reply? <span onClick={() =>setReply(null)} style={{color: 'red'}}>Ondoa Andika Jibu</span> :
            <span onClick={() =>setReply(p.id)}>Jibu ({revs?.length})</span> }
        </div>
        {reply &&
            <CreateReview setShow={setReply} doc={p} title='Andika Kumjibu' type='maoni'/>
        }
        {revs.map(r => (
            <div className="reply_boom">
                <div className="reply_boom_img">
                    <img src={r.photo} alt="" />
                </div>
                <div className="reply_boom_body">
                    <div className="reply_boom_userinfo">
                        <h5>{r.name}</h5>
                        <span>{moment(r?.createdAt?.toDate()).fromNow()}</span>
                    </div>
                    <p className="review_status">{r.text}</p>
                </div>
            </div>
            
        ))}

    </div>
  )
}

export default Replies
