import LandingPages from "../pages/LandingPage";
import Login from "../pages/Login";

export const routes = [
    {
        path: '/',
        element: <LandingPages/>
    },
    {
        path: '/login',
        element: <Login/>
    }
]