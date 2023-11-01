import { useState } from 'react';
import { motion } from 'framer-motion';
import batman from '../../img/batman.png';



const ErrorPage = () => {
  
  const [animationComplete, setAnimationComplete] = useState(false);


  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  }



  const centerH2 = {
    fontSize: '2rem',
    textAlign: 'center',
    marginTop: '50px'
  }
  
  const h2Anim = { filter: 'blur(2px)'};
  const h2AnimEnd = { filter: 'blur(0px)'}

  const initialBatmanAnim = {
    scale: .1,
    filter: 'blur(0px)'
  }
  
  const batmanAnim = {
    rotate: 720,
    scale: 2,
    filter: 'blur(2px)'
  }
  
  const batmanAnimEnd = {
    rotate: -360,
    scale: 1,
  }

  return (
    <div className="quiz-bg">
        <div className="container">

            <motion.h2 
              style={centerH2} 
              transition={{duration: 1}} 
              initial={h2Anim} 
              animate={h2AnimEnd}>
              Oops, Page Not Found
            </motion.h2>

            <motion.img 
                src={batman} 
                className='block mx-auto my-10' 
                alt="Error page" 
                transition={{duration: .3}} 
                initial={initialBatmanAnim} 
                animate={animationComplete ? batmanAnimEnd : batmanAnim} 
                onAnimationComplete={handleAnimationComplete}
            />
            
        </div>
    </div>
  )
}

export default ErrorPage