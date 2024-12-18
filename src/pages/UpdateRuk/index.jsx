import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../../firebaseConfig";
import Header from "../../components/header";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";


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
  const [mitraKerja, setMitraKerja] = useState("");
  const [waktuPelaksanaan, setWaktuPelaksanaan] = useState("");
  const [komponen, setKomponen] = useState("");
  const [kebutuhanDalamOrang, setKebutuhanDalamOrang] = useState(0);
  const [kebutuhanDalamX, setKebutuhanDalamX] = useState(0);
  const [kebutuhanDalamTahun, setKebutuhanDalamTahun] = useState(0);
  const [hargaSatuan, setHargaSatuan] = useState(0);
  const [total, setTotal] = useState(0);
  const [indikatorKinerja, setIndikatorKinerja] = useState("");
  const [sumberPembiayaan, setSumberPembiayaan] = useState("");
  const [namaPenginput, setNamaPenginput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
 const [isAdmin, setIsAdmin] = useState(false)

  const { id } = useParams(); // Get the document ID from the URL
  const location = useLocation();
  const navigate = useNavigate();

  

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

  const optionKomponen = ["Makan", "Snack", "Transport"];
  
  const optionIndikatorKinerja = [
    "kinerja 1",
    "kinerja 2",
    "kinerja 3",
  ];

  const optionSumberPembiayaan = [
    "APBN",
    "APBD",
    "Bantuan Luar Negeri",
  ];

  useEffect(()=> {
    const email = localStorage.getItem("Email")
    setIsAdmin(email === "admin@gmail.com" || email === "pengadaancilandak@gmail.com")
  },[])

  // Hitung Total secara otomatis ketika input terkait berubah
  useEffect(() => {
    const calculateTotal = () => {
      const result =
        kebutuhanDalamOrang * kebutuhanDalamX * kebutuhanDalamTahun * hargaSatuan;
      setTotal(result);
    };
    calculateTotal();
  }, [kebutuhanDalamOrang, kebutuhanDalamX, kebutuhanDalamTahun, hargaSatuan]);

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
            setMitraKerja(navigationState.mitraKerja);
            setWaktuPelaksanaan(navigationState.waktuPelaksanaan);
            setKomponen(navigationState.komponen);
            setKebutuhanDalamOrang(navigationState.kebutuhanDalamOrang || 0);
            setKebutuhanDalamX(navigationState.kebutuhanDalamX || 0);
            setKebutuhanDalamTahun(navigationState.kebutuhanDalamTahun || 0);
            setHargaSatuan(navigationState.hargaSatuan || 0);
            setIndikatorKinerja(navigationState.indikatorKinerja);
            setSumberPembiayaan(navigationState.sumberPembiayaan);
            setNamaPenginput(navigationState.namaPenginput);
            
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
              setMitraKerja(data.mitraKerja);
              setWaktuPelaksanaan(data.waktuPelaksanaan);
              setKomponen(data.komponen);
              setKebutuhanDalamOrang(data.kebutuhanDalamOrang || 0);
              setKebutuhanDalamX(data.kebutuhanDalamX || 0);
              setKebutuhanDalamTahun(data.kebutuhanDalamTahun || 0);
              setHargaSatuan(data.hargaSatuan || 0);
              setIndikatorKinerja(data.indikatorKinerja);
              setSumberPembiayaan(data.sumberPembiayaan);
              setNamaPenginput(data.namaPenginput);
              
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
          kebutuhanDalamOrang,
          kebutuhanDalamX,
          kebutuhanDalamTahun,
          hargaSatuan,
          total,
          indikatorKinerja,
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
          mitraKerja,
          waktuPelaksanaan,
          komponen,
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
    setMitraKerja("");
    setWaktuPelaksanaan("");
    setKomponen("");
    setKebutuhanDalamOrang(0);
    setKebutuhanDalamX(0);
    setKebutuhanDalamTahun(0);
    setHargaSatuan(0);
    setIndikatorKinerja("");
    setSumberPembiayaan("");
    setNamaPenginput("");
  };

  // Update button text based on editing state
  const submitButtonText = isEditing ? "Perbarui" : "Simpan";

  return (
    <>
      <div className="flex">
        <Header />
        <div className="p-4 w-full">
          <Link to={"/ruk"}>
            <div className="flex items-center cursor-pointer hover:underline">
              <IoIosAddCircle className="text-[25px]" />
              <h1>{isEditing ? "Edit Data Perencanaan" : "Tambah Data Perencanaan"}</h1>
            </div>
          </Link>
          <div className="grid grid-cols-3 gap-5 border p-2">
            <div>
              <h1>Tempat Tugas</h1>
              <select
                value={tempatTugas}
                onChange={(e) => setTempatTugas(e.target.value)}
                className="border rounded p-2 w-full"
                disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
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
            {/* ... (sisa kode select dan input tetap sama seperti sebelumnya) ... */}
            <div>
              <h1>Kegiatan</h1>
              <select
                value={kegiatan}
                onChange={(e) => setKegiatan(e.target.value)}
                className="border rounded p-2 w-full"
                disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
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
      setWaktuPelaksanaan({ seconds: timestamp / 1000, nanoseconds: 0 });
    }}
    className="border rounded p-2 w-full"
    placeholder="Masukkan Waktu Pelaksanaan"
    disabled={!isAdmin} // Disable jika bukan admin
  />
</div>

            <div>
              <h1>Komponen</h1>
              <select
                value={komponen}
                onChange={(e) => setKomponen(e.target.value)}
                className="border rounded p-2 w-full"
                disabled={!isAdmin} // Disable jika bukan admin
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
                  disabled={!isAdmin} // Disable jika bukan admin
                />
                <input
                  type="number"
                  value={kebutuhanDalamX}
                  onChange={(e) => setKebutuhanDalamX(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Masukkan BERAPA x"
                  disabled={!isAdmin} // Disable jika bukan admin
                />
                <input
                  type="number"
                  value={kebutuhanDalamTahun}
                  onChange={(e) => setKebutuhanDalamTahun(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="Masukkan Kebutuhan Dalam Tahun"
                  disabled={!isAdmin} // Disable jika bukan admin
                />
                <input
                  type="number"
                  value={hargaSatuan}
                  onChange={(e) => setHargaSatuan(e.target.value)}
                  className="border rounded p-2 w-full"
                  placeholder="harga satuan"
                  disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
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
                disabled={!isAdmin} // Disable jika bukan admin
              />
            </div>
            {/* Tambahkan tombol Reset di bawah tombol Simpan/Perbarui */}
            {isAdmin ? (
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

            ): null}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRuk;