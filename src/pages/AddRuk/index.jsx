import { useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../../firebaseConfig";
import Header from "../../components/header";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const AddRuk = () => {
  const [tempatTugas, setTempatTugas] = useState("");
  const [pokja, setPokja] = useState("");
  const [kegiatan, setKegiatan] = useState ("")
  const [subKegiatan, setSubKegiatan] = useState("")

  const optionsTugas = [
    "Puskesmas Cilandak",
    "PUSTU Pondok Labu",
    "PUSTU Cilandak Barat",
    "PUSTU Lebak Bulus",
    "PUSTU Gandaria Selatan",
    "PUSTU Cipete Selatan",
  ];

  const optionPokja = [
    "Admen",
    "UKP",
    "UKM"
  ]

  const optionKegiatan = [
    "Pengumpulan Data",
    "Pengumpulan Rizal",
    "Pengumpulan Anggy"
  ]
  const optionSubKegiatan = [
    "Kegiatan 1",
    "Kegiatan 2",
    "Kegiatan 3"
  ]

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
        pokja,
        kegiatan,
        subKegiatan,
        createdBy: user.email,
        createdAt: serverTimestamp(), // Waktu server
        userId: user.uid, // Untuk filter data berdasarkan pengguna
      });

      alert("Data berhasil ditambahkan!");
      setTempatTugas("");
      setPokja("");
      setKegiatan("")
      setSubKegiatan("")
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
          <Link to={"/ruk"}>
            <div className=" flex items-center cursor-pointer hover:underline">
              <IoIosAddCircle className="text-[25px]" />
              <h1>Tambah Data Perencanaan</h1>
            </div>
          </Link>
          <div className="grid grid-cols-3 gap-5 border p-2">
          <div>
            <h1>Tempat Tugas</h1>
            <select
              value={tempatTugas}
              onChange={(e) => setTempatTugas(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="" disabled>
                Pilih tempat tugas
              </option>
              {optionsTugas.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {/* {tempatTugas && (
              <p className="mt-2">Tempat tugas yang dipilih: {tempatTugas}</p>
            )} */}
          </div>
          <div>
            <h1>Pokja</h1>
            <select
              value={pokja}
              onChange={(e) => setPokja(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="" disabled>
                Pilih Pokja
              </option>
              {optionPokja.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1>Kegiatan</h1>
            <select
              value={kegiatan}
              onChange={(e) => setKegiatan(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="" disabled>
                Pilih Kegiatan
              </option>
              {optionKegiatan.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1>Sub Kegiatan</h1>
            <select
              value={subKegiatan}
              onChange={(e) => setSubKegiatan(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="" disabled>
                Pilih Sub Kegiatan
              </option>
              {optionSubKegiatan.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
         
          

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
