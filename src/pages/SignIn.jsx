import React, { useState } from 'react';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import { visibilityIcon } from '../assets/svg/visibilityIcon.svg';
import { Link , useNavigate } from 'react-router-dom'


const SignIn = () => {
  const [showPassword , setShowPassword] = useState(false)

  const [formData,  setformData] = useState({
    email: "",
    password: "",
  })
  const {email , password} = formData
  
  const onChange = () => {
    return true
  }

  const navigate = useNavigate();

  return (
    <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">
          Welcome Back!
        </p>
      </header>
      <main>
        <form>
          <input type="email" className="emailInput" placeholder='Email' id="email" value={email} onChange={onChange} />
          <div className="passwordInputDiv">
            <input
            className='passwordInput' type={showPassword ? "text" : "password"}
            id="password"
            placeholder='password'
            value={password}
            onChange={onChange} />
          </div>

          <img src={visibilityIcon} alt="showpassowrd" onClick={setShowPassword((prevState) => !prevState ) } />
        </form>
      </main>
    </div>
    </>
  )
}

export default SignIn