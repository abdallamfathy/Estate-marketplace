import {useState , useEffect} from 'react'
import {getAuth} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import {db} from "../firebase.config"
import { updateDoc } from 'firebase/firestore'
import { getAuth , updateProfile } from 'firebase/auth'



const Profile = () => {
  
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
    
  return (
    <div className="Profile">
      <header className='profileHeader'>
        <button type='button' onClick={onLogout} className="logOut">
          Logout
        </button>
      </header>
    </div>
  )
}

export default Profile