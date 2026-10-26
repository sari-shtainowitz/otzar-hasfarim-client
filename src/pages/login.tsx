import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { login } from "../api/auth"
import { useContext } from "react"
import { userContext } from "../context/userContext"
import { Link, useNavigate } from "react-router-dom"
const schema = yup.object({
    username: yup.string().required("חובה להכניס שם משתמש"),
    password: yup.string().required("חובה להכניס סיסמא")
})

export type LoginData = yup.InferType<typeof schema>
function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({ resolver: yupResolver(schema) })
    const { setUser } = useContext(userContext)
    const navigate = useNavigate()
    const { mutate ,isError, isPending} = useMutation({
        mutationFn: login, onSuccess: (res) => {
            setUser(res.user)
            sessionStorage.setItem("token", res.token)
            navigate('/')
        }
    })
    const onSubmit = (data: LoginData) => { mutate(data) }
    return <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="שם משתמש" ></input>
        <p>{errors.username?.message}</p>
        <input {...register("password")} type="password" placeholder=" סיסמא"></input>
        <p>{errors.password?.message}</p>
        {isError&&<p>שם משתמש או סיסמא שגויים</p>}
        <button type="submit" disabled={isPending}>{isPending ? "נכנסים..." : "כניסה"}</button>
        <Link to="/register">עוד לא רשום? להרשמה</Link>

    </form>

}
export default Login