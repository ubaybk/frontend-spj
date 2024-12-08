import { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig"; // Pastikan Anda sudah mengimpor auth dan db dari Firebase
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

const Scann = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [rukData, setRukData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keteranganScann, setKeteranganScann] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        setUserEmail(email);

        // Cek apakah email pengguna adalah admin@gmail.com
        setIsAdmin(email === "admin@gmail.com");

        // Ambil data pengguna dari Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        } else {
          console.error("User document not found in Firestore.");
        }

        // Ambil data RUK dari Firestore
        try {
          let rukQuery;
          if (email === "admin@gmail.com") {
            // Admin bisa mengakses semua data RUK
            rukQuery = collection(db, "ruk_data");
          } else {
            // Pengguna biasa hanya bisa mengakses data mereka sendiri
            rukQuery = query(
              collection(db, "ruk_data"),
              where("userId", "==", user.uid)
            );
          }

          const rukSnapshot = await getDocs(rukQuery);

          const rukList = rukSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setRukData(rukList); // Simpan semua dokumen di state
        } catch (error) {
          console.error("Error fetching RUK data: ", error);
        }
      } else {
        console.log("User is not logged in.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (id) => {
    if (!isAdmin) return; // Jika bukan admin, jangan lakukan aksi apa-apa

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Update field di Firestore
      await updateDoc(rukDocRef, {
        keteranganScann,
        waktuUpdateScann: timestamp,
      });

      console.log("Field berhasil diperbarui.");

      // Perbarui data di state tanpa refresh
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                keteranganScann,
                waktuUpdateScann: timestamp.toLocaleString(),
              }
            : ruk
        )
      );

      setEditingId(null); // Selesai editing
      setKeteranganScann(""); // Reset field input
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleStatusChange = async (id, newStatusScann) => {
    if (!isAdmin) return; // Jika bukan admin, jangan lakukan aksi apa-apa

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Perbarui status dan waktu perubahan di Firestore
      await updateDoc(rukDocRef, {
        statusScann: newStatusScann,
        waktuUpdateScann: timestamp,
      });

      console.log(`Status berhasil diperbarui ke ${newStatusScann}.`);

      // Perbarui data di state tanpa refresh
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                statusScann: newStatusScann,
                waktuUpdateScann: timestamp.toLocaleString(),
              }
            : ruk
        )
      );
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  return (
    <div className="">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {rukData.length > 0 ? (
            rukData.map((ruk) => (
              <div
                key={ruk.id}
                className={`p-4 border h-[603px] rounded mb-3 ${
                  ruk.statusScann === "Belum Scann"
                    ? "bg-red-100"
                    : ruk.statusScann === "Sudah Scann"
                    ? "bg-green-100"
                    : "bg-gray-100"
                }`}
              >
                <p>
                  <strong>ID:</strong> {ruk.id}
                </p>
                <p>
                  <strong>Nama:</strong> {ruk.kegiatan || "Tidak tersedia"}
                </p>

                <div className="mt-2">
                  {isAdmin ? (
                    <select
                      value={ruk.statusScann || ""}
                      onChange={(e) => handleStatusChange(ruk.id, e.target.value)}
                      className="border p-2 rounded w-full"
                      disabled={!ruk.statusKapusKaTu || ruk.statusKapusKaTu == "Belum TTD"}
                    >
                      <option value="" disabled>
                        Pilih Aksi
                      </option>
                      <option value="Belum Scann">Belum Scann</option>
                      <option value="Sudah Scann">Sudah Scann</option>
                    </select>
                  ) : (
                    <p>Status Scann: {ruk.statusScann}</p> // Hanya tampilkan status jika bukan admin
                  )}
                </div>

                <p>
                  <strong>Keterangan Scann: </strong> {ruk.keteranganScann || "Belum diisi"}
                </p>

                {ruk.waktuUpdateScann && (
                  <p>
                    <strong>Waktu Update Scann:</strong>{" "}
                    {new Date(ruk.waktuUpdateScann.seconds * 1000).toLocaleString()}
                  </p>
                )}

                {isAdmin && editingId === ruk.id ? (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={keteranganScann}
                      onChange={(e) => setKeteranganScann(e.target.value)}
                      className="border p-2 rounded w-full"
                      placeholder="Masukkan isian baru"
                      disabled={!ruk.statusKapusKaTu || ruk.statusKapusKaTu == "Belum TTD"}
                    />
                    <button
                      onClick={() => handleSave(ruk.id)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                      disabled={!ruk.statusKapusKaTu || ruk.statusKapusKaTu == "Belum TTD"}
                    >
                      Simpan
                    </button>
                  </div>
                ) : isAdmin ? (
                  <button
                    onClick={() => setEditingId(ruk.id)}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                    disabled={!ruk.statusKapusKaTu || ruk.statusKapusKaTu == "Belum TTD"}
                  >
                    Tambah/Perbarui Isian
                  </button>
                ) : null}
              </div>
            ))
          ) : (
            <p>Tidak ada data RUK yang tersedia.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Scann;
