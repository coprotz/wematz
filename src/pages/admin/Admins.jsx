import React, { useState } from 'react'
import useData from '../../hooks/useData';
import {  BsArrowLeft } from "react-icons/bs";
import moment from 'moment';
import Loading from '../../components/loading/Loading';
import { deleteDoc, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../hooks/useAuth';
import Search from '../../components/search/Search';

const Admins = ({setPage}) => {
    const { users } = useData()
    const [add, setAdd] = useState(null)
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(null)
    const [active, setActive] = useState(null)


    const handleAdmin = async() => {
        setLoading(true)
        try {
            await updateDoc(doc(db, 'users', `${id}`), {
                isAdmin: true
            })
            setLoading(false)
            setAdd(false)
        } catch (error) {
            console.log(error.message)
        }
        
    }

  
  return (
    <div className="admin_container"> 
    <div className='admin_wrapper'>
        <div className="top_wrapper">
            <div className="dash_top">            
                <button onClick={() => setPage(1)} className='btn_btn'><BsArrowLeft/></button>
                <h4 className='title'>Admins</h4> 
            </div> 
            <button className='btn_sign' onClick={() =>setAdd(!add)}>Add Admin</button>  
        </div>
      
        <table className='table'>
        <thead>
            <th className='descr'>SN</th>
            <th className='qty'>Jina</th>
            <th className='qty'>Barua Pepe</th>           
            <th className='total'>Hatua</th>
        </thead>
        <tbody className='total'>
        {users?.filter(u =>u.isAdmin == true).map((m, index) => (
            <tr key={m.id}>
                <td data-label='SN'>{index+1}</td>     
                <td data-label='Jina'>{m.name}</td>
                <td data-label='Umri' className='tab_column'>{m.email}</td>                                 
                <td data-label='Hatua' className='action_btn'>                              
                    <button style={{backgroundColor: 'transparent', color: 'red'}} 
                        onClick={() =>updateDoc(doc(db, 'users', `${m.id}`), {isAdmin: false})}
                    >MUONDOE</button>
                </td>          
            
            </tr>
        ))}
    
        </tbody>
    </table> 
    
    </div> 
     {add &&
        <div className="add_admin">
          <div className="add_admin_top">
            <h3 className="title">Add Admin</h3>
            <button onClick={() =>setAdd(null)}>Close</button>
          </div>
          <div className="add_input">
              <select     
                className='sel_input3'
                value={id}
                onChange={(e) => setId(e.target.value)}
                >
                    <option value="">--select User--</option>
                    {users.filter(u => u.isAdmin !=true).map(u => (
                         <option 
                            value={u.id} 
                            key={u.id}                            
                            onChange={(e) =>setId(e.target.value)}
                        >{u.fname+" "+u.lname+"-"+u.email}</option>
                    ))}
                   
                </select>
              <button className='btn_reg' onClick={handleAdmin}>{loading? <Loading/> : 'Add Admin'}</button>
          </div>
          <div></div>
          
        </div>}
    </div>
  )
}

export default Admins
