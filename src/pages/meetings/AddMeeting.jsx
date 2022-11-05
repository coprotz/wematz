import React from 'react'
import {  meetings } from '../../data'
import {  BsArrowLeft } from "react-icons/bs";
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';


const AddMeeting = ({setAdd}) => {
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});
  return (
    <motion.div 
             initial={{ x:'100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }}  
        className='add_meeting'>
         <div className="top_meeting_wrapper">
            <div className="meeting_top">            
                <button onClick={() => setAdd(null)} className='btn_btn'><BsArrowLeft/></button>
                <h4>Anzisha Mdahalo</h4> 
            </div>
            {/* <div className="create_new" onClick={() =>setAdd(!add)}>
                Create a Meeting
            </div>        */}
        </div>
        <div className="items_group">
            <h3 className='item_title'>Jina la Mdahalo</h3>
            <div className="sel_items">
                <input 
                    type="text" 
                    placeholder='Jina la Mdahalo'
                    className='sel_input'
                    style={{width:'100%'}}
                    name='title'
                    /> 
            </div>       
        </div>
        {/* <div className="items_group">
            <h3 className='item_title'>Maelezo kuhusu Mkutano</h3>                   
            <textarea  
                name='revert' 
                placeholder='Maelezo kuhusu Mkutano' 
                className='sel_textarea'
                />                  
        </div> */}
        <div className="items_group">
            <h3 className='item_title'>Weka Washiriki</h3>
            <div className="selection_btns">
                <div className="sel_item">
                    <input type="radio" id='1001' value='Mnene' name='body' {...register("body", { required: true })}/>
                    <label htmlFor="1001">WOTE</label>
                </div>
                <div className="sel_item">
                    <input type="radio" id='1011' value='Mwembamba' name='body' {...register("body", { required: true })}/>
                    <label htmlFor="1011">WAMAMA</label>
                </div>
                <div className="sel_item">
                    <input type="radio" id='1012' value='Mwenye misuli' name='body' {...register("body", { required: true })}/>
                    <label htmlFor="1012">WABABA</label>
                </div>
                <div className="sel_item">
                    <input type="radio" id='101211' value='Mwenye misuli' name='body' {...register("body", { required: true })}/>
                    <label htmlFor="101211">VIJANA</label>
                </div>
                        
                        
            </div>
                    
        </div>
        <div className="items_group">
            <h3 className='item_title'>Tarehe ya Mdahalo</h3>
            <div className="sel_items">
                <input 
                    type="date" 
                    placeholder='Jina la Mkutano'
                    className='sel_input'
                    name='date'
                    style={{width:'100%'}}
                    /> 
            </div>       
        </div>
        <div className="items_group">
            <h3 className='item_title'>Muda wa Mdahalo</h3>
            <div className="sel_items">
                <input 
                    type="time" 
                    placeholder='Jina la Mkutano'
                    className='sel_input'
                    name='time'
                    style={{width:'100%'}}
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
