import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { categories, recipies } from '../../data'
import { AiOutlineDoubleRight } from "react-icons/ai";

const ViewRecipie = () => {
  const { id } = useParams()
  const recipie = recipies?.find(r => r.id === id)
  const navigate = useNavigate()
  return (
    <div className='view_recipies'>
      
      <div className="rev_body_inner">
        <div className="view_rec_body">
          <div className="view_reci_top">
            <span onClick={() =>navigate(-1)}>MAPISHI</span>
            <AiOutlineDoubleRight/>
            <span>{recipie.category}</span>
            <AiOutlineDoubleRight/>
            <span>{recipie.name}</span>
          </div>
          <h1>{recipie.name}</h1>
          <div className="reviews">
            <div className="ratings_stairs">
              <h4>3.5</h4>
              <span>(12)</span>
            </div>
            <div className='ratings_span'></div>
            <dic className="review_sum">
              <h4>13 Maoni</h4>
            </dic>
          </div>
          <h4 className='card_text'>{recipie?.desc}</h4>
          <div className="review_time">
            <h4>Imetumwa: </h4>12 June 2022
          </div>
          <div className="rev_photo">
            <img src={process.env.PUBLIC_URL+`/${recipie.photo}`} /> 
          </div>
          <div className="view_ingredients">
            <h2 className='view_title'>Mahitaji</h2>
          </div>
          <div className="ingredient_grids">
            {recipie.ingredients.map((r, index) => (
              <div className='ingredi_card' key={index}>
                <span></span><h4 className='card_text'>{r}</h4>
              </div>
            ))}
          </div>
          <div className="view_ingredients">
            <h2 className='view_title'>Maelekezo</h2>
          </div>
          <div className="ingredient_grids">
            {recipie.steps.map((r, index) => (
              <div className='step_card' key={index}>
                <h3>Hatua {index+1}</h3><h4 className='card_text'>{r}</h4>
              </div>
            ))}
          </div>
        
        </div>
        <div className="rev_right">
          Latest Posts
          <div className="rev_latest">
            {recipies?.map(r => (
              <div className="latest_card" onClick={() => navigate(`/recipies/${r.id}`)}>
                <img src={process.env.PUBLIC_URL+`/${r.photo}`} /> 
                <h4>{r.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewRecipie
