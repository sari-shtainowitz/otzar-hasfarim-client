export interface book {
    id: number,
    name: string,
    shelf: string | null,
    subject: string | null,
    author: string | null,
    quantity: number,
    isNew: boolean
}
export interface searchBook {
    name: string,
    subject: string,
    author: string,
    shelf: string
}
export interface feedBack {
    type: string,
    bookTitle?: string,
    message?: string
}
export interface booksTableProps {
    admin?: boolean
}
export interface newBook {
    name: string,
    shelf?: string,
    subject?: string,
    author?: string,
    quantity: number
}
export interface FeedbackItem {
    id: number,
    type: string,
    status: string,
    bookTitle: string | null,
    message: string | null,
    createdAt: string,
    user: {
        fullName: string
    }
}