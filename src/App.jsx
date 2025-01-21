import { useRoutes } from "react-router-dom"
import { routes } from "./routes"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const element = useRoutes(routes)

  return (
    element
  )
}

export default App
