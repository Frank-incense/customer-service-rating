import { useContext } from "react"
import NavBar from "./Navbar"
import { ThemeContext } from "./ThemeContextProvider"
import { AuthContext } from "./AuthContextProvider"
import { Outlet } from "react-router-dom"

function Layout(){
    const {theme, toggleTheme}  = useContext(ThemeContext)
    const {isAuth, setIsAuth} = useContext(AuthContext)
    return(
        <>
            <NavBar theme={theme} setTheme={toggleTheme}/>
            <Outlet/>
        </>
    )
}

export default Layout