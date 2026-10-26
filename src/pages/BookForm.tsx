import { yupResolver } from "@hookform/resolvers/yup"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import *as yup from "yup"
import { addBook, getBook, updateBook } from "../api/book"
import { useEffect } from "react"
const schema = yup.object({
    name: yup.string().required("חובה לכתוב שם ספר").max(200, "שם הספר יכול להכיל עד 200 תווים"),
    shelf: yup.string().max(30, "מספר המדף יכול להכיל עד 30 תווים"),
    subject: yup.string().max(200, "הנושא יכול להכיל עד 200 תווים"),
    author: yup.string().max(120, "שם המחבר יכול להכיל עד 120 תווים"),
    quantity: yup.number().typeError("כמות חייבת להיות מספר").integer("כמות חייבת להיות מספר שלם").min(1, "הכמות חייבת להיות לפחות 1").max(999, "הכמות יכולה להיות עד 999").required("חובה לכתוב כמות")
})

export type BookFormData = yup.InferType<typeof schema>
function BookForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = id !== undefined
    const { data } = useQuery({
        queryKey: ["book", id],
        queryFn: () => getBook(id!),
        enabled: isEdit
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm<BookFormData>({ resolver: yupResolver(schema), defaultValues: { quantity: 1 } })
    useEffect(() => {
        if (data) {
            reset({
                name: data.book.name,
                shelf: data.book.shelf ?? "",
                subject: data.book.subject ?? "",
                author: data.book.author ?? "",
                quantity: data.book.quantity
            })
        }
    },[data])

    const queryClient = useQueryClient()
    const { mutate, isError, isPending } = useMutation({
        mutationFn: isEdit?(d:BookFormData)=>updateBook(id!,d):addBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] })
            queryClient.invalidateQueries({ queryKey: ["newBooks"] })
            queryClient.invalidateQueries({ queryKey: ["book", id] })
            navigate("/")
        }
    })
    const onsubmit = (data: BookFormData) => mutate(data)
    return <>
        <h1>{isEdit ? "עריכת ספר" : "הוספת ספר"}</h1>
        <button className="back" onClick={() => navigate("/")}>חזרה לקטלוג</button>

        <form onSubmit={handleSubmit(onsubmit)}>
            <input {...register("name")} placeholder="שם הספר" />
            <p>{errors.name?.message}</p>
            <input {...register("shelf")} placeholder="מספר מדף" />
            <p>{errors.shelf?.message}</p>
            <input {...register("subject")} placeholder="נושא" />
            <p>{errors.subject?.message}</p>
            <input {...register("author")} placeholder="שם המחבר" />
            <p>{errors.author?.message}</p>
            <input {...register("quantity")} type="number" placeholder="כמות" />
            <p>{errors.quantity?.message}</p>
            <button type="submit" disabled={isPending}>{isPending ? "שומר..." : "שמירה"}</button>
        </form>
        {isError && <p>הספר לא נשמר </p>}

    </>
}
export default BookForm

