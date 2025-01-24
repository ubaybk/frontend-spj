import { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../../firebaseConfig";
import Header from "../../components/header";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  optionsTugas,
  optionPokja,
  optionKegiatan,
  optionSubKegiatan,
  optionKomponen,
  optionIndikatorKinerja,
  optionSumberPembiayaan,
  optionBulanPelaksanaan,
} from "../../data";

const UpdateRuk = () => {
  const [tempatTugas, setTempatTugas] = useState("");
  const [pokja, setPokja] = useState("");
  const [kegiatan, setKegiatan] = useState("");
  const [subKegiatan, setSubKegiatan] = useState("");
  const [aktivitas, setAktivitas] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [sasaran, setSasaran] = useState("");
  const [targetSasaran, setTargetSasaran] = useState("");
  const [pj, setPj] = useState("");
  const [kebutuhanSumberDaya, setKebutuhanSumberDaya] = useState("");
  const [bulanPelaksanaan, setBulanPelaksanaan] = useState("");
  const [waktuPelaksanaan, setWaktuPelaksanaan] = useState("");
  const [komponen, setKomponen] = useState("");
  const [customKomponen, setCustomKomponen] = useState("");
  const [kebutuhanDalamOrang, setKebutuhanDalamOrang] = useState(0);
  const [kebutuhanDalamX, setKebutuhanDalamX] = useState(0);
  // const [kebutuhanDalamTahun, setKebutuhanDalamTahun] = useState(0);
  const [hargaSatuan, setHargaSatuan] = useState(0);
  const [total, setTotal] = useState(0);
  const [indikatorKinerja, setIndikatorKinerja] = useState("");
  const [sumberPembiayaan, setSumberPembiayaan] = useState("");
  const [namaPenginput, setNamaPenginput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams(); // Get the document ID from the URL
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);
  const [selectedKomponen, setSelectedKomponen] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("Email");
    setIsAdmin(
      email === "admin@gmail.com" || email === "pengadaancilandak@gmail.com"
    );
  }, []);

  // Hitung Total secara otomatis ketika input terkait berubah
  useEffect(() => {
    const calculateTotal = () => {
      const result =
        kebutuhanDalamOrang *
        kebutuhanDalamX *
        // kebutuhanDalamTahun *
        hargaSatuan;
      setTotal(result);
    };
    calculateTotal();
  }, [kebutuhanDalamOrang, kebutuhanDalamX, hargaSatuan]);

  const handleKomponenChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Tambahkan komponen ke state jika dicentang
      setSelectedKomponen((prev) => [...prev, value]);
    } else {
      // Hapus komponen dari state jika tidak dicentang
      setSelectedKomponen((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    // Check if we're editing an existing document
    const fetchRukData = async () => {
      if (id) {
        try {
          // First, check if data was passed via navigation state
          const navigationState = location.state;

          if (navigationState) {
            // Populate form with passed data
            setTempatTugas(navigationState.tempatTugas);
            setPokja(navigationState.pokja);
            setKegiatan(navigationState.kegiatan);
            setSubKegiatan(navigationState.subKegiatan);
            setAktivitas(navigationState.aktivitas);
            setTujuan(navigationState.tujuan);
            setSasaran(navigationState.sasaran);
            setTargetSasaran(navigationState.targetSasaran);
            setPj(navigationState.pj);
            setKebutuhanSumberDaya(navigationState.kebutuhanSumberDaya);
            setBulanPelaksanaan(navigationState.bulanPelaksanaan);
            setWaktuPelaksanaan(navigationState.waktuPelaksanaan);
            setKomponen(navigationState.komponen);
            setKebutuhanDalamOrang(navigationState.kebutuhanDalamOrang || 0);
            setKebutuhanDalamX(navigationState.kebutuhanDalamX || 0);
            // setKebutuhanDalamTahun(navigationState.kebutuhanDalamTahun || 0);
            setHargaSatuan(navigationState.hargaSatuan || 0);
            setIndikatorKinerja(navigationState.indikatorKinerja);
            setSumberPembiayaan(navigationState.sumberPembiayaan);
            setNamaPenginput(navigationState.namaPenginput);
            setCustomKomponen(navigationState.customKomponen);
            setIsEditing(true);
          } else {
            // If no data in navigation state, fetch from Firestore
            const docRef = doc(db, "ruk_data", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const data = docSnap.data();
              // Populate form with fetched data
              setTempatTugas(data.tempatTugas);
              setPokja(data.pokja);
              setKegiatan(data.kegiatan);
              setSubKegiatan(data.subKegiatan);
              setAktivitas(data.aktivitas);
              setTujuan(data.tujuan);
              setSasaran(data.sasaran);
              setTargetSasaran(data.targetSasaran);
              setPj(data.pj);
              setKebutuhanSumberDaya(data.kebutuhanSumberDaya);
              setBulanPelaksanaan(data.bulanPelaksanaan);
              setWaktuPelaksanaan(data.waktuPelaksanaan);
              setKomponen(data.komponen);
              setSelectedKomponen(data.komponen || [])
              setKebutuhanDalamOrang(data.kebutuhanDalamOrang || 0);
              setKebutuhanDalamX(data.kebutuhanDalamX || 0);
              // setKebutuhanDalamTahun(data.kebutuhanDalamTahun || 0);
              setHargaSatuan(data.hargaSatuan || 0);
              setIndikatorKinerja(data.indikatorKinerja);
              setSumberPembiayaan(data.sumberPembiayaan);
              setNamaPenginput(data.namaPenginput);
              setCustomKomponen(data.customKomponen);
              setIsEditing(true);
            }
          }
        } catch (error) {
          console.error("Error fetching RUK data: ", error);
        }
      }
    };

    fetchRukData();
  }, [id, location.state]);

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("User not logged in!");
      return;
    }

    try {
      if (isEditing) {
        // Update existing document
        const docRef = doc(db, "ruk_data", id);
        await updateDoc(docRef, {
          kebutuhanSumberDaya,
          waktuPelaksanaan,
          komponen: selectedKomponen,
          customKomponen,
          kebutuhanDalamOrang,
          kebutuhanDalamX,
          // kebutuhanDalamTahun,
          hargaSatuan,
          total,
          indikatorKinerja: selectedOption,
          sumberPembiayaan,
          namaPenginput,
          // Note: Don't update createdBy, createdAt, and userId
        });
        alert("Data berhasil diperbarui!");
      } else {
        // Add new document
        await addDoc(collection(db, "ruk_data"), {
          tempatTugas,
          pokja,
          kegiatan,
          subKegiatan,
          aktivitas,
          tujuan,
          sasaran,
          targetSasaran,
          pj,
          kebutuhanSumberDaya,
          bulanPelaksanaan,
          waktuPelaksanaan,
          komponen,
          customKomponen,
          kebutuhanDalamOrang,
          kebutuhanDalamX,
          // kebutuhanDalamTahun,
          hargaSatuan,
          total,
          indikatorKinerja: selectedOption,
          sumberPembiayaan,
          namaPenginput,
          createdBy: user.email,
          createdAt: serverTimestamp(),
          userId: user.uid,
        });
        alert("Data berhasil ditambahkan!");
      }

      // Navigate back to RUK page
      navigate("/ruk");
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Gagal menyimpan data.");
    }
  };

  // Reset form function
  const resetForm = () => {
    setTempatTugas("");
    setPokja("");
    setKegiatan("");
    setSubKegiatan("");
    setAktivitas("");
    setTujuan("");
    setSasaran("");
    setTargetSasaran("");
    setPj("");
    setKebutuhanSumberDaya("");
    setBulanPelaksanaan("");
    setWaktuPelaksanaan("");
    setKomponen("");
    setCustomKomponen("");
    setKebutuhanDalamOrang(0);
    setKebutuhanDalamX(0);
    // setKebutuhanDalamTahun(0);
    setHargaSatuan(0);
    setIndikatorKinerja("");
    setSumberPembiayaan("");
    setNamaPenginput("");
  };

  // Update button text based on editing state
  const submitButtonText = isEditing ? "Perbarui" : "Simpan";

  const filteredOptions = optionIndikatorKinerja.filter((option) =>
    option.toLowerCase().includes(indikatorKinerja.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex">
      {/* Sidebar Modern */}
      <div className="w-64 bg-white shadow-xl p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <IoIosAddCircle className="text-blue-600 text-3xl" />
          <h1 className="text-xl font-bold text-gray-800">
            {isEditing ? "Edit Rencana" : "Tambah Rencana"}
          </h1>
        </div>
        {/* Tambahkan menu navigasi atau informasi tambahan di sini */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Informasi Dasar Section */}
          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              Informasi Dasar
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Existing form fields with enhanced styling */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Tempat Tugas
                </label>
                <select
                  value={tempatTugas}
                  onChange={(e) => setTempatTugas(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-300"
                  disabled={!isAdmin}
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
              </div>
              {/* Repeat similar styling for other form fields */}
            </div>
          </div>

          {/* Detail Kegiatan Section */}
          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Detail Kegiatan
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Existing detail fields with modern styling */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Lokasi Kegiatan
                </label>
                <input
                  type="text"
                  value={kebutuhanSumberDaya}
                  onChange={(e) => setKebutuhanSumberDaya(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 transition duration-300"
                  placeholder="Masukkan Kebutuhan Sumber Daya"
                />
              </div>
              {/* More fields... */}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              <IoMdSave className="text-xl" />
              <span>{submitButtonText}</span>
            </button>
            <button
              onClick={resetForm}
              className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
            >
              <IoMdRefresh className="text-xl" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRuk;
