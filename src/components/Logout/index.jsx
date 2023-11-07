import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';


const Logout = () => {

    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (checked) {
            signOut(auth)
                .then(() => {
                    console.log('Session off');
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                })
                .catch((err) => {
                    console.log('Oops');
                })
        }
    }, [checked]);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    }

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    checked={checked}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Logout