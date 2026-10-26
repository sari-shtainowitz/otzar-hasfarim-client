import { createBrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Admin from "./pages/admin";
import Book from "./pages/book";
import BookForm from "./pages/BookForm";
import FeedBack from "./pages/feedback";
import Login from "./pages/login";
import NewBooks from "./pages/newBooks";
import NotFound from "./pages/notFound";
import Register from "./pages/register";
import Search from "./pages/search";
import App from "./App";
import OnlyGabbay from "./components/onlyGabbai";
import Print from "./pages/print";
import UserProvider from "./context/userContext";

export const route=createBrowserRouter([
    {
    path:'/',
    element:<UserProvider><App/></UserProvider>,
    children:[
        {
            element:<Header/>,
            children:
            [
                    {path:'book/:id',element:<Book/>},
                    {path:'admin',element:<OnlyGabbay/>,children:[
                        {index:true,element:<Admin/>},
                        {path:'books/new',element:<BookForm/>},
                        {path:'books/:id/edit',element:<BookForm/>},
                        {path:'print',element:<Print/>}
                    ]},
                    {path:'feedback',element:<FeedBack/>},
                    {path:'newBooks',element:<NewBooks/>},
                    {path:'/',element:<Search/>},
                    
            ],
        },
        {path:'login',element:<Login/>},
        {path:'register',element:<Register/>},
        {path:'*',element:<NotFound/>},
    ],
},
])