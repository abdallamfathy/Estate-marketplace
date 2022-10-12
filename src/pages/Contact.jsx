import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'

const Contact = () => {

    const [message, setmessage] = useState("")
    const [landlord, setlandlord] = useState(null)
    const [searchParams, setsearchParams] = useSearchParams()
    const params = useParams()

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, " users" , params.landlordId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setlandlord(docSnap.data)
            }else{
                toast.error("Could not get landlord data")
            }
        }
        getLandlord()
    }, [params.landlordId])
    
  return (
    <div>Contact</div>
  )
}

export default Contact