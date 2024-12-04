import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../../firebaseConfig"
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate()

  const handleRegister = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      await setDoc(doc(db, "users", userId), { name, email, password });
      navigate("/login");
      alert("User registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to register user.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <input
        className="w-full mb-2 p-2 border"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full mb-2 p-2 border"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full mb-2 p-2 border"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full p-2 bg-blue-500 text-white rounded"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
