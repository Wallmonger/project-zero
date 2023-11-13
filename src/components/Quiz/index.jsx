import { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';

class Quiz extends Component  
{
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