import { useState, useEffect, useRef } from "react";
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
  const [customKomponen, setCustomKomponen] = useState("")
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

  const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownRef = useRef(null);

  

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
    "Peningkatan Pelayanan BLUD",
    "Penyediaan Layanan Kesehatan untuk UKP Rujukan, UKM dan UKM Rujukan Tingkat Daerah Provinsi",
    "Pengelolaan Pelayanan Kesehatan Dasar Melalui Pendekatan KeluargaPenyediaan Layanan Kesehatan untuk UKM dan UKP Rujukan Tingkat Daerah Kabupaten/Kota",
    "Perencanaan Kebutuhan dan Pendayagunaan Sumber Daya Manusia Kesehatan untuk UKP dan UKM di Wilayah Kabupaten/Kota",
    "Pengembangan dan Pelaksanaan Upaya Kesehatan Bersumber Daya Masyarakat (UKBM) Tingkat Daerah Kabupaten/Kota",
  ];

  const optionSubKegiatan = [
    "Pelayanan dan Penunjang Pelayanan BLUD",
    "Pembinaan Pelaksanaan Upaya Pelayanan Kesehatan",
    "Pengelolaan Pelayanan Kesehatan Dasar Melalui Pendekatan Keluarga",
    "Pengelolaan Pelayanan Kesehatan Ibu Hamil",
    "Pengelolaan Pelayanan Kesehatan Ibu Bersalin",
    "Pengelolaan Pelayanan Kesehatan Bayi Baru Lahir",
    "Pengelolaan Pelayanan Kesehatan Balita",
    "Pengelolaan Pelayanan Kesehatan pada Usia Pendidikan Dasar",
    "Pengelolaan Pelayanan Kesehatan pada Usia Produktif",
    "Pengelolaan Pelayanan Kesehatan pada Usia Lanjut",
    "Pengelolaan Pelayanan Kesehatan Penderita Hipertensi",
    "Pengelolaan Pelayanan Kesehatan Penderita Diabetes Melitus",
    "Pengelolaan Pelayanan Kesehatan Orang dengan Gangguan Jiwa Berat",
    "Pengelolaan Pelayanan Kesehatan Orang Terduga Tuberkulosis",
    "Pengelolaan Pelayanan Kesehatan Orang dengan Risiko Terinfeksi HIV",
    "Pengelolaan Pelayanan Kesehatan Gizi Masyarakat",
    "Pengelolaan Pelayanan Kesehatan Kerja dan Olahraga",
    "Pengelolaan Pelayanan Kesehatan Lingkungan",
    "Pengelolaan Pelayanan Promosi Kesehatan",
    "Pengelolaan Pelayanan Kesehatan Tradisonal, Akupuntur, Asuhan Mandiri dan Tradisional Lainnya",
    "Pengelolaan Surveilans Kesehatan",
    "Pengelolaan Pelayanan Kesehatan Penyakit Menular dan Tidak Menular",
    "Pengelolaan pelayanan kesehatan orang dengan Tuberkulosis",
    "Pengelolaan pelayanan kesehatan orang dengan HIV (ODHIV)",
    "Pengelolaan pelayanan kesehatan Malaria",
    "Pengelolaan Kawasan tanpa rokok",
    "Pengelolaan Pelayanan Kesehatan Haji",
    "Pemenuhan Kebutuhan Sumber Daya Manusia Kesehatan Sesuai Standar",
    "Bimbingan Teknis dan Supervisi Pengembangan dan Pelaksanaan Upaya Kesehatan Bersumber Daya Masyarakat (UKBM)"
  ];

  const optionKomponen = ["Makan", "Snack", "Transport", "Lainnya"];
  
  const optionIndikatorKinerja = [
    "Jumlah  Alat  Kesehatan/Alat  Penunjang  Medik Fasilitas Layanan Kesehatan yang Disediakan",
    "Jumlah  Alat  Kesehatan/Alat  Penunjang  Medik Fasilitas   Layanan   Kesehatan   yang   Terpelihara Sesuai Standar",
    "Jumlah Sarana, Prasarana dan Alat Kesehatan yang Telah Dilakukan Rehabilitasi dan Pemeliharaan Oleh Puskesmas",
"Jumlah Ibu Hamil yang Mendapatkan Pelayanan Kesehatan Sesuai Standar",
"Jumlah Ibu Bersalin yang Mendapatkan Pelayanan Kesehatan Sesuai Standar",
"Jumlah Bayi Baru Lahir yang Mendapatkan Pelayanan Kesehatan Sesuai Standar",
"Jumlah Balita yang Mendapatkan Pelayanan Kesehatan Sesuai Standar",
"Jumlah Anak Usia Pendidikan Dasar yang Mendapatkan Pelayanan Kesehatan Sesuai Standar",
"Jumlah Penduduk Usia Produktif yangMendapatkan Pelayanan Kesehatan Sesuai Standar",
"Jumlah Penduduk Usia Lanjut yang Mendapatkan Pelayanan Kesehatan Sesuai Standar",
"Jumlah Penderita Hipertensi yang Mendapatkan Pelayanan Kesehatan Sesuai Standar",
"Jumlah Penderita Diabetes Melitus yangMendapatkan Pelayanan Kesehatan Sesuai Standar",
"Jumlah Orang yang Mendapatkan PelayananKesehatan Orang dengan Gangguan Jiwa Berat Sesuai Standar",
"Jumlah Orang Terduga Menderita Tuberkulosis yang Mendapatkan Pelayanan Sesuai Standar",
"Jumlah Orang Terduga Menderita HIV yang Mendapatkan Pelayanan Sesuai Standar",
"Jumlah Fasilitas Kesehatan yang Terakreditasi diKabupaten/Kota",
"Jumlah Dokumen Hasil Pengelolaan Sistem Informasi Kesehatan",
"Jumlah Sumber Daya Manusia Kesehatan Kompetensi dan Kualifikasi Meningkat",
"Jumlah Sumber Daya Manusia Kesehatan yang Memenuhi Standar di Fasilitas Pelayanan Kesehatan (Fasyankes)",
"Jumlah Dokumen Hasil Pengendalian dan Pengawasan serta Tindak Lanjut Pengawasan Perizinan Apotek, Toko Obat, Toko Alat Kesehatan, dan Optikal, Usaha Mikro ObatTradisional (UMOT)",
"Jumlah Dokumen Hasil Pengendalian dan Pengawasan serta Tindak Lanjut Pengawasan Sertifikat Produksi Pangan Industri Rumah Tangga dan Nomor P-IRT sebagai Izin Produksi, untuk Produk Makanan Minuman Tertentu yang Dapat Diproduksi oleh Industri Rumah Tangga",
"Jumlah Dokumen Hasil Pengendalian dan Pengawasan serta Tindak Lanjut Pengawasan Penerbitan Sertifikat Laik Higiene Sanitasi Tempat Pengelolaan Makanan (TPM) antara lain Jasa Boga, Rumah Makan/Restoran dan Depot Air Minum (DAM)",
"Jumlah Dokumen Hasil Bimbingan Teknis dan Supervisi Upaya Kesehatan Bersumber Daya Masyarakat (UKBM)",
"Jumlah Dokumen Perencanaan Perangkat Daerah",
"Jumlah Laporan Evaluasi Kinerja Perangkat Daerah",
"Jumlah Laporan Keuangan Akhir Tahun SKPD dan Laporan Hasil Koordinasi Penyusunan Laporan Keuangan Akhir Tahun SKPD",
"Jumlah Pegawai Berdasarkan Tugas dan Fungsi yang Mengikuti Pendidikan dan Pelatihan",
"Jumlah Paket Peralatan dan Perlengkapan Kantoryang Disediakan",
"Jumlah Paket Barang Cetakan dan Penggandaan yang Disediakan",
"Jumlah Paket Bahan/Material yang Disediakan",
"Jumlah Laporan Fasilitasi Kunjungan Tamu",
"Jumlah Laporan Penyelenggaraan Rapat Koordinasi dan Konsultasi SKPD",
"Jumlah Laporan Penyediaan Jasa Komunikasi, Sumber Daya Air dan Listrik yang Disediakan",
"Jumlah Laporan Penyediaan Jasa Peralatan danPerlengkapan Kantor yang Disediakan",
"Jumlah Laporan Penyediaan Jasa PelayananUmum Kantor yang Disediakan",
"Jumlah Kendaraan Dinas Operasional atau Lapangan yang Dipelihara dan Dibayarkan Pajak dan Perizinannya",
"Jumlah Peralatan dan Mesin Lainnya yang Dipelihara",
"Jumlah BLUD yang Menyediakan Pelayanan dan Penunjang Pelayanan"
]

  const optionSumberPembiayaan = [
    "APBN",
    "BLUD",
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
            setCustomKomponen(navigationState.customKomponen)
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
              setCustomKomponen(data.customKomponen)
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
          customKomponen,
          kebutuhanDalamOrang,
          kebutuhanDalamX,
          kebutuhanDalamTahun,
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
          mitraKerja,
          waktuPelaksanaan,
          komponen,
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
    setCustomKomponen("")
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

  const filteredOptions = optionIndikatorKinerja.filter(option =>
    option.toLowerCase().includes(indikatorKinerja.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <div className="text-gray-400">
            {isOpen ? '▲' : '▼'}
          </div>
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
                    setIndikatorKinerja('');
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
            {/* <div>
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
            </div> */}
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