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
import Header from "../../../components/header";
import { getAuth } from "firebase/auth";



const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const AddTahunanPoa = () => {
  const [openBarjas, setOpenBarjas] = useState(false);
  const [openModalPeralatan, setOpenModalPeralatan] = useState(false);
  const [openModalGedungBangunan, setOpenModalGedungBangunan] = useState(false)


  const hitungModal = () => {
    const {komputer, laptop, ac2Pk, ac1Pk, ekg, dentalUnit, peakflowMeter, motor, mesinPendorong, takTerduga} = formData
    return (komputer || 0) + (laptop || 0) + (ac2Pk || 0) + (ac1Pk || 0) + (ekg || 0) + (dentalUnit || 0) + (peakflowMeter || 0) + (motor || 0) + (mesinPendorong || 0) + (takTerduga || 0)
  }

  const hitungBarangJasa = () => {
    const {thrNonPns, gaji13NonPns,tkdPPPPK,artDanAlatKebersihan,atk,cetakan,bahanMentah,alkesPakaiHabis,alatLaboratorium,obat,pengadaanDesinfectan,pengadaanLarvasida,gajiPjlp,jasaRekamMedik,retribusiSampah,telpon,air,listrik,internet,diklat,bpjsKesehatan,bpjsKetenagakerjaan,pakaianDinas,jasaPeriksaSampleKesling,cateringPasienRb,sewaMesinFc,kerjaSamaPemeriksaanLab,jasaHygineService,bbmFogging,mutu,pemeliharaan,apdPetugasFogging,apdPetugasIpal,operasionalLainnya,ukmSituasional,honorPetugasFogging,pestControl,sewaPrinter,penyediaanMakminTamu,pelayananPiketSabtu,pelayananDukunganKesehatan} = formData
    return (thrNonPns || 0) + (gaji13NonPns || 0) +(tkdPPPPK ||0)+(artDanAlatKebersihan||0)+(atk||0)+(cetakan||0)+(bahanMentah||0)+(alkesPakaiHabis||0)+(alatLaboratorium||0)+(obat||0)+(pengadaanDesinfectan||0)+(pengadaanLarvasida||0)+(gajiPjlp||0)+(jasaRekamMedik||0)+(retribusiSampah||0)+(telpon||0)+(air||0)+(listrik||0)+(internet||0)+(diklat||0)+(bpjsKesehatan||0)+(bpjsKetenagakerjaan||0)+(pakaianDinas||0)+(jasaPeriksaSampleKesling||0)+(cateringPasienRb||0)+(sewaMesinFc||0)+(kerjaSamaPemeriksaanLab||0)+(jasaHygineService||0)+(bbmFogging||0)+(mutu||0)+(pemeliharaan||0)+(apdPetugasFogging||0)+(apdPetugasIpal||0)+(operasionalLainnya||0)+(ukmSituasional||0)+(honorPetugasFogging||0)+(pestControl||0)+(sewaPrinter||0)+(penyediaanMakminTamu||0)+(pelayananPiketSabtu||0)+(pelayananDukunganKesehatan||0)
  }

  const hitungModalGedungBangunan = ()=> {
    const {tanggaPasien, penambahanAkesTangga} = formData
    return (tanggaPasien || 0) + (penambahanAkesTangga || 0 )
  }

  // State untuk form
  const [formData, setFormData] = useState({
   
    tahun: new Date().getFullYear(),
  });

  // Tahun dinamis
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit data ke Firebase
  // const handleSubmitPeralatanMesin = async (e) => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   e.preventDefault();

  //   if (!user) {
  //     alert("User not logged in!");
  //     return;
  //   }

  //   try {
  //     const dataToSave = {
  //       ...formData,
  //       createdBy: user.email,
  //       createdAt: serverTimestamp(),
  //     };

  //     await addDoc(collection(db, "poa_data"), dataToSave);
  //     alert("Data berhasil disimpan!");
  //     // Reset form
  //     setFormData({
  //       // Modal Peralatan Dan Mesin
  //       komputer: 0,
  //       laptop: 0,
  //       ac2Pk: 0,
  //       ac1Pk: 0,
  //       ekg: 0,
  //       dentalUnit: 0,
  //       peakflowMeter: 0,
  //       motor: 0,
  //       mesinPendorong: 0,
  //       takTerduga: 0,
  //       // Modal Gedung dan Bangunan
  //       // tanggaPasien: 0,
  //       // penambahanAkesTangga: 0,
  //       // tahun: currentYear,
  //     });
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //     alert("Gagal menyimpan data. Silakan coba lagi.");
  //   }
  // };
  const handleSubmit = async (e) => {
    const auth = getAuth();
    const user = auth.currentUser;
    e.preventDefault();

    if (!user) {
      alert("User not logged in!");
      return;
    }

    try {
      const totalModalPeralatanMesin = hitungModal();
      const totalBarangJasa = hitungBarangJasa()
      const totalModalGedungBangunan = hitungModalGedungBangunan()
      const dataToSave = {
        ...formData,
        totalModalPeralatanMesin,
        totalBarangJasa,
        totalModalGedungBangunan,
        createdBy: user.email,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "poa_data"), dataToSave);
      alert("Data berhasil disimpan!");
      // Reset form
      setFormData({
        thrNonPns: 0,
        gaji13NonPns: 0,
        tkdPPPPK: 0,
        artDanAlatKebersihan: 0,
        atk: 0,
        cetakan: 0,
        bahanMentah: 0,
        alkesPakaiHabis: 0,
        alatLaboratorium: 0,
        obat: 0,
        pengadaanDesinfectan: 0,
        pengadaanLarvasida: 0,
        gajiPjlp: 0,
        jasaRekamMedik: 0,
        retribusiSampah: 0,
        telpon: 0,
        air: 0,
        listrik: 0,
        internet: 0,
        diklat: 0,
        bpjsKesehatan: 0,
        bpjsKetenagakerjaan: 0,
        pakaianDinas: 0,
        jasaPeriksaSampleKesling: 0,
        cateringPasienRb: 0,
        sewaMesinFc: 0,
        kerjaSamaPemeriksaanLab: 0,
        jasaHygineService: 0,
        bbmFogging: 0,
        mutu: 0,
        pemeliharaan: 0,
        apdPetugasFogging: 0,
        apdPetugasIpal: 0,
        operasionalLainnya: 0,
        ukmSituasional: 0,
        honorPetugasFogging: 0,
        pestControl: 0,
        sewaPrinter: 0,
        penyediaanMakminTamu: 0,
        pelayananPiketSabtu: 0,
        pelayananDukunganKesehatan: 0,
        // Modal Peralatan Dan Mesin
        komputer: 0,
        laptop: 0,
        ac2Pk: 0,
        ac1Pk: 0,
        ekg: 0,
        dentalUnit: 0,
        peakflowMeter: 0,
        motor: 0,
        mesinPendorong: 0,
        takTerduga: 0,
        // Modal Gedung dan Bangunan
        tanggaPasien: 0,
        penambahanAkesTangga: 0,
        // totalModaltest,
        tahun: currentYear,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  

  return (
    <>
      <div className="flex">
        <div className="">
          <Header />
        </div>
        <div className="p-4 w-full">
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
                value={formData.tahun}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                  <h1>total barjas</h1> {formatRupiah(hitungBarangJasa())}
                
                <div className="ml-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      id: "thrNonPns",
                      label: "THR Non PNS",
                      value: formData.thrNonPns,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          thrNonPns: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "gaji13NonPns",
                      label: "Gaji 13 Non PNS",
                      value: formData.gaji13NonPns,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          gaji13NonPns: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "tkdPPPPK",
                      label: "TKD PPPPK (Selisih)",
                      value: formData.tkdPPPPK,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          tkdPPPPK: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "artDanAlatKebersihan",
                      label: "ART dan Alat Kebersihan",
                      value: formData.artDanAlatKebersihan,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          artDanAlatKebersihan: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "atk",
                      label: "A T K",
                      value: formData.atk,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          atk: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "cetakan",
                      label: "Cetakan",
                      value: formData.cetakan,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          cetakan: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "bahanMentah",
                      label: "Bahan Mentah",
                      value: formData.bahanMentah,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          bahanMentah: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "alkesPakaiHabis",
                      label: "Alkes Pakai Habis",
                      value: formData.alkesPakaiHabis,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          alkesPakaiHabis: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "alatLaboratorium",
                      label: "Alat Laboratorium",
                      value: formData.alatLaboratorium,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          alatLaboratorium: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "obat",
                      label: "Obat - obatan",
                      value: formData.obat,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          obat: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "pengadaanDesinfectan",
                      label: "Pengadaan Desinfectan",
                      value: formData.pengadaanDesinfectan,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          pengadaanDesinfectan: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "pengadaanLarvasida",
                      label: "Pengadaan Larvasida dan Insektisida",
                      value: formData.pengadaanLarvasida,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          pengadaanLarvasida: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "gajiPjlp",
                      label: "Gaji PJLP",
                      value: formData.gajiPjlp,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          gajiPjlp: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "jasaRekamMedik",
                      label: "Jasa Rekam Medik Elektronik",
                      value: formData.jasaRekamMedik,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          jasaRekamMedik: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "retribusiSampah",
                      label: "Retribusi Sampah",
                      value: formData.retribusiSampah,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          retribusiSampah: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "telpon",
                      label: "Telepon",
                      value: formData.telpon,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          telpon: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "air",
                      label: "Air",
                      value: formData.air,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          air: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "listrik",
                      label: "Listrik",
                      value: formData.listrik,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          listrik: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "internet",
                      label: "Internet",
                      value: formData.internet,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          internet: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "diklat",
                      label: "Diklat",
                      value: formData.diklat,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          diklat: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "bpjsKesehatan",
                      label: "BPJS Kesehatan",
                      value: formData.bpjsKesehatan,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          bpjsKesehatan: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "bpjsKetenagakerjaan",
                      label: "BPJS Ketenagakerjaan",
                      value: formData.bpjsKetenagakerjaan,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          bpjsKetenagakerjaan: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "pakaianDinas",
                      label: "Pakaian Dinas Harian Nakes dan Seragam PJLP",
                      value: formData.pakaianDinas,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          pakaianDinas: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "jasaPeriksaSampleKesling",
                      label: "Jasa Periksa Sampel Kesling",
                      value: formData.jasaPeriksaSampleKesling,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          jasaPeriksaSampleKesling: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "cateringPasienRb",
                      label: "Catering Pasien RB",
                      value: formData.cateringPasienRb,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          cateringPasienRb: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "sewaMesinFc",
                      label: "Sewa Mesin Fotocopy",
                      value: formData.sewaMesinFc,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          sewaMesinFc: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "kerjaSamaPemeriksaanLab",
                      label: "Kerjasama Pemeriksaan Lab dengan RS",
                      value: formData.kerjaSamaPemeriksaanLab,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          kerjaSamaPemeriksaanLab: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "jasaHygineService",
                      label: "Jasa Hygiene Service",
                      value: formData.jasaHygineService,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          jasaHygineService: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "bbmFogging",
                      label: "BBM KDO dan Fogging",
                      value: formData.bbmFogging,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          bbmFogging: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "mutu",
                      label: "Mutu",
                      value: formData.mutu,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          mutu: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "pemeliharaan",
                      label: "Pemeliharaan (Gedung, Kendaraan, Alkes, dll)",
                      value: formData.pemeliharaan,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          pemeliharaan: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "apdPetugasFogging",
                      label: "APD Petugas Fogging",
                      value: formData.apdPetugasFogging,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          apdPetugasFogging: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "apdPetugasIpal",
                      label:
                        "APD Petugas IPAL dan Pembersihan TPS Limbah Medis dan B3",
                      value: formData.apdPetugasIpal,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          apdPetugasIpal: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "operasionalLainnya",
                      label: "Operasional Lainnya",
                      value: formData.operasionalLainnya,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          operasionalLainnya: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "ukmSituasional",
                      label: "UKM Situasional",
                      value: formData.ukmSituasional,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          ukmSituasional: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "honorPetugasFogging",
                      label: "Honor Petugas Fogging",
                      value: formData.honorPetugasFogging,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          honorPetugasFogging: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "pestControl",
                      label: "Pest Control",
                      value: formData.pestControl,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          pestControl: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "sewaPrinter",
                      label: "Sewa Printer",
                      value: formData.sewaPrinter,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          sewaPrinter: rawValue ? parseInt(rawValue, 10) : 0,
                        })),
                    },
                    {
                      id: "penyediaanMakminTamu",
                      label: "Penyediaan Makmin Tamu Kedinasan",
                      value: formData.penyediaanMakminTamu,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          penyediaanMakminTamu: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "pelayananPiketSabtu",
                      label: "Pelayanan Piket Sabtu Puskesmas Pembantu",
                      value: formData.pelayananPiketSabtu,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          pelayananPiketSabtu: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
                    },
                    {
                      id: "pelayananDukunganKesehatan",
                      label:
                        "Pelayanan Dukungan Kesehatan Lapangan (Dukkeslap)",
                      value: formData.pelayananDukunganKesehatan,
                      onChange: (rawValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          pelayananDukunganKesehatan: rawValue
                            ? parseInt(rawValue, 10)
                            : 0,
                        })),
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
                 <h1>Total</h1>{formatRupiah(hitungModal())}
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
                    value={
                      formData.komputer ? formatRupiah(formData.komputer) : ""
                    } // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        komputer: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                    value={formData.laptop ? formatRupiah(formData.laptop) : ""} // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        laptop: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                    value={formData.ac2Pk ? formatRupiah(formData.ac2Pk) : ""} // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        ac2Pk: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                    value={formData.ac1Pk ? formatRupiah(formData.ac1Pk) : ""} // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        ac1Pk: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                    value={formData.ekg ? formatRupiah(formData.ekg) : ""} // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        ekg: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                    value={
                      formData.dentalUnit
                        ? formatRupiah(formData.dentalUnit)
                        : ""
                    } // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        dentalUnit: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                    value={
                      formData.peakflowMeter
                        ? formatRupiah(formData.peakflowMeter)
                        : ""
                    } // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        peakflowMeter: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                    value={formData.motor ? formatRupiah(formData.motor) : ""} // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        motor: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                    value={
                      formData.mesinPendorong
                        ? formatRupiah(formData.mesinPendorong)
                        : ""
                    } // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        mesinPendorong: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                    value={
                      formData.takTerduga
                        ? formatRupiah(formData.takTerduga)
                        : ""
                    } // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        takTerduga: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                <h1>Total</h1>{formatRupiah(hitungModalGedungBangunan())}

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
                    value={
                      formData.tanggaPasien ? formatRupiah(formData.tanggaPasien) : ""
                    } // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        tanggaPasien: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
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
                    value={formData.penambahanAkesTangga ? formatRupiah(formData.penambahanAkesTangga) : ""} // Format sebagai rupiah
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, ""); // Hapus format rupiah ke angka mentah
                      setFormData((prev) => ({
                        ...prev,
                        penambahanAkesTangga: rawValue ? parseInt(rawValue, 10) : 0, // Simpan angka asli
                      }));
                    }}
                  />
                </div>
                
              </div>
              </div>
            )}
            </div>


           

            

            

            {/* Tombol Submit */}
            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTahunanPoa;
