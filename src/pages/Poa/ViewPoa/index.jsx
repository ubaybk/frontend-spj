import Header from "../../../components/header";
import { useState } from "react";
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

const ViewPoa = () => {
    const [openBarjas, setOpenBarjas] = useState(false);
  const [openModalPeralatan, setOpenModalPeralatan] = useState(false);
  const [openModalGedungBangunan, setOpenModalGedungBangunan] = useState(false)

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <>
       <div className="flex">
        <div className="">
          <Header />
        </div>
        <div className="p-4 w-full mb-10">
          <h1 className="text-2xl font-bold mb-4">TAMBAH DATA TAHUNAN P O A</h1>
          {/* Dropdown Tahun */}
          <div className="mb-5">
              <label
                htmlFor="tahun"
                className="text-lg font-bold mb-4"
              >
                Tahun
              </label>
              <select
                id="tahun"
                name="tahun"
               
                
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                
              </select>
            </div>
          <form className="space-y-4" >
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
                        value={field.value ? formatRupiah(field.value) : ""}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/[^\d]/g, "");
                          field.onChange(rawValue);
                        }}
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
                 <h1>Total</h1>
              <div className="ml-10">
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="komputer"
                    className="text-sm font-medium text-gray-700"
                  >
                    Komputer
                  </label>
                  <input
                    id="komputer"
                    name="komputer"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                    
                   
                    
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="laptop"
                    className="text-sm font-medium text-gray-700"
                  >
                    Laptop
                  </label>
                  <input
                    id="laptop"
                    name="laptop"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                   
                    
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="ac2Pk"
                    className="text-sm font-medium text-gray-700"
                  >
                    AC 2PK
                  </label>
                  <input
                    id="ac2Pk"
                    name="ac2Pk"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                    
                    
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="ac1Pk"
                    className="text-sm font-medium text-gray-700"
                  >
                    AC 1 PK
                  </label>
                  <input
                    id="ac1Pk"
                    name="ac1Pk"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                   
                   
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="ekg"
                    className="text-sm font-medium text-gray-700"
                  >
                    EKG
                  </label>
                  <input
                    id="ekg"
                    name="ekg"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                   
                    
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="dentalUnit"
                    className="text-sm font-medium text-gray-700"
                  >
                    Dental Unit
                  </label>
                  <input
                    id="dentalUnit"
                    name="dentalUnit"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                   
                  
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="peakflowMeter"
                    className="text-sm font-medium text-gray-700"
                  >
                    Peakflow meter
                  </label>
                  <input
                    id="peakflowMeter"
                    name="peakflowMeter"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                    
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="motor"
                    className="text-sm font-medium text-gray-700"
                  >
                    Motor
                  </label>
                  <input
                    id="motor"
                    name="motor"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                   
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="mesinPendorong"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mesin Pendorong
                  </label>
                  <input
                    id="mesinPendorong"
                    name="mesinPendorong"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                    
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="takTerduga"
                    className="text-sm font-medium text-gray-700"
                  >
                    Tak Terduga
                  </label>
                  <input
                    id="takTerduga"
                    name="takTerduga"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                    
                  />
                </div>
              </div>

              </div>
            )}
            </div>

              {/* Modal Gedung Bangunan */}
              <div>
            <h1
              onClick={() => setOpenModalGedungBangunan(!openModalGedungBangunan)}
               className="text-lg font-bold bg-red-400 p-2 mb-4 w-fit cursor-pointer"
            >
              Modal Gedung Dan Bangunan
            </h1>
            {openModalGedungBangunan && (
              <div>
                <h1>Total</h1>

              <div className="ml-10">
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="tanggaPasien"
                    className="text-sm font-medium text-gray-700"
                  >
                    Tangga Pasien
                  </label>
                  <input
                    id="tanggaPasien"
                    name="tanggaPasien"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                    
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor="penambahanAkesTangga"
                    className="text-sm font-medium text-gray-700"
                  >
                    Penambahan akses tangga (maintenance lift, air, dll)
                  </label>
                  <input
                    id="penambahanAkesTangga"
                    name="penambahanAkesTangga"
                    className="p-2 border rounded-md"
                    type="text" // Ubah menjadi tipe teks untuk menampilkan format rupiah
                    placeholder="Pagu Belanja"
                   
                    
                  />
                </div>
                
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
