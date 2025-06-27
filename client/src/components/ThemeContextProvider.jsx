import { createContext, useState } from "react";

const ThemeContext = createContext()

function ThemeContextProvider({children}){
    
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider
export {ThemeContext}
