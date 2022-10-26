import React from 'react'
import { useState } from 'react';
import { BsStar,BsStarFill } from "react-icons/bs";
import { reviews } from '../../data';
import CreateReview from './CreateReview';




import './reviews.css'

const Reviews = ({doc}) => {

    const revs = reviews.filter(r =>r.docId === doc.id)

    console.log('revs', revs)

    // const reviews = [ 1,2,3,4,5]
    const rate = 4.2;
   

  return (
    <div className='reviews_container'>
        
        <h2 className='patient_reviews'>Maoni({revs?.length})</h2>
        <CreateReview title='Toa Maoni yako'/>
        <div className="reviews_patients">
            {revs?.map(r => (

            
            <div className="review_card">
                <div className="review_photo">
                    <img src={process.env.PUBLIC_URL+`/${r.photo}`} />
                    <div className="review_body_name">
                        <h3>{r.name}</h3>                        
                    </div>                    
                </div>
                <div className="reviews_body">                    
                    <span>{r.date}</span>                  
                    <p className="review_status">{r.message}</p>
                </div>
            </div>
           ))}
        
         
        </div>
      
    </div>
  )
}

export default Reviews
