import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Landing from './pages/Landing';
import Portfolio from './pages/Portfolio';




function App() {


  return (
    <div>
      <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/portfolio' element={<Portfolio />} />
      </Routes>
      <Footer />
      </Router>
    </div>
  )
}

export default App
