import { useContext } from "react"
import { userContext } from "../context/userContext"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { sendFeedBack } from "../api/feedBack"
const schema = yup.object({
    type: yup.string().required("יש לבחור סוג הערה"),
    bookTitle: yup.string().when("type", {
        is: (t: string) => t !== "OTHER",
        then: (s) => s.required("חובה לכתוב שם ספר לשליחת ההערה")
    }),
    message: yup.string().when("type", {
        is: (t: string) => t === "OTHER",
        then: (s) => s.required("חובה לשלוח הודעה עם מלל").max(1000, "לא ניתן לשלוח יותר מ-1000 תוים")
    })
})
export type FeedbackForm = yup.InferType<typeof schema>
function FeedBack() {
    const navigate = useNavigate()
    const { user } = useContext(userContext)
    const { watch, reset, register, handleSubmit, formState: { errors } } = useForm<FeedbackForm>({ resolver: yupResolver(schema) ,shouldUnregister: true })
    const type = watch("type")
    const { mutate, isError, isSuccess, isPending } = useMutation({
        mutationFn: sendFeedBack,
        onSuccess: () => reset()
    })
    const onSubmit = (data: FeedbackForm) => { mutate(data) }
    if (!user)
        return <>
            <h1>הערה לגבאי</h1>
            <p>בשביל לשלוח הודעה לגבאי צריך להיכנס למערכת</p>
            <Link to={"/login"}>כניסה</Link>
        </>
    return <>
        <h1>הערה לגבאי</h1>
        <button className="back" onClick={() => navigate("/")}>חזרה לחיפוש</button>
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("type")}>
                <option value="">בחרו סוג הערה</option>
                <option value="MISPLACED">ספר לא במקום</option>
                <option value="DAMAGED">ספר פגום</option>
                <option value="NEW_BOOK_REQUEST">בקשה לספר חדש</option>
                <option value="OTHER">הערה אחרת</option>
            </select>
            <p>{errors.type?.message}</p>
            {type !== "OTHER" && (<>
            < input type="text" placeholder="שם הספר" {...register("bookTitle")}/>
            <p>{errors.bookTitle?.message}</p></>)
            }
            <textarea {...register("message")} placeholder="פירוט"></textarea>
            <p>{errors.message?.message}</p>
            <button disabled={isPending} type="submit">שליחה</button>
            {isSuccess && <p>תודה! ההערה נשלחה לגבאי</p>}
            {isError && <p>לא הצלחנו לשלוח, נסה שוב</p>}

        </form>

    </>
}
export default FeedBack