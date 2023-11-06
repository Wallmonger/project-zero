import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (email !== '' && password.length >= 6)
            setBtn(true);
        else
            setBtn(false);
    }, [email, password]);

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(user => {
                console.log(user);
                // block the user from back navigation (replace latest history)
                navigate('/welcome', { replace: true});
            })
            .catch(err => {
                setError(err);
                setEmail('');
                setPassword('');
            });
    }
 
    const displayBtn = btn ? <button type="submit">Login</button> : <button disabled>Login</button>;
    const displayError = error !== '' && <span>{error.message}</span>
    

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin"></div>
                <div className='formBoxRight'>
                    <div className="formContent">
                        {displayError}
                        <h2>Login</h2>
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

                            <div className="inputBox">
                                <motion.input 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                    value={password} 
                                    autoComplete="off" 
                                    required 
                                    initial={{ scale: 0.1 }} 
                                    animate={{scale: 1}} 
                                    transition={{duration: .3, delay:.2}} 
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        {displayBtn}

                        </form>


                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/signup">You don't have an account? Sign up here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Login