import { memo } from 'react';

const ProgressBar = ({idQuestion, maxQuestions}) => {

    const getWidth = (nQuestions, idQuestion) => {
        return (100 / nQuestions) * idQuestion;
    }

    const progressPercent = getWidth(maxQuestions, idQuestion);

    return (
            <>
                <div className="percentage">
                    <div className="progressPercent">Question: {idQuestion}/{maxQuestions}</div>
                    <div className="progressPercent">Progress: {progressPercent}%</div>
                </div>
                <div className="progressBar">
                    <div className="progressBarChange transition-all" style={{width: `${progressPercent}%`}}></div>
                </div>
            </>
    )
}

export default memo(ProgressBar)