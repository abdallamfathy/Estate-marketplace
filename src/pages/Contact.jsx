import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
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
            const docRef = doc(db, "users" , params.landlordId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setlandlord(docSnap.data())
            }else{
                toast.error("Could not get landlord data")
            }
        }
        getLandlord()
    }, [params.landlordId])
    
    const onChange = (e) => {
        setmessage(e.target.value)
    }

  return (
    <div className='pageContainer'>
        <header>
            <p className="pageHeader">
                Contact Landlord
            </p>
        </header>

        {landlord !== null && (
            <main>
                <div className="contactLandlord">
                    <p className="landlordName">
                        Contact {landlord?.name}
                    </p>
                </div>

                <from className="messageForm">
                    <div className="messageDiv">
                        <label htmlFor="
                        message" className="messageLabel">
                            Message
                        </label>
                        <textarea name="message" id="message" className='textarea' value={message} onChange={onChange}></textarea>
                    </div>

                    <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                        <button type='button' className="primaryButton">
                            Send Message
                        </button>
                    </a>
                </from>
            </main>
        )}
    </div>
  )
}

export default Contact