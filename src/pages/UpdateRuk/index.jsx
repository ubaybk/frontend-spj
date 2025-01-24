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
    <>
      <div className="flex">
        <div className="h-screen">
          <Header />
        </div>
        <div className="p-4 w-full">
          <Link to={"/ruk"}>
            <div className="flex items-center cursor-pointer hover:underline">
              <IoIosAddCircle className="text-[25px]" />
              <h1>
                {isEditing
                  ? "Edit Data Perencanaan"
                  : "Tambah Data Perencanaan"}
              </h1>
            </div>
          </Link>
          <div className="flex flex-col gap-5">
            <div className="border p-4">
              <h2 className="text-xl font-bold mb-4">Informasi Dasar</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h1>Tempat Tugas</h1>
                  <select
                    value={tempatTugas}
                    onChange={(e) => setTempatTugas(e.target.value)}
                    className="border rounded p-2 w-full"
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
                <div>
                  <h1>Pokja</h1>
                  <select
                    value={pokja}
                    onChange={(e) => setPokja(e.target.value)}
                    className="border rounded p-2 w-full"
                    disabled={!isAdmin}
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
                  <h1>Bulan Pelaksanaan</h1>
                  <select
                    value={bulanPelaksanaan}
                    onChange={(e) => setBulanPelaksanaan(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="Masukkan Bulan Pelaksanaan"
                    disabled={!isAdmin} // Disable jika bukan admin
                  >
                    <option value="" disabled>
                      Pilih Bulan Pelaksanaan
                    </option>
                    {optionBulanPelaksanaan.map((option, index) => (
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
                    disabled={!isAdmin}
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
                    disabled={!isAdmin}
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
                <div>
                  <h1>Aktivitas</h1>
                  <input
                    type="text"
                    value={aktivitas}
                    onChange={(e) => setAktivitas(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="Masukkan aktivitas"
                    disabled={!isAdmin} // Disable jika bukan admin
                  />
                </div>
                <div>
                  <h1>Tujuan</h1>
                  <input
                    type="text"
                    value={tujuan}
                    onChange={(e) => setTujuan(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="Masukkan tujuan"
                    disabled={!isAdmin}
                  />
                </div>
                <div>
                  <h1>Sasaran</h1>
                  <input
                    type="text"
                    value={sasaran}
                    onChange={(e) => setSasaran(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="Masukkan sasaran"
                    disabled={!isAdmin}
                  />
                </div>
                <div>
                  <h1>Target Sasaran</h1>
                  <input
                    type="text"
                    value={targetSasaran}
                    onChange={(e) => setTargetSasaran(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="Masukkan Target Sasaran"
                    disabled={!isAdmin}
                  />
                </div>
                <div>
                  <h1>Penanggung Jawab</h1>
                  <input
                    type="text"
                    value={pj}
                    onChange={(e) => setPj(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="Masukkan Penanggung Jawab"
                    disabled={!isAdmin}
                  />
                </div>
              </div>
            </div>

            <div className="border p-4">
              <h2 className="text-xl font-bold mb-4">Detail Kegiatan</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h1>Lokasi Kegiatan</h1>
                  <input
                    type="text"
                    value={kebutuhanSumberDaya}
                    onChange={(e) => setKebutuhanSumberDaya(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="Masukkan Kebutuhan Sumber Daya"
                    // disabled={!isAdmin} // Disable jika bukan admin
                  />
                </div>
                <div>
                  <h1>Waktu Pelaksanaan</h1>
                  <input
                    type="date"
                    value={
                      waktuPelaksanaan
                        ? new Date(waktuPelaksanaan.seconds * 1000)
                            .toISOString() // Mengonversi ke format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
                            .split("T")[0] // Mengambil bagian tanggalnya saja (YYYY-MM-DD)
                        : ""
                    }
                    onChange={(e) => {
                      const selectedDate = e.target.value; // Format 'YYYY-MM-DD'
                      const timestamp = new Date(selectedDate).getTime(); // Ubah ke timestamp
                      setWaktuPelaksanaan({
                        seconds: timestamp / 1000,
                        nanoseconds: 0,
                      });
                    }}
                    className="border rounded p-2 w-full"
                    placeholder="Masukkan Waktu Pelaksanaan"
                    // disabled={!isAdmin} // Disable jika bukan admin
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold mb-2">Komponen</h1>
                  <div className="flex flex-col gap-2">
                    {optionKomponen.map((option, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={option}
                          checked={selectedKomponen.includes(option)}
                          onChange={handleKomponenChange}
                          className="cursor-pointer"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h1 className="flex justify-center">Kebutuhan Anggaran</h1>
                  <div className="flex">
                    <input
                      type="number"
                      value={kebutuhanDalamOrang}
                      onChange={(e) => setKebutuhanDalamOrang(e.target.value)}
                      className="border rounded p-2 w-full"
                      placeholder="Masukkan Waktu Pelaksanaan"
                      // disabled={!isAdmin} // Disable jika bukan admin
                    />
                    <input
                      type="number"
                      value={kebutuhanDalamX}
                      onChange={(e) => setKebutuhanDalamX(e.target.value)}
                      className="border rounded p-2 w-full"
                      placeholder="Masukkan BERAPA x"
                      // disabled={!isAdmin} // Disable jika bukan admin
                    />
                    {/* <input
                      type="number"
                      value={kebutuhanDalamTahun}
                      onChange={(e) => setKebutuhanDalamTahun(e.target.value)}
                      className="border rounded p-2 w-full"
                      placeholder="Masukkan Kebutuhan Dalam Tahun"
                      // disabled={!isAdmin} // Disable jika bukan admin
                    /> */}
                    <input
                      type="number"
                      value={hargaSatuan}
                      onChange={(e) => setHargaSatuan(e.target.value)}
                      className="border rounded p-2 w-full"
                      placeholder="harga satuan"
                      // disabled={!isAdmin} // Disable jika bukan admin
                    />
                  </div>
                  <div>
                    <h1>Total</h1>
                    <input
                      type="number"
                      value={total}
                      readOnly
                      onChange={(e) => setTotal(e.target.value)}
                      className="border rounded p-2 w-full"
                      placeholder="total"
                    />
                  </div>
                </div>
                <div className="w-full max-w-2xl" ref={dropdownRef}>
                  <h1 className="text-xl font-bold mb-2">Indikator Kinerja</h1>
                  <div className="relative">
                    <div
                      className="border rounded-lg p-2 bg-white cursor-pointer flex justify-between items-center"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <div className="truncate">
                        {selectedOption || "Pilih Indikator Kinerja"}
                      </div>
                      <div className="text-gray-400">{isOpen ? "▲" : "▼"}</div>
                    </div>

                    {isOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                        <div className="p-2 border-b sticky top-0 bg-white">
                          <div className="relative">
                            <input
                              type="text"
                              className="w-full p-2 pl-8 border rounded"
                              placeholder="Cari indikator..."
                              value={indikatorKinerja}
                              onChange={(e) =>
                                setIndikatorKinerja(e.target.value)
                              }
                              onClick={(e) => e.stopPropagation()}
                            />
                            <span className="absolute left-3 top-2.5 text-gray-400">
                              🔍
                            </span>
                          </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {filteredOptions.map((option, index) => (
                            <div
                              key={index}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSelectedOption(option);
                                setIsOpen(false);
                                setIndikatorKinerja("");
                              }}
                            >
                              {option}
                            </div>
                          ))}
                          {filteredOptions.length === 0 && (
                            <div className="p-2 text-gray-500 text-center">
                              Tidak ada hasil yang cocok
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h1>Sumber Pembiayaan</h1>
                  <select
                    value={sumberPembiayaan}
                    onChange={(e) => setSumberPembiayaan(e.target.value)}
                    className="border rounded p-2 w-full"
                    // disabled={!isAdmin} // Disable jika bukan admin
                  >
                    <option value="" disabled>
                      Pilih Sumber Pembiayaan
                    </option>
                    {optionSumberPembiayaan.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <h1>Nama Penginput</h1>
                  <input
                    type="text"
                    value={namaPenginput}
                    onChange={(e) => setNamaPenginput(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="Masukkan Nama Penginput"
                    // disabled={!isAdmin} // Disable jika bukan admin
                  />
                </div>
                
            <div className="col-span-3 flex gap-4">
              <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
              >
                {submitButtonText}
              </button>
              <button
                onClick={resetForm}
                className="mt-4 bg-gray-500 text-white p-2 rounded"
              >
                Reset
              </button>
            </div>

            
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRuk;
