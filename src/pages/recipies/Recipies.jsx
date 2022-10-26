import React from 'react'
import './recipies.css'
import rec1 from '../../assets/images/recipies/rec1.jfif'
import rec2 from '../../assets/images/recipies/rec2.jfif'
import rec3 from '../../assets/images/recipies/rec3.jfif'
import rec4 from '../../assets/images/recipies/rec4.jfif'
import rec5 from '../../assets/images/recipies/rec5.jfif'
import rec6 from '../../assets/images/recipies/rec6.jfif'
import Remarks from '../../components/remarks/Remarks'
import { GiCook } from "react-icons/gi";
import Search from '../../components/search/Search'
import { categories, recipies } from '../../data'
import { useNavigate } from 'react-router-dom'


const Recipies = () => {
    const navigate = useNavigate()
  return (
    <div className='recipies'>
        <div className="health_top">
            <div className="health_t_1">
                <h1>Kona ya Mapishi</h1>
                <span className='health_p'>Jielemishe juu ya mapishi mbalimbali, uliza swali, na unaweza ukaomba mada ya pishi unalotaka
                na mtaalamu wetu ataliwakilisha.
                </span>
                <button className='btn_sign' >Omba Maelezo ya Mapishi</button>
            </div>
            <div className="health_logo">
                <GiCook/>
            </div>
        </div>
        <div className="nikah_search">
           <Search title='Tafuta Mapishi'/> 
        </div>
        <div className="recipies_cat">
            {categories?.map(c => (
               <span key={c} className='cat_recipies'>{c}</span> 
            ))}
            
        </div>
        <div className="recipies_wrapper">       
            {recipies?.map(r => (            
            <div className="recipies_card" onClick={() =>navigate(`/recipies/${r.id}`)} key={r.id}>
                <img src={process.env.PUBLIC_URL+`/${r.photo}`} /> 
                <div className="rec_details">             
                    <span>{r.category}</span>
                    <h3 className='card_name'>{r.name}</h3>
                    <div className="recipies_actions">
                        <Remarks/>
                    </div>
                </div> 
            </div>
            ))}
        </div>
      
    </div>
  )
}

export default Recipies
