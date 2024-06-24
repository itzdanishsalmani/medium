import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './Components/Pages/Signup'
import { Signin } from './Components/Pages/Signin'
import { Blog } from './Components/Pages/Blog'
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={ <Signin /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/blog" element={ <Blog /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
