import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailToken = localStorage.getItem("Email");

  useEffect(() => {
    if (emailToken) {
      navigate("/dashboard");
    }
  }, [emailToken, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("Email", email);
      navigate("/dashboard");
    } catch (error) {
      setError("Login gagal. Periksa email dan password Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bgPrimary to-white flex flex-col items-center justify-center p-4">
      {/* Header dengan Logo */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        <img 
          src="/img/logoPuskesmas.png" 
          className="w-12 h-12 object-contain" 
          alt="Logo"
        />
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
          APLIKASI SPJ
        </h1>
      </div>

      {/* Card Login */}
      <div className="w-full max-w-[560px] bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Selamat Datang</h2>
          <p className="text-sm text-gray-600">Silakan masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-2">
            <div className="relative">
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Masukkan email Anda"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="relative">
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Masukkan password Anda"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg py-2.5 font-medium
                     hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>{isLoading ? "Memproses..." : "Masuk"}</span>
            {!isLoading && (
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            )}
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;