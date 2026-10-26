import { Link } from "react-router-dom"

function NotFound() {
    return <div className="max-w-120 mx-auto mt-[20vh] px-6 text-center">
        <h1 className="text-[40px] mb-2">הדף לא נמצא</h1>
        <p className="text-muted mb-6">ייתכן שהכתובת שגויה או שהדף הוסר</p>
        <Link to="/" className="back inline-flex items-center no-underline">חזרה לדף הבית</Link>
    </div>
}
export default NotFound
