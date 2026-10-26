import axios from "axios";
import { type LoginData } from "../pages/login";
import { type User } from "../context/userContext";
import type { RegisterData } from "../pages/register";


export const login = async (data: LoginData) => {
    const res = await axios.post<{ token: string, user: User }>(import.meta.env.VITE_API_URL + '/auth/login', data)
    return res.data
}

export const registerRequest = async (data: RegisterData) => {
    const res = await axios.post<{ token: string, user: User }>(import.meta.env.VITE_API_URL + '/auth/register', data)
    return res.data
}
export const getMe = async (token: string) => {
    const res = await axios.get<{ user: User }>(import.meta.env.VITE_API_URL + '/auth/me', {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return res.data.user
}