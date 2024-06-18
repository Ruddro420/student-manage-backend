import {
    createBrowserRouter,
} from "react-router-dom";
import Courses from "../pages/Dashboard/Courses";
import MainLayout from "../Layout/MainLayout";
import Register from "../pages/Login/Register";
import Login from "../pages/Login/Login";
import Recording from "../pages/Recording/Recording";
import Resources from "../pages/Resources/Resources";
import Performance from "../pages/Performance/Performance";

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
            {
                path: "/dashboard/recording",
                element: <Recording />,
            },
            {
                path: "/dashboard/resources",
                element: <Resources />,
            },
            {
                path: "/dashboard/performances",
                element: <Performance />,
            },
        ],
    },
]);