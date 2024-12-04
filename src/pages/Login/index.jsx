import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      // Login pengguna dengan email dan password
      await signInWithEmailAndPassword(auth, email, password);
       // Simpan email ke localStorage
       localStorage.setItem("Email", email);
      alert("Login berhasil!");
      navigate("/dashboard"); // Arahkan pengguna ke halaman dashboard setelah login
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login gagal. Periksa email dan password Anda.");
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center bg-bgPrimary py-12 px-4">
        <div className="flex items-center justify-center py-6">
          <img src="/img/logoPuskesmas.png" className="w-9" alt="Logo" />
          <h1 className="text-black font-semibold text-[26px]">APLIKASI SPJ</h1>
        </div>
        <div className="w-full border rounded-lg flex flex-col items-center md:w-96 mt-20 bg-white px-4">
          <h1 className="text-[32px] font-bold text-center">Login</h1>
          <div className="w-full px-2">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="bg-green-500 w-full rounded-lg text-white font-semibold mb-5 py-2"
            >
              Login
            </button>
            <div>
              <Link to="/register">
                <p className="text-blue-500 underline text-center">Register</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
