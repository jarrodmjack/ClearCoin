import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Landing from './pages/Landing';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {


  return (
    <div>
      <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/portfolio' element={<Portfolio />} /> {/* TODO link to nn mern app thing */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
