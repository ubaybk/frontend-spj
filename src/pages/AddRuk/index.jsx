import { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../../firebaseConfig";
import Header from "../../components/header";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBackspace } from "react-icons/fa";
import { optionsTugas, optionPokja, optionKegiatan, optionSubKegiatan, optionKomponen, optionIndikatorKinerja,optionSumberPembiayaan } from "../../data";

const AddRuk = () => {
  const navigate = useNavigate();
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
  const [mitraKerja, setMitraKerja] = useState("");
  const [waktuPelaksanaan, setWaktuPelaksanaan] = useState(null);
  const [komponen, setKomponen] = useState("");
  const [customKomponen, setCustomKomponen] = useState("");
  const [kebutuhanDalamOrang, setKebutuhanDalamOrang] = useState(0);
  const [kebutuhanDalamX, setKebutuhanDalamX] = useState(0);
  const [kebutuhanDalamTahun, setKebutuhanDalamTahun] = useState(0);
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [total, setTotal] = useState(0);
  const [indikatorKinerja, setIndikatorKinerja] = useState("");
  const [sumberPembiayaan, setSumberPembiayaan] = useState("");
  const [namaPenginput, setNamaPenginput] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);
  const [selectedKomponen, setSelectedKomponen] = useState([]);

 
  // Hitung Total secara otomatis ketika input terkait berubah
  useEffect(() => {
    const calculateTotal = () => {
      const result =
        kebutuhanDalamOrang *
        kebutuhanDalamX *
        kebutuhanDalamTahun *
        hargaSatuan;
      setTotal(result);
    };
    calculateTotal();
  }, [kebutuhanDalamOrang, kebutuhanDalamX, kebutuhanDalamTahun, hargaSatuan]);

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

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("User not logged in!");
      return;
    }

    try {
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
        mitraKerja,
        waktuPelaksanaan,
        komponen: selectedKomponen,
        customKomponen,
        kebutuhanDalamOrang,
        kebutuhanDalamX,
        kebutuhanDalamTahun,
        hargaSatuan,
        total,
        indikatorKinerja: selectedOption,
        sumberPembiayaan,
        namaPenginput,
        createdBy: user.email,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      // alert("Data berhasil ditambahkan!");
      // Use setTimeout to ensure toast appears for 5 seconds
      toast.success("Berhasil Nambah SPJ COOY!");
      setTimeout(() => {
        navigate("/RUK");
      }, 5000); // Navigate after 5 seconds

      // Reset input fields
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
      setMitraKerja("");
      setWaktuPelaksanaan("");
      setKomponen("");
      setCustomKomponen("");
      setSelectedKomponen([])
      setKebutuhanDalamOrang(0);
      setKebutuhanDalamX(0);
      setKebutuhanDalamTahun(0);
      setHargaSatuan(0);
      setIndikatorKinerja("");
      setSumberPembiayaan("");
      setNamaPenginput("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Gagal menambahkan data.");
    }
  };

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
      <div className="flex h-full bg-gray-50">
        <div className="h-[850px] "> 
          <Header />
        </div>
        <div className="p-4">
          <Link to={"/ruk"}>
            <div className=" flex items-center cursor-pointer gap-3 hover:underline text-[14px] bg-blue-400 w-min p-2 rounded-lg text-white mb-5">
              <FaBackspace className="text-[25px]" />
              <h1>Back</h1>
            </div>
          </Link>
          <div className="grid grid-cols-3 gap-5 border p-2">
            <div>
              <h1 className="text-xl font-bold mb-2">Tempat Tugas</h1>
              <select
                value={tempatTugas}
                onChange={(e) => setTempatTugas(e.target.value)}
                className="border rounded-lg p-2 w-full"
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
              <h1 className="text-xl font-bold mb-2">Pokja</h1>
              <select
                value={pokja}
                onChange={(e) => setPokja(e.target.value)}
                className="border p-2 w-full rounded-lg"
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
              <h1 className="text-xl font-bold mb-2">Kegiatan</h1>
              <select
                value={kegiatan}
                onChange={(e) => setKegiatan(e.target.value)}
                className="border rounded-lg p-2 w-full"
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
              <h1 className="text-xl font-bold mb-2">Sub Kegiatan</h1>
              <select
                value={subKegiatan}
                onChange={(e) => setSubKegiatan(e.target.value)}
                className="border rounded-lg p-2 w-full"
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
              <h1 className="text-xl font-bold mb-2">
                Aktivitas (Judul Sesuai DPA)
              </h1>
              <input
                type="text"
                value={aktivitas}
                onChange={(e) => setAktivitas(e.target.value)}
                className="border rounded-lg p-2 w-full"
                placeholder="Masukkan aktivitas"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">Tujuan</h1>
              <input
                type="text"
                value={tujuan}
                onChange={(e) => setTujuan(e.target.value)}
                className="border rounded-lg p-2 w-full"
                placeholder="Masukkan tujuan"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">Sasaran</h1>
              <input
                type="text"
                value={sasaran}
                onChange={(e) => setSasaran(e.target.value)}
                className="border rounded-lg p-2 w-full"
                placeholder="Masukkan sasaran"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">Target Sasaran</h1>
              <input
                type="text"
                value={targetSasaran}
                onChange={(e) => setTargetSasaran(e.target.value)}
                className="border rounded-lg p-2 w-full"
                placeholder="Masukkan Target Sasaran"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">Penanggung Jawab</h1>
              <input
                type="text"
                value={pj}
                onChange={(e) => setPj(e.target.value)}
                className="border rounded-lg p-2 w-full"
                placeholder="Masukkan Penanggung Jawab"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">Kebutuhan Sumber Daya</h1>
              <input
                type="text"
                value={kebutuhanSumberDaya}
                onChange={(e) => setKebutuhanSumberDaya(e.target.value)}
                className="border rounded-lg p-2 w-full"
                placeholder="Masukkan Kebutuhan Sumber Daya"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">Mitra Kerja</h1>
              <input
                type="text"
                value={mitraKerja}
                onChange={(e) => setMitraKerja(e.target.value)}
                className="border rounded-lg p-2 w-full"
                placeholder="Masukkan Mitra Kerja"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-2">Waktu Pelaksanaan</h1>
              <input
                type="date"
                value={
                  waktuPelaksanaan
                    ? waktuPelaksanaan.toDate().toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  const selectedDate = e.target.value; // Format 'YYYY-MM-DD'
                  const firebaseTimestamp = Timestamp.fromDate(
                    new Date(selectedDate)
                  ); // Convert to Firebase Timestamp
                  setWaktuPelaksanaan(firebaseTimestamp);
                }}
                className="border rounded-lg p-2 w-full"
                placeholder="Masukkan Waktu Pelaksanaan"
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
              <h1 className="flex justify-center text-xl font-bold mb-2">
                Kebutuhan Anggaran
              </h1>
              <div className="flex">
                <input
                  type="number"
                  // value={kebutuhanDalamOrang}
                  onChange={(e) => setKebutuhanDalamOrang(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Orang"
                />
                <input
                  type="number"
                  // value={kebutuhanDalamX}
                  onChange={(e) => setKebutuhanDalamX(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Berapa X"
                />
                <input
                  type="number"
                  // value={kebutuhanDalamTahun}
                  onChange={(e) => setKebutuhanDalamTahun(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Tahun"
                />
                <input
                  type="number"
                  value={hargaSatuan}
                  onChange={(e) => setHargaSatuan(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Harga Satuan"
                />
              </div>
              <div>
                <h1 className="font-bold">Total</h1>
                <input
                  type="number"
                  value={total}
                  readOnly
                  onChange={(e) => setTotal(e.target.value)}
                  className="border rounded-lg p-2 w-full"
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
                          onChange={(e) => setIndikatorKinerja(e.target.value)}
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
              <h1 className="text-xl font-bold mb-2">Sumber Pembiayaan</h1>
              <select
                value={sumberPembiayaan}
                onChange={(e) => setSumberPembiayaan(e.target.value)}
                className="border rounded-lg p-2 w-full"
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
              <h1 className="text-xl font-bold mb-2">Nama Penginput</h1>
              <input
                type="text"
                value={namaPenginput}
                onChange={(e) => setNamaPenginput(e.target.value)}
                className="border rounded-lg p-2 w-full"
                placeholder="Masukkan Mitra Kerja"
              />
            </div>
          </div>
            <div className="mt-auto">
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white p-2 rounded "
          >
            Simpan
          </button>

            </div>
        </div>
      <ToastContainer />
      </div>
    </>
  );
};

export default AddRuk;
