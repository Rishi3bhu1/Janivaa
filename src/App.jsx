import Home from './pages/Home.jsx'
import { RouterProvider } from 'react-router-dom'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Services from './pages/Services.jsx'
import Layout from './Layout.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Blogs from './pages/Blogs.jsx'
import {useState,useEffect} from "react"
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'about',
          element:<About/>
        },
        {
          path:'services',
          element:<Services/>
        },
        {
          path:'contact-us',
          element:<Contact/>
        },
        {
          path:'blogs',
          element:<Blogs/>
        }
      ]
    }
  ])
    return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center absolute z-100 h-dvh w-screen overflow-hidden">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </main>
    )
  }

export default App
