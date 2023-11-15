

const ProgressBar = ({idQuestion}) => {
  return (
        <>
            <div className="percentage">
                <div className="progressPercent">Question: {idQuestion}/10</div>
                <div className="progressPercent">Progress: {idQuestion * 10}%</div>
            </div>
            <div className="progressBar">
                <div className="progressBarChange transition-all" style={{width: `${idQuestion * 10}%`}}></div>
            </div>
        </>
  )
}

export default ProgressBar