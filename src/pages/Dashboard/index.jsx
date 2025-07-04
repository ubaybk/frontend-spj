import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // Sesuaikan path ke file konfigurasi Firebase
import Header from "../../components/header";
import { IoIosFolder } from "react-icons/io";
import { TbDeviceImacCancel } from "react-icons/tb";
import { IoCloudDone } from "react-icons/io5";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
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
    (ruk) =>
      !ruk.statusVerifikator || ruk.statusVerifikator === "Tolak Verifikator"
  ).length;

  const perbaikanVerifikator = rukData.filter(
    (ruk) => ruk.statusKapusKaTu === "Belum TTD"
  ).length;

  //ACC KAPUS KATU
  const terimaKapusKaTuCount = rukData.filter(
    (ruk) => ruk.statusKapusKaTu === "Sudah TTD"
  ).length;

  const tolakKapusKaTuCount = rukData.filter(
    (ruk) => !ruk.statusKapusKaTu || ruk.statusKapusKaTu === "Belum TTD"
  ).length;

  const perbaikanKapusKaTu = rukData.filter(
    (ruk) => ruk.statusScann === "Belum Scann"
  ).length;

  //ACC KAPUS KATU
  const terimaScannCount = rukData.filter(
    (ruk) => ruk.statusScann === "Sudah Scann"
  ).length;

  const tolakScannCount = rukData.filter(
    (ruk) => !ruk.statusScann || ruk.statusScann === "Belum Scann"
  ).length;

  const perbaikanScann = rukData.filter(
    (ruk) => ruk.statusScann === "Belum Scann"
  ).length;

  //BENDAHARA
  const sudahDibayarCount = rukData.filter(
    (ruk) => ruk.statusBendahara === "Sudah DiBayar"
  ).length;

  const belumDibayarCount = rukData.filter(
    (ruk) => !ruk.statusBendahara || ruk.statusBendahara === "Belum DiBayar"
  ).length;

  
 // Mapping status bendahara
// const statusMapping = {
//   0: "Sudah Dibayar",
//   1: "Sudah Terima Dokumen",
// };

