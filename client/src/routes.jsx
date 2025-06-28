import {createBrowserRouter} from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/Home'
import Review from './pages/Review'
import AddReviewPage from './pages/AddReview'
import BusinessReview from './pages/BusinessReview'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children:[
            {path:'login', element:<Login/>},
            {path:'register', element:<Register/>},
            {path:'', element:<HomePage/>},
            {path:'reviews', element:<Review/>},
            {path:'reviews/:slug', element:<BusinessReview/>},
            {path:'/add-review', element:<AddReviewPage/>}
        ],
        errorElement:<></>
    }
])