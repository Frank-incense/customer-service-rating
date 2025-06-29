import {createBrowserRouter} from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/Home'
import Review from './pages/Review'
import AddReviewPage from './pages/AddReview'
import BusinessReview from './pages/BusinessReview'
import UserProfile from './pages/UserProfile'
import BusinessDashboard from './pages/Dashboard'
import UserReviews from './pages/UserReviews'
import BusinessEditForm from './components/BusinessEdit'
import ProtectedRoute from './components/ProtectedRoute'

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
            {path:'/add-review', element:<AddReviewPage/>},
            {path:'user/profile',element:<UserProfile/>},
            {path:'/dashboard', element:<BusinessDashboard/>},
            {path:'/dashboard/edit', element:<BusinessEditForm/>},
            {path:'/reviews/user', element:<UserReviews/>},
            {
                path: "add-review",
                element: (
                <ProtectedRoute role='user'>
                    <AddReviewPage />
                </ProtectedRoute>
                ),
            },
            {
                path: "user/profile",
                element: (
                <ProtectedRoute role='user'>
                    <UserProfile />
                </ProtectedRoute>
                ),
            },
            {
                path: "reviews/user",
                element: (
                <ProtectedRoute>
                    <UserReviews />
                </ProtectedRoute>
                ),
            },

            // 🔒 Business-only routes
            {
                path: "dashboard",
                element: (
                <ProtectedRoute role="business">
                    <BusinessDashboard />
                </ProtectedRoute>
                ),
            },
            {
                path: "dashboard/edit",
                element: (
                <ProtectedRoute role="business">
                    <BusinessEditForm />
                </ProtectedRoute>
                ),
            },
        ],  
        errorElement:<></>
    },
])