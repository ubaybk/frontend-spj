import { useState, useCallback } from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../../firebaseConfig";

const useHandleStatusChange = (setRukData, isAdmin, setEditingId, setKeterangan) => {
  // Fungsi untuk mengubah status
  const handleStatusChange = useCallback(async (id, newStatus, statusField = 'status', updateTimeField = 'waktuUpdatePengadaan') => {
    if (!isAdmin) return;

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Objek update yang dinamis berdasarkan parameter
      const updateData = {
        [statusField]: newStatus,
        [updateTimeField]: timestamp,
      };

      await updateDoc(rukDocRef, updateData);

      // Update state lokal
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                [statusField]: newStatus,
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
  const handleSave = useCallback(async (id, keterangan, field = 'keterangan', updateTimeField = 'waktuUpdatePengadaan') => {
    if (!isAdmin) return;

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Objek update dinamis untuk keterangan
      const updateData = {
        [field]: keterangan,
        [updateTimeField]: timestamp,
      };

      await updateDoc(rukDocRef, updateData);

      // Update state lokal
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                [field]: keterangan,
                [updateTimeField]: timestamp.toLocaleString(),
              }
            : ruk
        )
      );

      // Reset state editing jika disediakan
      if (setEditingId) setEditingId(null);
      if (setKeterangan) setKeterangan("");

      return true;
    } catch (error) {
      console.error(`Error updating ${field}: `, error);
      return false;
    }
  }, [setRukData, isAdmin, setEditingId, setKeterangan]);

  return { handleStatusChange, handleSave };
};

export default useHandleStatusChange;