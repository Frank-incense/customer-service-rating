import { createContext, useState } from "react";

const AuthContext = createContext(null)

function AuthContextProvider({children}){
    const [isAuth, setIsAuth] = useState(false)
    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export {AuthContext}