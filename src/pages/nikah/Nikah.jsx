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
import { db, useAuth } from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import NewChat from '../messages/NewChat';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Likes from '../../components/reactions/Likes';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import NewDonate from '../donates/NewDonate';
import moment from 'moment';
import Loading from '../../components/loading/Loading';



const Nikah = () => {
    const navigate = useNavigate();
    const [donate, setDonate] = useState(false)
    const [open, setOpen] = useState(null)
    const { user } = useAuth()
    const { marriages, users, views, donates } = useData() 
    const [loading, setLoading] = useState(null)
    const [active, setActive] = useState(null)

    const mujaheed = donates?.find(d => d?.user_id === user.uid)   
    const a = new Date().getTime()
    const today = moment(a).format('MMM Do YY, LT')
    const expire = moment(mujaheed?.expiredAt).format('MMM Do YY, LT')
    const valid = expire > today

    // const otherVal = otherExp > a

    const cuUser = users?.find(u => u.id === user.uid)
    const marry = marriages?.find(m => m.userId === user.uid)
    const isMarry = user.uid === marry?.userId
    
    

    console.log('valid', valid)
    // console.log('otherVal', otherVal)

    const myid = marriages.find(m => m.userId === user.uid)
    

    const viewRef = collection(db, 'views')
 

    const handleView = async(e, id) => {
        e.preventDefault()

        setLoading(true)

        const vws = views.filter(v => v.target_id === id)
        const isView = vws.find(v => v.user_id === myid?.id)

        const data = {
            target_id : id,
            user_id: marry.id,
            viewedAt : serverTimestamp()
        }

        try {
            if(!isView){
                await addDoc(viewRef, data)
                navigate(`/nikah/${id}`)
            }else{
                await updateDoc(doc(db, 'views', `${isView.id}`), {
                    viewedAt: serverTimestamp()
                })
                navigate(`/nikah/${id}`)
            }
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }

        
    }

    const handelNew = (item) => {
       if(valid){           
            setOpen(item)
        }else{
            setDonate(item)
        }
    }

  return (

    <div className='nikah'> 
    {donate && <NewDonate setDonate={setDonate} item={donate}/>}
    {open && <NewChat setOpen={setOpen} myId={marry.id} item={open}/>}      
        <div className="health_top">
           
            <div className="health_t_1">
                <div className="heading_top">                
                    <div className="view_que_back">
                        <button onClick={() =>navigate(-1)} className='btn_btn'><HiOutlineArrowLeft/></button>
                    </div>
                    <h3 className='title'>Ukumbi wa Nikah</h3>
                    {/* <h1>Ukumbi wa Nikah</h1> */}
                </div>
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
                            <button className='btn_btn'><Likes p={item} myId={myid?.id}/></button>
                            <button onClick={(e) =>{handleView(e,item.id);setActive(item.id)}} className='btn_btn'>{loading && active === item.id? <Loading/> : <BsFillPersonFill/>}</button>
                            <button className='btn_btn' onClick={() =>handelNew(item)}><BsChatLeftDotsFill/></button>
                            {/* <NewChat item={item} myId={myid?.id} setDonate={setDonate}/>        */}
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
