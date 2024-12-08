import { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig"; // Pastikan Anda sudah mengimpor auth dan db dari Firebase
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

const Bendahara = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [rukData, setRukData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keteranganBendahara, setKeteranganBendahara] = useState("");
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
        keteranganBendahara,
        waktuUpdateBendahara: timestamp,
      });

      console.log("Field berhasil diperbarui.");

      // Perbarui data di state tanpa refresh
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                keteranganBendahara,
                waktuUpdateBendahara: timestamp.toLocaleString(),
              }
            : ruk
        )
      );

      setEditingId(null); // Selesai editing
      setKeteranganBendahara(""); // Reset field input
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleStatusChange = async (id, newStatusBendahara) => {
    if (!isAdmin) return; // Jika bukan admin, jangan lakukan aksi apa-apa

    try {
      const rukDocRef = doc(db, "ruk_data", id);
      const timestamp = new Date();

      // Perbarui status dan waktu perubahan di Firestore
      await updateDoc(rukDocRef, {
        statusBendahara: newStatusBendahara,
        waktuUpdateBendahara: timestamp,
      });

      console.log(`Status berhasil diperbarui ke ${newStatusBendahara}.`);

      // Perbarui data di state tanpa refresh
      setRukData((prevData) =>
        prevData.map((ruk) =>
          ruk.id === id
            ? {
                ...ruk,
                statusBendahara: newStatusBendahara,
                waktuUpdateBendahara: timestamp.toLocaleString(),
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
                  ruk.statusBendahara === "Belum Dibayar"
                    ? "bg-red-100"
                    : ruk.statusBendahara === "Sudah Dibayar"
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
                      value={ruk.statusBendahara || ""}
                      onChange={(e) => handleStatusChange(ruk.id, e.target.value)}
                      className="border p-2 rounded w-full"
                    //   disabled={!ruk.statusKapusKaTu || ruk.statusKapusKaTu == "Belum TTD"}
                    >
                      <option value="" disabled>
                        Pilih Aksi
                      </option>
                      <option value="Belum Dibayar">Belum Dibayar</option>
                      <option value="Sudah Dibayar">Sudah Dibayar</option>
                    </select>
                  ) : (
                    <p>Status Bendahara: {ruk.statusBendahara}</p> // Hanya tampilkan status jika bukan admin
                  )}
                </div>

                <p>
                  <strong>Keterangan Bendahara: </strong> {ruk.keteranganBendahara || "Belum diisi"}
                </p>

                {ruk.waktuUpdateBendahara && (
                  <p>
                    <strong>Waktu Update Bendahara:</strong>{" "}
                    {new Date(ruk.waktuUpdateBendahara.seconds * 1000).toLocaleString()}
                  </p>
                )}

                {isAdmin && editingId === ruk.id ? (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={keteranganBendahara}
                      onChange={(e) => setKeteranganBendahara(e.target.value)}
                      className="border p-2 rounded w-full"
                      placeholder="Masukkan isian baru"
                    //   disabled={!ruk.statusKapusKaTu || ruk.statusKapusKaTu == "Belum TTD"}
                    />
                    <button
                      onClick={() => handleSave(ruk.id)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    //   disabled={!ruk.statusKapusKaTu || ruk.statusKapusKaTu == "Belum TTD"}
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

export default Bendahara;
