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

export const handleSavePeralatanMesin = async (type, data, dataPoa, activeMonth) => {
  // Validasi input berdasarkan tipe
  if (type === "KOMPUTER" && (!data.keteranganKomputer || !data.jmlKomputer)) {
    alert("Mohon lengkapi semua data komputer.");
    return;
  }
  if (type === "LAPTOP" && (!data.keteranganLaptop || !data.jmlLaptop)) {
    alert("Mohon lengkapi semua data Laptop.");
    return;
  }
  if (type === "AC2PK" && (!data.keteranganAc2Pk || !data.jmlAc2Pk)) {
    alert("Mohon lengkapi semua data Ac2pk.");
    return;
  }
  if (type === "AC1PK" && (!data.keteranganAc1Pk || !data.jmlAc1Pk)) {
    alert("Mohon lengkapi semua data Ac1pk.");
    return;
  }
  if (type === "EKG" && (!data.keteranganEkg || !data.jmlEkg)) {
    alert("Mohon lengkapi semua data EKG.");
    return;
  }
  if (type === "DENTALUNIT" && (!data.keteranganDentalUnit || !data.jmlDentalUnit)) {
    alert("Mohon lengkapi semua data DENTAL UNIT.");
    return;
  }
  if (type === "PEAKFLOWMETER" && (!data.keteranganPeakflowMeter || !data.jmlPeakflowMeter)) {
    alert("Mohon lengkapi semua data Peak flow Meter.");
    return;
  }
  if (type === "MOTOR" && (!data.keteranganMotor || !data.jmlMotor)) {
    alert("Mohon lengkapi semua data Peak flow Meter.");
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
      case "KOMPUTER":
        jumlah = parseInt(data.jmlKomputer, 10);
        keterangan = data.keteranganKomputer;
        const newKomputer = poaData.komputer - jumlah;
        if (newKomputer < 0) {
          alert("Nilai Komputer melebihi yang tersedia.");
          return;
        }
        updateData = {
          komputer: newKomputer,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin - jumlah
        };
        break;

      case "LAPTOP":
        jumlah = parseInt(data.jmlLaptop, 10);
        keterangan = data.keteranganLaptop;
        const newLaptop = poaData.laptop - jumlah;
        if (newLaptop < 0) {
          alert("Nilai laptop melebihi yang tersedia.");
          return;
        }
        updateData = {
          laptop: newLaptop,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin - jumlah
        };
        break;

      case "AC2PK":
        jumlah = parseInt(data.jmlAc2Pk, 10);
        keterangan = data.keteranganAc2Pk;
        const newAc2Pk = poaData.ac2Pk - jumlah;
        if (newAc2Pk < 0) {
          alert("Nilai AC2PK melebihi yang tersedia.");
          return;
        }
        updateData = {
          ac2Pk: newAc2Pk,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin - jumlah
        };
        break;

      case "AC1PK":
        jumlah = parseInt(data.jmlAc1Pk, 10);
        keterangan = data.keteranganAc1Pk;
        const newAc1Pk = poaData.ac1Pk - jumlah;
        if (newAc1Pk < 0) {
          alert("Nilai AC1PK melebihi yang tersedia.");
          return;
        }
        updateData = {
          ac1Pk: newAc1Pk,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin - jumlah
        };
        break;

      case "EKG":
        jumlah = parseInt(data.jmlEkg, 10);
        keterangan = data.keteranganEkg;
        const newEkg = poaData.ekg - jumlah;
        if (newEkg < 0) {
          alert("Nilai EKG melebihi yang tersedia.");
          return;
        }
        updateData = {
          ekg: newEkg,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin - jumlah
        };
        break;

      case "DENTALUNIT":
        jumlah = parseInt(data.jmlDentalUnit, 10);
        keterangan = data.keteranganDentalUnit;
        const newDentalUnit = poaData.dentalUnit - jumlah;
        if (newDentalUnit < 0) {
          alert("Nilai Dental Unit melebihi yang tersedia.");
          return;
        }
        updateData = {
          dentalUnit: newDentalUnit,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin - jumlah
        };
        break;

      case "PEAKFLOWMETER":
        jumlah = parseInt(data.jmlPeakflowMeter, 10);
        keterangan = data.keteranganPeakflowMeter;
        const newPeakflowMeter = poaData.peakflowMeter - jumlah;
        if (newPeakflowMeter < 0) {
          alert("Nilai Peakflow Meter melebihi yang tersedia.");
          return;
        }
        updateData = {
          peakflowMeter: newPeakflowMeter,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin - jumlah
        };
        break;

      case "MOTOR":
        jumlah = parseInt(data.jmlMotor, 10);
        keterangan = data.keteranganMotor;
        const newMotor = poaData.motor - jumlah;
        if (newMotor < 0) {
          alert("Nilai Peakflow Meter melebihi yang tersedia.");
          return;
        }
        updateData = {
          motor: newMotor,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin - jumlah
        };
        break;

      default:
        alert("Tipe data tidak valid");
        return;
    }

    // Update dokumen POA
    await updateDoc(doc(db, "poa_data", poaDoc.id), updateData);

    // Tambah dokumen baru ke collection inputBarjas
    await addDoc(collection(db, "inputPeralatanMesin"), {
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

export const handleDeletePeralatanMesin = async (id, deletedData) => {
  try {
    await deleteDoc(doc(db, "inputPeralatanMesin", id));

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
      case "KOMPUTER":
        updateData = {
          komputer: poaData.komputer + deletedData.jumlah,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin + deletedData.jumlah,
        };
        break;
      case "LAPTOP":
        updateData = {
          laptop: poaData.laptop + deletedData.jumlah,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin + deletedData.jumlah,
        };
        break;
      case "AC2PK":
        updateData = {
          ac2Pk: poaData.ac2Pk + deletedData.jumlah,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin + deletedData.jumlah,
        };
        break;
      case "AC1PK":
        updateData = {
          ac1Pk: poaData.ac1Pk + deletedData.jumlah,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin + deletedData.jumlah,
        };
        break;
      case "EKG":
        updateData = {
          ekg: poaData.ekg + deletedData.jumlah,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin + deletedData.jumlah,
        };
        break;
      case "DENTALUNIT":
        updateData = {
          dentalUnit: poaData.dentalUnit + deletedData.jumlah,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin + deletedData.jumlah,
        };
        break;
      case "PEAKFLOWMETER":
        updateData = {
          peakflowMeter: poaData.peakflowMeter + deletedData.jumlah,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin + deletedData.jumlah,
        };
        break;
      case "MOTOR":
        updateData = {
          motor: poaData.motor + deletedData.jumlah,
          totalModalPeralatanMesin: poaData.totalModalPeralatanMesin + deletedData.jumlah,
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


