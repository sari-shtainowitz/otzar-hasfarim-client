import {  useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { deleteBook, getBooks } from "../api/book"
import { useForm } from "react-hook-form"
import type { searchBook, booksTableProps } from "../types/types"
import { Link, useNavigate } from "react-router-dom"


function BooksTable({ admin }: booksTableProps) {
    const [search, setSearch] = useState<searchBook>({ name: "", subject: "", author: "", shelf: "" })
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { isError, isLoading, data ,fetchNextPage,hasNextPage,isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["books", search],
        queryFn: ({ pageParam }) => getBooks(search, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>lastPage.page<lastPage.totalPages?lastPage.page+1:undefined
    })
    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteBook,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] })
    })
    const { register, handleSubmit } = useForm<searchBook>()
    const onsubmit = (data: searchBook) => setSearch(data)
    return <>
        <form onSubmit={handleSubmit(onsubmit)}>
            <input {...register("name")} placeholder="שם הספר"></input>
            <input {...register("subject")} placeholder="נושא הספר"></input>
            <input {...register("author")} placeholder="שם המחבר"></input>
            <input {...register("shelf")} placeholder=" מס' מדף"></input>
            <button type="submit">חפש</button>
        </form>
        {isLoading && <p>טוען ספרים</p>}
        {isError && <p>לא ניתן לטעון ספרים כרגע</p>}
        <p>{data?.pages[0].total} ספרים </p>
        {admin && <Link to="/admin/books/new">הוספת ספר</Link >}
        <table>
            <thead>
                <tr>
                    <th>מספר מדף</th>
                    <th>שם ספר</th>
                    <th>הנושא</th>
                    <th>שם מחבר</th>
                    {admin && <th>פעולות נוספות</th>}
                </tr>
            </thead>
            <tbody>
                {data?.pages.flatMap((p) => p.items).map((b) => (
                    <tr key={b.id} onClick={admin ? undefined : () => navigate("/book/" + b.id)}>
                        <td>{b.shelf ?? "לא צוין"}</td>
                        <td><Link to={"/book/" + b.id}>{b.name}</Link></td>
                        <td>{b.subject ?? "לא צוין"}</td>
                        <td>{b.author ?? "לא צוין"}</td>
                        {admin && <td><Link to={"/admin/books/" + b.id + "/edit"}>עריכה</Link><button onClick={() => { if (confirm("למחוק את '" + b.name + "' (" + b.quantity + " עותקים)?")) deleteMutate(b.id)}}>מחיקה</button></td>}
            </tr>
                ))}
        </tbody>
    </table >
    {hasNextPage&&<button onClick={() => fetchNextPage()}>{isFetchingNextPage ? "טוען..." : "עוד ספרים"}</button>}
    </>
}
export default BooksTable

