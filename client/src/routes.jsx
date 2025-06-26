import {createBrowserRouter} from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/Home'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children:[
            {path:'login', element:<Login/>},
            {path:'register', element:<Register/>},
            {path:'', element:<HomePage/>}

        ],
        errorElement:<></>
    }
])