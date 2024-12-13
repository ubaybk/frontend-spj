import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../../../firebaseConfig";
import Header from "../../components/header";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
// import Pengadaan from "../Pengadaan";
// import Verifikator from "../Verifikator";
// import KapusKaTu from "../KapusKaTu";
// import Scann from "../Scann";
import Bendahara from "../Bendahara";
// import SPJDone from "../SPJDone";
import useHandleStatusChange from "../../Hooks/Pengadaan/useHandleStatusChange";
import useHandleStatusChangeVerifikator from "../../Hooks/Verifikator/useHandleStatusChangeVerifikator";
import useHandleStatusScann from "../../Hooks/Scann/useHandleStatusScann";
import useHandleStatusTddKapus from "../../Hooks/KapusKaTu/useHandleStatusTddKapus";
import useHandleStatusBendahara from "../../Hooks/Bendahara/useHandleStatusBendahara";


const Ruk = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [rukData, setRukData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingVerifikator, setEditingVerifikator] = useState(null);
  const [editingKapusKaTu, setEditingKapusKaTu] = useState(null);
  const [editingScann, setEditingScann] = useState(null);
  const [editingBendahara, setEditingBendahara] = useState(null);
  const [keterangan, setKeterangan] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [keteranganVerifikator, setKeteranganVerifikator] = useState("");
  const [keteranganKapusKaTu, setKeteranganKapusKaTu] = useState("");
  const [keteranganScann, setKeteranganScann] = useState("");
  const [keteranganBendahara, setKeteranganBendahara] = useState("");
  const { handleStatusChange, handleSave } = useHandleStatusChange(setRukData, isAdmin, setEditingId, setKeterangan);
  const { handleStatusChangeVerifikator, handleSaveVerifikator } = useHandleStatusChangeVerifikator(setRukData, isAdmin, setEditingVerifikator, setKeteranganVerifikator);
  const { handleStatusChangeKapusKaTu, handleSaveKapusKaTu } = useHandleStatusTddKapus(setRukData, isAdmin, setEditingKapusKaTu, setKeteranganKapusKaTu);
  const { handleStatusChangeScann, handleSaveScann } = useHandleStatusScann(setRukData, isAdmin, setEditingScann, setKeteranganScann);
  const { handleStatusChangeBendahara, handleSaveBendahara } = useHandleStatusBendahara(setRukData, isAdmin, setEditingBendahara, setKeteranganBendahara);

 

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Number of items per page

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        setUserEmail(email);

        setIsAdmin(email === "admin@gmail.com");

        // Ambil data pengguna dari Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        } else {
          console.error("User document not found in Firestore.");
        }

        // Ambil semua data RUK dari Firestore untuk pengguna ini
        try {
          let rukQuery;
          if (email === "admin@gmail.com") {
            rukQuery = collection(db, "ruk_data");
          } else {
            rukQuery = query(
              collection(db, "ruk_data"),
              where("userId", "==", user.uid)
            );
          }
          const rukSnapshot = await getDocs(rukQuery);

          const rukList = rukSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setRukData(rukList); // Simpan semua dokumen di state
        } catch (error) {
          console.error("Error fetching RUK data: ", error);
        }
      } else {
        console.log("User is not logged in.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (id, currentData) => {
    navigate(`/updateruk/${id}`, { state: currentData });
  };

  const handleDelete = async (id) => {
    try {
      const rukDocRef = doc(db, "ruk_data", id);
      await deleteDoc(rukDocRef);
      setRukData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting RUK data: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter data berdasarkan search term
  const filteredData = rukData.filter((item) =>
    item.aktivitas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Untuk status pengadaan
  const handleStatusChangePengadaan = (id, newStatus) => 
    handleStatusChange(id, newStatus);

  // Untuk menyimpan keterangan
  const saveKeterangan = (id) => 
    handleSave(id, keterangan);

  //VERIFIKATOR
  const handleStatusChangeVerif = (id, newStatusVerifikator) => 
    handleStatusChangeVerifikator(id, newStatusVerifikator)
  const saveKeteranganVerifikator = (id) => 
    handleSaveVerifikator(id, keteranganVerifikator);
 
  //KAPUS KATU
  const handleStatusChangeTTD = (id, newStatusKapusKaTu) => 
    handleStatusChangeKapusKaTu(id, newStatusKapusKaTu)
  const saveKeteranganKapusKaTu = (id) => 
    handleSaveKapusKaTu(id, keteranganKapusKaTu);

  //SCANN
  const handleStatusChangeScan = (id, newStatusScann) => 
    handleStatusChangeScann(id, newStatusScann)
  const saveKeteranganScann = (id) => 
    handleSaveScann(id, keteranganScann);
  
  //BENDAHARA
  const handleStatusChangeBen = (id, newStatusBendahara) => 
    handleStatusChangeBendahara(id, newStatusBendahara)
  const saveKeteranganBendahara = (id) => 
    handleSaveBendahara(id, keteranganBendahara);

  // Fungsi untuk mengecek apakah semua status sesuai kondisi
  const isStatusComplete = (item) => {
    return (
      item.status === "Terima Pengadaan" &&
      item.statusBendahara === "Sudah DiBayar" &&
      item.statusKapusKaTu === "Sudah TTD" &&
      item.statusScann === "Sudah Scann" &&
      item.statusVerifikator === "Terima Verifikator"
    );
  };

  

 
  return (
    <>
      <div className="flex">
        <div className="">

        <Header />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Link to={"/addruk"}>
                <div className=" flex items-center cursor-pointer hover:underline bg-blue-400 rounded-xl p-2 text-white">
                  <IoIosAddCircle className="text-[25px]" />
                  <h1>Tambah Data Perencanaan</h1>
                </div>
              </Link>
            </div>
            <div className="text-blue-500">
              {userName ? (
                <>
                  <p>Selamat datang, {userName}!</p>
                  <p>Email Anda: {userEmail}</p>
                </>
              ) : (
                <p>Data pengguna tidak tersedia..</p>
              )}
            </div>
          </div>

          {/* Input Pencarian */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Cari nama aktivitas..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // Reset halaman ke 1 saat melakukan pencarian
                setCurrentPage(1);
              }}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex gap-3">
            <div className="">
              <h2 className="font-semibold mt-4">Data Perencanaan RUK:</h2>
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-100 p-4 h-[350px]  rounded shadow mb-4 "
                  >
                    <div className="flex flex-col h-[300px] gap-2 mb-4">
                      <p>
                        <strong>Tempat Tugas:</strong> {item.tempatTugas}
                      </p>
                      <p>
                        <strong>Aktiviktas:</strong> {item.aktivitas}
                      </p>
                      <p>
                        <strong>PJ:</strong> {item.pj}
                      </p>
                      <p>
                        <strong>Waktu Pelaksanaan:</strong> {item.waktuPelaksanaan}
                      </p>
                      <p>
                        <strong>Komponen:</strong> {item.komponen}
                      </p>
                      <p>
                        <strong>Anggaran:</strong> {item.total}
                      </p>
                      <div>
                        <button
                          onClick={() => handleEdit(item.id, item)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{item.kegiatan}</h3>
                      <p className={`font-semibold mt-2 ${
              isStatusComplete(item) 
                ? 'text-green-800' 
                : 'text-red-800'
            }`}>
              {isStatusComplete(item) ? 'SELESAI' : 'BELUM SELESAI'}
            </p>
                    </div>
                  </div>
                    </div>

                    
                  </div>
                ))
              ) : (
                <p>Tidak ada data RUK yang sesuai.</p>
              )}

              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Sebelumnya
                </button>
                <span className="mx-2">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Selanjutnya
                </button>
              </div>
            </div>

            {/* PENGADAAN */}
            <div className="">
              <h1 className="text-2xl font-bold mt-4">Pengadaan</h1>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className={`p-4 border h-[350px] w-[300px] flex flex-col gap-2 rounded mb-3 ${
                        item.status === "Tolak Pengadaan"
                          ? "bg-red-100"
                          : item.status === "Terima Pengadaan"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>
                  <strong>ID:</strong> {item.id}
                </p>
                      <h1>Nama Kegiatan : {item.kegiatan}</h1>
                      <div className="mt-2">
                        {isAdmin ? (
                          <select
                            value={item.status || ""}
                            onChange={(e) =>
                              handleStatusChangePengadaan(item.id, e.target.value)
                            }
                            className="border p-2 rounded w-full"
                          >
                            <option value="" disabled>
                              Pilih Aksi
                            </option>
                            <option value="Terima Pengadaan">
                              Terima Pengadaan
                            </option>
                            <option value="Tolak Pengadaan">
                              Tolak Pengadaan
                            </option>
                          </select>
                        ) : (
                          <p>Status: {item.status}</p>
                        )}
                      </div>
                      <p>Keterangan : {item.keterangan || "Belum diisi"}</p>

                      {item.waktuUpdatePengadaan && (
                        <p>
                          <strong>Waktu Update Pengadaan:</strong>{" "}
                          {new Date(
                            item.waktuUpdatePengadaan.seconds * 1000
                          ).toLocaleString()}
                        </p>
                      )}

                      {isAdmin && editingId === item.id ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                            className="border p-2 rounded w-full"
                            placeholder="Masukkan isian baru"
                          />
                          <button
                            onClick={() => saveKeterangan(item.id)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Simpan
                          </button>
                        </div>
                      ) : isAdmin ? (
                        <button
                          onClick={() => setEditingId(item.id)}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Tambah/Perbarui Isian
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <p>Tidak ada data RUK yang tersedia.</p>
              )}
            </div>

            {/* Verifikator */}
            <div className="">
              <h1 className="text-2xl font-bold mt-4">Verifikator</h1>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className={`p-4 border h-[350px] w-[300px] flex flex-col gap-2 rounded mb-3 ${
                        item.statusVerifikator === "Tolak Verifikator"
                          ? "bg-red-100"
                          : item.statusVerifikator === "Terima Verifikator"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <h1>Nama Kegiatan : {item.kegiatan}</h1>
                      <div className="mt-2">
                        {isAdmin ? (
                          <select
                            value={item.statusVerifikator || ""}
                            onChange={(e) =>
                              handleStatusChangeVerif(item.id, e.target.value)
                            }
                            className="border p-2 rounded w-full"
                      disabled={!item.status || item.status === "Tolak Pengadaan"}

                          >
                            <option value="" disabled>Pilih Aksi</option>
                            <option value="Terima Verifikator">Terima Verifikator</option>
                            <option value="Tolak Verifikator">Tolak Verifikator</option>
                          </select>
                        ) : (
                          <p>Status: {item.statusVerifikator}</p>
                        )}
                      </div>
                      <p>Keterangan : {item.keteranganVerifikator || "Belum diisi"}</p>

                      {item.waktuUpdateVerifikator && (
                        <p>
                          <strong>Waktu Update Verifikator:</strong>{" "}
                          {new Date(
                            item.waktuUpdateVerifikator.seconds * 1000
                          ).toLocaleString()}
                        </p>
                      )}

                      {isAdmin && editingVerifikator === item.id ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={keteranganVerifikator}
                            onChange={(e) => setKeteranganVerifikator(e.target.value)}
                            className="border p-2 rounded w-full"
                            placeholder="Masukkan isian baru"
                          />
                          <button
                            onClick={() =>  saveKeteranganVerifikator(item.id)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                            Simpan
                          </button>
                        </div>
                      ) : isAdmin ? (
                        <button
                          onClick={() => {setEditingVerifikator(item.id)}}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                          disabled={!item.status || item.status === "Tolak Pengadaan"}
                        >
                          Tambah/Perbarui Isian
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <p>Tidak ada data RUK yang tersedia.</p>
              )}
            </div>


            {/* ACC / TTD KaTu Kapus */}
            <div className="">
              <h1 className="text-2xl font-bold mt-4">ACC Kapus KaTu</h1>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className={`p-4 border h-[350px] w-[300px] flex flex-col gap-2 rounded mb-3 ${
                        item.statusKapusKaTu === "Belum TTD"
                          ? "bg-red-100"
                          : item.statusKapusKaTu === "Sudah TTD"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <h1>Nama Kegiatan : {item.kegiatan}</h1>
                      <div className="mt-2">
                        {isAdmin ? (
                          <select
                            value={item.statusKapusKaTu || ""}
                            onChange={(e) =>
                              handleStatusChangeTTD(item.id, e.target.value)
                            }
                            className="border p-2 rounded w-full"
                      disabled={!item.statusVerifikator || item.statusVerifikator === "Tolak Verifikator"}

                          >
                            <option value="" disabled>Pilih Aksi</option>
                            <option value="Sudah TTD">Sudah TTD</option>
                            <option value="Belum TTD">Belum TTD</option>
                          </select>
                        ) : (
                          <p>Status: {item.statusKapusKaTu}</p>
                        )}
                      </div>
                      <p>Keterangan : {item.keteranganKapusKaTu || "Belum diisi"}</p>

                      {item.waktuUpdateKapusKaTu && (
                        <p>
                          <strong>Waktu Update TTD Kapus KaTU:</strong>{" "}
                          {new Date(
                            item.waktuUpdateKapusKaTu.seconds * 1000
                          ).toLocaleString()}
                        </p>
                      )}

                      {isAdmin && editingKapusKaTu === item.id ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={keteranganKapusKaTu}
                            onChange={(e) => setKeteranganKapusKaTu(e.target.value)}
                            className="border p-2 rounded w-full"
                            placeholder="Masukkan isian baru"
                          />
                          <button
                            onClick={() =>  saveKeteranganKapusKaTu(item.id)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                            Simpan
                          </button>
                        </div>
                      ) : isAdmin ? (
                        <button
                          onClick={() => {setEditingKapusKaTu(item.id)}}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                          disabled={!item.statusVerifikator || item.statusVerifikator === "Tolak Verifikator"}
                        >
                          Tambah/Perbarui Isian
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <p>Tidak ada data RUK yang tersedia.</p>
              )}
            </div>

            {/* SCANN */}
            <div className="">
              <h1 className="text-2xl font-bold mt-4">Scann</h1>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className={`p-4 border h-[350px] w-[300px] flex flex-col gap-2 rounded mb-3 ${
                        item.statusScann === "Belum Scann"
                          ? "bg-red-100"
                          : item.statusScann === "Sudah Scann"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <h1>Nama Kegiatan : {item.kegiatan}</h1>
                      <div className="mt-2">
                        {isAdmin ? (
                          <select
                            value={item.statusScann || ""}
                            onChange={(e) =>
                              handleStatusChangeScan(item.id, e.target.value)
                            }
                            className="border p-2 rounded w-full"
                      disabled={!item.statusKapusKaTu || item.statusKapusKaTu === "Belum TTD"}

                          >
                            <option value="" disabled>Pilih Aksi</option>
                            <option value="Sudah Scann">Sudah Scann</option>
                            <option value="Belum Scann">Belum Scann</option>
                          </select>
                        ) : (
                          <p>Status: {item.statusScann}</p>
                        )}
                      </div>
                      <p>Keterangan : {item.keteranganScann || "Belum diisi"}</p>

                      {item.waktuUpdateScann && (
                        <p>
                          <strong>Waktu Update Scann:</strong>{" "}
                          {new Date(
                            item.waktuUpdateScann.seconds * 1000
                          ).toLocaleString()}
                        </p>
                      )}

                      {isAdmin && editingScann === item.id ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={keteranganScann}
                            onChange={(e) => setKeteranganScann(e.target.value)}
                            className="border p-2 rounded w-full"
                            placeholder="Masukkan isian baru"
                          />
                          <button
                            onClick={() =>  saveKeteranganScann(item.id)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                            Simpan
                          </button>
                        </div>
                      ) : isAdmin ? (
                        <button
                          onClick={() => {setEditingScann(item.id)}}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                          disabled={!item.statusKapusKaTu || item.statusKapusKaTu === "Belum TTD"}
                        >
                          Tambah/Perbarui Isian
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <p>Tidak ada data RUK yang tersedia.</p>
              )}
            </div>

            {/* Bendahara */}
            <div className="">
              <h1 className="text-2xl font-bold mt-4">Bendahara</h1>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className={`p-4 border h-[350px] w-[300px] flex flex-col gap-2 rounded mb-3 ${
                        item.statusBendahara === "Belum DiBayar"
                          ? "bg-red-100"
                          : item.statusBendahara === "Sudah DiBayar"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <h1>Nama Kegiatan : {item.kegiatan}</h1>
                      <div className="mt-2">
                        {isAdmin ? (
                          <select
                            value={item.statusBendahara || ""}
                            onChange={(e) =>
                              handleStatusChangeBen(item.id, e.target.value)
                            }
                            className="border p-2 rounded w-full"
                      

                          >
                            <option value="" disabled>Pilih Aksi</option>
                            <option value="Sudah DiBayar">Sudah DiBayar</option>
                            <option value="Belum DiBayar">Belum DiBayar</option>
                          </select>
                        ) : (
                          <p>Status: {item.statusBendahara}</p>
                        )}
                      </div>
                      <p>Keterangan : {item.keteranganBendahara || "Belum diisi"}</p>

                      {item.waktuUpdateBendahara && (
                        <p>
                          <strong>Waktu Update Bendahara:</strong>{" "}
                          {new Date(
                            item.waktuUpdateBendahara.seconds * 1000
                          ).toLocaleString()}
                        </p>
                      )}

                      {isAdmin && editingBendahara === item.id ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={keteranganBendahara}
                            onChange={(e) => setKeteranganBendahara(e.target.value)}
                            className="border p-2 rounded w-full"
                            placeholder="Masukkan isian baru"
                          />
                          <button
                            onClick={() =>  saveKeteranganBendahara(item.id)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                            Simpan
                          </button>
                        </div>
                      ) : isAdmin ? (
                        <button
                          onClick={() => {setEditingBendahara(item.id)}}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                          
                        >
                          Tambah/Perbarui Isian
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <p>Tidak ada data RUK yang tersedia.</p>
              )}
            </div>


            {/* Done */}
            <div className="">
              <h1 className="text-2xl font-bold mt-4">SELESAI</h1>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div 
                  key={item.id} 
                  className={`p-4 rounded-lg h-[350px] w-[300px] flex flex-col gap-2 shadow-md mb-3 ${
                    isStatusComplete(item) 
                      ? 'bg-green-200 border-green-500' 
                      : 'bg-red-200 border-red-500'
                  } border`}
                >
                  <div className="flex flex-col my-auto items-center">
                    
                      <h3 className="font-bold">{item.kegiatan}</h3>
                      <p className={`font-semibold mt-2 ${
              isStatusComplete(item) 
                ? 'text-green-800' 
                : 'text-red-800'
            }`}>
              {isStatusComplete(item) ? 'SELESAI' : 'BELUM SELESAI'}
            </p>
                    
                  </div>
                </div>
                ))
              ) : (
                <p>Tidak ada data RUK yang tersedia.</p>
              )}
            </div>


            {/* Commented out sections remain the same */}
            {/* <div className=" w-[30%]">
              <h1 className="text-2xl font-bold mt-4">Bendahara</h1>
              <Bendahara />
            </div> */}
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Ruk;