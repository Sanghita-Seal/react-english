import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/Layout'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx' 
import User from './components/User/User.jsx'   
import Github, {githubInfoLoader} from './components/Github/Github.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    < Route path="/" element={<Layout/>} >
      <Route path="" element={<Home/>}  />
      <Route path="about" element={<About/>}  />
      <Route path="contact" element={<Contact/>}  />
      <Route 
        path="github" 
        element={<Github/>}  
        loader={githubInfoLoader}
      />
      <Route path="user/" element={<User/>}  >
        <Route path=":userid" element={<User/>} />  
      </Route>
      <Route path="*" element={<div className='bg-red-500 text-white text-center text-3xl py-9'>404 Not Found</div>}  ></Route>
    </Route>
  )

)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
