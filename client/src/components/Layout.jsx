import { useContext } from "react"
import NavBar from "./Navbar"
import { ThemeContext } from "./ThemeContextProvider"

import { Outlet } from "react-router-dom"

function Layout(){
    const {theme, toggleTheme}  = useContext(ThemeContext)
    return(
        <>
            <NavBar theme={theme} setTheme={toggleTheme}/>
            <Outlet/>
        </>
    )
}

export default Layout