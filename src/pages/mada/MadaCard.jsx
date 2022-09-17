import React from 'react'
import img9 from '../../assets/images/img9.jpg'
import Remarks from '../../components/remarks/Remarks'
import './madas.css'

const MadaCard = () => {
  return (
    <div className='mada_card'>
        <div className="mada_time">
            <small>Sat 12 June 22</small>
            <small>5 Rajab 1444</small>
        </div>
        <h3 className='mada_title'>Mapinduzi ya Viwanga na Uislam nchini na nini tinajifunza</h3>
        <div className="mada_details">
            <div className="author_info">
                <div className="author_wrapper">
                    <div className="author_photo">
                        <img src={img9} alt="" />
                    </div>
                    <h5>Shukuru Comrade</h5>
                </div>
                                   
                
            </div>
            <Remarks/>
        </div>
    </div>
  )
}

export default MadaCard