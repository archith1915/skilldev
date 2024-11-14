import './App.css'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'
import { Route, Routes } from 'react-router-dom'
import { Link } from'react-router-dom'


function App() {
  return (
    <>
      <h1>Hello world</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      
      <nav>
        <ul>
          <li><Link to = "/">Home</Link></li>
          <li><Link to = "/about">About us</Link></li>
          <li><Link to = "/contact">Contact Us</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default App
