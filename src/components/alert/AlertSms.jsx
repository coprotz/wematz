import React from 'react'
import {motion} from 'framer-motion'

const AlertSms = ({alert}) => {
  return (
    <motion.div initial={{ x: '-100vw'}}
    animate={{x:0}}
    className="message_alert_wrapper">
        <div className="alert_msg_inner">
            {alert}
        </div>                
    </motion.div>
  )
}

export default AlertSms
