import React from 'react'
// import { useState } from 'react';
// import { BsStar,BsStarFill } from "react-icons/bs";
// import { reviews } from '../../data';
import useData from '../../hooks/useData';
import CreateReview from './CreateReview';
import moment from 'moment'




import './reviews.css'

const Reviews = ({doc, setShow}) => {

    const {  comments } = useData()

    const revs = comments?.filter(r =>r.docId === doc?.id)
    // const user = users?.find(u => u.id === doc?.userId)

    // console.log('doc', doc)

    // const reviews = [ 1,2,3,4,5]
    // const rate = 4.2;
   

  return (
    <div className='reviews_container'>        
        <h2 className='patient_reviews'>Maoni({revs?.length})</h2>        
        <div className="reviews_patients">
            {revs?.map(r => (            
            <div className="review_card">
                <div className="post_card_user">
                    <div className="card_user_photo">
                        <img src={r?.photo} alt="" />
                    </div>
                    <div className="card_username">
                        <h5 className='author_name'>{r?.name}</h5>
                        <small className='timeago'>{moment(r?.createdAt?.toDate()).fromNow(true)}</small>
                    </div>
                
                </div>              
                <div className="reviews_body">                    
                    {/* <small>{moment(r?.createdAt?.toDate()).fromNow(true)}</small>                  */}
                    <p className="review_status">{r?.text}</p>
                </div>
            </div>
           ))}
        
         
        </div>
        <CreateReview title='Toa Maoni yako' doc={doc} setShow={setShow}/>
        <h4 onClick={() => setShow(null)} style={{color:'blue'}} className='hide_reviews'>Ficha Maoni</h4>
      
    </div>
  )
}

export default Reviews
