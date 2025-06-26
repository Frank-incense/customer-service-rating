import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import ThemeContextProvider from './components/ThemeContextProvider';

function App() {
  
  return (
    <>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </>
  )
}

export default App
