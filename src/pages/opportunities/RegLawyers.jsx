import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsArrowLeft, BsCamera } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { clinics } from '../../data'
import useStorage from '../../hooks/useStorage'
import FormDoc from './FormDoc'
import FormLaw from './FormLaw'



const RegLawyers = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)


  const RenderPage = () => {
    if(page === 1){
      return ( 
        <>
          <div className="oppo_head">
            <button onClick={() => navigate('/opportunities')} className='btn_btn'><BsArrowLeft/></button>
            <h1>Karibu kujisajili kama WemaSheria</h1>
          </div>
          <div className="opp_doc_body">
            <h3>Wanasheria watakaoshiriki katika jukaa hili, watajulikana kama WemaSheria na watawashauri kwa kadri ya uwezo wao ndugu zao 
              walioomu humu kwa kujibu jumbe zao pindi watakapohitaji msaada wa kisheria.
            </h3>
            <h3>Wanasharia watakaoshiriki katika jukwaa hili watalipwa kwa kila ujumbe watakaoujibu kwa watakaotaka ushauri wao wa kisheria.</h3>
            <h3>Kwa ufafanuzi au maelekezo zaidi, tafadhari wasiliana na <span>Admin</span></h3>
            <div>
              <button className='btn_sign' onClick={() =>setPage(2)}>ENDELEA</button>
            </div>
            
          </div>
        </>
      )
    }else if(page === 2){
      return (
       <FormLaw setPage={setPage}/>
      )
    }else if(page === 3){
      return (
        <div className='opp_reviews'>
          <h2>Maombi yako yamepokelewa kwa ukamilifu, Team yetu ya kupembua maombi yatayapitia na kukujulisha hatima hivi punde, Asante.</h2>
          <button className='btn_sign' onClick={() =>navigate('/')}>Nyumbani</button>
        </div>
      )
    }
  }
  return (
    <div className='opp_doctors'>
      {RenderPage()}
    </div>
  )
}

export default RegLawyers
