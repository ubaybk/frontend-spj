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

export const handleSaveGedungBangunan = async (type, data, dataPoa, activeMonth) => {
  // Validasi input berdasarkan tipe
  if (type === "TANGGAPASIEN" && (!data.keteranganTanggaPasien || !data.jmlTanggaPasien)) {
    alert("Mohon lengkapi semua data Tangga Pasien.");
    return;
  }
  if (type === "PENAMBAHANAKSESTANGGA" && (!data.keteranganPenambahanAksesTangga || !data.jmlPenambahanAksesTangga)) {
    alert("Mohon lengkapi semua data Penambahan.");
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
      case "TANGGAPASIEN":
        jumlah = parseInt(data.jmlTanggaPasien, 10);
        keterangan = data.keteranganTanggaPasien;
        const newTanggaPasien = poaData.tanggaPasien - jumlah;
        if (newTanggaPasien < 0) {
          alert("Nilai Tangga Pasien melebihi yang tersedia.");
          return;
        }
        updateData = {
          tanggaPasien: newTanggaPasien,
          totalModalGedungBangunan: poaData.totalModalGedungBangunan - jumlah
        };
        break;

      case "PENAMBAHANAKSESTANGGA":
        jumlah = parseInt(data.jmlPenambahanAksesTangga, 10);
        keterangan = data.keteranganPenambahanAksesTangga;
        const newPenambahanAksesTangga = poaData.penambahanAkesTangga - jumlah;
        if (newPenambahanAksesTangga < 0) {
          alert("Nilai Penambahan Akses Tangga melebihi yang tersedia.");
          return;
        }
        updateData = {
          penambahanAkesTangga: newPenambahanAksesTangga,
          totalModalGedungBangunan: poaData.totalModalGedungBangunan - jumlah
        };
        break;


      default:
        alert("Tipe data tidak valid");
        return;
    }

    // Update dokumen POA
    await updateDoc(doc(db, "poa_data", poaDoc.id), updateData);

    // Tambah dokumen baru ke collection inputBarjas
    await addDoc(collection(db, "inputGedungBangunan"), {
      type,
      keterangan,
      jumlah,
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

export const handleDeleteGedungBangunan = async (id, deletedData) => {
  try {
    await deleteDoc(doc(db, "inputGedungBangunan", id));

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
      case "TANGGAPASIEN":
        updateData = {
          tanggaPasien: poaData.tanggaPasien + deletedData.jumlah,
          totalModalGedungBangunan: poaData.totalModalGedungBangunan + deletedData.jumlah,
        };
        break;
      case "PENAMBAHANAKSESTANGGA":
        updateData = {
          penambahanAkesTangga: poaData.penambahanAkesTangga + deletedData.jumlah,
          totalModalGedungBangunan: poaData.totalModalGedungBangunan + deletedData.jumlah,
        };
        break;
      
    //   case "Gaji 13":
    //     updateData = {
    //       gaji13NonPns: poaData.gaji13NonPns + deletedData.jumlah,
    //       totalBarangJasa: poaData.totalBarangJasa + deletedData.jumlah,
    //     };
    //     break;
      

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