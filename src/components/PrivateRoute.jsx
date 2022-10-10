import {Navigate , Outlet} from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {

    const {loggedIn , checkStatus} = useAuthStatus()
    
    if (checkStatus) {
        return <Spinner/>
    }
    console.log(loggedIn);
    return loggedIn ? <Outlet/> : <Navigate to="/sign-in"/>
}

export default PrivateRoute