import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { BsClipboardDataFill } from "react-icons/bs";
import { RiLogoutBoxRFill } from "react-icons/ri";

const Header = () => {
  const email = localStorage.getItem("Email");
  const navigate = useNavigate();

  const hanldeLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("Email");
      alert("udah logout cooy");
      navigate("/login");
    } catch (error) {
      console.error("Error saat logout:", error);
      alert("Gagal logout.");
    }
  };
  return (
    <div className="bg-blue-500 flex flex-col justify-between h-full  text-white  px-4 py-6  w-72">
      {/* Header Sidebar */}
      <div>
        <div className="mb-16">
          <h1 className="text-xl font-bold">SPJ</h1>
          <h1 className="text-lg">Welcome, {email}</h1>
        </div>
        {/* Konten Utama */}
        <div className="flex flex-col gap-10">
          <Link to={"/dashboard"} className="flex items-center gap-3 text-2xl">
            <MdDashboardCustomize />
            <h1 className="hover:underline cursor-pointer">Dashboard</h1>
          </Link>
          <Link to={"/ruk"} className="flex items-center gap-3 text-2xl">
            <BsClipboardDataFill />
            <h1 className="hover:underline cursor-pointer">R U K</h1>
          </Link>
          {/* <Link to={"/ruk"}>
          <h1 className="hover:underline cursor-pointer ">RUK</h1>
        </Link> */}
          <div className="flex items-center gap-3 text-2xl">
            <RiLogoutBoxRFill />
            <h1
              onClick={hanldeLogout}
              className="text-red-400 cursor-pointer hover:underline"
            >
              Logout
            </h1>
          </div>
        </div>
      </div>

      {/* Footer (Opsional) */}
      <div className="text-sm text-gray-200">
        <p>&copy; 2024 UbayBk</p>
      </div>
    </div>
  );
};

export default Header;
