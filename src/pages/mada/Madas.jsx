import React from 'react'
import './madas.css'
import { useNavigate } from 'react-router-dom'
import Remarks from '../../components/remarks/Remarks';
import Search from '../../components/search/Search'
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import moment from 'moment';

const Madas = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { users, madas } = useData()
    const cuUser = users.find(u => u.id === user.uid)
  return (
    <div className='madas'>            
        <div className="top_madas_wrapper">
          
        </div>
        <motion.div 
             initial={{ y:'100vw'}}
             animate={{y:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }}  
            className="madas_body">
            <div className="mada_left"> 
                <Search title='Tafuta Mada'/> 
                {madas.map(m => (
                   <div className="mada_left_card" key={m.id}>
                        <small>{moment(m.createdAt?.seconds * 1000).format('MMM Do YY, LT') }</small>
                        <h1>{m.title}</h1>
                        <div className="mada_action">                            
                            <Remarks p={m}/>
                        </div>
                        <div>
                           <button className='btn_reg' onClick={() => navigate(`/madas/${m.id}`)}>Soma Mada</button> 
                        </div>
                        
                    </div> 
                ))}           
            </div>
            
        </motion.div>
       
    </div>
  )
}

export default Madas
