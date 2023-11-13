import { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { Questions } from '../Questions';

class Quiz extends Component  
{
    constructor(props) {
        super(props)
        
        this.state = {
            levelNames: ["debutant", "confirme", "expert"],
            quizLevel: 0,
            maxQuestions: 10,
            storedQuestions: [],
            question: null,
            options: [],
            idQuestion: 0,
            btnDisabled: true,
            userAnswer: null,
        }
    }

    loadQuestions = (level) => {
        const fetchedArrayQuiz = Questions[0].quizz[level];

        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest)  // Return all except answer

            this.setState({
                storedQuestions: newArray
            })         
        } 
        else {
            console.log("there is not enough questions")
        }
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })

            
        }
    }

    submitAnswer = (option) => {
        this.setState({
            userAnswer: option,
            btnDisabled: false,
        })
    }

    incrementQ = () => this.setState({ idQuestion: this.state.idQuestion + 1 })
    

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

        return (
            <div>
                {/* <h2>{pseudo}</h2> */}
                <Levels />
                <ProgressBar />
                <h2>{this.state.question}</h2>
                {displayOptions}
                
                <button className="btnSubmit" disabled={this.state.btnDisabled} onClick={this.incrementQ}>Next</button>
            </div>
        )
    }
}

export default Quiz