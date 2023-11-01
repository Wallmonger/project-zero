import { useState } from 'react';
import { motion } from 'framer-motion';
import batman from '../../img/batman.png';



const ErrorPage = () => {
  
  const [animationComplete, setAnimationComplete] = useState(false);


  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  }



  const centerH2 = {
    textAlign: 'center',
    marginTop: '50px'
  }
  
  const initialBatmanAnim = {
    scale: .1,
  }
  
  const batmanAnim = {
    rotate: 3600,
    scale: 5,
    
  }
  
  const batmanAnimEnd = {
    
    scale: 1
  }

  return (
    <div className="quiz-bg">
        <div className="container">
            <h2 style={centerH2}>Oops, Page Not Found</h2>
            <motion.img 
                src={batman} 
                className='block mx-auto my-10' 
                alt="Error page" 
                transition={{duration: 1}} 
                initial={initialBatmanAnim} 
                animate={animationComplete ? batmanAnimEnd : batmanAnim} 
                onAnimationComplete={handleAnimationComplete}
            />
        </div>
    </div>
  )
}

export default ErrorPage