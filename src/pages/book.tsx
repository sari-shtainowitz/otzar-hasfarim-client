import { useQuery } from "@tanstack/react-query"
import { useNavigate,Link, useParams } from "react-router-dom"
import { getBook } from "../api/book"

function Book() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { isError, isLoading, data } = useQuery({
        queryKey: ["book", id],
        queryFn: () => getBook(id!)
    })
    return <>
        {isError && <p>לא ניתן לטעון ספר זה כרגע</p>}
        {isLoading && <p>בטעינה</p>}
        <h1>{data?.book.name}</h1>
        <p>מדף: {data?.book.shelf ?? "לא צוין"}</p>
        <p>נושא הספר: {data?.book.subject ?? "לא צוין"}</p>
        <p>שם המחבר: {data?.book.author ?? "לא צוין"}</p>
        <p>כמות: {data?.book.quantity}</p>
        <h2>ספרים נוספים במדף</h2>
        {data?.sameShelf.map((s)=>(<p key={s.id}><Link to={"/book/"+s.id} replace>{s.name}</Link></p>))}
        <button className="back" onClick={() => navigate("/")}>חזרה לחיפוש</button>
    </>
}
export default Book