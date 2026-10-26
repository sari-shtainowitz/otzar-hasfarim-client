import { useQuery } from "@tanstack/react-query"
import { getNewBooks } from "../api/book"
import { Link, useNavigate } from "react-router-dom"

function NewBooks() {
    const navigate =useNavigate()
    const { isError, isLoading, data } = useQuery({
        queryKey: ["newBooks"],
        queryFn: getNewBooks
    })
    return <>
        {isError && <p>לא ניתן להציג ספרים חדשים</p>}
        {isLoading && <p>טוען ספרים חדשים</p>}
        <h1>ספרים חדשים</h1>
        <p>נוספו ב־{data?.days} הימים האחרונים</p>
        {data?.items.length === 0 &&<p>לא נוספו ספרים חדשים לאחרונה</p>}
        <button className="back" onClick={() => navigate("/")}>חזרה לחיפוש</button>
        <table>
            <thead>
                <tr>
                    <th>מספר מדף</th>
                    <th>שם ספר</th>
                    <th>הנושא</th>
                    <th>שם מחבר</th>
                </tr>
            </thead>
            <tbody>
                {data?.items.map((b) => (
                    <tr key={b.id} onClick={() => navigate("/book/" + b.id)}>
                        <td>{b.shelf ?? "לא צוין"}</td>
                        <td><Link to={"/book/" + b.id}>{b.name}</Link></td>
                        <td>{b.subject ?? "לא צוין"}</td>
                        <td>{b.author ?? "לא צוין"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}
export default NewBooks