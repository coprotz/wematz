import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { clinics, reviews } from '../../data'
import { BsChatLeftDotsFill,BsFillPersonFill, BsCalendarDay } from "react-icons/bs";
import {GrClose, GrLike } from "react-icons/gr";
import { AiFillLike } from 'react-icons/ai'
import Reviews from '../../components/reviews/Reviews';
import { BsStar,BsStarFill } from "react-icons/bs";
import useData from '../../hooks/useData';
import Appointment from '../appointments/Appointment';
import { useState } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db, useAuth } from '../../hooks/useAuth';
import Loading from '../../components/loading/Loading';
import NewChat from '../messages/NewChat';
import NewDonate from '../donates/NewDonate';
import moment from 'moment';
import StarRate from '../../components/star_rate/StarRate';
import Appoints from '../appointments/Appoints';





const ViewDoctor = () => {

    const { id } = useParams()
    const { doctors, likes, donates, ratings } = useData()
    const doctor = doctors?.find(d => d.id === id)
    const navigate = useNavigate()
    const [appoint, setAppoint] = useState(null)
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)

    const [donate, setDonate] = useState(false)
    const [open, setOpen] = useState(null)
    const [rate, setRate] = useState(null)

    const mujaheed = donates?.find(d => d?.user_id === user.uid)   
    const a = new Date().getTime()
    const today = moment(a).format('MMM Do YY, LT')
    const expire = moment(mujaheed?.expiredAt).format('MMM Do YY, LT')
    const valid = expire > today


    const isDoc = doctor?.userId === user.uid
    

    const handelNew = (d) => {
      if(!isDoc){      
        if(!valid){
            setDonate(d)
        }else{
            setOpen(d)
        }
      }else{
        alert('Huwezi kujitumia sms mwenyewe')
      }
    }

    const docrates = ratings?.filter(r => r.target_id === id)   
    const sum = docrates.reduce((a, b) => a + b.rate, 0)

    const b = sum/docrates?.length

    const rateValue = b.toFixed(1)


  //   const RenderReview = (value) => {
  //     if(value > rateValue){
  //         return (
  //             <BsStar className='review_svg'/>
  //         )
  //     }else {
  //         return (
  //             <BsStarFill className='review_svg'/>
  //         )
  //     }
  // }

  const lks = likes.filter(c =>c?.target_id === id)
  const isLike = lks.find(l =>l.user_id === user.uid)

  const handleLike = async () => {
    if(!isDoc){

    
    setLoading(true)
    const likeRef = collection(db, 'likes')
    const data = {
      target_id : id,
      user_id: user.uid
    }

    try {
      if(!isLike){
        await addDoc(likeRef, data)
        setLoading(false)
      }else{
        alert('Nawe pia ushamkubali huyu Dactari')
        setLoading(null)
      }
    } catch (error) {
      console.log(error.message)
    }
  }else{
    alert('Huwezi kujipenda mwenyewe')
  }
  }


  const handleAppoint = () => {
    if(!isDoc){
      setAppoint(doctor)
    }else{
      alert('Huwezi kujiwekea ahadi mwenyewe')
    }
  }

  const handleRate = () => {
    if(!isDoc){
      setRate(doctor)
    }else{
      alert('Huwezi kujirate mwenyewe')
    }
  }

  const [editDesc, setEditDesc] = useState(null)
  const [editName, setEditName] = useState(null)
  const [editSpec, setEditSpec] = useState(null)
  const [editHosp, setEditHosp] = useState(null)
  const [editClinic, setEditClinic] = useState(null)
  const [appoints, setAppoints] = useState(null)

 
  return (
    <div className='view_doctor_wrapper'>
        {appoint && <Appointment appoint={appoint} setAppoint={setAppoint}/>}
        {donate && <NewDonate setDonate={setDonate} item={donate}/>}
        {open && <NewChat setOpen={setOpen} myId={user.uid} item={open}/>} 
        {rate && <StarRate setRate={setRate} myId={user.uid} item={rate}/>} 
        {appoints && <Appoints setAppoints={setAppoints} target={doctor} isDoc={isDoc}/>}

      <div className="view_doc_top">
        <img src={doctor?.photo} />
        <div className="view_doc_photo">
            <img src={doctor?.photo} />
           
        </div>
        <button className='btn btn_close2' onClick={() => navigate(-1)}><GrClose/></button>
      </div>
      <div className="view_doc_inner">
        <div className="view_doc_left">
            {editName ?
            <input type='text' value={editName} onChange={(e) =>setEditName(e.target.value)}/> :
            <h2>{doctor?.name}</h2>
            }
            <div>
              {isDoc && <button className='btn_edit' onClick={() => setEditName(doctor?.name)}>Edit</button>}
              {editName && 
                <button 
                  onClick={() => {updateDoc(doc(db, 'doctors', `${id}`), {name:editName});setEditName(null)}}
                  >Save
                </button>
              }
              {editName && <button onClick={() =>setEditName(null)}>Cancel</button>}
            </div>
            
            {editSpec ?        
            <select 
                name='specialize'        
                value={editSpec}          
                onChange={(e) =>setEditSpec(e.target.value)}           
              >
              <option value='' >Chagua</option> 
                {clinics.map((item, index) => (
                  <option value={item.name} key={index}>{item.name} - {item.swahir}</option> 
                ))}
                              
            </select>
            :
            <span>{doctor?.specialize}</span> 
            }
            <div>
              {isDoc && <button className='btn_edit' onClick={() => setEditSpec(doctor?.specialize)}>Edit</button>}
              {editSpec && 
                <button 
                  onClick={() => {updateDoc(doc(db, 'doctors', `${id}`), {specialize:editSpec});setEditSpec(null)}}
                  >Save
                </button>
              }
              {editSpec && <button onClick={() =>setEditSpec(null)}>Cancel</button>}
            </div>
            {editDesc ? 
              <textarea 
                value={editDesc} 
                className='edit_text'
                onChange={(e) => setEditDesc(e.target.value)}
              ></textarea> :           
            <p className='doc_profile_desc'>{doctor?.desc}</p>}
            <div>
              {isDoc && <button className='btn_edit' onClick={() => setEditDesc(doctor?.desc)}>Edit</button>}
              {editDesc && 
                <button 
                  onClick={() => {updateDoc(doc(db, 'doctors', `${id}`), {desc:editDesc});setEditDesc(null)}}
                  >Save
                </button>
              }
              {editDesc && <button onClick={() =>setEditDesc(null)}>Cancel</button>}
            </div>
            
            
        </div>
        <div className="doc_body">
            <div className="doc _body_top">
                <div className="meetings_actions"> 
                    <button className='btn_members' onClick={handleLike}>
                    {isLike? <AiFillLike/> : loading? <Loading/> : <GrLike/>}                  
                    </button>                   
                    <button className='btn_members'>Watu {lks?.length} Wamemkubali</button>
                    {/* <button className='btn_members' onClick={() =>handelNew(doctor)}><BsChatLeftDotsFill/> Chat</button> */}
                            
                </div>
            </div> 
            <div className="review_rate">
              <div className="reviews_top">
                  <h3>Kiwango cha Ujumla</h3>
                  {/* <button className='btn_review' onClick={() => setReview(true)}>Write a review</button> */}
              </div>
              <div className="review_summary">
                  <h1>{rateValue !== 'NaN' ? rateValue : 0}</h1>
                  <div className="review_stars">
                      {/* <div className="stars_items">
                          {reviews?.slice(0,5).map((value, index) => (
                              <span key={index}>
                                  {RenderReview(value)}
                              </span>
                          ))}
                      </div> */}
                      <span>{docrates?.length} Maoni</span>
                  </div>            
              </div> 
            </div>
          
            <Reviews doc={doctor}/>
        </div>
        <div className="doc_right">
          {isDoc ?
            <button className='btn_sign' onClick={() =>setAppoints(true)} >Angalia Maombi ya Miadi</button>:
            <button className='btn_sign' onClick={handleAppoint}>Omba Miadi na {doctor?.name}</button>}
            <div className="hosp_name">
              <h4>Hospital</h4>                         
              {editHosp ?
                <input type='text' value={editHosp} onChange={(e) =>setEditHosp(e.target.value)}/> :
                <h2>{doctor?.hospital}</h2> 
                }
                <div>
                  {isDoc && <button className='btn_edit' onClick={() => setEditHosp(doctor?.hospital)}>Edit</button>}
                  {editHosp && 
                    <button 
                      onClick={() => {updateDoc(doc(db, 'doctors', `${id}`), {hospital:editHosp});setEditHosp(null)}}
                      >Save
                    </button>
                  }
                  {editHosp && <button onClick={() =>setEditHosp(null)}>Cancel</button>}
                </div>
            </div>
            <div className="hosp_name">
              <h4>Clinic</h4>                         
              {editClinic ?
                <input type='text' value={editClinic} onChange={(e) =>setEditClinic(e.target.value)}/> :
                <h2>{doctor?.clinic}</h2> 
                }
                <div>
                  {isDoc && <button className='btn_edit' onClick={() => setEditClinic(doctor?.clinic)}>Edit</button>}
                  {editClinic && 
                    <button 
                      onClick={() => {updateDoc(doc(db, 'doctors', `${id}`), {clinic:editClinic});setEditClinic(null)}}
                      >Save
                    </button>
                  }
                  {editClinic && <button onClick={() =>setEditClinic(null)}>Cancel</button>}
                </div>
            </div>
            <div className="doc_rating">
              <span>Unaweza kumpa kiwango kipi mawasiliano na ushauri wa Daktari huyu?. Ushiriki wako ni muhimu ili kuwasaidia wengine</span>
              <button className='btn_sign' onClick={handleRate}>Mpe Kiwango</button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default ViewDoctor
