import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteFeedback, getFeedback, updateFeedbackStatus } from "../api/feedBack"
import { useNavigate } from "react-router-dom"
const typeNames: Record<string, string> = {
    MISPLACED: "ספר לא במקום",
    DAMAGED: "ספר פגום",
    NEW_BOOK_REQUEST: "בקשה לספר חדש",
    OTHER: "  "
}
const statusName: Record<string, string> = {
    NEW: "חדש",
    IN_PROGRESS: "בטיפול",
    REJECTED: "נדחה"
}
function Admin() {
    const queryClient = useQueryClient()
    const { isError, isLoading, data } = useQuery({
        queryKey: ["feedback"],
        queryFn: getFeedback

    })
    const { mutate: statusMutate } = useMutation({
        mutationFn: updateFeedbackStatus,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["feedback"] })
    })
    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteFeedback,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["feedback"] })
    })
    const navigate = useNavigate()
    return <>
        <h2>הערות המתפללים</h2>
        {isLoading && <p>טוען הערות...</p>}
        {isError && <p>לא ניתן לטעון הערות</p>}
        {data?.items.length === 0 && <p>אין הערות חדשות</p>}
        <button className="back" onClick={() => navigate("/")}>חזרה לקטלוג</button>

        {data?.items.map((f) => <div key={f.id} className={f.status === "NEW" ? "new" : ""}>
            <p>{typeNames[f.type]}</p>
            <p>{f.bookTitle}</p>
            <p>{f.message}</p>
            <p>{f.user.fullName}</p>
            <p>{statusName[f.status]}</p>
            <div>
                <button onClick={() => statusMutate({ id: f.id, status: "IN_PROGRESS" })}>בטיפול</button>
                <button onClick={() => statusMutate({ id: f.id, status: "REJECTED" })}>נדחה</button>
                <button onClick={() => deleteMutate(f.id)}>טופל ✓</button>
            </div>
        </div>)}
    </>
}
export default Admin