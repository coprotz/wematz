import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { reviews } from '../../data'
import { BsChatLeftDotsFill,BsFillPersonFill, BsCalendarDay } from "react-icons/bs";
import {GrClose, GrLike } from "react-icons/gr";
import Reviews from '../../components/reviews/Reviews';
import { BsStar,BsStarFill } from "react-icons/bs";
import useData from '../../hooks/useData';
// import {  HiOutlineArrowLeft } from "react-icons/hi";

const ViewDoctor = () => {

    const { id } = useParams()
    const { doctors } = useData()
    const doctor = doctors?.find(d => d.id === id)
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
        {/* <div className="view_que_back">
            <button onClick={() =>navigate(-1)} className='btn_back'><HiOutlineArrowLeft/>Rudi Nyuma</button>
        </div> */}
      <div className="view_doc_top">
        <img src={doctor?.photo} />
        <div className="view_doc_photo">
            <img src={doctor?.photo} />
           
        </div>
        <button className='btn btn_close2' onClick={() => navigate(-1)}><GrClose/></button>
      </div>
      <div className="view_doc_inner">
        <div className="view_doc_left">
            <h2>{doctor?.name}</h2>
            <span>{doctor?.specialize}</span>
            {/* <div className="doc_specializes">
                {doctor?.specializes.map(s => (
                   <small className='doc_spec'>{s}</small> 
                ))}
            </div> */}
            <p className='doc_profile_desc'>{doctor?.desc}</p>
            
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
          
            <Reviews doc={doctor}/>
        </div>
        <div className="doc_right">
            <button className='btn_sign'>Weka Miadi</button>
            <div className="hosp_name">
              <h4>Hospital</h4>
              <h2>{doctor?.hospital}</h2>
            </div>
            <div className="hosp_name">
              <h4>Clinic</h4>
              <h2>{doctor?.clinic}</h2>
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

export default ViewDoctor
