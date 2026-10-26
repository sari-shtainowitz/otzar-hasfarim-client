import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { userContext } from "../context/userContext"

function OnlyGabbay() {
    const { user ,loading} = useContext(userContext)
    if(loading)
        return <p>טוען...</p>
    return <>
        {user?.role === "GABBAI" ? <Outlet /> : <Navigate to="/login" />
        }    </>
}
export default OnlyGabbay