import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from "./pages/Offers";
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route to="/" element={<Explore/>} />
          <Route to="/offers" element={<Offers/>} />
          <Route to="/profile" element={<SignIn/>} />
          <Route to="/sign-in" element={<SignIn/>} />
          <Route to="/sign-up" element={<SignIn/>} />
          <Route to="/forgot-password" element={<SignIn/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
