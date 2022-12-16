import React from 'react'
import { useNavigate } from 'react-router-dom'
import './donates.css'

const NewDonate = ({item, setDonate}) => {
    const navigate = useNavigate()
  return (
    <div className='new_chat_app new_donate' >        
        <div className="pop_new_msg">        
            <div className="pop_new_chat">
                <span>Huwezi tuma meseji kwa <strong>{item?.username || item?.name}</strong> bila kuwa mjaheed</span>
                <div className="group_btns">
                    <button onClick={() => navigate('/mjaheed')} className='btn_sign'>Kuwa Mjaheed</button>
                    <button  className='btn_cancel' onClick={() => setDonate(null)}>BATILISHA</button>
                </div>
            </div>
        </div>
        
        
    </div>
  )
}

export default NewDonate
