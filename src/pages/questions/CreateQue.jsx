import React from 'react'
import {  HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const CreateQue = () => {
    const navigate = useNavigate()
  return (
    <div className='create_que'>
        <div className="view_que_back">
            <button onClick={() =>navigate(-1)} className='btn_back'><HiOutlineArrowLeft/>Rudi Nyuma</button>
        </div>
       <div className="items_group que_cat">
            <h3 className='item_title'>Kategoria ya Swali</h3>
            <div className="selection_btns">
                <div className="sel_items">
                    <select name='weight'  className='sel_input que_cat'>
                        <option value='' >Chagua Kategori ya Swali</option>                      
                        <option value='Fiqh'>Fiqh</option> 
                        <option value='Quran'>Quran</option> 
                        <option value='Sunnah na Hadith'>Sunnah na Hadith</option> 
                        <option value='Terekh'>Tarekh</option> 
                    </select>                          
                </div>
            </div>                    
        </div>
        <div className="items_group">
            <h3 className='item_title'>Uliza Swali</h3>  
            <div className="sel_items">
                <textarea  name='desc' placeholder='Andika Swali' className='sel_textarea'/> 
            </div>                 
        </div>

        <div className="items_group">
            <button className='btn_reg' >TUMA SWALI</button>
        </div>
    </div>
  )
}

export default CreateQue
