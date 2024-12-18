import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../../firebaseConfig";
import Header from "../../components/header";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const AddRuk = () => {
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
  const [waktuPelaksanaan, setWaktuPelaksanaan] = useState("");
  const [komponen, setKomponen] = useState("");
  const [customKomponen, setCustomKomponen] = useState("")
  const [kebutuhanDalamOrang, setKebutuhanDalamOrang] = useState(0);
  const [kebutuhanDalamX, setKebutuhanDalamX] = useState(0);
  const [kebutuhanDalamTahun, setKebutuhanDalamTahun] = useState(0);
  const [hargaSatuan, setHargaSatuan] = useState(0);
  const [total, setTotal] = useState(0);
  const [indikatorKinerja, setIndikatorKinerja] = useState("")
  const [sumberPembiayaan, setSumberPembiayaan] = useState("")
  const [namaPenginput, setNamaPenginput] = useState("")

  const optionsTugas = [
    "Puskesmas Cilandak",
    "PUSTU Pondok Labu",
    "PUSTU Cilandak Barat",
    "PUSTU Lebak Bulus",
    "PUSTU Gandaria Selatan",
    "PUSTU Cipete Selatan",
  ];

  const optionPokja = ["Admen", "UKP", "UKM"];

  const optionKegiatan = [
    "Pengumpulan Data",
    "Pengumpulan Rizal",
    "Pengumpulan Anggy",
  ];

  const optionSubKegiatan = ["Kegiatan 1", "Kegiatan 2", "Kegiatan 3"];

  const optionKomponen = ["Makan", "Snack", "Transport", "Lainnya"];
  
  const optionIndikatorKinerja = [
    "kinerja 1",
    "kinerja 2",
    "kinerja 3",
  ]

  const optionSumberPembiayaan = [
    "APBD",
    "BLUD"
  ]

  // Hitung Total secara otomatis ketika input terkait berubah
  useEffect(() => {
    const calculateTotal = () => {
      const result =
        kebutuhanDalamOrang * kebutuhanDalamX * kebutuhanDalamTahun * hargaSatuan;
      setTotal(result);
    };
    calculateTotal();
  }, [kebutuhanDalamOrang, kebutuhanDalamX, kebutuhanDalamTahun, hargaSatuan]);

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
        komponen,
        customKomponen,
        kebutuhanDalamOrang,
        kebutuhanDalamX,
        kebutuhanDalamTahun,
        hargaSatuan,
        total,
        indikatorKinerja,
        sumberPembiayaan,
        namaPenginput,
        createdBy: user.email,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      alert("Data berhasil ditambahkan!");
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
      setKebutuhanDalamOrang(0);
      setKebutuhanDalamX(0);
      setKebutuhanDalamTahun(0);
      setHargaSatuan(0);
      setIndikatorKinerja("")
      setSumberPembiayaan("");
      setNamaPenginput("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Gagal menambahkan data.");
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div>

        <Header />
        </div>
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
            <div>
              <h1>Aktivitas (Judul Sesuai DPA)</h1>
              <input
                type="text"
                value={aktivitas}
                onChange={(e) => setAktivitas(e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Masukkan aktivitas"
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
              />
            </div>
            <div>
              <h1>Kebutuhan Sumber Daya</h1>
              <input
                type="text"
                value={kebutuhanSumberDaya}
                onChange={(e) => setKebutuhanSumberDaya(e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Masukkan Kebutuhan Sumber Daya"
              />
            </div>
            <div>
              <h1>Mitra Kerja</h1>
              <input
                type="text"
                value={mitraKerja}
                onChange={(e) => setMitraKerja(e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Masukkan Mitra Kerja"
              />
            </div>
            <div>
              <h1>Waktu Pelaksanaan</h1>
              <input
                type="date"
                value={
                  waktuPelaksanaan
                    ? waktuPelaksanaan.toDate().toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  const selectedDate = e.target.value; // Format 'YYYY-MM-DD'
          const firebaseTimestamp = Timestamp.fromDate(new Date(selectedDate)); // Convert to Firebase Timestamp
          setWaktuPelaksanaan(firebaseTimestamp);

                } }
                className="border rounded p-2 w-full"
                placeholder="Masukkan Waktu Pelaksanaan"
              />
            </div>
            <div>
    <h1>Komponen</h1>
    <select
      value={komponen}
      onChange={(e) => {
        const value = e.target.value;
        setKomponen(value);
        if (value !== "Lainnya") {
          setCustomKomponen(""); // Reset customKomponen jika bukan "Lainnya"
        }
      }}
      className="border rounded p-2 w-full"
    >
      <option value="" disabled>
        Pilih Komponen
      </option>
      {optionKomponen.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {komponen === "Lainnya" && (
      <div className="mt-4">
        <label htmlFor="customKomponen" className="block mb-2">
          Masukkan Komponen
        </label>
        <input
          id="customKomponen"
          type="text"
          value={customKomponen}
          onChange={(e) => setCustomKomponen(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
    )}
   
  </div>
            <div>
              <h1 className="flex justify-center">Kebutuhan Anggaran</h1>
              <div className="flex">
                <input
                  type="number"
                  // value={kebutuhanDalamOrang}
                  onChange={(e) => setKebutuhanDalamOrang(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Orang"
                />
                <input
                  type="number"
                  // value={kebutuhanDalamX}
                  onChange={(e) => setKebutuhanDalamX(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Berapa X"
                />
                <input
                  type="number"
                  // value={kebutuhanDalamTahun}
                  onChange={(e) => setKebutuhanDalamTahun(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Tahun"
                />
                <input
                  type="number"
                  value={hargaSatuan}
                  onChange={(e) => setHargaSatuan(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Harga Satuan"
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
            <div>
              <h1>Indikator Kinerja</h1>
              <select
                value={indikatorKinerja}
                onChange={(e) => setIndikatorKinerja(e.target.value)}
                className="border rounded p-2 w-full"
              >
                <option value="" disabled>
                  Pilih Indikator Kinerja
                </option>
                {optionIndikatorKinerja.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h1>Sumber Pembiayaan</h1>
              <select
                value={sumberPembiayaan}
                onChange={(e) => setSumberPembiayaan(e.target.value)}
                className="border rounded p-2 w-full"
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
                placeholder="Masukkan Mitra Kerja"
              />
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
