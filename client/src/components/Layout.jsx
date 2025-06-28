import { useContext } from "react"
import NavBar from "./Navbar"
import { ThemeContext } from "./ThemeContextProvider"

import { Outlet } from "react-router-dom"
import { AuthContext } from "./AuthContextProvider"

function Layout(){
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {theme, toggleTheme}  = useContext(ThemeContext)
    return(
        <>
            <NavBar auth={isAuth} theme={theme} setTheme={toggleTheme}/>
            <Outlet context={{isAuth,setIsAuth}}/>
        </>
    )
}

export default Layout