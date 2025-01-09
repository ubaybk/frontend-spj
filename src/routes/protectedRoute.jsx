import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, requiredEmail }) => {
  const email = localStorage.getItem("Email");

  if (!email) {
    // Jika tidak ada email, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  if (requiredEmail && email !== requiredEmail) {
    // Jika email tidak sesuai dengan requiredEmail, arahkan ke halaman dashboard
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      {children} <Outlet />
    </>
  );
};

export default ProtectedRoute;
