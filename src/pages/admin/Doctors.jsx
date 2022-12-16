import React, { useState } from 'react'
import useData from '../../hooks/useData';
import {  BsArrowLeft } from "react-icons/bs";
import moment from 'moment';
import Loading from '../../components/loading/Loading';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../hooks/useAuth';
import Search from '../../components/search/Search';
import ViewProfile from './ViewProfile';




const Doctors = ({ setPage}) => {
    const { doctors } = useData()
    const [loading, setLoading] = useState(null)
    const [active, setActive] = useState(null)
    const [view, setView] = useState(null)

    const confirmDoc = async (id) => {
    
        const dr = doctors.find(d => d.id === id)
        try {
          setLoading(true)
          if(dr.status === 'Hajathibitishwa'){
            await updateDoc(doc(db, 'doctors', `${id}`), {
              status: 'Amethibitishwa'
            })
          }else{
            await updateDoc(doc(db, 'doctors', `${id}`), {
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
        {view && <ViewProfile setView={setView} view={view}/>}
        <div className="top_wrapper">
            <div className="dash_top">            
                <button onClick={() => setPage(1)} className='btn_btn'><BsArrowLeft/></button>
                <h4 className='title'>Doctors</h4> 
            </div> 
            <Search title='Tafuta Daktari'/>   
        </div>
       
        <table className='table'>
          <thead>
            <th className='descr'>SN</th>
            <th className='qty'>Jina la Daktari</th>
            <th className='total'>Jinsia</th>
            <th className='total'>Hospitali</th>
            <th className='total'>Clinic</th>  
            <th className='total'>Anapatikana</th> 
            <th className='total'>Utalaam</th> 
            <th className='total'>Amejiunga</th>    
            <th className='total'>Hali</th>      
            <th className='total'>Hatua</th>
          </thead>
          <tbody className='total'>
          {doctors.map((m, index) => (
              <tr key={m.id}>
                  <td data-label='SN'>{index+1}</td>     
                  <td data-label='Jina' onClick={() =>setView(m)} className='view_name'>{m.name}</td>
                  <td data-label='Jinsia' className='tab_column'>{m.gender}</td>
                  <td data-label='Hopsitali' className='tab_column'>{m.hospital}</td>
                  <td data-label='Clinic' className='tab_column'>{m.clinic}</td>
                  <td data-label='Anapatikana' className='tab_column'>{m.location}</td>
                  <td data-label='Utalaam' className='tab_column'>{m.specialize}</td>
                  <td data-label='Amejiunga' className='tab_column'>{moment(m.createdAt.seconds * 1000).format('DD-M-YYYY') }</td>
                  <td data-label='Hali' className={m.status === 'Amethibitishwa'? 'green' : 'red'}>{m.status}</td>             
                  <td data-label='Hatua' className='action_btn'>
                  <button onClick={() =>{confirmDoc(m.id);setActive(m.id)}}>{loading && m.id ===active ? <Loading/> : m.status === 'Amethibitishwa'? 'Mkatae' : 'Mthibitishe'}</button>                  
                  <button style={{backgroundColor: 'transparent', color: 'red'}}>ONDOA</button>
                  </td>          
              
              </tr>
          ))}
      
        </tbody>
    </table> 
    
    </div> 
  )
}

export default Doctors