// Menghitung jumlah data yang memenuhi semua kondisi
const sudahSelesaiCount = rukData.filter((ruk) => {
  // Memastikan statusBendahara adalah array, jika tidak maka jadikan array
  const bendaharaStatuses = Array.isArray(ruk.statusBendahara)
    ? ruk.statusBendahara
    : [ruk.statusBendahara]; // Menjadikan string menjadi array

  return (
    bendaharaStatuses.includes("Sudah DiBayar") &&
    bendaharaStatuses.includes("Sudah Terima Dokumen") &&
    ruk.statusScann === "Sudah Scann" &&
    ruk.status === "Terima Pengadaan" &&
    ruk.statusVerifikator === "Terima Verifikator" &&
    ruk.statusKapusKaTu === "Sudah TTD"
  );
}).length;



  const belumSelesaiCount = rukData.length - sudahSelesaiCount;

  //RPK ADMEN
  const rpkAdmen = rukData.filter((ruk) => ruk.pokja === "Admen").length;
  //RPK UKP
  const rpkUkp = rukData.filter((ruk) => ruk.pokja === "UKP").length;
  //RPK UKM
  const rpkUkm = rukData.filter((ruk) => ruk.pokja === "UKM").length;

  const dataPengadaan = [
    { status: "Terima", total: terimaPengadaanCount },
    { status: "Tolak ", total: tolakPengadaanCount },
    { status: "Perbaikan", total: perbaikiPengadaan },
  ];

  const dataVerifikator = [
    { status: "Terima", total: terimaVerifikatorCount },
    { status: "Tolak", total: tolakVerifikatorCount },
    { status: "Perbaikan", total: perbaikanVerifikator },
  ];

  const dataKapusKatu = [
    { status: "Sudah TTD", total: terimaKapusKaTuCount },
    { status: "Belum TTD", total: tolakKapusKaTuCount },
    
  ];

  const dataScann = [
    { status: "Sudah Scann", total: terimaScannCount },
    { status: "Belum Scann", total: tolakScannCount },
  
  ];

  const dataBendahara = [
    { status: "Sudah DiBayar", total: sudahDibayarCount },
    { status: "Belum DiBayar", total: belumDibayarCount },
    
  ];

  const COLORS = ["#118B50", "#FF6384", "#F9E400"];

  return (
    <>
      <div className="flex w-full ">
        <div>
        <Header />

        </div>
        <div className="p-4 w-full">
          <h1 className="text-2xl font-bold mb-4">Dashboard RPK</h1>

          <div className="flex flex-col  border  bg-slate-100 p-3 mb-10">
            {/* Tampilkan jumlah total data RUK */}
            <div className="mb-4  bg-[#FCC737]   flex flex-col items-center justify-center rounded-md gap-3 p-3">
              <div className="bg-red-400 w-fit p-2 text-[20px] text-white rounded-full ">
                <IoIosFolder />
              </div>
              <p className="font-semibold text-slate-700 text-[25px]">
                {totalRukCount} RPK
              </p>
              <p className="">Total Data</p>
            </div>
            <div className="flex  gap-3">
              <div className=" bg-[#D91656] w-full  flex flex-col items-center justify-center rounded-md gap-3 p-3">
                <div className="bg-red-400 p-2 text-[20px] text-white rounded-full ">
                  <TbDeviceImacCancel />
                </div>
                <p className="font-semibold text-[25px] text-white">
                  {belumSelesaiCount} RPK
                </p>
                <p className="text-white">Belum Selesai</p>
              </div>

              <div className=" bg-[#ADD899] w-full  flex flex-col items-center justify-center rounded-md gap-3 p-3">
                <div className="bg-red-400 p-2 text-[20px] text-white rounded-full ">
                  <IoCloudDone />
                </div>
                <p className="font-semibold text-slate-700 text-[25px]">
                  {sudahSelesaiCount} RPK
                </p>
                <p className="">Sudah Selesai</p>
              </div>
            </div>
          </div>

          {/* POKJA */}
          <div className="flex flex-col  border  bg-slate-100 p-3 mb-10">
            <h1 className="font-bold text-[30px] mb-2">POKJA</h1>
            {/* Tampilkan jumlah total data RUK */}
            <div className="flex  gap-3">
            <div className="bg-[#D1E9F6] w-full  flex flex-col items-center justify-center rounded-md gap-3 p-3">
              <div className="bg-red-400 w-fit p-2 text-[20px] text-white rounded-full ">
                <IoIosFolder />
              </div>
              <p className="font-semibold text-slate-700 text-[25px]">
                {rpkAdmen} RPK
              </p>
              <p className="">ADMEN</p>
            </div>
              <div className=" bg-[#F6EACB] w-full  flex flex-col items-center justify-center rounded-md gap-3 p-3">
                <div className="bg-red-400 p-2 text-[20px] text-white rounded-full ">
                  <TbDeviceImacCancel />
                </div>
                <p className="font-semibold text-[25px] ">
                  {rpkUkp} RPK
                </p>
                <p className="">UKP</p>
              </div>

              <div className=" bg-[#F1D3CE] w-full  flex flex-col items-center justify-center rounded-md gap-3 p-3">
                <div className="bg-red-400 p-2 text-[20px] text-white rounded-full ">
                  <IoCloudDone />
                </div>
                <p className="font-semibold text-slate-700 text-[25px]">
                  {rpkUkm} RPK
                </p>
                <p className="">UKM</p>
              </div>
            </div>
          </div>

          {/* PENGADAAN */}
          <div className="grid grid-cols-3 gap-10">
            <div className="w-full text-center h-96">
            <h1 className="font-bold text-xl mb-2">PENGADAAN</h1>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataPengadaan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                 
                  <Bar dataKey="total" fill="#8884d8">
                    {dataPengadaan.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* VERIFIKATOR */}
            <div className="w-full text-center h-96">
            <h1 className="font-bold text-xl mb-2">VERIFIKATOR</h1>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataVerifikator}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  
                  <Bar dataKey="total" fill="#8884d8">
                    {dataVerifikator.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* KAPUS KATU */}
            <div className="w-full text-center h-96">
            <h1 className="font-bold text-xl mb-2">TTD KAPUS & KATU</h1>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataKapusKatu}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  
                  <Bar dataKey="total" fill="#8884d8">
                    {dataKapusKatu.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* SCANN */}
            <div className="w-full text-center h-96">
            <h1 className="font-bold text-xl mb-2">SCANN</h1>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataScann}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                 
                  <Bar dataKey="total" fill="#8884d8">
                    {dataScann.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>


            {/* BENDAHARA */}
            <div className="w-full text-center h-96 mb-32">
            <h1 className="font-bold text-xl mb-2">BENDAHARA</h1>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataBendahara}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                 
                  <Bar dataKey="total" fill="#8884d8">
                    {dataBendahara.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
