import axios from "axios"
import { type book, type newBook, type searchBook } from "../types/types"

export const getBooks = async (search: searchBook,page: number) => {
    const res = await axios.get<{ items: book[], total: number ,page:number,totalPages:number}>(import.meta.env.VITE_API_URL + "/books", {
        params: { ...search, pageSize: 50,page }
    })
    return res.data
}
export const getBook = async (id: string) => {
    const res = await axios.get<{ book: book, sameShelf: book[] }>(import.meta.env.VITE_API_URL + "/books/" + id)
    return res.data
}
export const getNewBooks = async () => {
    const res = await axios.get<{ days: number, items: book[] }>(import.meta.env.VITE_API_URL + "/books/new")
    return res.data
}

export const getCatalog = async (sort: string) => {
    const token = sessionStorage.getItem("token")
    const res = await axios.get<{ total: number, items: book[] }>(import.meta.env.VITE_API_URL + "/books/catalog", {
        params: { sort },
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return res.data
}

export const deleteBook = async (id: number) => {
    const token = sessionStorage.getItem("token")
    const res = await axios.delete(import.meta.env.VITE_API_URL + "/books/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return res.data
}
export const addBook = async (data:newBook) => {
    const token = sessionStorage.getItem("token")
    const res = await axios.post<{book:book,merged:boolean}>(import.meta.env.VITE_API_URL + "/books", data, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return res.data
}

export const updateBook=async(id:string,data:newBook)=>{
    const token = sessionStorage.getItem("token")
    const res=await axios.put(import.meta.env.VITE_API_URL+"/books/"+id,data,{
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return res.data
}