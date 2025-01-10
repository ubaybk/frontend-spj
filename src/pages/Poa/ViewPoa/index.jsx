import Header from "../../../components/header";
import { useState, useEffect } from "react";
import {
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  addDoc,
} from "firebase/firestore";
import db from "../../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";

const ViewPoa = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [openBarjas, setOpenBarjas] = useState(false);
  const [openModalPeralatan, setOpenModalPeralatan] = useState(false);
  const [openModalGedungBangunan, setOpenModalGedungBangunan] = useState(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const parseRupiah = (formattedValue) => {
    return parseInt(formattedValue.replace(/[^\d]/g, ""), 10) || 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "poa_data", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e, field) => {
    const rawValue = parseRupiah(e.target.value);
    setData((prevData) => ({
      ...prevData,
      [field]: rawValue,
    }));
  };

  return (
    <>
      <div className="flex">
        <div className="">
          <Header />
        </div>
        <div className="p-4 w-full mb-10">
          <h1 className="text-2xl font-bold mb-4">LIHAT DATA TAHUNAN P O A</h1>
          {/* Dropdown Tahun */}
          <div className="mb-5">
            <label htmlFor="tahun" className="text-lg font-bold mb-4">
              Tahun
            </label>
            <input
              id="tahun"
              name="tahun"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={data?.tahun || ""}
              placeholder="Tahun"
              readOnly
            />
          </div>
          <form className="space-y-4">
            {/* Input Pilihan Belanja */}

            <div>
              <h1
                onClick={() => setOpenBarjas(!openBarjas)}
                className="text-lg font-bold bg-red-400 p-2 mb-4 w-fit cursor-pointer"
              >
                BARANG DAN JASA
              </h1>
              {openBarjas && (
                <div>
                  <h1>total barjas</h1>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(data.totalBarangJasa)}
                  </p>

                  <div className="ml-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        id: "thrNonPns",
                        label: "THR Non PNS",
                      },
                      {
                        id: "gaji13NonPns",
                        label: "Gaji 13 Non PNS",
                      },
                      {
                        id: "tkdPPPPK",
                        label: "TKD PPPPK (Selisih)",
                      },
                      {
                        id: "artDanAlatKebersihan",
                        label: "ART dan Alat Kebersihan",
                      },
                      {
                        id: "atk",
                        label: "A T K",
                      },
                      {
                        id: "cetakan",
                        label: "Cetakan",
                      },
                      {
                        id: "bahanMentah",
                        label: "Bahan Mentah",
                      },
                      {
                        id: "alkesPakaiHabis",
                        label: "Alkes Pakai Habis",
                      },
                      {
                        id: "alatLaboratorium",
                        label: "Alat Laboratorium",
                      },
                      {
                        id: "obat",
                        label: "Obat - obatan",
                      },
                      {
                        id: "pengadaanDesinfectan",
                        label: "Pengadaan Desinfectan",
                      },
                      {
                        id: "pengadaanLarvasida",
                        label: "Pengadaan Larvasida dan Insektisida",
                      },
                      {
                        id: "gajiPjlp",
                        label: "Gaji PJLP",
                      },
                      {
                        id: "jasaRekamMedik",
                        label: "Jasa Rekam Medik Elektronik",
                      },
                      {
                        id: "retribusiSampah",
                        label: "Retribusi Sampah",
                      },
                      {
                        id: "telpon",
                        label: "Telepon",
                      },
                      {
                        id: "air",
                        label: "Air",
                      },
                      {
                        id: "listrik",
                        label: "Listrik",
                      },
                      {
                        id: "internet",
                        label: "Internet",
                      },
                      {
                        id: "diklat",
                        label: "Diklat",
                      },
                      {
                        id: "bpjsKesehatan",
                        label: "BPJS Kesehatan",
                      },
                      {
                        id: "bpjsKetenagakerjaan",
                        label: "BPJS Ketenagakerjaan",
                      },
                      {
                        id: "pakaianDinas",
                        label: "Pakaian Dinas Harian Nakes dan Seragam PJLP",
                      },
                      {
                        id: "jasaPeriksaSampleKesling",
                        label: "Jasa Periksa Sampel Kesling",
                      },
                      {
                        id: "cateringPasienRb",
                        label: "Catering Pasien RB",
                      },
                      {
                        id: "sewaMesinFc",
                        label: "Sewa Mesin Fotocopy",
                      },
                      {
                        id: "kerjaSamaPemeriksaanLab",
                        label: "Kerjasama Pemeriksaan Lab dengan RS",
                      },
                      {
                        id: "jasaHygineService",
                        label: "Jasa Hygiene Service",
                      },
                      {
                        id: "bbmFogging",
                        label: "BBM KDO dan Fogging",
                      },
                      {
                        id: "mutu",
                        label: "Mutu",
                      },
                      {
                        id: "pemeliharaan",
                        label: "Pemeliharaan (Gedung, Kendaraan, Alkes, dll)",
                      },
                      {
                        id: "apdPetugasFogging",
                        label: "APD Petugas Fogging",
                      },
                      {
                        id: "apdPetugasIpal",
                        label:
                          "APD Petugas IPAL dan Pembersihan TPS Limbah Medis dan B3",
                      },
                      {
                        id: "operasionalLainnya",
                        label: "Operasional Lainnya",
                      },
                      {
                        id: "ukmSituasional",
                        label: "UKM Situasional",
                      },
                      {
                        id: "honorPetugasFogging",
                        label: "Honor Petugas Fogging",
                      },
                      {
                        id: "pestControl",
                        label: "Pest Control",
                      },
                      {
                        id: "sewaPrinter",
                        label: "Sewa Printer",
                      },
                      {
                        id: "penyediaanMakminTamu",
                        label: "Penyediaan Makmin Tamu Kedinasan",
                      },
                      {
                        id: "pelayananPiketSabtu",
                        label: "Pelayanan Piket Sabtu Puskesmas Pembantu",
                      },
                      {
                        id: "pelayananDukunganKesehatan",
                        label:
                          "Pelayanan Dukungan Kesehatan Lapangan (Dukkeslap)",
                      },
                    ].map((field) => (
                      <div key={field.id} className="flex flex-col">
                        <label
                          htmlFor={field.id}
                          className="text-sm font-medium text-gray-700 mb-2"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          name={field.id}
                          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          type="text"
                          placeholder="Pagu Belanja"
                          value={formatRupiah(data?.[field.id])}
                          readOnly
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Peralatan Mesin */}
            <div>
              <h1
                onClick={() => setOpenModalPeralatan(!openModalPeralatan)}
                className="text-lg font-bold bg-red-400 p-2 mb-4 w-fit cursor-pointer"
              >
                Modal Peralatan dan Mesin
              </h1>

              {openModalPeralatan && (
                <div>
                  <h1>Total Modal Peralatan dan Mesin</h1>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(data.totalModalPeralatanMesin)}
                  </p>
                  <div className="ml-10">
                    {[
                      { id: "komputer", label: "Komputer" },
                      { id: "laptop", label: "Laptop" },
                      { id: "ac2Pk", label: "AC 2PK" },
                      { id: "ac1Pk", label: "AC 1 PK" },
                      { id: "ekg", label: "EKG" },
                      { id: "dentalUnit", label: "Dental Unit" },
                      { id: "peakflowMeter", label: "Peakflow Meter" },
                      { id: "motor", label: "Motor" },
                      { id: "mesinPendorong", label: "Mesin Pendorong" },
                      { id: "takTerduga", label: "Tak Terduga" },
                      // Tambahkan field lainnya di sini
                    ].map((field) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-5 mb-3"
                      >
                        <label
                          htmlFor={field.id}
                          className="text-sm font-medium text-gray-700"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          name={field.id}
                          className="p-2 border rounded-md"
                          type="text"
                          placeholder="Pagu Belanja"
                          value={formatRupiah(data?.[field.id])}
                          readOnly
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Gedung Bangunan */}
            <div>
              <h1
                onClick={() =>
                  setOpenModalGedungBangunan(!openModalGedungBangunan)
                }
                className="text-lg font-bold bg-red-400 p-2 mb-4 w-fit cursor-pointer"
              >
                Modal Gedung Dan Bangunan
              </h1>
              {openModalGedungBangunan && (
                <div>
                  <h1>Total</h1>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(data.totalModalGedungBangunan)}
                  </p>

                  <div className="ml-10">
                    {[
                      { id: "tanggaPasien", label: "Tangga Pasien" },
                      {
                        id: "penambahanAkesTangga",
                        label: "Penambahan Akses Tangga",
                      },

                      // Tambahkan field lainnya di sini
                    ].map((field) => (
                      <div
                        key={field.id}
                        className="flex items-center gap-5 mb-3"
                      >
                        <label
                          htmlFor={field.id}
                          className="text-sm font-medium text-gray-700"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          name={field.id}
                          className="p-2 border rounded-md"
                          type="text"
                          placeholder="Pagu Belanja"
                          value={formatRupiah(data?.[field.id])}
                          readOnly
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Tombol Submit */}
          </form>
        </div>
      </div>
    </>
  );
};

export default ViewPoa;
