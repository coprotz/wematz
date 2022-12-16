import React, { useState } from 'react'
import useData from '../../hooks/useData';
import {  BsArrowLeft } from "react-icons/bs";
import moment from 'moment';
import Loading from '../../components/loading/Loading';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../hooks/useAuth';
import Search from '../../components/search/Search';

const Nikah = ({setPage}) => {
    const { marriages } = useData()
    const [loading, setLoading] = useState(null)
    const [active, setActive] = useState(null)

  
  return (
    <div className='admin_wrapper'>
        <div className="top_wrapper">
            <div className="dash_top">            
                <button onClick={() => setPage(1)} className='btn_btn'><BsArrowLeft/></button>
                <h4 className='title'>Watafuta Nikah</h4> 
            </div>         
            <Search title='Tafuta Nikah'/>            
        </div>
       
        <table className='table'>
            <thead>
                <th className='descr'>SN</th>
                <th className='qty'>Jina</th>
                <th className='qty'>Umri</th>
                <th className='total'>Jinsia</th> 
                <th className='total'>Elimu</th> 
                <th className='total'>Ajira</th>  
                <th className='total'>Dhehebu</th>       
                <th className='total'>Anapatikana</th>    
                <th className='total'>Amejiunga</th>    
                {/* <th className='total'>Hali</th>       */}
                <th className='total'>Hatua</th>
            </thead>
            <tbody className='total'>
            {marriages.map((m, index) => (
                <tr>
                    <td data-label='SN'>{index+1}</td>     
                    <td data-label='Jina'>{m.username}</td>
                    <td data-label='Umri' className='tab_column'>{m.age}</td>  
                    <td data-label='Jinsia' className='tab_column'>{m.gender}</td>  
                    <td data-label='Elimu' className='tab_column'>{m.edu}</td>  
                    <td data-label='Ajira' className='tab_column'>{m.employ}</td>  
                    <td data-label='Ajira' className='tab_column'>{m.set}</td>                         
                    <td data-label='Anapatikana' className='tab_column'>{m.location}</td>            
                    <td data-label='Amejiunga' className='tab_column'>{moment(m.createdAt.seconds * 1000).format('DD-M-YYYY') }</td>
                    {/* <td data-label='Hali' className={m.status === 'Mjaheed'? 'green' : 'red'}>{m.status? m.status : 'Bure'}</td>              */}
                    <td data-label='Hatua' className='action_btn'>                              
                        <button style={{backgroundColor: 'transparent', color: 'red'}} 
                        onClick={() =>deleteDoc(doc(db, 'marriages', `${m.id}`))}
                        >ONDOA</button>
                    </td>          
                
                </tr>
            ))}
        
            </tbody>
        </table> 
    
    </div> 
  )
}

export default Nikah
