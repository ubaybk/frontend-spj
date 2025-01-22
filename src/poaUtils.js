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


