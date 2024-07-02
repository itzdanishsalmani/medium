import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './Components/Pages/Signup'
import { Signin } from './Components/Pages/Signin'
import { CreateBlog } from './Components/Pages/CreateBlog'
import { AllBlogs } from './Components/Pages/AllBlogs'
import { SpecificBlog } from './Components/Pages/SpecificBlog'
import { RootPage } from './Components/Pages/RootPage'
import { MyBlogs } from './Components/Pages/MyBlogs'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={ <Signin /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/create" element={ <CreateBlog /> } />
          <Route path="/all" element={ <AllBlogs/> } />
          <Route path='/blogs/' element={ <SpecificBlog/> } />
          <Route path='/' element={ <RootPage/> } />
          <Route path='/my' element={ <MyBlogs/> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
