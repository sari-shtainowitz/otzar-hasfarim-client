import axios from "axios";
import type { feedBack, FeedbackItem } from "../types/types";

export const sendFeedBack = async (data: feedBack) => {
    const token = sessionStorage.getItem("token")
    const res = await axios.post(import.meta.env.VITE_API_URL + "/feedBack", data, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return res.data
}
export const getFeedback = async () => {
    const token = sessionStorage.getItem("token")
    const res = await axios.get<{ items: FeedbackItem[], total: number }>(import.meta.env.VITE_API_URL + "/feedback", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return res.data
}
export const deleteFeedback = async (id: number) => {
    const token = sessionStorage.getItem("token")
    const res = await axios.delete(import.meta.env.VITE_API_URL + "/feedback/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return res.data
}
export const updateFeedbackStatus = async ({ id, status }: { id: number, status: string }) => {
    const token = sessionStorage.getItem("token")
    const res = await axios.patch(import.meta.env.VITE_API_URL + "/feedback/" + id + "/status",{status} ,{
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return res.data
}