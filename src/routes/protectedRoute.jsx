import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const email = localStorage.getItem("Email")

    if (!email){
        return <Navigate to="/login"/>
    }

    return (
        <>
            {children} <Outlet/>
        </>
    )
}

export default ProtectedRoute