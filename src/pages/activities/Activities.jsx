import React from 'react'
import { useState } from 'react'
import './activities.css'

const Activities = () => {
    const [page, setPage] = useState(1)
    const RenderPage = () =>{
        if(page === 1){
            return (
                <div className="activity_res">
                    <h2>Niliowapenda</h2>
                    <span className='span'>Hakuna uliowapenda</span>
                </div>
            )
        }else if(page === 2){
            return (
                <div className="activity_res">
                    <h2>Walionipenda</h2>
                    <span className='span'>Hakuna waliokupenda</span>
                </div>
            )
        }else if(page === 3){
            return (
                <div className="activity_res">
                    <h2>Niliowaangalia</h2>
                    <span className='span'>Hakuna uliowangalia</span>
                </div>
            )
        }else if(page === 4){
            return (
                <div className="activity_res">
                    <h2>Walioniangalia</h2>
                    <span className='span'>Hakuna waliokuangalia</span>
                </div>
            )
        }
    }


  return (
    <div className='activities'>
        <h2>Matukio ya Hivi Karibuni</h2>
        <div className="recipies_cat act_heading">
            <span className={page === 1? 'active_item' : 'cat_recipies'} onClick={() =>setPage(1)}>Niliowapenda</span> 
            <span className={page === 2? 'active_item' : 'cat_recipies'}  onClick={() =>setPage(2)}>Walionipenda</span> 
            <span className={page === 3? 'active_item' : 'cat_recipies'}  onClick={() =>setPage(3)}>Niliowaangalia</span> 
            <span className={page === 4? 'active_item' : 'cat_recipies'}  onClick={() =>setPage(4)}>Walioniangalia</span> 
        </div>
        {RenderPage()}
     
    </div>
  )
}

export default Activities
