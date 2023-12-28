import { useEffect, forwardRef, memo, useState } from "react";
import { motion } from 'framer-motion';
import { GiTrophyCup } from "react-icons/gi";
import Loader from '../Loader';
import Modal from '../Modal';


const QuizOver = forwardRef((props, ref) => {

    const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props;

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_API_KEY;
    const hash = process.env.REACT_APP_MARVEL_MD5_HASH;

    const averageGrade = maxQuestions / 2;

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {   
        setAsked(ref.current);
    }, [ref])

    const showModal = (id) => {
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
    }

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
                        <p className="successMsg">
                            <GiTrophyCup size='50px' className="inline"/> Well done ! You are an expert !
                        </p>
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
            asked.map(({id, question, answer, heroId}) => {
                return (
                    <tr key={id}>
                        <td>{question}</td>
                        <td>{answer}</td>
                        <td>
                            <motion.button
                                onClick={() => showModal(heroId)} 
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
                        <Loader 
                            loadingMsg={"Try again"}
                            styling={'text-center text-red-600 font-semibold'}
                        />
                    </td>
                </tr>
            )       
    

    return (
        <>

            {decision}
            <hr />
            <p>Answers : </p>

            <div className="answerContainer">
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

            <Modal showModal={openModal} closeModal={closeModal}>
                <div className="modalHeader">
                    <h2>Title</h2>
                </div>
                <div className="modalBody">
                    <h3>Title 2</h3>
                </div>
                <div className="modalFooter">
                    <motion.button
                        className="modalBtn" 
                        whileHover={{ scale: 1.05}} 
                        whileTap={{ scale: 0.9}}>
                        Close
                    </motion.button>
                </div>
            </Modal>
        </>

    )
})


export default memo(QuizOver)