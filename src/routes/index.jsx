
import LandingPages from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./protectedRoute";
import Ruk from "../pages/Ruk";
import Dashboard from "../pages/Dashboard";
import AddRuk from "../pages/AddRuk";
import UpdateRuk from "../pages/UpdateRuk";
import Pengadaan from "../pages/Pengadaan";
import Verifikator from "../pages/Verifikator";
import RukView from "../pages/RukView";
import Poa from "../pages/Poa";
import DataPoa from "../pages/Poa/DataPoa";
import AddPoa from "../pages/Poa/AddTahunanPoa";
import AddTahunanPoa from "../pages/Poa/AddTahunanPoa";


export const routes = [
  {
    path: "/",
    element: <LandingPages />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ruk",
    element: (
      <ProtectedRoute>
        <Ruk />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addruk",
    element: (
      <ProtectedRoute>
        <AddRuk />
      </ProtectedRoute>
    ),
  },
  {
    path: "/updateruk/:id",
    element: (
      <ProtectedRoute>
        <UpdateRuk />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pengadaan",
    element: (
      <ProtectedRoute>
        <Pengadaan />
      </ProtectedRoute>
    ),
  },
  {
    path: "/verifikator",
    element: (
      <ProtectedRoute>
        <Verifikator />
      </ProtectedRoute>
    ),
  },
  {
    path: "/rukview",
    element: (
      <ProtectedRoute>
        <RukView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/poa",
    element: (
      <ProtectedRoute>
        <Poa />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dataPoa",
    element: (
      <ProtectedRoute requiredEmail="admin@gmail.com">
        <DataPoa/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addTahunanPoa",
    element: (
      <ProtectedRoute requiredEmail="admin@gmail.com">
        <AddTahunanPoa />
      </ProtectedRoute>
    ),
  },
  
];
