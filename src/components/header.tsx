import { useContext } from "react"
import { useNavigate,Link, Outlet } from "react-router-dom"
import { userContext } from "../context/userContext"

function Header() {
    const {user,setUser} = useContext(userContext)
    const navigate = useNavigate()
    const logout=()=>{
        setUser(null)
        sessionStorage.removeItem("token")
        navigate("/")
    }
    return (<><header>
        {user==null?"אורח ":user.fullName}
        {user==null&&<Link to="/login">כניסה</Link>}
        {user!=null&&<button onClick={logout}>יציאה</button>}
        {user?.role==="GABBAI"&&<Link to="/admin">הערות המתפללים</Link>}
        {user?.role==="GABBAI"&&<Link to="/admin/print">הדפסת קטלוג</Link>}
        {user?.role!=="GABBAI"&&<Link to={"/newBooks"}>ספרים חדשים</Link>}
        {user?.role!=="GABBAI"&&<Link to={"/feedback"}>הערה לגבאי</Link>}
       
    </header>
        <main>
            <Outlet></Outlet>
        </main>
    </>
    )
}
export default Header