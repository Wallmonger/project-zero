import { useRef, useEffect, useState } from 'react';

const Landing = () => {

  const refWolverine = useRef(null);
  const [btn, setBtn] = useState(false);

  console.log(refWolverine);

  useEffect(() => {
    refWolverine.current.classList.add('startingImg');

    setTimeout(() => {
      refWolverine.current.classList.remove('startingImg');
      setBtn(true);
    }, 1000)
  }, []);

  const displayBtn = btn && (
    <>
       <div className="leftBox">
          <button className="btn-welcome">Register</button>
      </div>
      <div className="rightBox">
        <button className="btn-welcome">Login</button>
      </div>
    </>
  )


  return (
    <main ref={refWolverine} className="welcomePage">
        {displayBtn}
    </main>
  )
}

export default Landing