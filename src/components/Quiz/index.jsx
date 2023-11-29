import { Component, createRef } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { Questions } from '../Questions';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import QuizOver from'../QuizOver';

class Quiz extends Component  
{
    constructor(props) {
        super(props)
        
        this.initialState = {
            levelNames: ["debutant", "confirme", "expert"],
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
            quizEnd: false
        }

        this.state = this.initialState;

        this.storedDataRef = createRef()

    }

    

    loadQuestions = (level) => {
        const fetchedArrayQuiz = Questions[0].quizz[level];

        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            this.storedDataRef.current = fetchedArrayQuiz;
            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest)  // Return all except answer

            this.setState({
                storedQuestions: newArray
            })         
        } 
        else {
            console.log("there is not enough questions")
        }
    }

    showToastMsg = (pseudo) => {
        if (this.state.showWelcomeMsg) {

            this.setState({
                showWelcomeMsg: false
            })

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
        this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps, prevState) {

        if ((this.state.storedQuestions !== prevState.storedQuestions) && this.state.storedQuestions.length ) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })   
        }

        if ((this.state.idQuestion !== prevState.idQuestion) && this.state.storedQuestions.length) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
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

    gameOver = () => {

        const gradePercent = this.getPercentage(this.state.maxQuestions, this.state.score);

        if (gradePercent >= 50) 
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: gradePercent,
                quizEnd: true
            })
        else 
            this.setState({
                percent: gradePercent,
                quizEnd: true
            })
    }

    nextQuestion = () => {

        // End current level if maxQuestions is reached
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            this.gameOver();
        } else {
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }

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
        this.setState({...this.initialState, quizLevel: param})

        this.loadQuestions(this.state.levelNames[param]);
    }
    

    render() {
        
        const { pseudo } = this.props.userData;

        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p 
                    className={`answerOptions mb-2 ${this.state.userAnswer === option && "selected"}`}
                    key={index}
                    onClick={() => this.submitAnswer(option)}
                >
                        {option}
                </p>
            )
        })

        return this.state.quizEnd ? (
            <QuizOver 
                ref={this.storedDataRef}
                levelNames={this.state.levelNames}
                score={this.state.score}
                maxQuestions={this.state.maxQuestions}
                quizLevel={this.state.quizLevel}
                percent={this.state.percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ) : 
        (
            <>
                <ToastContainer/>
                <Levels levelName={this.state.levelNames[this.state.quizLevel]}/>
                <ProgressBar 
                    idQuestion={this.state.idQuestion + 1} 
                    maxQuestions={this.state.maxQuestions}
                />
                <h2>{this.state.question}</h2>

                {displayOptions}
                
                <button 
                    className="btnSubmit" 
                    disabled={this.state.btnDisabled} 
                    onClick={this.nextQuestion}
                >
                { this.state.idQuestion < this.state.maxQuestions - 1 ? "Next" : "Finish"}
                </button>
            </>
        )
    }
}

export default Quiz