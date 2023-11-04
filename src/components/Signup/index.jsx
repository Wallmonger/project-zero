import { useState } from 'react'; 

const Signup = () => {

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const [loginData, setloginData] = useState(data);

  const handleChange = (e) => {
   
    setloginData({
      ...loginData,
      pseudo: e.target.value,
    });
    console.log(loginData);
  }
  
  const { pseudo, email, password, confirmPassword } = loginData;

  return (
    <div className="signUpLoginBox">
        <div className="slContainer">
            <div className="formBoxLeftSignup">

            </div>
            <div className="formBoxRight">
              <div className="formContent">
                  <h2>Sign Up</h2>
                  <form>
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
                  </form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Signup