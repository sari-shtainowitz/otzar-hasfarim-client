import { useContext } from "react"
import BooksTable from "../components/bookstable"
import { userContext } from "../context/userContext"


function Search() {
    const { user } = useContext(userContext)
    return (
        <BooksTable admin={user?.role === "GABBAI"} />
    )
}
export default Search