import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../Firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError(null);
                setSuccess(`Mail has been sent to email ${email} with instructions to reset your password`);
                setEmail('');
                
                setTimeout(() => {
                    navigate('/login');
                }, 5000)
            })
            .catch((err) => {
                setError(err);
                setEmail('');
            })

    }

    const disabled = email === "";
    const successMsg = success && <span className='border-2 border-blue-700 rounded-md bg-blue-700 text-green-950 bg-opacity-10'>{success}</span>
    const errorMsg = error && <span className='border-2 border-red-700 rounded-md bg-red-700 text-red-950 bg-opacity-10'>{error.message}</span>

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget"></div>
                <div className='formBoxRight'>
                    <div className="formContent">
                        { successMsg }
                        { errorMsg }

                        <h2>Forgot your password?</h2>
                        <form onSubmit={handleSubmit}>
            
                            <div className="inputBox">
                                <motion.input 
                                    className='bg-white'
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    value={email} 
                                    autoComplete="off" 
                                    required 
                                    initial={{ scale: 0.1 }} 
                                    animate={{scale: 1}} 
                                    transition={{duration: .3}} 
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Get new password</button>
                        </form>


                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/login">Already a member? Sign in here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword