import React, { useState } from 'react'
import useData from '../../hooks/useData';
import {  BsArrowLeft } from "react-icons/bs";
import moment from 'moment';
import Loading from '../../components/loading/Loading';
import { deleteDoc, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../hooks/useAuth';
import Search from '../../components/search/Search';

const Mujaheed = ({setPage}) => {
    const { donates, users } = useData()
    // const [loading, setLoading] = useState(null)
    // const [active, setActive] = useState(null)

    // const d = Date(serverTimestamp())
    // const a = Date.now(); // This would be the timestamp you want to format
    // console.log('a', new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(a));
    // console.log('date.now', new Intl.a.getTime())
    // console.log('d', d)

    // const h = new Date().getTime()
    

    // const g = 86400000
    // const f = h + g

    // console.log('f', f)

    // console.log('f', new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(f));
    
    // const v = moment(f).format('MMM Do YY, LT')

    // console.log('v', v)
  
  return (
    <div className='admin_wrapper'>
        <div className="top_wrapper">
            <div className="dash_top">            
                <button onClick={() => setPage(1)} className='btn_btn'><BsArrowLeft/></button>
                <h4 className='title'>Mujaheed</h4> 
            </div> 
            <Search title='Tafuta Mujaheed'/>   
        </div>
      
        <table className='table'>
        <thead>
            <th className='descr'>SN</th>
            <th className='qty'>Jina</th>
            <th className='qty'>Title</th>
            <th className='total'>Amount</th>        
            <th className='total'>Paid Date</th>    
            <th className='total'>Expire</th> 
            <th className='total'>Action</th>    
        </thead>
        <tbody className='total'>
        {donates.map((m, index) => (
            <tr key={m.id}>
                <td data-label='SN'>{index+1}</td>        
                <td data-label='Umri' className='tab_column'>
                    {users.find(u => u.id === m.user_id)?.name}
                </td>  
                <td data-label='Title' className='tab_column'>{m.title}</td>  
                <td data-label='Amount' className='tab_column'>$ {m.amount}</td>                         
                <td data-label='Paid Date' className='tab_column'>{moment(m.createdAt?.seconds * 1000).format('MMM Do YY, LT') }</td>
                <td data-label='Expire' className='tab_column'>{moment(m.expiredAt).format('MMM Do YY, LT')}</td>  
                <td data-label='Hatua' className='action_btn'>                              
                    <button style={{backgroundColor: 'transparent', color: 'red'}} 
                    onClick={() =>deleteDoc(doc(db, 'donates', `${m.id}`))}
                    >ONDOA</button>
                </td>          
                        
            
            </tr>
        ))}
    
        </tbody>
    </table> 
    
    </div> 
  )
}


export default Mujaheed
