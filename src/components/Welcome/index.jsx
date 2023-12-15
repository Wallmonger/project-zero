import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, user } from '../Firebase/firebaseConfig';
import { getDoc } from 'firebase/firestore';

import Logout from '../Logout';
import Loader from '../Loader'
import Quiz from '../Quiz';


const Welcome = () => {

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        let listener = onAuthStateChanged(auth, (user) => {
            user ? setUserSession(user) : setTimeout(() => { navigate('/')}, 2000);
            
        })

        // If not null or undefined
        if (!!userSession) {
            const colRef = user(userSession.uid);
            getDoc(colRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const docData = snapshot.data();
                        setUserData(docData);
                    }
                })
                .catch(err => console.log(err));
        }

        return () => {
            listener();
        }   
    }, [userSession]);

    return userSession === null ? (
            <Loader 
                loadingMsg={'Please wait ..'}
                styling={'text-white-500'}
            />

    ) : (
        <div className='quiz-bg'>
            <div className='container'>
                <Logout />
                <Quiz userData={userData} />
            </div>
        </div>
    )

}

export default Welcome