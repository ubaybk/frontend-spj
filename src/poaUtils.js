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
  
  if (type === "THR" && (!data.keteranganThr || !data.jmlThr)) {
    alert("Mohon lengkapi semua data THR.");
    return;
  }

  if (type === "Gaji 13" && (!data.keteranganGaji13 || !data.jmlGaji13)) {
    alert("Mohon lengkapi semua data Gaji 13.");
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

    const jumlah = type === "THR" ? parseInt(data.jmlThr, 10) : parseInt(data.jmlGaji13, 10);
    
    let updateData = {};
    
    if (type === "THR") {
      const newThrNonPns = poaData.thrNonPns - jumlah;
      if (newThrNonPns < 0) {
        alert("Nilai THR melebihi THR Non-PNS yang tersedia.");
        return;
      }
      updateData = {
        thrNonPns: newThrNonPns,
        totalBarangJasa: poaData.totalBarangJasa - jumlah
      };
    } else {
      const newGaji13NonPns = poaData.gaji13NonPns - jumlah;
      if (newGaji13NonPns < 0) {
        alert("Nilai Gaji 13 melebihi Gaji 13 Non-PNS yang tersedia.");
        return;
      }
      updateData = {
        gaji13NonPns: newGaji13NonPns,
        totalBarangJasa: poaData.totalBarangJasa - jumlah
      };
    }

    await updateDoc(doc(db, "poa_data", poaDoc.id), updateData);

    await addDoc(collection(db, "inputBarjas"), {
      type,
      keterangan: type === "THR" ? data.keteranganThr : data.keteranganGaji13,
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