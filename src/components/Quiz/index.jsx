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

    

    render() {
        const { pseudo } = this.props.userData;

        return (
            <div>
                {/* <h2>{pseudo}</h2> */}
                <Levels />
                <ProgressBar />

                <h2>Quiz</h2>
                <p className="answerOptions">Question 1</p>
                <p className="answerOptions">Question 2</p>
                <p className="answerOptions">Question 3</p>
                <p className="answerOptions">Question 4</p> <br />
                <button className="btnSubmit">Next</button>
            </div>
        )
    }
}

export default Quiz