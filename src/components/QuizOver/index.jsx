import { useEffect, forwardRef, memo, useState } from "react";
import { motion } from 'framer-motion';
import { GiTrophyCup } from "react-icons/gi";
import Loader from '../Loader';
import Modal from '../Modal';
import axios from 'axios';


const QuizOver = forwardRef((props, ref) => {

    const {levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions} = props;

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_API_KEY;
    const hash = process.env.REACT_APP_MARVEL_MD5_HASH;

    const averageGrade = maxQuestions / 2;

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [characterData, setCharacterData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {   
        setAsked(ref.current);

        if (localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate');
            checkDataAge(date)
        }
    }, [ref])

    const checkDataAge = (date) => {
        const today = Date.now();
        const timeDiff = today - date;
        const daysDiff = timeDiff / (1000 * 3600 * 24);

        // if 15 days have passed, allow new api requests
        if (daysDiff >= 15) {
            localStorage.clear();
            localStorage.setItem('marvelStorageDate', Date.now());
        }
    }

    const showModal = (id) => {
        setOpenModal(true);

        if (localStorage.getItem(id)) {

            setCharacterData(JSON.parse(localStorage.getItem(id)));
            setIsLoading(false);

        } else {

            axios
            .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
            .then(response => {
                setCharacterData(response.data.data.results);
                console.log(characterData)
                setIsLoading(false);
    
                localStorage.setItem(id, JSON.stringify(response.data.data.results));
                if (!localStorage.getItem('marvelStorageDate')) {
                    localStorage.setItem('marvelStorageDate', Date.now());
                }
            })
            .catch(err => console.log(err));

        }
        
    }

    const closeModal = () => {
        setOpenModal(false);
        setIsLoading(true);
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

    const resultInModal = !isLoading ? (
        <>
            <div className="modalHeader">
                <h2 className="text-xl">{characterData[0].name}</h2>
                <img width="10%" className="float-left rounded-md" src={`${characterData[0].thumbnail.path}.${characterData[0].thumbnail.extension}`} alt={characterData[0].name}/> 
            </div>
            <div className="modalBody">
                <h3>{characterData[0].description}</h3>
            </div>
            <div className="modalFooter">
                <motion.button
                    className="modalBtn" 
                    whileHover={{ scale: 1.05}} 
                    whileTap={{ scale: 0.9}}>
                    Close
                </motion.button>
            </div>
        </>
    )
    :
    (
        <>
            <div className="modalHeader">
                <h2 className="text-xl">Waiting ...</h2>
            </div>
            <div className="modalBody">
                <Loader />
            </div>
        </>
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
                { resultInModal }
            </Modal>
        </>

    )
})


export default memo(QuizOver)