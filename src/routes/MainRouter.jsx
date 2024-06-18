import {
    createBrowserRouter,
} from "react-router-dom";
import Courses from "../pages/Dashboard/Courses";
import MainLayout from "../Layout/MainLayout";
import Register from "../pages/Login/Register";
import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <MainLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Courses />,
            },
        ],
    },
]);