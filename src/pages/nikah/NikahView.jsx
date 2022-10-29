import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { nikahs } from '../../data';
import {  BsFillChatLeftTextFill,BsArrowLeft } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import useData from '../../hooks/useData';


const NikahView = () => {
    const { id } = useParams()
    const { marriages } = useData()
    const nikah = marriages.find(n => n.id === id)
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
                <img src={nikah && nikah.photo} alt="" />
                <div className="nikah_view_action">
                    <button className='btn_like'><FcLike/></button>
                    <button className='btn_like btn_chat'><BsFillChatLeftTextFill/></button>
                </div>
            </div>
            <div className="nikah_view_right">
                <h1>{nikah && nikah.username}</h1>
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
                    <h4>{nikah && nikah.liveWith}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Juu</span>
                    <h4>{nikah && nikah.edu}</h4>
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
                    <h4>{nikah && nikah.marital}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Watoto</span>
                    <h4>{nikah && nikah.child}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ajira</span>
                    <h4>{nikah && nikah.employ}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anapokaa</span>
                    <h4>{nikah && nikah.location}</h4>
                </div>
                {/* <div className="nikah_right_item">
                    <span>Ujuzi</span>
                    <h4>{nikah && nikah.occupation}</h4>
                </div> */}
                {/* <div className="nikah_right_item">
                    <span>Asili</span>
                    <h4>{nikah && nikah.Ethnicity}</h4>
                </div> */}
                <div className="nikah_right_item">
                    <span>Dhehebu</span>
                    <h4>{nikah && nikah.set}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Muislamu kwa</span>
                    <h4>{nikah && nikah.islam}</h4>
                </div>
                {/* <div className="nikah_right_item">
                    <span>Ukewenza</span>
                    <h4>{nikah && nikah.gender}</h4>
                </div> */}
            </div>
            <div className="nikah_view_right">
                <h1>Sifa za Mwenza</h1>
                <div className="nikah_right_item">
                    <span>Umri</span>
                    <h4>{nikah && nikah.page}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kabila</span>
                    <h4>{nikah && nikah.ptribe}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anaishi na</span>
                    <h4>{nikah && nikah.plive}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Juu</span>
                    <h4>{nikah && nikah.pedu}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Quran</span>
                    <h4>{nikah && nikah.pquran}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kuswali</span>
                    <h4>{nikah && nikah.prayer}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Uzito</span>
                    <h4>{nikah && nikah.pweight}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Urefu</span>
                    <h4>{nikah && nikah.pheight}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Umbile</span>
                    <h4>{nikah && nikah.pbody}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kundi la Damu</span>
                    <h4>{nikah && nikah.pblood}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ndoa</span>
                    <h4>{nikah && nikah.pmarital}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Watoto</span>
                    <h4>{nikah && nikah.pchild}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ajira</span>
                    <h4>{nikah && nikah.pemploy}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anapokaa</span>
                    <h4>{nikah && nikah.plocation}</h4>
                </div>
                {/* <div className="nikah_right_item">
                    <span>Ujuzi</span>
                    <h4>{nikah && nikah.occupation}</h4>
                </div> */}
                {/* <div className="nikah_right_item">
                    <span>Asili</span>
                    <h4>{nikah && nikah.Ethnicity}</h4>
                </div> */}
                <div className="nikah_right_item">
                    <span>Dhehebu</span>
                    <h4>{nikah && nikah.pset}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Muislamu kwa</span>
                    <h4>{nikah && nikah.pislam}</h4>
                </div>
                {/* <div className="nikah_right_item">
                    <span>Ukewenza</span>
                    <h4>{nikah && nikah.gender}</h4>
                </div> */}
            </div>
        </div>
        
        

      
    </div>
  )
}

export default NikahView
