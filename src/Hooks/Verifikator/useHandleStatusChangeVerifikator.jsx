import { useState, useCallback } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../../firebaseConfig";

const useHandleStatusChangeVerifikator = (setRukData, isAdmin, isVerifikatorAdmin, setEditingVerifikator, setKeteranganVerifikator) => {
  // Fungsi untuk mengubah status
  const handleStatusChangeVerifikator = useCallback(async (id, newStatusVerifikator, statusField = 'statusVerifikator', updateTimeField = 'waktuUpdateVerifikator') => {
    if (!isAdmin && !isVerifikatorAdmin) return;

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Objek update yang dinamis berdasarkan parameter
      const updateData = {
        [statusField]: newStatusVerifikator,
        [updateTimeField]: timestamp,
      };

      await updateDoc(rukDocRef, updateData);

      // Update state lokal
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                [statusField]: newStatusVerifikator,
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
  }, [setRukData, isAdmin, isVerifikatorAdmin]);

  // Fungsi untuk menyimpan keterangan
  const handleSaveVerifikator = useCallback(async (id, keteranganVerifikator, field = 'keteranganVerifikator', updateTimeField = 'waktuUpdateVerifikator') => {
    if (!isAdmin && !isVerifikatorAdmin) return;

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Objek update dinamis untuk keterangan
      const updateData = {
        [field]: keteranganVerifikator,
        [updateTimeField]: timestamp,
      };

      await updateDoc(rukDocRef, updateData);

      // Update state lokal
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                [field]: keteranganVerifikator,
                [updateTimeField]: timestamp.toLocaleString(),
              }
            : ruk
        )
      );

      // Reset state editing jika disediakan
      if (setEditingVerifikator) setEditingVerifikator(null);
      if (setKeteranganVerifikator) setKeteranganVerifikator("");

      return true;
    } catch (error) {
      console.error(`Error updating ${field}: `, error);
      return false;
    }
  }, [setRukData, isAdmin, isVerifikatorAdmin, setEditingVerifikator, setKeteranganVerifikator]);

  return { handleStatusChangeVerifikator, handleSaveVerifikator };
};

export default useHandleStatusChangeVerifikator;