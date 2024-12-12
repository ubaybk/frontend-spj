import { useState, useCallback } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../../firebaseConfig";

const useHandleStatusBendahara = (setRukData, isAdmin, setEditingBendahara, setKeteranganBendahara) => {
  // Fungsi untuk mengubah status
  const handleStatusChangeBendahara = useCallback(async (id, newStatusBendahara, statusField = 'statusBendahara', updateTimeField = 'waktuUpdateBendahara') => {
    if (!isAdmin) return;

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Objek update yang dinamis berdasarkan parameter
      const updateData = {
        [statusField]: newStatusBendahara,
        [updateTimeField]: timestamp,
      };

      await updateDoc(rukDocRef, updateData);

      // Update state lokal
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                [statusField]: newStatusBendahara,
                [updateTimeField]: timestamp.toLocaleString(),
              }
            : ruk
        )
      );

      return true;
    } catch (error) {
      console.error(`Error updating ${statusField}: `, error);
      return false;
    }
  }, [setRukData, isAdmin]);

  // Fungsi untuk menyimpan keterangan
  const handleSaveBendahara = useCallback(async (id, keteranganBendahara, field = 'keteranganBendahara', updateTimeField = 'waktuUpdateBendahara') => {
    if (!isAdmin) return;

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Objek update dinamis untuk keterangan
      const updateData = {
        [field]: keteranganBendahara,
        [updateTimeField]: timestamp,
      };

      await updateDoc(rukDocRef, updateData);

      // Update state lokal
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                [field]: keteranganBendahara,
                [updateTimeField]: timestamp.toLocaleString(),
              }
            : ruk
        )
      );

      // Reset state editing jika disediakan
      if (setEditingBendahara) setEditingBendahara(null);
      if (setKeteranganBendahara) setKeteranganBendahara("");

      return true;
    } catch (error) {
      console.error(`Error updating ${field}: `, error);
      return false;
    }
  }, [setRukData, isAdmin, setEditingBendahara, setKeteranganBendahara]);

  return { handleStatusChangeBendahara, handleSaveBendahara };
};

export default useHandleStatusBendahara;