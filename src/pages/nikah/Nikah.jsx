import React, {useState} from 'react'
import Search from '../../components/search/Search'
import './nikah.css'
import { useNavigate } from 'react-router-dom'
import {  BsArrowLeft } from "react-icons/bs";
import { nikahs } from '../../data'
import Donate from '../../components/donate/Donate'
import { BsChatLeftDotsFill,BsFillPersonFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { GiLovers } from "react-icons/gi";


const Nikah = () => {
    const navigate = useNavigate();
    const [donate, setDonate] = useState(false)
  return (

    <div className='nikah'>
        <div className="top_meeting_wrapper">
            {/* <div className="meeting_top">            
                <button onClick={() => navigate(-1)} className='btn'><BsArrowLeft/></button>            
                <h4>Ukumbi wa Nikah</h4>
            </div> */}
            {/* <div className="create_new">
                Changia
            </div>        */}
        </div>
        <div className="health_top">
            <div className="health_t_1">
                <h1>Ukumbi wa Nikah</h1>
                <span className='health_p'>Unatafuta mke au mume au mchumba, kuna wanaWema humu wanatafuta wenza wao, kwa uwezo wa Allah ukumbi utakupatia unayemtafuta.
                </span>
                <span className='health_p'>Kwa ajili ya kutunza stara za wanaWema, ukumbi huu umefanywa mahususi kwa ajili ya wanaotafuta Nikah, ili uwe miongoni mwao tafadhari bonyeza link hii</span>
                {/* <button className='btn_sign' >Omba Maelezo ya Mapishi</button> */}
            </div>
            <div className="health_logo">
                <GiLovers/>
            </div>
        </div>
        <div className="nikah_search">
           <Search title='Andika kutafuta Mwenza'/> 
        </div>
        
        {/* <div className="nikah_search">
            <Search/>
        </div> */}
        <div className={donate? "nikah_grid" : 'nikah_donated'}>
            
            {nikahs && nikahs.map((item, index) => (
                <div className="nikah_card" key={index}>
                    <div className="nikah_img">
                        <img src={item.url} alt="" />
                    </div>
                    <div className="nikah_main_info">
                        <div className="nikah_info">
                            <h4>{item.name}, {item.age}</h4>
                            <div className="nikah_loc">
                                <span>{item.tribe} -</span>
                                <span> {item.live}</span>
                            </div>
                        </div>                       
                        <div className="meetings_actions">                    
                            <button className='btn_btn'><FcLike/></button>
                            <button onClick={() =>navigate(`/nikah/${item.id}`)} className='btn_btn'><BsFillPersonFill/></button>
                            <button className='btn_btn'><BsChatLeftDotsFill/></button>          
                        </div>
                    </div>
                </div>
            ))}
        </div>
        {donate &&
        <Donate setDonate={setDonate}/>}
        
    </div>
  
  
  )
}

export default Nikah
