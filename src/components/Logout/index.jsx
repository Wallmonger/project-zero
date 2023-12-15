import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';


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
                <span 
                    className="slider round" 
                    data-tooltip-id="logoutSlider"
                    data-tooltip-content="Logout"
                    data-tooltip-place="left"
                ></span>
            </label>
            <Tooltip
                id="logoutSlider"  
                style={{backgroundColor: '#4682B4', fontWeight:"600"}}  
            />
        </div>
    )
}

export default Logout