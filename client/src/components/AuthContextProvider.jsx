import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

function AuthContextProvider({children}){
    const [isAuth, setIsAuth] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [businesses, setBusinesses] = useState([]);
    const [posts, setPosts] = useState([])
    
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
    fetch("/api/posts")
        .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch businesses");
        return res.json();
        })
        .then((data) => setPosts(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
    
        const fetchUser = async () => {
          try {
            const res = await fetch("/api/user/profile", {
              credentials: "include"
            });
            const data = await res.json();
            if (!data.msg){
                setIsAuth(data);
                setReviews(data.posts || []);
            }
            
          } catch {
            setError("Failed to fetch user data");
          }
        };
        console.log('fetching userdata')
        fetchUser();
    }, []);

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const logout = async () => {
      const csrfToken = getCookie("csrf_access_token");
        try {
            const res = await fetch("/api/logout", {
                method: "POST",
                headers:{
                   "X-CSRF-TOKEN": csrfToken,
                },
                credentials: "include", 
            });

            if (res.ok) {
                setIsAuth(null);
                setReviews([]); 
                localStorage.removeItem("role");
                localStorage.removeItem("isAuth");
            } else {
                const errData = await res.json();
                setError(errData.msg || "Logout failed");
            }
        } catch {
            setError("Failed to logout user");
        }
        };


    return (
        <AuthContext.Provider value={{logout, getCookie, posts, loading, isAuth, businesses, reviews, error, setIsAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export {AuthContext}