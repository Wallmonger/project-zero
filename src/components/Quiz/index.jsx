import { Component, createRef } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { Questions } from '../Questions';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import QuizOver from'../QuizOver';
import { FaChevronRight } from 'react-icons/fa6' 

const initialState = {
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: true,
    quizEnd: false,
    percent: null
}

const levelNames = ["debutant", "confirme", "expert"];

class Quiz extends Component  
{
    constructor(props) {
        super(props)      
        this.state = initialState;
        this.storedDataRef = createRef()
    }

    

    loadQuestions = (level) => {
        const fetchedArrayQuiz = Questions[0].quizz[level];

        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            this.storedDataRef.current = fetchedArrayQuiz;
            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest)  // Return all except answer

            this.setState({ storedQuestions: newArray })         
        } 
    }

    showToastMsg = (pseudo) => {
        if (this.state.showWelcomeMsg) {

            this.setState({ showWelcomeMsg: false })

            toast.info(`Welcome ${pseudo} !`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: 'colored',
                icon: false
            })
        }
    }

    goodAnswer = () => {
        toast.success(`Nice +1 !`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: 'colored',
            icon: false
        })
    }

    badAnswer = () => {
        toast.error(`Nope +0 !`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: 'colored',
            icon: false,
        })
    }

    componentDidMount() {
        this.loadQuestions(levelNames[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            maxQuestions,
            storedQuestions,
            idQuestion,
            quizEnd,
            score
        } = this.state;

        if ((storedQuestions !== prevState.storedQuestions) && storedQuestions.length ) {
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options
            })   
        }

        if ((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }

        if (quizEnd !== prevState.quizEnd) {
            const gradePercent = this.getPercentage(maxQuestions, score);
            this.gameOver(gradePercent);
        }  

        if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo);
        }
    }

    submitAnswer = (option) => {
        this.setState({
            userAnswer: option,
            btnDisabled: false,
        })
    }

    getPercentage = (maxQuest, score) => (score / maxQuest) * 100;

    gameOver = (percentage) => {

        const gradePercent = this.getPercentage(this.state.maxQuestions, this.state.score);

        if (gradePercent >= 50) 
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: percentage,
            })
        else 
            this.setState({
                percent: percentage,
            })
    }

    nextQuestion = () => {
        
        if (this.state.idQuestion === this.state.maxQuestions - 1) 
            this.setState({ quizEnd: true })
        else 
            this.setState((prevState) => ({ idQuestion: prevState.idQuestion + 1 }))
        

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

        if (goodAnswer === this.state.userAnswer) {
            this.setState((prevState) => ({
                score: prevState.score + 1
            }))

            this.goodAnswer();
        } else {
            this.badAnswer();
        }
    }

    loadLevelQuestions = (param) => {
        this.setState({...initialState, quizLevel: param})

        this.loadQuestions(levelNames[param]);
    }
    

    render() {
        const {
            quizLevel,
            maxQuestions,
            question,
            options,
            idQuestion,
            btnDisabled,
            userAnswer,
            score,
            quizEnd,
            percent 
        } = this.state;

        const displayOptions = options.map((option, index) => {
            return (
                <p 
                    className={`answerOptions mb-2 ${userAnswer === option && "selected"} flex items-center`}
                    key={index}
                    onClick={() => this.submitAnswer(option)}
                >
                    <FaChevronRight className='me-2'/> {option}
                </p>
            )
        })

        return quizEnd ? (
            <QuizOver 
                ref={this.storedDataRef}
                levelNames={levelNames}
                score={score}
                maxQuestions={maxQuestions}
                quizLevel={quizLevel}
                percent={percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ) : 
        (
            <>
                <ToastContainer/>
                <Levels 
                    currentLevel={quizLevel}
                    levelNames={levelNames}
                />
                <ProgressBar 
                    idQuestion={idQuestion + 1} 
                    maxQuestions={maxQuestions}
                />
                <h2>{question}</h2>

                {displayOptions}
                
                <button 
                    className="btnSubmit" 
                    onClick={this.nextQuestion}
                    disabled={btnDisabled} 
                >
                { idQuestion < maxQuestions - 1 ? "Next" : "Finish"}
                </button>
            </>
        )
    }
}

export default Quiz