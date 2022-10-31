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
import { useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import NewChat from '../messages/NewChat';


const Nikah = () => {
    const navigate = useNavigate();
    const [donate, setDonate] = useState(false)
    const { user } = useAuth()
    const { marriages, users } = useData() 

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(m => m.userId === user.uid)
    const isMarry = user.uid === marry?.userId

    console.log('cuUser', cuUser)

  return (

    <div className='nikah'>       
        <div className="health_top">
            <div className="health_t_1">
                <h1>Ukumbi wa Nikah</h1>
                <span className='health_p'>Unatafuta mke au mume au mchumba, kuna wanaWema humu wanatafuta wenza wao, kwa uwezo wa Allah ukumbi utakupatia unayemtafuta.
                </span>
                {!isMarry && <>
                    <span className='health_p'>Kwa ajili ya kutunza stara za wanaWema, ukumbi huu umefanywa mahususi kwa 
                    ajili ya wanaotafuta Nikah, ili uwe miongoni bonyeza endelea</span>
                    <button className='btn_sign' onClick={() =>navigate('/nikahreg')}>ENDELEA</button>  
                 </>} 
            </div>
            <div className="health_logo">
                <GiLovers/>
            </div>
        </div>
        <div className="nikah_search">
           <Search title='Andika kutafuta Mwenza'/> 
        </div>     
        <div className={isMarry? 'nikah_donated' : "nikah_grid"}>            
            {marriages && marriages.filter(m =>m.gender !== cuUser?.gender).map((item, index) => (
                <div className="nikah_card" key={index}>
                    <div className="nikah_img">
                        <img src={item?.photo} alt="" />
                    </div>
                    <div className="nikah_main_info">
                        <div className="nikah_info">
                            <h4>{item?.username}, {item?.age}</h4>
                            <div className="nikah_loc">
                                <span>{item?.tribe} -</span>
                                <span> {item?.location}</span>
                            </div>
                        </div>                       
                        <div className="meetings_actions">                    
                            <button className='btn_btn'><FcLike/></button>
                            <button onClick={() =>navigate(`/nikah/${item.id}`)} className='btn_btn'><BsFillPersonFill/></button>
                            <NewChat item={item}/>       
                        </div>
                    </div>
                </div>
            ))}
        </div>
        {/* {donate &&
        <Donate setDonate={setDonate}/>} */}
        
    </div>
  
  
  )
}

export default Nikah
