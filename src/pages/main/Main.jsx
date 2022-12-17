import React from 'react'
import './main.css'
import { GiLovers } from "react-icons/gi";
import { IoIosChatbubbles } from "react-icons/io";
import { FaHeartbeat } from "react-icons/fa";
import { RiTeamLine, RiQuestionnaireFill } from "react-icons/ri";
import { GoLaw } from "react-icons/go";
// import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import Nav from '../../components/nav/Nav';

const Main = () => {
    const navigate = useNavigate();
  return (
    <div className='main'>
        <div className="main_body">
            <motion.div 
             initial={{ x:'-100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }}
                className="main_b_left">
                <div className="main_b_card">
                    <GiLovers className='m_card_svg'/>
                    <h4>Nikah</h4>
                    <p>Pata Mwenza Unayempenda</p>
                </div>
                <div className="main_b_card">
                    <FaHeartbeat className='m_card_svg'/>
                    <h4>Afya</h4>
                    <p>Pata Ushauri wa Afya yako</p>
                </div>
                <div className="main_b_card">
                    <RiTeamLine className='m_card_svg'/>
                    <h4>Mikutano</h4>
                    <p>Anzisha Mikutano ya kimtamdao</p>
                </div>
                <div className="main_b_card">
                    <IoIosChatbubbles className='m_card_svg'/>
                    <h4>Mazungumzo</h4>
                    <p>Wasiliana na unayemtaka</p>
                </div>
                <div className="main_b_card">
                    <GoLaw className='m_card_svg'/>
                    <h4>Sheria</h4>
                    <p>Pata ushauri wa kisheria</p>
                </div>
                <div className="main_b_card">
                    <RiQuestionnaireFill className='m_card_svg'/>
                    <h4>Maswali na Majibu</h4>
                    <p>Uliza chochote katika dini ujibiwe</p>
                </div>
                
            </motion.div>
            <motion.div 
             initial={{ x:'100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }} 
                className="main_b_right">
                    <Nav/>
                    {/* <div className="login">
                        <span>Tayari ni mwanachama?</span>
                        <button className='btn_sign' onClick={() => navigate('/')}>Ingia</button>
                    </div> */}
                <h1 className='ma_b_title'>Wema</h1>
                <h3>Ukumbi wa kuwakutanisha waislamu na wale wanaotarajia kuwa waislamu wa kitanzania wanaoishi 
                    sehemeu mbalimbali duniani na kuwapa fursa ya kupeana mustkbari wa maisha ya kIIslamu duniani.
                </h3>
                <div className="m_b_right_sign">
                    <button className='btn_sign' onClick={() => navigate('/register')}>Jiunge Ushiriki</button>
                    {/* <span>AU</span>
                    <button className='btn_g'><FcGoogle/></button>
                    <button className='btn_g btn_f'><FaFacebookF/></button> */}
                </div>
            </motion.div>
        </div> 
        <div className="main_footer">
            <div className="m_f_logo" onClick={() =>navigate('/')}>Wema</div>
            <div className="m_f_items">
                <span onClick={navigate('/about')}>Kuhusu</span>              
                <span>Vigezo</span>
                <span>Faragha</span>
                <span>Mawasiliano</span>
            </div>
        </div>    
    </div>
  )
}

export default Main
