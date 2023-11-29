import { useEffect, forwardRef, memo, useState } from "react";
import { motion } from 'framer-motion';


const QuizOver = forwardRef((props, ref) => {

    const [asked, setAsked] = useState([]);
    console.log(asked);

    useEffect(() => {   
        setAsked(ref.current);
    }, [ref])

    const questionAnswer = asked.map(({id, question, answer}) => {
        return (
            <tr key={id}>
                <td>{question}</td>
                <td>{answer}</td>
                <td>
                    <motion.button 
                        className="btnInfo" 
                        whileHover={{ scale: 1.05}} 
                        whileTap={{ scale: 0.9}}>
                        Infos
                    </motion.button>
                </td>
            </tr>
        )
        
    })

    return (
        <>
            <div className="stepsBtnContainer">
                <p className="successMsg">Congratulation!</p>
                <motion.button 
                    className="btnResult success" 
                    whileHover={{ scale: 1.05}} 
                    whileTap={{ scale: 0.9}}>
                    Next level
                </motion.button>
            </div>
            <div className="percentage">
                <div className="progressPercent">Total: 10%</div>
                <div className="progressPercent">Note: 10/10</div>
            </div>

            <hr />
            <p>Answers : </p>

            <div className="andwerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
        </>

    )
})


export default memo(QuizOver)