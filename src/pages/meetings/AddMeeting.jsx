import React from 'react'
import {  meetings } from '../../data'
import {  BsArrowLeft } from "react-icons/bs";
import { motion } from 'framer-motion';

const AddMeeting = ({setAdd}) => {
  return (
    <motion.div 
             initial={{ x:'100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }}  
        className='add_meeting'>
         <div className="top_meeting_wrapper">
            <div className="meeting_top">            
                <button onClick={() => setAdd(null)} className='btn'><BsArrowLeft/></button>
                <h4>Anzisha Mkutano</h4> 
            </div>
            {/* <div className="create_new" onClick={() =>setAdd(!add)}>
                Create a Meeting
            </div>        */}
        </div>
        <div className="items_group">
            <h3 className='item_title'>Jina la Mkutano</h3>
            <div className="sel_items">
                <input 
                    type="text" 
                    placeholder='Jina la Mkutano'
                    className='sel_input'
                    name='username'
                    /> 
            </div>       
        </div>
        <div className="items_group">
            <h3 className='item_title'>Maelezo kuhusu Mkutano</h3>                   
            <textarea  name='revert' placeholder='Maelezo kuhusu Mkutano' className='sel_textarea'/>                  
        </div>
        <div className="items_group">
            <h3 className='item_title'>Weka Washiriki</h3>
            <div className="sel_items">
                <select name='tribe'  className='sel_input'>                                    
                    {meetings.map((item, index) => (
                        <option value={item.name} key={index}>
                            <input type="checkbox" />
                            {item.name}
                        </option> 
                    ))}
                                
                </select>                          
            </div>
                    
        </div>
        <div className="items_group">
            <h3 className='item_title'>Muda wa Kuanza Mkutano</h3>
            <div className="sel_items">
                <input 
                    type="time" 
                    placeholder='Jina la Mkutano'
                    className='sel_input'
                    name='username'
                    /> 
            </div>       
        </div>
        <div className="items_group">
            <button className='btn_reg'>ANZISHA MKUTANO</button>
        </div>
    </motion.div>
  )
}

export default AddMeeting
