import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { useNavigate, useParams } from 'react-router-dom'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import useStorage from '../../hooks/useStorage'
import Appoints from '../appointments/Appoints'
import { BsCamera } from 'react-icons/bs';
import Loading from '../../components/loading/Loading'
import moment from 'moment';



const ViewMember = () => {
    const { id } = useParams()
    const { users, donates } = useData()
    const navigate = useNavigate()
    const { user } = useAuth()
    const member = users?.find(u => u.id === id)
    const [appoints, setAppoints] = useState(null)
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const types = ['image/png', 'image/jpeg']

    const cuUser = users?.find(u => u.id === user?.uid)   
    const userRef = doc(db, 'users', `${cuUser?.id}`)

    const mujaheed = donates?.find(d => d?.user_id === user.uid)   
    const a = new Date().getTime()
    const today = moment(a).format('MMM Do YY, LT')
    const expire = moment(mujaheed?.expiredAt).format('MMM Do YY, LT')
    const valid = expire > today

    const { perc, url } = useStorage(file)

    console.log('user', user)

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

    const handleChange = async(e) => {
        setLoading(true)
        e.preventDefault()

        try {
            await updateDoc(userRef, {photo: url})
            setLoading(null)
            if(url){
                setFile(null)}
            setMessage('Picha yako imebadilishwa vizuri')
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='view_doctor_wrapper'>
         {appoints && <Appoints setAppoints={setAppoints}/>}
        <div className="view_doc_top">
            <img src={member?.photo || process.env.PUBLIC_URL + member?.avatar} />
            {/* <div className="view_doc_photo">
                <img src={member?.photo || process.env.PUBLIC_URL + member?.avatar} />            
            </div> */}
            { file?  
                <div className="view_doc_photo">
                    <img src={URL.createObjectURL(file)} alt="" />  
                </div>                      
                : 
                <div className="view_doc_photo">
                    <img src={member?.photo || process.env.PUBLIC_URL + member?.avatar } />                                              
                    <label htmlFor="photo" className='user_picture'>
                        <input 
                            type="file" 
                            name='photo' 
                            id="photo" style={{display: 'none'}}
                            onChange={handleSelect}
                        />
                        <span><BsCamera/></span>
                    </label>
                </div> 
            }
            {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}                                     
            {file &&                                        

            <div className="u_edit_photo">
                <button 
                    className='btn_edit' 
                    onClick={handleChange}
                    disabled={!url}
                    >{loading ? <Loading/> : 'BADILI PICHA'}
                </button>
                <button 
                    className='btn_remove' 
                    onClick={() =>setFile(null)}
                    >ONDOA
                </button>
            </div> 
             }
            <button className='btn btn_close2' onClick={() => navigate(-1)}><GrClose/></button>
        </div>
        <div className="view_doc_inner">
            <div className="view_doc_left">
                <h2>{member?.name}</h2>
                <div className="member_info_div">
                    <span>Age :</span>
                    <h4>{member?.age}</h4>
                </div>
                <div className="member_info_div">
                    <span>Elimu :</span>
                    <h4>{member?.edu}</h4>
                </div>
                <div className="member_info_div">
                    <span>Kazi :</span>
                    <h4>{member?.emplo}</h4>
                </div>
                <div className="member_info_div">
                    <span>Ujuzi :</span>
                    <h4>{member?.profes}</h4>
                </div>
                <div className="member_info_div">
                    <span>Anapoishi :</span>
                    <h4>{member?.location}</h4>
                </div>
            </div>
            <div className="doc_body" style={{border: '1px solid #aaa', display: 'flex', justifyContent: 'center', padding: '20px'}}>
                
                {valid ? <h2 className='doc_mjaheed'>Asante kwa kutusapoti, wewe ni <span>Mjaheed</span></h2> : 
                <button className='btn_sign' onClick={() => navigate('/mjaheed')}>Kuwa Mjaheed</button>}
            </div>
            <div className="doc_right">
                <button className='btn_sign' onClick={() =>setAppoints(true)} >Angalia Maombi ya Miadi</button>
                <div className="member_info_div">
                    <span>Dini :</span>
                    <h4>{member?.religion}</h4>
                </div>
                <div className="member_info_div">
                    <span>Dhehebu :</span>
                    <h4>{member?.set}</h4>
                </div>
                <div className="member_info_div">
                    <span>Quran :</span>
                    <h4>{member?.quran}</h4>
                </div>
                <div className="member_info_div">
                    <span>Msikiti wa karibu :</span>
                    <h4>{member?.mosque}</h4>
                </div>
                <div className="member_info_div">
                    <span>Swala :</span>
                    <h4>{member?.prayer}</h4>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default ViewMember
