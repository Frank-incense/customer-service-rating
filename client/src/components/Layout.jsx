import { useContext } from "react"
import NavBar from "./Navbar"
import { ThemeContext } from "./ThemeContextProvider"

function Layout(){
    const {theme, toggleTheme}  = useContext(ThemeContext)
    console.log(theme, toggleTheme)
    return(
        <>
            <NavBar theme={theme} setTheme={toggleTheme}/>
        </>
    )
}

export default Layout