import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { getCatalog } from "../api/book"

function Print() {
    const navigate = useNavigate()
    const [sort, setSort] = useState("name")
    const { isError, isLoading, data } = useQuery({
        queryKey: ["catalog", sort],
        queryFn: () => getCatalog(sort)
    })
    return <div className="catalog max-w-250 mx-auto pt-5">
        <div className="flex flex-wrap items-center justify-end gap-2.5 print:hidden">
            <button className="back ml-auto" onClick={() => navigate("/")}>חזרה לקטלוג</button>
            <select className="min-h-12 px-4.5 border-[1.5px] border-line rounded-[10px] bg-white/90 text-ink text-[17px] font-semibold font-[inherit]" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="name">לפי שם הספר</option>
                <option value="shelf">לפי מספר מדף</option>
            </select>
            <button className="min-h-12 px-5 rounded-[10px] bg-gold text-white text-[18px] hover:bg-[#735819]" onClick={() => window.print()}>הדפסה</button>
        </div>
        <h1 className="mt-6.5 mb-1 text-[40px] text-center">קטלוג הספרים</h1>
        <p className="mt-0 mb-5 text-center text-muted">בית הכנסת הגדול – חניכי ישיבת חברון · {data?.total} ספרים · {new Date().toLocaleDateString("he-IL")}</p>
        {isLoading && <p>טוען את הקטלוג...</p>}
        {isError && <p>לא ניתן לטעון את הקטלוג</p>}
        <table className="text-[16px]">
            <thead>
                <tr>
                    <th>מדף</th>
                    <th>שם הספר</th>
                    <th>נושא</th>
                    <th>מחבר</th>
                    <th>כמות</th>
                </tr>
            </thead>
            <tbody>
                {data?.items.map((b) => (
                    <tr key={b.id}>
                        <td>{b.shelf ?? "–"}</td>
                        <td>{b.name}</td>
                        <td>{b.subject ?? "–"}</td>
                        <td>{b.author ?? "–"}</td>
                        <td>{b.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}
export default Print
