import { useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../../firebaseConfig";
import Header from "../../components/header";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";



const AddRuk = () => {
  const [tempatTugas, setTempatTugas] = useState("");
  const [pjProgram, setPjProgram] = useState("");

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("User not logged in!");
      return;
    }

    try {
      // Tambahkan data ke subkoleksi "ruk_data"
      await addDoc(collection(db, "ruk_data"), {
        tempatTugas,
        pjProgram,
        createdBy: user.email,
        createdAt: serverTimestamp(), // Waktu server
        userId: user.uid, // Untuk filter data berdasarkan pengguna
      });

      alert("Data berhasil ditambahkan!");
      setTempatTugas("");
      setPjProgram("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Gagal menambahkan data.");
    }
  };

  return (
    <>
      <div className="flex">
        <Header />
        <div className="p-4">
            <Link to={'/ruk'}>
          <div className=" flex items-center cursor-pointer hover:underline">
            <IoIosAddCircle className="text-[25px]" />
            <h1>Tambah Data Perencanaan</h1>
          </div>
            </Link>
          <div>
            <h1>Tempat Tugas</h1>
            <input
              type="text"
              placeholder="Masukkan tempat tugas"
              value={tempatTugas}
              onChange={(e) => setTempatTugas(e.target.value)}
            />
          </div>
          <div>
            <h1>PJ Program</h1>
            <input
              type="text"
              placeholder="Masukkan PJ program"
              value={pjProgram}
              onChange={(e) => setPjProgram(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </>
  );
};

export default AddRuk;
