import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { reviews } from '../../data'
import { BsChatLeftDotsFill,BsFillPersonFill, BsCalendarDay } from "react-icons/bs";
import {GrClose, GrLike } from "react-icons/gr";
import Reviews from '../../components/reviews/Reviews';
import { BsStar,BsStarFill } from "react-icons/bs";
import useData from '../../hooks/useData';

const ViewLawyer = () => {

    const { lawyers } = useData()

    const { id } = useParams()
    const lawyer = lawyers?.find(d => d.id === id)
    const navigate = useNavigate()
    // const revs = reviews.filter(r =>r.docId === doc.id)

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

    // console.log('revs', revs)

    // const reviews = [ 1,2,3,4,5]
    const rate = 4.2;
  return (
    <div className='view_doctor_wrapper'>
      <div className="view_doc_top">
        <img src={lawyer?.photo} />
        <div className="view_doc_photo">
            <img src={lawyer?.photo} />
           
        </div>
        <button className='btn btn_close2' onClick={() => navigate(-1)}><GrClose/></button>
      </div>
      <div className="view_doc_inner">
        <div className="view_doc_left">
            <h2>{lawyer?.name}</h2>
            <span>{lawyer?.specialize}</span>
            {/* <div className="doc_specializes">
                {lawyer?.specializes.map(s => (
                   <small className='doc_spec'>{s}</small> 
                ))}
            </div> */}
            <p className='doc_profile_desc'>{lawyer?.desc}</p>
            
        </div>
        <div className="doc_body">
            <div className="doc _body_top">
                <div className="meetings_actions"> 
                    <button className='btn_members'><GrLike/></button>                   
                    <button className='btn_members'>Watu 250 Wamempenda</button>
                    <button className='btn_members'><BsChatLeftDotsFill/> Chat</button>
                            
                </div>
            </div> 
            <div className="review_rate">
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
            {/* <h2 className='patient_reviews'>Maoni({revs?.length})</h2>
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
            
            
            </div>           */}
            <Reviews doc={lawyer}/>
        </div>
        <div className="doc_right">
            <button className='btn_sign'>Weka Miadi</button>
            <div className="hosp_name">
              <h4>Office</h4>
              <h2>{lawyer?.office}</h2>
            </div>
            <div className="hosp_name">
              <h4>Mahakama Ninayopatikana</h4>
              <h2>{lawyer?.court}</h2>
            </div>
            <div className="doc_rating">
              <span>Unaweza kumpa kiwango kipi mawasiliano na ushauri wa Daktari huyu?. Ushiriki wako ni muhimu ili kuwasaidia wengine</span>
              <button className='btn_sign'>Mpe Kiwango</button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default ViewLawyer