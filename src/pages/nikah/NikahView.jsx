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
                    <span>Umri</span>
                    <h4>{nikah && nikah.age}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kabila</span>
                    <h4>{nikah && nikah.tribe}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anaishi na</span>
                    <h4>{nikah && nikah.live}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Juu</span>
                    <h4>{nikah && nikah.education}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Quran</span>
                    <h4>{nikah && nikah.quran}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kuswali</span>
                    <h4>{nikah && nikah.prayer}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Uzito</span>
                    <h4>{nikah && nikah.weight}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Urefu</span>
                    <h4>{nikah && nikah.height}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Umbile</span>
                    <h4>{nikah && nikah.body}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kundi la Damu</span>
                    <h4>{nikah && nikah.blood}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ndoa</span>
                    <h4>{nikah && nikah.status}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Watoto</span>
                    <h4>{nikah && nikah.child}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ajira</span>
                    <h4>{nikah && nikah.emmployement}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anapokaa</span>
                    <h4>{nikah && nikah.live}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Ujuzi</span>
                    <h4>{nikah && nikah.occupation}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Asili</span>
                    <h4>{nikah && nikah.Ethnicity}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Dhehebu</span>
                    <h4>{nikah && nikah.religion_set}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Muislamu kwa</span>
                    <h4>{nikah && nikah.islam_by}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Ukewenza</span>
                    <h4>{nikah && nikah.gender}</h4>
                </div>
            </div>
            <div className="nikah_view_right">
                <h1>Sifa za Mwenza</h1>
                <div className="nikah_right_item">
                    <span>Umri</span>
                    <h4>{nikah && nikah.age}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kabila</span>
                    <h4>{nikah && nikah.tribe}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anaishi na</span>
                    <h4>{nikah && nikah.live}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Juu</span>
                    <h4>{nikah && nikah.education}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Quran</span>
                    <h4>{nikah && nikah.quran}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kuswali</span>
                    <h4>{nikah && nikah.prayer}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Uzito</span>
                    <h4>{nikah && nikah.weight}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Urefu</span>
                    <h4>{nikah && nikah.height}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Umbile</span>
                    <h4>{nikah && nikah.body}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kundi la Damu</span>
                    <h4>{nikah && nikah.blood}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ndoa</span>
                    <h4>{nikah && nikah.status}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Watoto</span>
                    <h4>{nikah && nikah.child}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ajira</span>
                    <h4>{nikah && nikah.emmployement}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anapokaa</span>
                    <h4>{nikah && nikah.live}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Ujuzi</span>
                    <h4>{nikah && nikah.occupation}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Asili</span>
                    <h4>{nikah && nikah.Ethnicity}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Dhehebu</span>
                    <h4>{nikah && nikah.religion_set}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Muislamu kwa</span>
                    <h4>{nikah && nikah.islam_by}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Ukewenza</span>
                    <h4>{nikah && nikah.gender}</h4>
                </div>
            </div>
        </div>
        
        

      
    </div>
  )
}

export default NikahView
