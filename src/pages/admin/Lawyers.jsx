import React, { useState } from 'react'
import useData from '../../hooks/useData';
import {  BsArrowLeft } from "react-icons/bs";
import moment from 'moment';
import Loading from '../../components/loading/Loading';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../hooks/useAuth';
import Search from '../../components/search/Search';


const Lawyers = ({setPage}) => {
    const { lawyers } = useData()
    const [loading, setLoading] = useState(null)
    const [active, setActive] = useState(null)

    const confirmLaw = async (id) => {
    
        const dr = lawyers.find(d => d.id === id)
        try {
          setLoading(true)
          if(dr.status === 'Hajathibitishwa'){
            await updateDoc(doc(db, 'lawyers', `${id}`), {
              status: 'Amethibitishwa'
            })
          }else{
            await updateDoc(doc(db, 'lawyers', `${id}`), {
              status: 'Hajathibitishwa'
            })
          }
          setLoading(null)
          
        } catch (error) {
          console.log(error.message)
        }
      }
  return (
    <div className='admin_wrapper'>
        <div className="top_wrapper">
            <div className="dash_top">            
                <button onClick={() => setPage(1)} className='btn_btn'><BsArrowLeft/></button>
                <h4 className='title'>Wanasheria</h4> 
            </div> 
            <Search title='Tafuta Mwanasheria'/>   
        </div>
      
        <table className='table'>
        <thead>
        <th className='descr'>SN</th>
        <th className='qty'>Jina la Daktari</th>
        <th className='total'>Jinsia</th>
        <th className='total'>Ofisi</th>       
        <th className='total'>Anapatikana</th>    
        <th className='total'>Amejiunga</th>    
        <th className='total'>Hali</th>      
        <th className='total'>Hatua</th>
        </thead>
        <tbody className='total'>
        {lawyers.map((m, index) => (
            <tr>
                <td data-label='SN'>{index+1}</td>     
                <td data-label='Jina'>{m.name}</td>
                <td data-label='Jinsia' className='tab_column'>{m.gender}</td>
                <td data-label='Hopsitali' className='tab_column'>{m.office}</td>              
                <td data-label='Anapatikana' className='tab_column'>{m.location}</td>            
                <td data-label='Amejiunga' className='tab_column'>{moment(m.createdAt.seconds * 1000).format('DD-M-YYYY') }</td>
                <td data-label='Hali' className={m.status === 'Amethibitishwa'? 'green' : 'red'}>{m.status}</td>             
                <td data-label='Hatua' className='action_btn'>
                <button onClick={() =>{confirmLaw(m.id);setActive(m.id)}}>{loading && m.id ===active ? <Loading/> : m.status === 'Amethibitishwa'? 'Mkatae' : 'Mthibitishe'}</button>                  
                <button style={{backgroundColor: 'transparent', color: 'red'}}>ONDOA</button>
                </td>          
            
            </tr>
        ))}
    
        </tbody>
    </table> 
    
    </div> 
  )
}
export default Lawyers
