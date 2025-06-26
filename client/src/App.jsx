import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import ThemeContextProvider from './components/ThemeContextProvider';
import AuthContextProvider from './components/AuthContextProvider';

function App() {
  
  return (
    <>
      <AuthContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={router} />
        </ThemeContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
