import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { nikahs } from '../../data';
import {  BsFillChatLeftTextFill,BsArrowLeft } from "react-icons/bs";
import { FcLike } from "react-icons/fc";


const NikahView = () => {
    const { id } = useParams()
    const nikah = nikahs.find(n => n.id === id)
    const navigate = useNavigate()

    console.log('id', id)

  return (
    <div className='nikahview'>
        <div className="nikah_View_top">
            <button onClick={() => navigate(-1)} className='btn'><BsArrowLeft/></button>
            {nikah && nikah.name}
        </div>
        <div className="nikah_view_bottom">
            <div className="nikah_view_left">
                <img src={nikah && nikah.url} alt="" />
                <div className="nikah_view_action">
                    <button className='btn_like'><FcLike/></button>
                    <button className='btn_like btn_chat'><BsFillChatLeftTextFill/></button>
                </div>
            </div>
            <div className="nikah_view_right">
                <h1>{nikah && nikah.name}</h1>
                <div className="nikah_right_item">
                    <span>Age</span>
                    <h4>{nikah && nikah.age}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Tribe</span>
                    <h4>{nikah && nikah.tribe}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Living</span>
                    <h4>{nikah && nikah.live}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Education</span>
                    <h4>{nikah && nikah.education}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Quran</span>
                    <h4>{nikah && nikah.quran}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Prayer</span>
                    <h4>{nikah && nikah.prayer}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Weight</span>
                    <h4>{nikah && nikah.weight}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Height</span>
                    <h4>{nikah && nikah.height}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Body Status</span>
                    <h4>{nikah && nikah.body}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Blood Group</span>
                    <h4>{nikah && nikah.blood}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Marrital Status</span>
                    <h4>{nikah && nikah.status}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Children</span>
                    <h4>{nikah && nikah.child}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Employment Status</span>
                    <h4>{nikah && nikah.emmployement}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Stays</span>
                    <h4>{nikah && nikah.live}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Occupation</span>
                    <h4>{nikah && nikah.occupation}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Ethnicity</span>
                    <h4>{nikah && nikah.Ethnicity}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Religious Set</span>
                    <h4>{nikah && nikah.religion_set}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Muslem by</span>
                    <h4>{nikah && nikah.islam_by}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Gender</span>
                    <h4>{nikah && nikah.gender}</h4>
                </div>
            </div>
        </div>
        
        

      
    </div>
  )
}

export default NikahView
