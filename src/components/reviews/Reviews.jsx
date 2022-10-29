import React from 'react'
import { useState } from 'react';
import { BsStar,BsStarFill } from "react-icons/bs";
import { reviews } from '../../data';
import useData from '../../hooks/useData';
import CreateReview from './CreateReview';
import moment from 'moment'




import './reviews.css'

const Reviews = ({doc}) => {

    const { users, comments } = useData()

    const revs = comments?.filter(r =>r.docId === doc?.id)
    const user = users?.find(u => u.id === doc?.userId)

    console.log('doc', doc)

    // const reviews = [ 1,2,3,4,5]
    const rate = 4.2;
   

  return (
    <div className='reviews_container'>
        
        <h2 className='patient_reviews'>Maoni({revs?.length})</h2>
        
        <div className="reviews_patients">
            {revs?.map(r => (            
            <div className="review_card">
                <div className="review_photo">
                    <img src={r?.photo} alt="" />
                    <div className="review_body_name">
                        <h3>{r?.name}</h3>                        
                    </div>                    
                </div>
                <div className="reviews_body">                    
                    <small>{moment(r?.createdAt?.toDate()).fromNow(true)}</small>                 
                    <p className="review_status">{r?.text}</p>
                </div>
            </div>
           ))}
        
         
        </div>
        <CreateReview title='Toa Maoni yako' doc={doc}/>
      
    </div>
  )
}

export default Reviews
