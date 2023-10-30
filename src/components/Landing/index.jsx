import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Landing = () => {

  const wRef = useRef(null);
  
  const [btn, setBtn] = useState(false);

  console.log(wRef);

  useEffect(() => {
    wRef.current.classList.add('startingImg');

    setTimeout(() => {
      wRef.current.classList.remove('startingImg');
      setBtn(true);
    }, 1000)
  }, []);

  const setLeftImg = () => wRef.current.classList.add('leftImg');
  const setRightImg = () => wRef.current.classList.add('rightImg');
  const clearImg = () => {
    if (wRef.current.classList.contains('leftImg'))
        wRef.current.classList.remove('leftImg');
    else if (wRef.current.classList.contains('rightImg'))
        wRef.current.classList.remove('rightImg');
  }
  
  

  const displayBtn = btn && (
    <>
       <div className="leftBox" onMouseOver={setLeftImg} onMouseOut={clearImg}>
          <motion.button className="btn-welcome" whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9}}>Register</motion.button>
      </div>
      <div className="rightBox" onMouseOver={setRightImg} onMouseOut={clearImg}>
        <motion.button className="btn-welcome" whileHover={{ scale: 1.1}} whileTap={{ scale: 0.9}}>Login</motion.button>
      </div>
    </>
  )


  return (
    <main ref={wRef} className="welcomePage">
        {displayBtn}
    </main>
  )
}

export default Landing