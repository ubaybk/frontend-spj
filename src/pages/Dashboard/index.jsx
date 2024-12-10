import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
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

  //PENGADAAN
  // Hitung jumlah data dengan status "Terima Pengadaan"
  const terimaPengadaanCount = rukData.filter(
    (ruk) => ruk.status === "Terima Pengadaan"
  ).length;

  // Hitung jumlah data tanpa status atau "Tolak Pengadaan"
  const tolakPengadaanCount = rukData.filter(
    (ruk) => !ruk.status || ruk.status === "Tolak Pengadaan"
  ).length;

  // Hitung jumlah data yang harus diperbaiki"
  const perbaikiPengadaan = rukData.filter(
    (ruk) => ruk.statusVerifikator === "Tolak Verifikator"
  ).length;

  //VERIFIKATOR
  const terimaVerifikatorCount = rukData.filter(
    (ruk) => ruk.statusVerifikator === "Terima Verifikator"
  ).length;

  const tolakVerifikatorCount = rukData.filter(
    (ruk) => !ruk.statusVerifikator || ruk.statusVerifikator === "Tolak Verifikator"
  ).length;

  const perbaikanVerifikator = rukData.filter(
    (ruk) => ruk.statusKapusKaTu === "Belum TTD"
  ).length

  //ACC KAPUS KATU
  const terimaKapusKaTuCount = rukData.filter(
    (ruk) => ruk.statusKapusKaTu === "Sudah TTD"
  ).length;

  const tolakKapusKaTuCount = rukData.filter(
    (ruk) => !ruk.statusKapusKaTu || ruk.statusKapusKaTu === "Belum TTD"
  ).length;

  const perbaikanKapusKaTu = rukData.filter(
    (ruk) => ruk.statusScann === "Belum Scann"
  ).length

  //ACC KAPUS KATU
  const terimaScannCount = rukData.filter(
    (ruk) => ruk.statusScann === "Sudah Scann"
  ).length;

  const tolakScannCount = rukData.filter(
    (ruk) => !ruk.statusScann || ruk.statusScann === "Belum Scann"
  ).length;

  const perbaikanScann = rukData.filter(
    (ruk) => ruk.statusScann === "Belum Scann"
  ).length

  //BENDAHARA
  const sudahDibayarCount = rukData.filter(
    (ruk) => ruk.statusBendahara === "Sudah Dibayar"
  ).length;

  const belumDibayarCount = rukData.filter(
    (ruk) => !ruk.statusBendahara || ruk.statusBendahara === "Belum Dibayar"
  ).length;

  //BENDAHARA
  const sudahSelesaiCount = rukData.filter(
    (ruk) => ruk.statusBendahara === "Sudah Dibayar" && ruk.statusScann === "Sudah Scann" && ruk.status === "Terima Pengadaan" && ruk.statusVerifikator === "Terima Verifikator" && ruk.statusKapusKaTu === "Sudah TTD"
  ).length;

  const belumSelesaiCount = rukData.length - sudahDibayarCount


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

          <div className="flex gap-5">
            <div>
              <h1>PENGADAAN</h1>
              {/* Tampilkan jumlah "Terima Pengadaan" */}
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah "Terima Pengadaan": {terimaPengadaanCount}
                </p>
              </div>

              {/* Tampilkan jumlah tanpa status atau "Tolak Pengadaan" */}
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah tanpa status atau "Tolak Pengadaan":{" "}
                  {tolakPengadaanCount}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah Perbaikan Pengadaan: {perbaikiPengadaan}
                </p>
              </div>
            </div>

            <div>
              <h1>Verifikator</h1>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah "Terima Verifikator": {terimaVerifikatorCount}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah "Tolak Verifikator": {tolakVerifikatorCount}
                </p>
                <p className="text-lg font-semibold">
                  Jumlah Perbaikan Verifikator: {perbaikanVerifikator}
                </p>
              </div>
            </div>

            <div>
              <h1>TTD Kapus KaTu</h1>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah TTD: {terimaKapusKaTuCount}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah Belum TTD: {tolakKapusKaTuCount}
                </p>
                <p className="text-lg font-semibold">
                  Jumlah Perbaikan TTD: {perbaikanKapusKaTu}
                </p>
              </div>
            </div>

            <div>
              <h1>Scann Dokumen</h1>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah Scann: {terimaScannCount}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah Belum Scann: {tolakScannCount}
                </p>
                <p className="text-lg font-semibold">
                  Jumlah Perbaikan Scann: 0
                </p>
              </div>
            </div>

            <div>
              <h1>Bendahara</h1>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah Sudah dibayar: {sudahDibayarCount}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Jumlah Belum dibayar: {belumDibayarCount}
                </p>
                <p className="text-lg font-semibold">
                  Jumlah Perbaikan Scann: 0
                </p>
              </div>
            </div>

            <div>
              <h1>Selesai</h1>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Sudah selesai: {sudahSelesaiCount}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold">
                  Belum Selesai: {belumSelesaiCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
