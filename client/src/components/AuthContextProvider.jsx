import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

function AuthContextProvider({children}){
    const [isAuth, setIsAuth] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [businesses, setBusinesses] = useState([]);
    
    useEffect(() => {
    fetch("/api/business")
        .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch businesses");
        return res.json();
        })
        .then((data) => setBusinesses(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
    // Fetch user and their reviews
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          credentials: "include"
        });
        const data = await res.json();
        setIsAuth(data);
        setReviews(data.posts || []);
      } catch {
        setError("Failed to fetch user data");
      }
    };
    
    fetchUser();
  }, []);
    return (
        <AuthContext.Provider value={{loading, isAuth, businesses, reviews, error, setIsAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export {AuthContext}