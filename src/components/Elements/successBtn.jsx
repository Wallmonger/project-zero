import { motion } from 'framer-motion';

const successBtn = ({children, callback}) => {
    return (
        <motion.button 
            className="btnResult success"
            onClick={callback} 
            whileHover={{ scale: 1.05}} 
            whileTap={{ scale: 0.9}}>
            {children}
        </motion.button>
    )
}

export default successBtn;