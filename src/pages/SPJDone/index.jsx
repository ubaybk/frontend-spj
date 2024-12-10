import { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

const SPJDone = () => {
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

  // Fungsi untuk mengecek apakah semua status sesuai kondisi
  const isStatusComplete = (item) => {
    return (
      item.status === "Terima Pengadaan" &&
      item.statusBendahara === "Sudah Dibayar" &&
      item.statusKapusKaTu === "Sudah TTD" &&
      item.statusScann === "Sudah Scann" &&
      item.statusVerifikator === "Terima Verifikator"
    );
  };

  return (
    <div className="">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="">
          {rukData.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 rounded-lg h-[603px] shadow-md mb-3 ${
                isStatusComplete(item) 
                  ? 'bg-green-200 border-green-500' 
                  : 'bg-red-200 border-red-500'
              } border`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{item.kegiatan}</h3>
                  {/* <p>Status: {item.status}</p>
                  <p>Status Bendahara: {item.statusBendahara}</p>
                  <p>Status Kapus/KaTu: {item.statusKapusKaTu}</p>
                  <p>Status Scann: {item.statusScann}</p>
                  <p>Status Verifikator: {item.statusVerifikator}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SPJDone;