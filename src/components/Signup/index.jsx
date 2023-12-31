import { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, user } from '../Firebase/firebaseConfig';
import { setDoc } from 'firebase/firestore';



const Signup = () => {

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {  
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = loginData;
        createUserWithEmailAndPassword(auth, email, password)
            .then(authUser => {
                // Creating users/userid document
                return setDoc(user(authUser.user.uid), {
                    pseudo,        // Like pseudo: pseudo
                    email
                })
            })
            .then(user => {
                setLoginData({...data});
                navigate('/welcome');
            })
            .catch(error => {
                setError(error);
                setLoginData({...data});
            })
    }
    
    const regExpPseudo = /^[a-zA-Z0-9_-]{2,36}$/;
    const regExpEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    const { pseudo, email, password, confirmPassword } = loginData;
    
    const btnSubmit = pseudo === '' || !regExpPseudo.test(pseudo)  || email === '' || !regExpEmail.test(email) || password === '' || password !== confirmPassword 
    ? <button disabled>Inscription</button> : <button>Inscription</button> 

    const errorMsg = error !== '' && <span>{error.message}</span>
    
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">

                </div>
                <div className="formBoxRight">
                <div className="formContent">
                    {errorMsg}
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="inputBox">
                        <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                        <label htmlFor="pseudo">Pseudo</label>
                        </div>

                        <div className="inputBox">
                        <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                        <label htmlFor="email">Email</label>
                        </div>

                        <div className="inputBox">
                        <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                        <label htmlFor="password">Password</label>
                        </div>

                        <div className="inputBox">
                        <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                        <label htmlFor="confirmPassword">Confirm password</label>
                        </div>

                        {btnSubmit}
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

export default Signup