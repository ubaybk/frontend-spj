import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { BsClipboardDataFill } from "react-icons/bs";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { DiModernizr } from "react-icons/di";
import { useState } from "react";

const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(false); // State untuk mengontrol visibilitas sub-menu
  const email = localStorage.getItem("Email");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("Email");
      alert("Sudah logout!");
      navigate("/login");
    } catch (error) {
      console.error("Error saat logout:", error);
      alert("Gagal logout.");
    }
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <div className="bg-blue-500 flex flex-col justify-between h-full text-white px-4 py-6 w-72">
      {/* Header Sidebar */}
      <div>
        <div className="mb-16">
          <h1 className="text-xl font-bold">TRACKING SPJ</h1>
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
            <h1 className="hover:underline cursor-pointer">S P J</h1>
          </Link>
          {email === "admin@gmail.com" && (

          <div className="flex flex-col text-2xl">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleSubMenu}
            >
              <DiModernizr />
              <h1 className="hover:underline">P O A</h1>
            </div>
            {showSubMenu && (
              <div className="ml-14 mt-2 flex flex-col gap-3 text-lg">
                <Link to={"/poa"} className="hover:underline">
                  DASHBOARD P O A
                </Link>
                <Link to={"/dataPoa"} className="hover:underline">
                  DATA TAHUNAN P O A
                </Link>
                <Link to={"/inputDataPoa"} className="hover:underline">
                  INPUT DATA P O A
                </Link>
              </div>
            )}
          </div>
          )}
          <div className="flex items-center gap-3 text-2xl">
            <RiLogoutBoxRFill />
            <h1
              onClick={handleLogout}
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
