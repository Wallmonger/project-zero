import { useEffect, useState, memo } from 'react';
import Stepper from 'react-stepper-horizontal';

const Levels = ({currentLevel, levelNames}) => {
    
    const [levels, setLevels] = useState([]);

    useEffect(() => {

        const quizSteps = levelNames.map(level => ({title: level.toUpperCase()}))
        setLevels(quizSteps);

    }, [levelNames])


    return (
        <div className="levelsContainer" style={{background: 'transparent'}}> 
                <Stepper
                    steps={ levels } 
                    activeStep={ currentLevel } 
                    circleTop={0}
                    activeColor="#258de1"
                    activeTitleColor='#258de1'
                    completeTitleColor="#4683b468"
                    completeColor="#4683b468"
                    completeBarColor='#4683b468'
                    size={45}
                    circleFontSize={20}
                />
        </div>
    )
}

export default memo(Levels)