import { useEffect, forwardRef, memo, useState } from "react";
import { motion } from 'framer-motion';


const QuizOver = forwardRef((props, ref) => {

    const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props;
    //TODO: Fix percentage (-10)

    const averageGrade = maxQuestions / 2;

    const [asked, setAsked] = useState([]);

    useEffect(() => {   
        setAsked(ref.current);
    }, [ref])

    if (score < averageGrade) {
        setTimeout(() => loadLevelQuestions(quizLevel), 3000)
    }

    const decision = score >= averageGrade ? (
    <>
        <div className="stepsBtnContainer">
        {
            quizLevel < levelNames.length ? (
                <>
                    <p className="successMsg">Congratulation, try next level !</p>
                    <motion.button 
                        className="btnResult success"
                        onClick={() => loadLevelQuestions(quizLevel)} 
                        whileHover={{ scale: 1.05}} 
                        whileTap={{ scale: 0.9}}>
                        Next level
                    </motion.button>
                </>    
            )
            :
            (
                <>
                        <p className="successMsg">Well done ! You are an expert !</p>
                        <motion.button 
                            className="btnResult success"
                            onClick={() => loadLevelQuestions(0)}
                            whileHover={{ scale: 1.05}} 
                            whileTap={{ scale: 0.9}}>
                            Home Page
                        </motion.button>                        
                </>
            )
            
        }
        </div>   
        <div className="percentage">
            <div className="progressPercent">Total: {percent}%</div>
            <div className="progressPercent">Note: {score}/{maxQuestions}</div>
        </div>
    </>
    )
    :
    (
    <>
        <div className="stepBtnContainer">
            <p className="failureMsg">You failed !</p>
        </div>
        <div className="percentage">
            <div className="progressPercent">Total: {percent}%</div>
            <div className="progressPercent">Note: {score}/{maxQuestions}</div>
        </div>
    </>
    )
    

        const questionAnswer = score >= averageGrade ? (
            asked.map(({id, question, answer}) => {
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
            )
            :
            (
                <tr>
                    <td colSpan='3'>
                        <div className="loader"></div>
                        <p className="text-center text-sky-600 font-semibold">
                            Try again !
                        </p>
                    </td>
                </tr>
            )       
    

    return (
        <>

            {decision}
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