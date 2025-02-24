import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  deleteDoc
} from "firebase/firestore";
import db from "../firebaseConfig";



export const fetchPoaData = async (tahun) => {
  try {
    const q = query(
      collection(db, "poa_data"),
      where("tahun", "==", tahun)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const poaData = querySnapshot.docs[0].data();
      return poaData;
    } else {
      alert("Data POA tidak ditemukan.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching POA data: ", error);
    alert("Gagal mengambil data POA.");
    return null;
  }
};

export const handleSave = async (type, data, dataPoa, activeMonth) => {
  // Validasi input berdasarkan tipe
  if (type === "THR" && (!data.keteranganThr || !data.jmlThr)) {
    alert("Mohon lengkapi semua data THR.");
    return;
  }

  if (type === "Gaji 13" && (!data.keteranganGaji13 || !data.jmlGaji13)) {
    alert("Mohon lengkapi semua data Gaji 13.");
    return;
  }

  if (type === "TKD PPPPK" && (!data.keteranganTkdPpppk || !data.jmlTkdPpppk)) {
    alert("Mohon lengkapi semua data TKD PPPPK.");
    return;
  }

  if (type === "ART dan Kebersihan" && (!data.keteranganArtKebersihan || !data.jmlArtKebersihan)) {
    alert("Mohon lengkapi semua data ART dan Kebersihan.");
    return;
  }

  if (type === "ATK" && (!data.keteranganAtk || !data.jmlAtk)) {
    alert("Mohon lengkapi semua data ATK.");
    return;
  }
  if (type === "CETAKAN" && (!data.keteranganCetakan || !data.jmlCetakan)) {
    alert("Mohon lengkapi semua data CETAKAN.");
    return;
  }
  if (type === "BAHAN MENTAH" && (!data.keteranganBahanMentah || !data.jmlBahanMentah)) {
    alert("Mohon lengkapi semua data Bahan Mentah.");
    return;
  }
  if (type === "ALKES PAKAI HABIS" && (!data.keteranganAlkesPakaiHabis || !data.jmlAlkesPakaiHabis)) {
    alert("Mohon lengkapi semua data Alkes Pakai Habis.");
    return;
  }
  if (type === "OBAT" && (!data.keteranganObat || !data.jmlObat)) {
    alert("Mohon lengkapi semua data Obat.");
    return;
  }
  if (type === "DESINFECTAN" && (!data.keteranganDesinfectan || !data.jmlDesinfectan)) {
    alert("Mohon lengkapi semua data Desinfectan.");
    return;
  }
  if (type === "LARVASIDA" && (!data.keteranganLarvasida || !data.jmlLarvasida)) {
    alert("Mohon lengkapi semua data Larvasida.");
    return;
  }
  if (type === "GAJI PJLP" && (!data.keteranganGajiPjlp || !data.jmlGajiPjlp)) {
    alert("Mohon lengkapi semua data Gaji PJLP.");
    return;
  }
  if (type === "RME" && (!data.keteranganRme || !data.jmlRme)) {
    alert("Mohon lengkapi semua data Jasa RME.");
    return;
  }
  if (type === "RETRIBUSI SAMPAH" && (!data.keteranganRetribusiSampah || !data.jmlRetribusiSampah)) {
    alert("Mohon lengkapi semua data Jasa Retribusi Sampah.");
    return;
  }
  if (type === "TELEPON" && (!data.keteranganTelepon || !data.jmlTelepon)) {
    alert("Mohon lengkapi semua data Telepon.");
    return;
  }
  if (type === "AIR" && (!data.keteranganAir || !data.jmlAir)) {
    alert("Mohon lengkapi semua data Air.");
    return;
  }
  if (type === "LISTRIK" && (!data.keteranganListrik || !data.jmlListrik)) {
    alert("Mohon lengkapi semua data Listrik.");
    return;
  }
  if (type === "INTERNET" && (!data.keteranganInternet || !data.jmlInternet)) {
    alert("Mohon lengkapi semua data Internet.");
    return;
  }
  if (type === "DIKLAT" && (!data.keteranganDiklat || !data.jmlDiklat)) {
    alert("Mohon lengkapi semua data Diklat.");
    return;
  }
  if (type === "BPJSKESEHATAN" && (!data.keteranganBpjsKesehatan || !data.jmlBpjsKesehatan)) {
    alert("Mohon lengkapi semua data Bpjs Kesehatan.");
    return;
  }
  if (type === "BPJSKETENAGAKERJAAN" && (!data.keteranganBpjsKetenagakerjaan || !data.jmlBpjsKetenagakerjaan)) {
    alert("Mohon lengkapi semua data Bpjs Ketenagakerjaan.");
    return;
  }
  if (type === "PAKAIANDINAS" && (!data.keteranganPakaianDinas || !data.jmlPakaianDinas)) {
    alert("Mohon lengkapi semua data Pakaian Dinas.");
    return;
  }
  if (type === "JASAPERIKSASAMPLEKESLING" && (!data.keteranganJasaPeriksaSampleKesling || !data.jmlJasaPeriksaSampleKesling)) {
    alert("Mohon lengkapi semua data Pakaian Dinas.");
    return;
  }
  if (type === "CATERINGPASIENRB" && (!data.keteranganCateringPasienRb || !data.jmlCateringPasienRb)) {
    alert("Mohon lengkapi semua data Catering Pasien RB.");
    return;
  }
  if (type === "SEWAMESINFC" && (!data.keteranganSewaMesinFc || !data.jmlSewaMesinFc)) {
    alert("Mohon lengkapi semua data Sewa Mesin FC.");
    return;
  }
  if (type === "KERJASAMAPEMERIKSAANLAB" && (!data.keteranganKerjaSamaPemeriksaanLab || !data.jmlKerjaSamaPemeriksaanLab)) {
    alert("Mohon lengkapi semua data Kerja Sama Pemeriksaan Lab.");
    return;
  }
  if (type === "JASAHYGINESERVICE" && (!data.keteranganJasaHygineService || !data.jmlJasaHygineService)) {
    alert("Mohon lengkapi semua data Jasa Hygne Service.");
    return;
  }
  if (type === "BBMFOGGING" && (!data.keteranganBbmFogging || !data.jmlBbmFogging)) {
    alert("Mohon lengkapi semua data Jasa Hygne Service.");
    return;
  }
  if (type === "MUTU" && (!data.keteranganMutu || !data.jmlMutu)) {
    alert("Mohon lengkapi semua data Mutu.");
    return;
  }
  if (type === "PEMELIHARAAN" && (!data.keteranganPemeliharaan || !data.jmlPemeliharaan)) {
    alert("Mohon lengkapi semua data Pemeliharaan.");
    return;
  }
  if (type === "APDPETUGASFOGGING" && (!data.keteranganApdPetugasFogging || !data.jmlApdPetugasFogging)) {
    alert("Mohon lengkapi semua data APD Petugas Fogging.");
    return;
  }
  if (type === "APDPETUGASIPAL" && (!data.keteranganApdPetugasIpal || !data.jmlApdPetugasIpal)) {
    alert("Mohon lengkapi semua data APD Petugas Ipal.");
    return;
  }
  if (type === "OPERASIONALLAINNYA" && (!data.keteranganOperasionalLainnya || !data.jmlOperasionalLainnya)) {
    alert("Mohon lengkapi semua data Operasional Lainnya.");
    return;
  }
  if (type === "UKMSITUASIONAL" && (!data.keteranganUkmSituasional || !data.jmlUkmSituasional)) {
    alert("Mohon lengkapi semua data Operasional Lainnya.");
    return;
  }
  if (type === "HONORPETUGASFOGGING" && (!data.keteranganHonorPetugasFogging || !data.jmlHonorPetugasFogging)) {
    alert("Mohon lengkapi semua data Honor Petugas Fogging Lainnya.");
    return;
  }
  if (type === "PESTCONTROL" && (!data.keteranganPestControl || !data.jmlPestControl)) {
    alert("Mohon lengkapi semua data PEST CONTROL.");
    return;
  }
  if (type === "SEWAPRINTER" && (!data.keteranganSewaPrinter || !data.jmlSewaPrinter)) {
    alert("Mohon lengkapi semua data Sewa Printer.");
    return;
  }

  try {
    const q = query(
      collection(db, "poa_data"),
      where("tahun", "==", dataPoa?.[0]?.tahun)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("Data POA tidak ditemukan.");
      return;
    }

    const poaDoc = querySnapshot.docs[0];
    const poaData = poaDoc.data();

    let jumlah;
    let keterangan;
    let updateData = {};

    // Menentukan jumlah dan keterangan berdasarkan tipe
    switch (type) {
      case "THR":
        jumlah = parseInt(data.jmlThr, 10);
        keterangan = data.keteranganThr;
        const newThrNonPns = poaData.thrNonPns - jumlah;
        if (newThrNonPns < 0) {
          alert("Nilai THR melebihi THR Non-PNS yang tersedia.");
          return;
        }
        updateData = {
          thrNonPns: newThrNonPns,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "Gaji 13":
        jumlah = parseInt(data.jmlGaji13, 10);
        keterangan = data.keteranganGaji13;
        const newGaji13NonPns = poaData.gaji13NonPns - jumlah;
        if (newGaji13NonPns < 0) {
          alert("Nilai Gaji 13 melebihi Gaji 13 Non-PNS yang tersedia.");
          return;
        }
        updateData = {
          gaji13NonPns: newGaji13NonPns,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "TKD PPPPK":
        jumlah = parseInt(data.jmlTkdPpppk, 10);
        keterangan = data.keteranganTkdPpppk;
        const newTkdPpppk = poaData.tkdPPPPK - jumlah;
        if (newTkdPpppk < 0) {
          alert("Nilai TKD PPPPK melebihi TKD PPPPK yang tersedia.");
          return;
        }
        updateData = {
          tkdPPPPK: newTkdPpppk,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "ART dan Kebersihan":
        jumlah = parseInt(data.jmlArtKebersihan, 10);
        keterangan = data.keteranganArtKebersihan;
        const newArtKebersihan = poaData.artDanAlatKebersihan - jumlah;
        if (newArtKebersihan < 0) {
          alert("Nilai ART dan Alat Kebersihan melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          artDanAlatKebersihan: newArtKebersihan,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "ATK":
        jumlah = parseInt(data.jmlAtk, 10);
        keterangan = data.keteranganAtk;
        const newAtk = poaData.atk - jumlah;
        if (newAtk < 0) {
          alert("Nilai ATK melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          atk: newAtk,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "CETAKAN":
        jumlah = parseInt(data.jmlCetakan, 10);
        keterangan = data.keteranganCetakan;
        const newCetakan = poaData.cetakan - jumlah;
        if (newCetakan < 0) {
          alert("Nilai Cetakan melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          cetakan: newCetakan,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "BAHAN MENTAH":
        jumlah = parseInt(data.jmlBahanMentah, 10);
        keterangan = data.keteranganBahanMentah;
        const newBahanMentah = poaData.bahanMentah - jumlah;
        if (newBahanMentah < 0) {
          alert("Nilai Bahan Mentah melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          bahanMentah: newBahanMentah,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "ALKES PAKAI HABIS":
        jumlah = parseInt(data.jmlAlkesPakaiHabis, 10);
        keterangan = data.keteranganAlkesPakaiHabis;
        const newAlkesPakaiHabis = poaData.alkesPakaiHabis - jumlah;
        if (newAlkesPakaiHabis < 0) {
          alert("Nilai Alkes Pakai Habis melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          alkesPakaiHabis: newAlkesPakaiHabis,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "ALAT LABORATORIUM":
        jumlah = parseInt(data.jmlAlatLaboratorium, 10);
        keterangan = data.keteranganAlatLaboratorium;
        const newAlatLaboratorium = poaData.alatLaboratorium - jumlah;
        if (newAlatLaboratorium < 0) {
          alert("Nilai Alat Laboratorium melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          alatLaboratorium: newAlatLaboratorium,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "OBAT":
        jumlah = parseInt(data.jmlObat, 10);
        keterangan = data.keteranganObat;
        const newObat = poaData.obat - jumlah;
        if (newObat < 0) {
          alert("Nilai Obat melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          obat: newObat,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;
      
      case "DESINFECTAN":
        jumlah = parseInt(data.jmlDesinfectan, 10);
        keterangan = data.keteranganDesinfectan;
        const newDesinfectan = poaData.pengadaanDesinfectan - jumlah;
        if (newDesinfectan < 0) {
          alert("Nilai Pengadaan Desinfectan melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          pengadaanDesinfectan: newDesinfectan,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "LARVASIDA":
        jumlah = parseInt(data.jmlLarvasida, 10);
        keterangan = data.keteranganLarvasida;
        const newLarvasida = poaData.pengadaanLarvasida - jumlah;
        if (newLarvasida < 0) {
          alert("Nilai Pengadaan Larvasida melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          pengadaanLarvasida: newLarvasida,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;
      
      case "GAJI PJLP":
        jumlah = parseInt(data.jmlGajiPjlp, 10);
        keterangan = data.keteranganGajiPjlp;
        const newGajiPjlp = poaData.gajiPjlp - jumlah;
        if (newGajiPjlp < 0) {
          alert("Nilai GAJI PJLP melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          gajiPjlp: newGajiPjlp,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "RME":
        jumlah = parseInt(data.jmlRme, 10);
        keterangan = data.keteranganRme;
        const newRme = poaData.jasaRekamMedik - jumlah;
        if (newRme < 0) {
          alert("Nilai Jasa RME melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          jasaRekamMedik: newRme,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;
      
      case "RETRIBUSI SAMPAH":
        jumlah = parseInt(data.jmlRetribusiSampah, 10);
        keterangan = data.keteranganRetribusiSampah;
        const newRetribusiSampah = poaData.retribusiSampah - jumlah;
        if (newRetribusiSampah < 0) {
          alert("Nilai Retribusi Sampah melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          retribusiSampah: newRetribusiSampah,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "TELEPON":
        jumlah = parseInt(data.jmlTelepon, 10);
        keterangan = data.keteranganTelepon;
        const newTelepon = poaData.telpon - jumlah;
        if (newTelepon < 0) {
          alert("Nilai Telepon melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          telpon: newTelepon,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "AIR":
        jumlah = parseInt(data.jmlAir, 10);
        keterangan = data.keteranganAir;
        const newAir = poaData.air - jumlah;
        if (newAir < 0) {
          alert("Nilai Air melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          air: newAir,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "LISTRIK":
        jumlah = parseInt(data.jmlListrik, 10);
        keterangan = data.keteranganListrik;
        const newListrik = poaData.listrik - jumlah;
        if (newListrik < 0) {
          alert("Nilai Listrik melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          listrik: newListrik,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;
      case "INTERNET":
        jumlah = parseInt(data.jmlInternet, 10);
        keterangan = data.keteranganInternet;
        const newInternet = poaData.internet - jumlah;
        if (newInternet < 0) {
          alert("Nilai Internet melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          internet: newInternet,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;
      case "DIKLAT":
        jumlah = parseInt(data.jmlDiklat, 10);
        keterangan = data.keteranganDiklat;
        const newDiklat = poaData.diklat - jumlah;
        if (newDiklat < 0) {
          alert("Nilai Diklat melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          diklat: newDiklat,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;
      case "BPJSKESEHATAN":
        jumlah = parseInt(data.jmlBpjsKesehatan, 10);
        keterangan = data.keteranganBpjsKesehatan;
        const newBpjsKesehatan = poaData.bpjsKesehatan - jumlah;
        if (newBpjsKesehatan < 0) {
          alert("Nilai BPJS KESEHATAN melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          bpjsKesehatan: newBpjsKesehatan,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;
      case "BPJSKETENAGAKERJAAN":
        jumlah = parseInt(data.jmlBpjsKetenagakerjaan, 10);
        keterangan = data.keteranganBpjsKetenagakerjaan;
        const newBpjsKetenagakerjaan = poaData.bpjsKetenagakerjaan - jumlah;
        if (newBpjsKetenagakerjaan < 0) {
          alert("Nilai BPJS KETENAGAKERJAAN melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          bpjsKetenagakerjaan: newBpjsKetenagakerjaan,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "PAKAIANDINAS":
        jumlah = parseInt(data.jmlPakaianDinas, 10);
        keterangan = data.keteranganPakaianDinas;
        const newPakaianDinas = poaData.pakaianDinas - jumlah;
        if (newPakaianDinas < 0) {
          alert("Nilai PAKAIAN DINAS melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          pakaianDinas: newPakaianDinas,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "JASAPERIKSASAMPLEKESLING":
        jumlah = parseInt(data.jmlJasaPeriksaSampleKesling, 10);
        keterangan = data.keteranganJasaPeriksaSampleKesling;
        const newJasaPeriksaSampleKesling = poaData.jasaPeriksaSampleKesling - jumlah;
        if (newJasaPeriksaSampleKesling < 0) {
          alert("Nilai Jasa periksa sample kesling melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          jasaPeriksaSampleKesling: newJasaPeriksaSampleKesling,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "CATERINGPASIENRB":
        jumlah = parseInt(data.jmlCateringPasienRb, 10);
        keterangan = data.keteranganCateringPasienRb;
        const newCateringPasienRb = poaData.cateringPasienRb - jumlah;
        if (newCateringPasienRb < 0) {
          alert("Nilai Catering Pasien RB melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          cateringPasienRb: newCateringPasienRb,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "SEWAMESINFC":
        jumlah = parseInt(data.jmlSewaMesinFc, 10);
        keterangan = data.keteranganSewaMesinFc;
        const newSewaMesinFc = poaData.sewaMesinFc - jumlah;
        if (newSewaMesinFc < 0) {
          alert("Nilai Sewa Mesin FC melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          sewaMesinFc: newSewaMesinFc,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;
      case "KERJASAMAPEMERIKSAANLAB":
        jumlah = parseInt(data.jmlKerjaSamaPemeriksaanLab, 10);
        keterangan = data.keteranganKerjaSamaPemeriksaanLab;
        const newKerjaSamaPemeriksaanLab = poaData.kerjaSamaPemeriksaanLab - jumlah;
        if (newKerjaSamaPemeriksaanLab < 0) {
          alert("Nilai Kerja Sama Pemeriksaan Lab melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          kerjaSamaPemeriksaanLab: newKerjaSamaPemeriksaanLab,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;
      case "JASAHYGINESERVICE":
        jumlah = parseInt(data.jmlJasaHygineService, 10);
        keterangan = data.keteranganJasaHygineService;
        const newJasaHygineService = poaData.jasaHygineService - jumlah;
        if (newJasaHygineService < 0) {
          alert("Nilai Kerja Sama Pemeriksaan Lab melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          jasaHygineService: newJasaHygineService,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;
      case "BBMFOGGING":
        jumlah = parseInt(data.jmlBbmFogging, 10);
        keterangan = data.keteranganBbmFogging;
        const newBbmFogging = poaData.bbmFogging - jumlah;
        if (newBbmFogging < 0) {
          alert("Nilai BBM FOGGING melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          bbmFogging: newBbmFogging,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "MUTU":
        jumlah = parseInt(data.jmlMutu, 10);
        keterangan = data.keteranganMutu;
        const newMutu = poaData.mutu - jumlah;
        if (newMutu < 0) {
          alert("Nilai MUTU melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          mutu: newMutu,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "PEMELIHARAAN":
        jumlah = parseInt(data.jmlPemeliharaan, 10);
        keterangan = data.keteranganPemeliharaan;
        const newPemeliharaan = poaData.pemeliharaan - jumlah;
        if (newPemeliharaan < 0) {
          alert("Nilai Pemeliharaan melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          pemeliharaan: newPemeliharaan,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "APDPETUGASFOGGING":
        jumlah = parseInt(data.jmlApdPetugasFogging, 10);
        keterangan = data.keteranganApdPetugasFogging;
        const newApdPetugasFogging = poaData.apdPetugasFogging - jumlah;
        if (newApdPetugasFogging < 0) {
          alert("Nilai APD Petugas Fogging melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          apdPetugasFogging: newApdPetugasFogging,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "APDPETUGASIPAL":
        jumlah = parseInt(data.jmlApdPetugasIpal, 10);
        keterangan = data.keteranganApdPetugasIpal;
        const newApdPetugasIpal = poaData.apdPetugasIpal - jumlah;
        if (newApdPetugasIpal < 0) {
          alert("Nilai APD Petugas Ipal melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          apdPetugasIpal: newApdPetugasIpal,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "OPERASIONALLAINNYA":
        jumlah = parseInt(data.jmlOperasionalLainnya, 10);
        keterangan = data.keteranganOperasionalLainnya;
        const newOperasionalLainnya = poaData.operasionalLainnya - jumlah;
        if (newOperasionalLainnya < 0) {
          alert("Nilai Operasional Lainnya melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          operasionalLainnya: newOperasionalLainnya,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "UKMSITUASIONAL":
        jumlah = parseInt(data.jmlUkmSituasional, 10);
        keterangan = data.keteranganUkmSituasional;
        const newUkmSituasional = poaData.ukmSituasional - jumlah;
        if (newUkmSituasional < 0) {
          alert("Nilai UKM Situasional melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          ukmSituasional: newUkmSituasional,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "HONORPETUGASFOGGING":
        jumlah = parseInt(data.jmlHonorPetugasFogging, 10);
        keterangan = data.keteranganHonorPetugasFogging;
        const newHonorPetugasFogging = poaData.honorPetugasFogging - jumlah;
        if (newHonorPetugasFogging < 0) {
          alert("Nilai Honor Petugas Fogging melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          honorPetugasFogging: newHonorPetugasFogging,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "PESTCONTROL":
        jumlah = parseInt(data.jmlPestControl, 10);
        keterangan = data.keteranganPestControl;
        const newPestControl = poaData.pestControl - jumlah;
        if (newPestControl < 0) {
          alert("Nilai Honor Petugas Fogging melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          pestControl: newPestControl,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      case "SEWAPRINTER":
        jumlah = parseInt(data.jmlSewaPrinter, 10);
        keterangan = data.keteranganSewaPrinter;
        const newSewaPrinter = poaData.sewaPrinter - jumlah;
        if (newSewaPrinter < 0) {
          alert("Nilai Sewa Printer melebihi nilai yang tersedia.");
          return;
        }
        updateData = {
          sewaPrinter: newSewaPrinter,
          totalBarangJasa: poaData.totalBarangJasa - jumlah
        };
        break;

      default:
        alert("Tipe data tidak valid");
        return;
    }

    // Update dokumen POA
    await updateDoc(doc(db, "poa_data", poaDoc.id), updateData);

    // Tambah dokumen baru ke collection inputBarjas
    await addDoc(collection(db, "inputBarjas"), {
      type,
      keterangan,
      jumlahThr: jumlah,
      tahun: dataPoa?.[0]?.tahun,
      bulan: activeMonth || "bulan kosong",
      createAt: new Date(),
    });

    alert("Data berhasil disimpan!");
    window.location.reload();
    return true;
  } catch (error) {
    console.error("Error processing data: ", error);
    alert("Gagal menyimpan data!");
    return false;
  }
};

export const handleDelete = async (id, deletedData) => {
  try {
    await deleteDoc(doc(db, "inputBarjas", id));

    const q = query(
      collection(db, "poa_data"),
      where("tahun", "==", deletedData.tahun)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("Data POA tidak ditemukan.");
      return null; // Ubah menjadi null jika data tidak ditemukan
    }

    const poaDoc = querySnapshot.docs[0];
    const poaData = poaDoc.data();

    let updateData = {};
    switch (deletedData.type) {
      case "THR":
        updateData = {
          thrNonPns: poaData.thrNonPns + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "Gaji 13":
        updateData = {
          gaji13NonPns: poaData.gaji13NonPns + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "TKD PPPPK":
        updateData = {
          tkdPPPPK: poaData.tkdPPPPK + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "ART dan Kebersihan":
        updateData = {
          artDanAlatKebersihan: poaData.artDanAlatKebersihan + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "ATK":
        updateData = {
          atk: poaData.atk + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;

      case "CETAKAN":
        updateData = {
          cetakan: poaData.cetakan + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;

      case "BAHAN MENTAH":
        updateData = {
          bahanMentah: poaData.bahanMentah + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;

      case "ALKES PAKAI HABIS":
        updateData = {
          alkesPakaiHabis: poaData.alkesPakaiHabis + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;

      case "ALAT LABORATORIUM":
        updateData = {
          alatLaboratorium: poaData.alatLaboratorium + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      
      case "OBAT":
        updateData = {
          obat: poaData.obat + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
        
      case "DESINFECTAN":
        updateData = {
          pengadaanDesinfectan: poaData.pengadaanDesinfectan + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "LARVASIDA":
        updateData = {
          pengadaanLarvasida: poaData.pengadaanLarvasida + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "GAJI PJLP":
        updateData = {
          gajiPjlp: poaData.gajiPjlp + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "RME":
        updateData = {
          jasaRekamMedik: poaData.jasaRekamMedik + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;

      case "RETRIBUSI SAMPAH":
        updateData = {
          retribusiSampah: poaData.retribusiSampah + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;

      case "TELEPON":
        updateData = {
          telpon: poaData.telpon + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      
      case "AIR":
        updateData = {
          air: poaData.air + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;

      case "LISTRIK":
        updateData = {
          listrik: poaData.listrik + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "INTERNET":
        updateData = {
          internet: poaData.internet + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "DIKLAT":
        updateData = {
          diklat: poaData.diklat + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "BPJSKESEHATAN":
        updateData = {
          bpjsKesehatan: poaData.bpjsKesehatan + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "BPJSKETENAGAKERJAAN":
        updateData = {
          bpjsKetenagakerjaan: poaData.bpjsKetenagakerjaan + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "PAKAIANDINAS":
        updateData = {
          pakaianDinas: poaData.pakaianDinas + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "JASAPERIKSASAMPLEKESLING":
        updateData = {
          jasaPeriksaSampleKesling: poaData.jasaPeriksaSampleKesling + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "CATERINGPASIENRB":
        updateData = {
          cateringPasienRb: poaData.cateringPasienRb + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "SEWAMESINFC":
        updateData = {
          sewaMesinFc: poaData.sewaMesinFc + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "KERJASAMAPEMERIKSAANLAB":
        updateData = {
          kerjaSamaPemeriksaanLab: poaData.kerjaSamaPemeriksaanLab + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "JASAHYGINESERVICE":
        updateData = {
          jasaHygineService: poaData.jasaHygineService + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "BBMFOGGING":
        updateData = {
          bbmFogging: poaData.bbmFogging + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "MUTU":
        updateData = {
          mutu: poaData.mutu + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "PEMELIHARAAN":
        updateData = {
          pemeliharaan: poaData.pemeliharaan + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;

      case "APDPETUGASFOGGING":
        updateData = {
          apdPetugasFogging: poaData.apdPetugasFogging + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "APDPETUGASIPAL":
        updateData = {
          apdPetugasIpal: poaData.apdPetugasIpal + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "OPERASIONALLAINNYA":
        updateData = {
          operasionalLainnya: poaData.operasionalLainnya + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "UKMSITUASIONAL":
        updateData = {
          ukmSituasional: poaData.ukmSituasional + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "HONORPETUGASFOGGING":
        updateData = {
          honorPetugasFogging: poaData.honorPetugasFogging + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "PESTCONTROL":
        updateData = {
          pestControl: poaData.pestControl + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;
      case "SEWAPRINTER":
        updateData = {
          sewaPrinter: poaData.sewaPrinter + deletedData.jumlahThr,
          totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlahThr,
        };
        break;

      default:
        alert("Tipe data tidak valid");
        return null;
    }

    await updateDoc(doc(db, "poa_data", poaDoc.id), updateData);

    alert("Data berhasil dihapus dan diperbarui!");
    window.location.reload();
    return deletedData; // Kembalikan data yang dihapus
  } catch (error) {
    console.error("Error deleting data: ", error);
    alert("Gagal menghapus data!");
    return null;
  }
};


