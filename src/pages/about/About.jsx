import React, {useEffect} from 'react'
import {motion} from 'framer-motion'
import Achi from '../../assets/images/founder.jpg'
import { ImHome } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { FaQuoteLeft, FaQuoteRight, FaShieldAlt } from "react-icons/fa";
import Nav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';


const About = () => {
    
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

  return (
    <div className='about'>
    <Nav/>
    <motion.div initial={{ x: '-100vw'}}
        animate={{x:0}} className="about"> 
        <div className="about_inner">            
            <h1 className="about_title">KUHUSU SISI</h1>  
            <h1 className='about_body'>Tunaamini Wema huzaa mema na Uislamu ni ufumbuzi wa matatizo mengi ya mwanaadam pindi atakapoamua kuufanya USLAMU uwe ndo muongozo na dira ya maisha yake</h1> 
            <h1 className='about_slogan'>Lengo letu ni kuwa na jukwaa kubwa la waislamu, watakaoshirikiana kwenye kuhusiana mema na kukatazana mabaya na kusaidiana kwenye kila hali kwa kupeana ufumbuzi kwenye masuala ya uchumi, elimu, siasa ili kuwa na jamii bora itakayomridhisha Allah Subhaanahu Wata a' llah.</h1> 
        </div> 
        <div className="about_ceo_wrapper">        
            <div className="about_ceo">            
                <img src={Achi} alt="" />
                <div className="about_ceo_bio">
                    <h1>MM Achi</h1>
                    <h3>Founder and CEO</h3>
                    <p><FaQuoteLeft/> Hapa Wema tunaamini kila mtu anatakiwa apate taarifa sahihi ili afanye maamuzi sahihi, na tunaamini pia kila dakika ya mtu inayopita inatakiwa itumike kwenye mambo ya kheir tupu na sio mambo ya laghwi na Uadui. Kwa kujiunga humu na kushirikiana na Waislamu wenzako ni njia bora ya kujinasua kwenye majukwaa yaliyoanzishwa kuharibu jamii bora ya waislamu. <FaQuoteRight/></p>
                </div>
            </div> 
        </div>
        <div className="security">
            <h1>Usalama na Faragha</h1>
            <div className="security_burge">
                <FaShieldAlt/>
            </div>
            <h4>Ni jukumu letu kuhakikisha unakuwa salama na faragha yako kutunzwa, taarifa zako hazitatumika kwingineko kwa namna yeyote ile. Uaminifu ndio silaha ya Muislamu.</h4>
            <div className="story">
                <span>Hadithi Yetu na mwanzilishi MM Achi</span>
                <h2><FaQuoteLeft/> Teknolojia ya habari imenifikisha hapa kwa kuwa na familia bora yenye furaha na amani. Nimekutana na mume wangu kutoka katika moja ya majukwaa ya kiislamu, ambao ukaniunganisha na mume wangu ambayo ndo furaha yangu na amani yangu. Najua watu wengi wanapata shida kwa kufanya machaguzi mabaya kwa kuwa tunazunguukwa na majukwaa ambayo nia yake ni kuharibu jamii ya kiislamu. Wazo la kuanzisha jukwaa hili ili tuwe na jukwaa bora la waislamu ambalo litakufikisha kufanya maamuzi sahihi kwa kupata ushauri sahihi wenye nia ya kujenga maisha bora ya kiimani hapa duniani na baadae tukakutane na Mola wetu huku ameturidhia. <FaQuoteRight/></h2>
            </div>
        </div>         
         
    </motion.div>
    <Footer/>
    </div>
  )
}

export default About
