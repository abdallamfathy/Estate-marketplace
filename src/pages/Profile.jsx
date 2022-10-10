import {useState , useEffect} from 'react'
import {getAuth} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import {db} from "../firebase.config"
import { updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'



const Profile = () => {
  const [changeDetails , setChangeDetails] = useState(false);

  const auth = getAuth()
  const [formData , setFormData] = useState({
    name : auth.currentUser.displayName,
    email : auth.currentUser.email
  })

  const {name , email} = formData;
  const navigate = useNavigate()
  const onLogout = () => {
    auth.signOut()
    navigate("/")
  }
  
  const onSubmit = () => {
    setChangeDetails(true)
    console.log("haha woman");
  }

  return (
    <div className="Profile">
      <header className='profileHeader'>
        <p>pro</p>
        <button type='button' onClick={onLogout} className="logOut">
          Logout
        </button>
      </header>
  
  <main>
    <div className='profileDetailsHeader'>
    <p className='profileDetailsText'>profile</p>
    <p className='changePersonalDetails' onClick={
      () => {
        changeDetails && onSubmit()
        setChangeDetails((prevState)=>!prevState)
      }
    }> {changeDetails ? "done" : "change"}</p>
    </div>
  </main>

    </div>
  
  )
}

export default Profile