import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
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
        const newTkdPpppk = poaData.tkdPPPPK- jumlah;
        if (newTkdPpppk < 0) {
          alert("Nilai TKD PPPPK melebihi TKD PPPPK yang tersedia.");
          return;
        }
        updateData = {
          tkdPPPPK: newTkdPpppk,
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
    return true;
  } catch (error) {
    console.error("Error processing data: ", error);
    alert("Gagal menyimpan data!");
    return false;
  }
};