import React from 'react'

const SearchUser = ({d, setMember}) => {
  return (
    <div className= "chat_card" onClick={() =>setMember(d)}>
      <div className="chat_wrap">
        <div className="chat_wrleft">
          <div className="chat_rec_photo">
              <img src={d?.photo || process.env.PUBLIC_URL + `${d?.avatar}`} alt="" /> 
          </div>
          <div className="chat_body">
              <h4 className='chat_member_name'>{d?.name}</h4>              
          </div>
        </div>        
      </div>
    </div>
  )
}

export default SearchUser
