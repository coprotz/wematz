import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { reviews } from '../../data'
import { BsChatLeftDotsFill,BsFillPersonFill, BsCalendarDay } from "react-icons/bs";
import {GrClose, GrLike } from "react-icons/gr";
import { AiFillLike } from 'react-icons/ai'
import Reviews from '../../components/reviews/Reviews';
import { BsStar,BsStarFill } from "react-icons/bs";
import useData from '../../hooks/useData';
import NewChat from '../messages/NewChat';
import NewDonate from '../donates/NewDonate';
import { db, useAuth } from '../../hooks/useAuth';
import Appointment from '../appointments/Appointment';
import StarRate from '../../components/star_rate/StarRate';
import moment from 'moment';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import Loading from '../../components/loading/Loading';
import Appoints from '../appointments/Appoints';





const ViewLawyer = () => {

    const { lawyers, donates, ratings, likes } = useData()
    const { user } = useAuth()
    const { id } = useParams()
    const [appoint, setAppoint] = useState(null)
    const [loading, setLoading] = useState(false)
    const lawyer = lawyers?.find(d => d.id === id)
    const navigate = useNavigate()
    const [rate, setRate] = useState(null)

    const [donate, setDonate] = useState(false)
    const [open, setOpen] = useState(null)

    const mujaheed = donates?.find(d => d?.user_id === user.uid)
    const a = new Date().getTime()
   

    const today = moment(a).format('MMM Do YY, LT')
    const expire = moment(mujaheed?.expiredAt).format('MMM Do YY, LT')
    const valid = expire > today


    const isLaw = lawyer?.userId === user.uid

    const handelNew = (d) => {
        if(!isLaw){      
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

    // const revs = reviews.filter(r =>r.docId === doc.id)

//     const RenderReview = (value) => {
//       if(value > rate){
//           return (
//               <BsStar className='review_svg'/>
//           )
//       }else {
//           return (
//               <BsStarFill className='review_svg'/>
//           )
//       }
//   }

    // console.log('revs', revs)

    // const reviews = [ 1,2,3,4,5]
    // const rate = 4.2;

    const lks = likes.filter(c =>c?.target_id === id)
    const isLike = lks.find(l =>l.user_id === user.uid)

    const handleLike = async () => {
        if(!isLaw){
    
        
        setLoading(true)
        const likeRef = collection(db, 'likes')
        const data = {
          target_id : id,
          user_id: user.uid,
          cat: 'user',
        }
    
        try {
          if(!isLike){
            await addDoc(likeRef, data)
            setLoading(false)
          }else{
            alert('Nawe pia ushamkubali huyu Mwanasheria')
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
        if(!isLaw){
          setAppoint(lawyer)
        }else{
          alert('Huwezi kujiwekea ahadi mwenyewe')
        }
      }

      const handleRate = () => {
        if(!isLaw){
          setRate(lawyer)
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
        {appoints && <Appoints setAppoints={setAppoints} target={lawyer} isLaw={isLaw}/>}
      <div className="view_doc_top">
        <img src={lawyer?.photo} />
        <div className="view_doc_photo">
            <img src={lawyer?.photo} />
           
        </div>
        <button className='btn btn_close2' onClick={() => navigate(-1)}><GrClose/></button>
      </div>
      <div className="view_doc_inner">
        <div className="view_doc_left">           
            {editName ?
            <input type='text' value={editName} onChange={(e) =>setEditName(e.target.value)}/> :
            <h2>{lawyer?.name}</h2>
            }
            <div>
              {isLaw && <button className='btn_edit' onClick={() => setEditName(lawyer?.name)}>Edit</button>}
              {editName && 
                <button 
                  onClick={() => {updateDoc(doc(db, 'lawyers', `${id}`), {name:editName});setEditName(null)}}
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
                <option value='Kesi za Familia'>Kesi za Familia</option> 
                <option value='Kesi za Madai'>Kesi za Madai</option> 
                <option value='Kesi za Jinai'>Kesi za Jinai</option>
                              
            </select>
            :
            <span>{lawyer?.specialize}</span>
            }
             <div>
              {isLaw && <button className='btn_edit' onClick={() => setEditSpec(lawyer?.specialize)}>Edit</button>}
              {editSpec && 
                <button 
                  onClick={() => {updateDoc(doc(db, 'lawyers', `${id}`), {specialize:editSpec});setEditSpec(null)}}
                  >Save
                </button>
              }
              {editSpec && <button onClick={() =>setEditSpec(null)}>Cancel</button>}
            </div>
            {/* <div className="doc_specializes">
                {lawyer?.specializes.map(s => (
                   <small className='doc_spec'>{s}</small> 
                ))}
            </div> */}
            
            {editDesc ? 
              <textarea 
                value={editDesc} 
                className='edit_text'
                onChange={(e) => setEditDesc(e.target.value)}
              ></textarea> :           
              <p className='doc_profile_desc'>{lawyer?.desc}</p>
            }
            <div>
              {isLaw && <button className='btn_edit' onClick={() => setEditDesc(lawyer?.desc)}>Edit</button>}
              {editDesc && 
                <button 
                  onClick={() => {updateDoc(doc(db, 'lawyers', `${id}`), {desc:editDesc});setEditDesc(null)}}
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
                    <button className='btn_members'>Watu {lks?.length} Wamempenda</button>
                    {/* <button className='btn_members'><BsChatLeftDotsFill/> Chat</button> */}
                    <button className='btn_members' onClick={() =>handelNew(lawyer)}><BsChatLeftDotsFill/>Chat</button>   
                       
                            
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
                          {reviews?.map((value, index) => (
                              <span key={index}>
                                  {RenderReview(value)}
                              </span>
                          ))}
                      </div> */}
                    <span>{docrates?.length} Maoni</span>
                </div>            
              </div> 
            </div>                  
            <Reviews doc={lawyer}/>
        </div>
        <div className="doc_right">
            {isLaw ? 
            <button className='btn_sign' onClick={() =>setAppoints(true)}>Angalia Maombi ya Miadi</button> :
            <button className='btn_sign' onClick={handleAppoint}>Omba Miadi na {lawyer?.name}</button>}
            <div className="hosp_name">
              <h4>Office</h4>
              
              {editHosp ?
                <input type='text' value={editHosp} onChange={(e) =>setEditHosp(e.target.value)}/> :
                <h2>{lawyer?.office}</h2>
                }
                <div>
                  {isLaw && <button className='btn_edit' onClick={() => setEditHosp(lawyer?.office)}>Edit</button>}
                  {editHosp && 
                    <button 
                      onClick={() => {updateDoc(doc(db, 'lawyers', `${id}`), {office:editHosp});setEditHosp(null)}}
                      >Save
                    </button>
                  }
                  {editHosp && <button onClick={() =>setEditHosp(null)}>Cancel</button>}
                </div>
            </div>
            <div className="hosp_name">
              <h4>Mahakama Ninayopatikana</h4>
              
              {editClinic ?
                <input type='text' value={editClinic} onChange={(e) =>setEditClinic(e.target.value)}/> :
                <h2>{lawyer?.court}</h2> 
                }
                <div>
                  {isLaw && <button className='btn_edit' onClick={() => setEditClinic(lawyer?.court)}>Edit</button>}
                  {editClinic && 
                    <button 
                      onClick={() => {updateDoc(doc(db, 'lawyers', `${id}`), {court:editClinic});setEditClinic(null)}}
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

export default ViewLawyer