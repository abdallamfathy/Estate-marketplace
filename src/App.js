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
        </Routes>
      </Router>
    </>
  );
}

export default App;
