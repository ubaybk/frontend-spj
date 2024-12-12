import { useState, useCallback } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../../firebaseConfig";

const useHandleStatusTddKapusKatu = (setRukData, isAdmin, setEditingKapusKaTu, setKeteranganKapusKaTu) => {
  // Fungsi untuk mengubah status
  const handleStatusChangeKapusKaTu = useCallback(async (id, newStatusKapusKaTu, statusField = 'statusKapusKaTu', updateTimeField = 'waktuUpdateKapusKaTu') => {
    if (!isAdmin) return;

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Objek update yang dinamis berdasarkan parameter
      const updateData = {
        [statusField]: newStatusKapusKaTu,
        [updateTimeField]: timestamp,
      };

      await updateDoc(rukDocRef, updateData);

      // Update state lokal
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                [statusField]: newStatusKapusKaTu,
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
  const handleSaveKapusKaTu = useCallback(async (id, keteranganKapusKaTu, field = 'keteranganKapusKaTu', updateTimeField = 'waktuUpdateKapusKatu') => {
    if (!isAdmin) return;

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Objek update dinamis untuk keterangan
      const updateData = {
        [field]: keteranganKapusKaTu,
        [updateTimeField]: timestamp,
      };

      await updateDoc(rukDocRef, updateData);

      // Update state lokal
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                [field]: keteranganKapusKaTu,
                [updateTimeField]: timestamp.toLocaleString(),
              }
            : ruk
        )
      );

      // Reset state editing jika disediakan
      if (setEditingKapusKaTu) setEditingKapusKaTu(null);
      if (setKeteranganKapusKaTu) setKeteranganKapusKaTu("");

      return true;
    } catch (error) {
      console.error(`Error updating ${field}: `, error);
      return false;
    }
  }, [setRukData, isAdmin, setEditingKapusKaTu, setKeteranganKapusKaTu]);

  return { handleStatusChangeKapusKaTu, handleSaveKapusKaTu };
};

export default useHandleStatusTddKapusKatu;