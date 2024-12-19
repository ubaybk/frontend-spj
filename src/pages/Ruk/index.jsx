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
  orderBy,
} from "firebase/firestore";
import db from "../../../firebaseConfig";
import Header from "../../components/header";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import useHandleStatusChange from "../../Hooks/Pengadaan/useHandleStatusChange";
import useHandleStatusChangeVerifikator from "../../Hooks/Verifikator/useHandleStatusChangeVerifikator";
import useHandleStatusScann from "../../Hooks/Scann/useHandleStatusScann";
import useHandleStatusTddKapus from "../../Hooks/KapusKaTu/useHandleStatusTddKapus";
import useHandleStatusBendahara from "../../Hooks/Bendahara/useHandleStatusBendahara";
import { Timestamp } from "firebase/firestore";

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
  const [isPengadaanAdmin, setIsPengadaanAdmin] = useState(false);
  const [isVerifikatorAdmin, setIsVerifikatorAdmin] = useState(false);
  const [isKapusKatuAdmin, setIsKapusKatuAdmin] = useState(false);
  const [isScanAdmin, setIsScanAdmin] = useState(false);
  const [isBendaharaAdmin, setIsBendaharaAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [keteranganVerifikator, setKeteranganVerifikator] = useState("");
  const [keteranganKapusKaTu, setKeteranganKapusKaTu] = useState("");
  const [keteranganScann, setKeteranganScann] = useState("");
  const [keteranganBendahara, setKeteranganBendahara] = useState("");
  const { handleStatusChange, handleSave } = useHandleStatusChange(
    setRukData,
    isAdmin,
    isPengadaanAdmin,
    setEditingId,
    setKeterangan
  );
  const { handleStatusChangeVerifikator, handleSaveVerifikator } =
    useHandleStatusChangeVerifikator(
      setRukData,
      isAdmin,
      isVerifikatorAdmin,
      setEditingVerifikator,
      setKeteranganVerifikator
    );
  const { handleStatusChangeKapusKaTu, handleSaveKapusKaTu } =
    useHandleStatusTddKapus(
      setRukData,
      isAdmin,
      isKapusKatuAdmin,
      setEditingKapusKaTu,
      setKeteranganKapusKaTu
    );
  const { handleStatusChangeScann, handleSaveScann } = useHandleStatusScann(
    setRukData,
    isAdmin,
    isScanAdmin,
    setEditingScann,
    setKeteranganScann
  );
  const { handleStatusChangeBendahara, handleSaveBendahara } =
    useHandleStatusBendahara(
      setRukData,
      isAdmin,
      isBendaharaAdmin,
      setEditingBendahara,
      setKeteranganBendahara
    );
  const [selectedMonth, setSelectedMonth] = useState(""); // Bulan yang dipilih
  const [selectedYear, setSelectedYear] = useState(""); // Tahun yang dipilih

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Number of items per page

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        setUserEmail(email);

        const isPengadaanAdmin = email === "pengadaancilandak@gmail.com"
        const isVerifikatorAdmin = email === "verifikatorcilandak@gmail.com"
        const isKapusKatuAdmin = email === "kapuskatucilandak@gmail.com"
        const isScanAdmin = email === "scancilandak@gmail.com"
        const isBendaharaAdmin = email === "bendaharacilandak@gmail.com"
        setIsAdmin(email === "admin@gmail.com");
        setIsPengadaanAdmin(isPengadaanAdmin)
        setIsVerifikatorAdmin(isVerifikatorAdmin)
        setIsKapusKatuAdmin(isKapusKatuAdmin)
        setIsScanAdmin(isScanAdmin)
        setIsBendaharaAdmin(isBendaharaAdmin)

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
          if (
            email === "admin@gmail.com" ||
            email === "pengadaancilandak@gmail.com" ||
            email === "verifikatorcilandak@gmail.com" ||
            email === "kapuskatucilandak@gmail.com" ||
            email === "scancilandak@gmail.com" ||
            email === "bendaharacilandak@gmail.com"
          ) {
            rukQuery = query(
              collection(db, "ruk_data"),
            // orderBy('createdAt', 'desc') // Pastikan field 'createdAt' adalah Timestamp
            )
          } else {
            rukQuery = query(
              collection(db, "ruk_data"),
              // orderBy('createdAt', 'desc'),
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

  // Fungsi untuk memfilter berdasarkan bulan dan tahun
  const filterByMonthAndYear = (item) => {
    if (selectedMonth && selectedYear) {
      const itemDate = item.createdAt.toDate(); // Assuming createdAt is a Firestore timestamp
      const itemMonth = itemDate.getMonth() + 1; // Mendapatkan bulan (1-12)
      const itemYear = itemDate.getFullYear(); // Mendapatkan tahun (YYYY)

      return (
        itemMonth === parseInt(selectedMonth) &&
        itemYear === parseInt(selectedYear)
      );
    }
    return true; // Jika tidak ada filter bulan dan tahun, tampilkan semua data
  };

  // Filter data berdasarkan search term
  const filteredData = rukData.filter(
    (item) =>
      item.aktivitas.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filterByMonthAndYear(item)
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
  const saveKeterangan = (id) => handleSave(id, keterangan);

  //VERIFIKATOR
  const handleStatusChangeVerif = (id, newStatusVerifikator) =>
    handleStatusChangeVerifikator(id, newStatusVerifikator);
  const saveKeteranganVerifikator = (id) =>
    handleSaveVerifikator(id, keteranganVerifikator);

  //KAPUS KATU
  const handleStatusChangeTTD = (id, newStatusKapusKaTu) =>
    handleStatusChangeKapusKaTu(id, newStatusKapusKaTu);
  const saveKeteranganKapusKaTu = (id) =>
    handleSaveKapusKaTu(id, keteranganKapusKaTu);

  //SCANN
  const handleStatusChangeScan = (id, newStatusScann) =>
    handleStatusChangeScann(id, newStatusScann);
  const saveKeteranganScann = (id) => handleSaveScann(id, keteranganScann);

  //BENDAHARA
  const handleStatusChangeBen = (id, newStatusBendahara) =>
    handleStatusChangeBendahara(id, newStatusBendahara);
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
                  <h1>Tambah Data S P J</h1>
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

          <div className="filter-form">
            <label>
              Month:
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </label>
            <label>
              Year:
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select Year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                {/* Tambahkan tahun yang dibutuhkan */}
              </select>
            </label>
          </div>

          <div className="flex gap-3">
            <div className="">
              <h2 className="font-semibold mt-4">Data SPJ:</h2>
              {currentItems && currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-100 p-4 h-[400px]  rounded shadow mb-4 "
                  >
                    <div className="flex flex-col h-[300px] gap-2 mb-4">
                      <p>
                        <strong>ID:</strong> {item.id}
                      </p>
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
  <strong>Waktu Pelaksanaan:</strong>{" "}
  {item.waktuPelaksanaan
    ? new Date(item.waktuPelaksanaan.seconds * 1000).toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        // hour12: true,
      })
    : "Belum ditentukan"}
</p>


                      <p>
                        <strong>Komponen:</strong> {item.komponen}
                        <p>{item.customKomponen}</p>
                      </p>
                      <p>
                        <strong>Anggaran:</strong> {item.total}
                      </p>
                      {isAdmin ? (
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
                      ) : (
                        <div>
                          <button
                            onClick={() => handleEdit(item.id, item)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                          >
                            Detail
                          </button>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">{item.kegiatan}</h3>
                          <p
                            className={`font-semibold mt-2 ${
                              isStatusComplete(item)
                                ? "text-green-800"
                                : "text-red-800"
                            }`}
                          >
                            {isStatusComplete(item)
                              ? "SELESAI"
                              : "BELUM SELESAI"}
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
                      className={`p-4 border h-[400px] w-[300px] flex flex-col gap-2 rounded mb-3 ${
                        item.status === "Tolak Pengadaan"
                          ? "bg-red-100"
                          : item.status === "Terima Pengadaan"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <h1>Nama Kegiatan : {item.kegiatan}</h1>
                      <div className="mt-2">
                        {isPengadaanAdmin || isAdmin ? (
                          <select
                            value={item.status || ""}
                            onChange={(e) =>
                              handleStatusChangePengadaan(
                                item.id,
                                e.target.value
                              )
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

                      {(isAdmin || isPengadaanAdmin) && editingId === item.id ? (
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
                      ) : (isAdmin || isPengadaanAdmin) ? (
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
                      className={`p-4 border h-[400px] w-[300px] flex flex-col gap-2 rounded mb-3 ${
                        item.statusVerifikator === "Tolak Verifikator"
                          ? "bg-red-100"
                          : item.statusVerifikator === "Terima Verifikator"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <h1>Nama Kegiatan : {item.kegiatan}</h1>
                      <div className="mt-2">
                        {isAdmin || isVerifikatorAdmin ? (
                          <select
                            value={item.statusVerifikator || ""}
                            onChange={(e) =>
                              handleStatusChangeVerif(item.id, e.target.value)
                            }
                            className="border p-2 rounded w-full"
                            disabled={
                              !item.status || item.status === "Tolak Pengadaan"
                            }
                          >
                            <option value="" disabled>
                              Pilih Aksi
                            </option>
                            <option value="Terima Verifikator">
                              Terima Verifikator
                            </option>
                            <option value="Tolak Verifikator">
                              Tolak Verifikator
                            </option>
                          </select>
                        ) : (
                          <p>Status: {item.statusVerifikator}</p>
                        )}
                      </div>
                      <p>
                        Keterangan :{" "}
                        {item.keteranganVerifikator || "Belum diisi"}
                      </p>

                      {item.waktuUpdateVerifikator && (
                        <p>
                          <strong>Waktu Update Verifikator:</strong>{" "}
                          {new Date(
                            item.waktuUpdateVerifikator.seconds * 1000
                          ).toLocaleString()}
                        </p>
                      )}

                      {(isAdmin || isVerifikatorAdmin) && editingVerifikator === item.id ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={keteranganVerifikator}
                            onChange={(e) =>
                              setKeteranganVerifikator(e.target.value)
                            }
                            className="border p-2 rounded w-full"
                            placeholder="Masukkan isian baru"
                          />
                          <button
                            onClick={() => saveKeteranganVerifikator(item.id)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Simpan
                          </button>
                        </div>
                      ) : isAdmin || isVerifikatorAdmin ? (
                        <button
                          onClick={() => {
                            setEditingVerifikator(item.id);
                          }}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                          disabled={
                            !item.status || item.status === "Tolak Pengadaan"
                          }
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
                      className={`p-4 border h-[400px] w-[300px] flex flex-col gap-2 rounded mb-3 ${
                        item.statusKapusKaTu === "Belum TTD"
                          ? "bg-red-100"
                          : item.statusKapusKaTu === "Sudah TTD"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <h1>Nama Kegiatan : {item.kegiatan}</h1>
                      <div className="mt-2">
                        {isAdmin || isKapusKatuAdmin ? (
                          <select
                            value={item.statusKapusKaTu || ""}
                            onChange={(e) =>
                              handleStatusChangeTTD(item.id, e.target.value)
                            }
                            className="border p-2 rounded w-full"
                            disabled={
                              !item.statusVerifikator ||
                              item.statusVerifikator === "Tolak Verifikator"
                            }
                          >
                            <option value="" disabled>
                              Pilih Aksi
                            </option>
                            <option value="Sudah TTD">Sudah TTD</option>
                            <option value="Belum TTD">Belum TTD</option>
                          </select>
                        ) : (
                          <p>Status: {item.statusKapusKaTu}</p>
                        )}
                      </div>
                      <p>
                        Keterangan : {item.keteranganKapusKaTu || "Belum diisi"}
                      </p>

                      {item.waktuUpdateKapusKaTu && (
                        <p>
                          <strong>Waktu Update TTD Kapus KaTU:</strong>{" "}
                          {new Date(
                            item.waktuUpdateKapusKaTu.seconds * 1000
                          ).toLocaleString()}
                        </p>
                      )}

                      {(isAdmin || isKapusKatuAdmin) && editingKapusKaTu === item.id ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={keteranganKapusKaTu}
                            onChange={(e) =>
                              setKeteranganKapusKaTu(e.target.value)
                            }
                            className="border p-2 rounded w-full"
                            placeholder="Masukkan isian baru"
                          />
                          <button
                            onClick={() => saveKeteranganKapusKaTu(item.id)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Simpan
                          </button>
                        </div>
                      ) : isAdmin || isKapusKatuAdmin ? (
                        <button
                          onClick={() => {
                            setEditingKapusKaTu(item.id);
                          }}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                          disabled={
                            !item.statusVerifikator ||
                            item.statusVerifikator === "Tolak Verifikator"
                          }
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
              <h1 className="text-2xl font-bold mt-4">Scan</h1>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div key={item.id}>
                    <div
                      className={`p-4 border h-[400px] w-[300px] flex flex-col gap-2 rounded mb-3 ${
                        item.statusScann === "Belum Scann"
                          ? "bg-red-100"
                          : item.statusScann === "Sudah Scann"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <h1>Nama Kegiatan : {item.kegiatan}</h1>
                      <div className="mt-2">
                        {isAdmin || isScanAdmin ? (
                          <select
                            value={item.statusScann || ""}
                            onChange={(e) =>
                              handleStatusChangeScan(item.id, e.target.value)
                            }
                            className="border p-2 rounded w-full"
                            disabled={
                              !item.statusKapusKaTu ||
                              item.statusKapusKaTu === "Belum TTD"
                            }
                          >
                            <option value="" disabled>
                              Pilih Aksi
                            </option>
                            <option value="Sudah Scann">Sudah Scann</option>
                            <option value="Belum Scann">Belum Scann</option>
                          </select>
                        ) : (
                          <p>Status: {item.statusScann}</p>
                        )}
                      </div>
                      <p>
                        Keterangan : {item.keteranganScann || "Belum diisi"}
                      </p>

                      {item.waktuUpdateScann && (
                        <p>
                          <strong>Waktu Update Scann:</strong>{" "}
                          {new Date(
                            item.waktuUpdateScann.seconds * 1000
                          ).toLocaleString()}
                        </p>
                      )}

                      {(isAdmin || isScanAdmin) && editingScann === item.id ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={keteranganScann}
                            onChange={(e) => setKeteranganScann(e.target.value)}
                            className="border p-2 rounded w-full"
                            placeholder="Masukkan isian baru"
                          />
                          <button
                            onClick={() => saveKeteranganScann(item.id)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Simpan
                          </button>
                        </div>
                      ) : isAdmin || isScanAdmin ? (
                        <button
                          onClick={() => {
                            setEditingScann(item.id);
                          }}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                          disabled={
                            !item.statusKapusKaTu ||
                            item.statusKapusKaTu === "Belum TTD"
                          }
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
                      className={`p-4 border h-[400px] w-[300px] flex flex-col gap-2 rounded mb-3 ${
                        item.statusBendahara === "Sudah Terima Dokumen"
                          ? "bg-yellow-100"
                          : item.statusBendahara === "Sudah DiBayar"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <h1>Nama Kegiatan : {item.kegiatan}</h1>
                      <div className="mt-2">
                        {isAdmin || isBendaharaAdmin ? (
                          <select
                            value={item.statusBendahara || ""}
                            onChange={(e) =>
                              handleStatusChangeBen(item.id, e.target.value)
                            }
                            className="border p-2 rounded w-full"
                          >
                            <option value="" disabled>
                              Pilih Aksi
                            </option>
                            <option value="Sudah DiBayar">Sudah DiBayar</option>
                            <option value="Sudah Terima Dokumen">
                              Sudah Terima Dokumen
                            </option>
                          </select>
                        ) : (
                          <p>Status: {item.statusBendahara}</p>
                        )}
                      </div>
                      <p>
                        Keterangan : {item.keteranganBendahara || "Belum diisi"}
                      </p>

                      {item.waktuUpdateBendahara && (
                        <p>
                          <strong>Waktu Update Bendahara:</strong>{" "}
                          {new Date(
                            item.waktuUpdateBendahara.seconds * 1000
                          ).toLocaleString()}
                        </p>
                      )}

                      {(isAdmin || isBendaharaAdmin) && editingBendahara === item.id ? (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={keteranganBendahara}
                            onChange={(e) =>
                              setKeteranganBendahara(e.target.value)
                            }
                            className="border p-2 rounded w-full"
                            placeholder="Masukkan isian baru"
                          />
                          <button
                            onClick={() => saveKeteranganBendahara(item.id)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Simpan
                          </button>
                        </div>
                      ) : isAdmin || isBendaharaAdmin ? (
                        <button
                          onClick={() => {
                            setEditingBendahara(item.id);
                          }}
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
                    className={`p-4 rounded-lg h-[400px] w-[300px] flex flex-col gap-2 shadow-md mb-3 ${
                      isStatusComplete(item)
                        ? "bg-green-200 border-green-500"
                        : "bg-red-200 border-red-500"
                    } border`}
                  >
                    <div className="flex flex-col my-auto items-center">
                      <h3 className="font-bold">{item.kegiatan}</h3>
                      <p
                        className={`font-semibold mt-2 ${
                          isStatusComplete(item)
                            ? "text-green-800"
                            : "text-red-800"
                        }`}
                      >
                        {isStatusComplete(item) ? "SELESAI" : "BELUM SELESAI"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Tidak ada data RUK yang tersedia.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ruk;
