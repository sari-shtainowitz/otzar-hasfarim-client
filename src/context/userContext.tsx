import { createContext, useEffect, useState, type ReactNode } from "react"
import { getMe } from "../api/auth";

export interface User {
    id: number,
    fullName: string,
    username: string,
    role: "GABBAI" | "WORSHIPPER"
}

export const userContext = createContext<{ user: User | null; setUser: (user: User | null) => void ;loading:boolean }>({ user: null, setUser: () => { } ,loading:true})
function UserProvider({ children }: { children: ReactNode }) {
    
    const [user, setUser] = useState<User | null>(null);
    const [loading,setLoading]=useState<boolean>(true)
    useEffect(() => {
       const token= sessionStorage.getItem("token")
        if (token){
            getMe(token)
            .then((u:User)=>setUser(u))
            .catch(()=>sessionStorage.removeItem("token"))
            .finally(()=>setLoading(false))
        }
        else
            {setLoading(false)}

    }, [])
    return (
        <userContext.Provider value={{ user, setUser, loading }}>
            {children}
        </userContext.Provider>
    )
}
export default UserProvider