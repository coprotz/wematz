import React from 'react'
import { useState } from 'react'
import './nikah.css'
// import { FaUserAlt } from "react-icons/fa";
import { BsChatLeftDotsFill,BsFillPersonFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
// import img1 from '../../assets/images/img1.png'
// import img2 from '../../assets/images/img2.jpg'
// import img3 from '../../assets/images/img3.jpg'
// import img4 from '../../assets/images/img4.jpg'
// import img5 from '../../assets/images/img5.jpg'
// import img6 from '../../assets/images/img6.jpg'
// import img7 from '../../assets/images/img7.jpg'
// import img9 from '../../assets/images/img9.jpg'





const NikahCard = ({item}) => {
  const [view, setView] = useState(null)
  return (
    <div className="nikah_photo" onMouseEnter={() => setView(item)} onMouseLeave={() => setView(null)}>
        <img src={item.url} alt="" />
        {view &&
        <div className="nikah_detail">
          <div className="detail_top">
            <div className="nikah_image">
              <img src={item.url} alt="" />
            </div>
            <div className="nikah_info">
              <h4>{item.name} ({item.age})</h4>
              <div className="nikah_loc">
                <span>{item.tribe} -</span>
                <span> {item.live}</span>
              </div>
             
            </div>
          </div>
          <div className="meetings_actions">                    
              <button className='btn'><FcLike/></button>
              <button className='btn'><BsFillPersonFill/></button>
              <button className='btn'><BsChatLeftDotsFill/></button>          
          </div>
          {/* <div className="nikah_bottom">
            <button>View Detail</button>
            <button>Like</button>
            <button>chat</button>
          </div> */}
        </div>}
    </div>
  )
}

export default NikahCard