import { memo } from 'react';

const Levels = ({levelName}) => {
  return (
    <div className="levelsContainer"> 
        <h2 className="text-lg  font-bold first-letter:text-blue-600 first-letter:text-2xl">{levelName.toUpperCase()}</h2>
    </div>
  )
}

export default memo(Levels)