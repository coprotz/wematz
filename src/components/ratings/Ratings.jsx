import React from 'react'
import { useState } from 'react'
import { reviews } from '../../data'


const Ratings = () => {
    // const [review, setReview] = useState(null)

    const RenderReview = (value) => {
        if(value > rate){
            return (
                <BsStar className='review_svg'/>
            )
        }else {
            return (
                <BsStarFill className='review_svg'/>
            )
        }
    }

  return (
    <div>
        <div className="reviews_top">
            <h3>Kiwango cha Ujumla</h3>
            {/* <button className='btn_review' onClick={() => setReview(true)}>Write a review</button> */}
        </div>
        <div className="review_summary">
            <h1>{rate}</h1>
            <div className="review_stars">
                <div className="stars_items">
                    {reviews?.map((value, index) => (
                        <span key={index}>
                            {RenderReview(value)}
                        </span>
                    ))}
                </div>
                <span>13 Maoni</span>
            </div>            
        </div>
      
    </div>
  )
}

export default Ratings
