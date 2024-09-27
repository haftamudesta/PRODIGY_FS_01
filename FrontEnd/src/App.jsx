import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import { Home } from './components/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './components/About'

function App() {
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
