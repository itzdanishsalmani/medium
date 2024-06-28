import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './Components/Pages/Signup'
import { Signin } from './Components/Pages/Signin'
import { CreateBlog } from './Components/Pages/CreateBlog'
import { AllBlogs } from './Components/Pages/AllBlogs'
import { SpecificBlog } from './Components/Pages/SpecificBlog'
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={ <Signin /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/blog" element={ <CreateBlog /> } />
          <Route path="/" element={ <AllBlogs/> } />
          <Route path='/blogs/' element={ <SpecificBlog/> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
