import { useState, useCallback } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../../firebaseConfig";

const useHandleStatusScann = (setRukData, isAdmin, setEditingScann, setKeteranganScann) => {
  // Fungsi untuk mengubah status
  const handleStatusChangeScann = useCallback(async (id, newStatusScann, statusField = 'statusScann', updateTimeField = 'waktuUpdateScann') => {
    if (!isAdmin) return;

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Objek update yang dinamis berdasarkan parameter
      const updateData = {
        [statusField]: newStatusScann,
        [updateTimeField]: timestamp,
      };

      await updateDoc(rukDocRef, updateData);

      // Update state lokal
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                [statusField]: newStatusScann,
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
  const handleSaveScann = useCallback(async (id, keteranganScann, field = 'keteranganScann', updateTimeField = 'waktuUpdateScann') => {
    if (!isAdmin) return;

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Objek update dinamis untuk keterangan
      const updateData = {
        [field]: keteranganScann,
        [updateTimeField]: timestamp,
      };

      await updateDoc(rukDocRef, updateData);

      // Update state lokal
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                [field]: keteranganScann,
                [updateTimeField]: timestamp.toLocaleString(),
              }
            : ruk
        )
      );

      // Reset state editing jika disediakan
      if (setEditingScann) setEditingScann(null);
      if (setKeteranganScann) setKeteranganScann("");

      return true;
    } catch (error) {
      console.error(`Error updating ${field}: `, error);
      return false;
    }
  }, [setRukData, isAdmin, setEditingScann, setKeteranganScann]);

  return { handleStatusChangeScann, handleSaveScann };
};

export default useHandleStatusScann;