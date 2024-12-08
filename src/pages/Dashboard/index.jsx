import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // Sesuaikan path ke file konfigurasi Firebase
import Header from "../../components/header";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [rukData, setRukData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();

      try {
        // Ambil data RUK tanpa filter
        const rukQuery = collection(db, "ruk_data");
        const rukSnapshot = await getDocs(rukQuery);
        const rukList = rukSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRukData(rukList);
        console.log("Semua RUK Data:", rukList);

        // Optional: Ambil data user jika diperlukan
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userDetails = userDoc.data();
            setUserData(userDetails);
            console.log("User Data:", userDetails);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Hitung jumlah total data RUK
  const totalRukCount = rukData.length;

  // Hitung jumlah data dengan status "Terima Pengadaan"
  const terimaPengadaanCount = rukData.filter(
    (ruk) => ruk.status === "Terima Pengadaan"
  ).length;

  // Hitung jumlah data tanpa status atau "Tolak Pengadaan"
  const tolakPengadaanCount = rukData.filter(
    (ruk) => !ruk.status || ruk.status === "Tolak Pengadaan"
  ).length;

  return (
    <>
      <div className="flex">
        <Header />
        <div className="p-4 w-full">
          <h1 className="text-2xl font-bold mb-4">Dashboard RUK</h1>

          {/* Tampilkan jumlah total data RUK */}
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Total Data RUK: {totalRukCount}
            </p>
          </div>

          {/* Tampilkan jumlah "Terima Pengadaan" */}
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Jumlah "Terima Pengadaan": {terimaPengadaanCount}
            </p>
          </div>

          {/* Tampilkan jumlah tanpa status atau "Tolak Pengadaan" */}
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Jumlah tanpa status atau "Tolak Pengadaan": {tolakPengadaanCount}
            </p>
          </div>

          {rukData.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {rukData.map((ruk) => (
                <div 
                  key={ruk.id} 
                  className="bg-white shadow-md rounded-lg p-4 border"
                >
                  <h2 className="text-lg font-semibold mb-2">
                    {ruk.subKegiatan}
                  </h2>
                  <div className="space-y-1">
                    <p><strong>PJ:</strong> {ruk.pj}</p>
                    <p><strong>Tempat Tugas:</strong> {ruk.tempatTugas}</p>
                    <p><strong>Status:</strong> {ruk.status || 'Tidak ada status'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Tidak ada data RUK</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
