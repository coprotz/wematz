import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { nikahs } from '../../data';
import {  BsFillChatLeftTextFill,BsArrowLeft, BsCamera } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import useData from '../../hooks/useData';
import useStorage from '../../hooks/useStorage';
import { useState } from 'react';
import { db, useAuth } from '../../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import Alert from '../../components/alert/Alert';
import { motion } from 'framer-motion';
import NewChat from '../messages/NewChat';




const NikahView = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const { marriages } = useData()
    const nikah = marriages.find(n => n.id === id)
    const navigate = useNavigate()

    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [alert, setAlert] = useState('')
    const [loading, setLoading] = useState(false)
    const { perc, url } = useStorage(file)

    const marry = marriages?.find(m => m.id === id)
    
    const isOwn = marry?.userId === user.uid

    console.log('isOwn', user.uid)

    console.log('id', marry?.userId)

    console.log('marry', marry)

    const types = ['image/png', 'image/jpeg']

    const handleSelect = (e) => {
        let selected = e.target.files[0];  
        if (selected && types.includes(selected.type)){
            setFile(selected)
            setError('')
        }else {
            setFile(null)
            setError('Please select an image file (png or jpeg)')
        }
    }

    const MarryRef = doc(db, 'marriages', `${id}`)

    const handlePic = async(e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await updateDoc(MarryRef, {
                photo: url
            })
            setFile(null)
            setAlert('Picha Imebadilishwa vizuri')
            setLoading(false)

            setTimeout(() => {
                setAlert("")
            },3000)
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='nikahview'>
        <motion.div 
            initial={{ x:'100vw'}}
            animate={{x:0}} 
            transition={{ ease: "easeOut", duration: 0.5 }} >
            {alert && <Alert alert={alert}/>}    
        </motion.div>
        
        <div className="nikah_View_top">
            <button onClick={() => navigate(-1)} className='btn_btn'><BsArrowLeft/></button>
            <h3>{nikah && nikah.name}</h3>
        </div>
        <div className="nikah_view_bottom">
            <div className="nikah_view_left">
            { file?  
                <div>
                    <img src={URL.createObjectURL(file)} alt="" />  
                </div>                      
                : 
                <div>
                    <img src={nikah && nikah.photo} alt="" />  
                    {isOwn &&                                           
                    <label htmlFor="photo" className='user_picture'>
                        <input 
                            type="file" 
                            name='photo' 
                            id="photo" style={{display: 'none'}}
                            onChange={handleSelect}
                        />
                        <span><BsCamera/></span>
                    </label>}
                </div> 
            }
                {!isOwn &&
                <div className="nikah_view_action">
                    <button className='btn_like'><FcLike/></button>
                    <NewChat item={nikah}/>   
                </div>}
            </div>
            {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}                                     
                {file && <>                                       
                {/* <div className="progress-bar"  style={{width: perc + '%'}}></div>   */}
                <div className="profile_photo_edit">  
                    <button 
                        className='btn_sign' 
                        onClick={handlePic}
                        disabled={!url}
                        >{loading? 'Inatuma' : 'HIFADHI'}</button>                          
                    <button className='btn_cancel' onClick={() =>setFile(null)}>ONDOA</button>
                </div>
                </>
                    
            } 
            <div className="nikah_view_dec">
                <h4>{nikah?.desc}</h4>
            </div>
            <div className="nikah_view_right">
                <h1>{nikah && nikah.username}</h1>
                <div className="nikah_right_item">
                    <span>Umri</span>
                    <h4>{nikah && nikah.age}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kabila</span>
                    <h4>{nikah && nikah.tribe}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anaishi na</span>
                    <h4>{nikah && nikah.liveWith}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Juu</span>
                    <h4>{nikah && nikah.edu}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Quran</span>
                    <h4>{nikah && nikah.quran}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kuswali</span>
                    <h4>{nikah && nikah.prayer}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Uzito</span>
                    <h4>{nikah && nikah.weight}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Urefu</span>
                    <h4>{nikah && nikah.height}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Umbile</span>
                    <h4>{nikah && nikah.body}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kundi la Damu</span>
                    <h4>{nikah && nikah.blood}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ndoa</span>
                    <h4>{nikah && nikah.marital}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Watoto</span>
                    <h4>{nikah && nikah.child}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ajira</span>
                    <h4>{nikah && nikah.employ}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anapokaa</span>
                    <h4>{nikah && nikah.location}</h4>
                </div>
                {/* <div className="nikah_right_item">
                    <span>Ujuzi</span>
                    <h4>{nikah && nikah.occupation}</h4>
                </div> */}
                {/* <div className="nikah_right_item">
                    <span>Asili</span>
                    <h4>{nikah && nikah.Ethnicity}</h4>
                </div> */}
                <div className="nikah_right_item">
                    <span>Dhehebu</span>
                    <h4>{nikah && nikah.set}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Muislamu kwa</span>
                    <h4>{nikah && nikah.islam}</h4>
                </div>
                {/* <div className="nikah_right_item">
                    <span>Ukewenza</span>
                    <h4>{nikah && nikah.gender}</h4>
                </div> */}
            </div>
            <div className="nikah_view_dec">
                <h4>{nikah?.pdesc}</h4>
            </div>
            <div className="nikah_view_right">
                <h1>Sifa za Mwenza</h1>
                <div className="nikah_right_item">
                    <span>Umri</span>
                    <h4>{nikah && nikah.page}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kabila</span>
                    <h4>{nikah && nikah.ptribe}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anaishi na</span>
                    <h4>{nikah && nikah.plive}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Juu</span>
                    <h4>{nikah && nikah.pedu}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Elimu ya Quran</span>
                    <h4>{nikah && nikah.pquran}</h4>
                </div>
                {/* <div className="nikah_right_item">
                    <span>Kuswali</span>
                    <h4>{nikah && nikah.prayer}</h4>
                </div> */}
                <div className="nikah_right_item">
                    <span>Uzito</span>
                    <h4>{nikah && nikah.pweight}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Urefu</span>
                    <h4>{nikah && nikah.pheight}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Umbile</span>
                    <h4>{nikah && nikah.pbody}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Kundi la Damu</span>
                    <h4>{nikah && nikah.pblood}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ndoa</span>
                    <h4>{nikah && nikah.pmarital}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Watoto</span>
                    <h4>{nikah && nikah.pchild}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Hali ya Ajira</span>
                    <h4>{nikah && nikah.pemploy}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Anapokaa</span>
                    <h4>{nikah && nikah.plocation}</h4>
                </div>
                {/* <div className="nikah_right_item">
                    <span>Ujuzi</span>
                    <h4>{nikah && nikah.occupation}</h4>
                </div> */}
                {/* <div className="nikah_right_item">
                    <span>Asili</span>
                    <h4>{nikah && nikah.Ethnicity}</h4>
                </div> */}
                <div className="nikah_right_item">
                    <span>Dhehebu</span>
                    <h4>{nikah && nikah.pset}</h4>
                </div>
                <div className="nikah_right_item">
                    <span>Muislamu kwa</span>
                    <h4>{nikah && nikah.pislam}</h4>
                </div>
                {/* <div className="nikah_right_item">
                    <span>Ukewenza</span>
                    <h4>{nikah && nikah.gender}</h4>
                </div> */}
            </div>
        </div>
        
        

      
    </div>
  )
}

export default NikahView
