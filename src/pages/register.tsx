import { useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { userContext } from "../context/userContext"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerRequest } from "../api/auth"
const schema = yup.object({
    fullName: yup.string().min(2, "חובה להכניס לפחות 2 תווים").max(30, "לא קיים שם באורך זה").required("חובה להזין שם מלא"),
    username: yup.string().required("חובה להזין שם משתמש").min(3, "חובה להכניס לפחות 3 תווים").max(30, "שם המשתמש יכול להכיל עד 30 תווים").matches(/^[a-zA-Z0-9._]+$/, "רק אותיות באנגלית, ספרות, נקודה וקו תחתון"),
    password: yup.string().min(8, "הסיסמא חייבת להכיל לפחות 8 תווים").required("חובה להזין סיסמא")
})
export type RegisterData = yup.InferType<typeof schema>
function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({ resolver: yupResolver(schema) })
    const { setUser } = useContext(userContext)
    const navigate = useNavigate()
    const { mutate, isError, isPending } = useMutation({
        mutationFn: registerRequest, onSuccess: (res) => {
            setUser(res.user)
            sessionStorage.setItem("token", res.token)
            navigate("/")
        }
    })
    const onSubmit = (data: RegisterData) => { mutate(data) }
    return <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("fullName")} placeholder="שם מלא" ></input>
        <p>{errors.fullName?.message}</p>
        <input {...register("username")} placeholder="שם משתמש" ></input>
        <p>{errors.username?.message}</p>
        <input {...register("password")} type="password" placeholder=" סיסמא"></input>
        <p>{errors.password?.message}</p>
        {isError && <p>שם המשתמש כבר תפוס, נסה שם אחר</p>}
        <button type="submit" disabled={isPending}>{isPending ? "נרשמים..." : "הרשמה"}</button>
        <Link to="/login">כבר רשום? לכניסה</Link>
    </form>
}
export default Register

