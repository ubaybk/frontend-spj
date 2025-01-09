import { Link } from "react-router-dom";
import Header from "../../../components/header";
import { IoIosAddCircle } from "react-icons/io";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "../../../../firebaseConfig";
import { IoMdCloseCircle } from "react-icons/io";

const DataPoa = () => {
  const [dataPoa, setDataPoa] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "poa_data"));
      const formattedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataPoa(formattedData);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "poa_data", id));
      // Perbarui state untuk menghapus item yang sudah dihapus dari UI
      setDataPoa(dataPoa.filter((item) => item.id !== id));
      alert("Data berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Gagal menghapus data.");
    }
  };

  console.log("POA DATA", dataPoa);

  return (
    <>
      <div className="flex">
        <div className="h-screen">
          <Header />
        </div>
        <div className="p-4 h-screen">
          <Link to={"/addTahunanPoa"}>
            <div className="w-fit flex items-center cursor-pointer hover:underline bg-blue-400 rounded-xl p-2 text-white mb-10">
              <IoIosAddCircle className="text-[25px]" />
              <h1>TAMBAHAN DATA TAHUNAN P O A </h1>
            </div>
          </Link>
          <div>
            {dataPoa.map((item) => (
              <div key={item.id} className="flex">
                <Link to={"/viewpoa"}>
                  <div className="bg-green-300 p-2 hover:bg-green-100 font-bold rounded-xl mb-5">
                    <div className="flex gap-2 items-center justify-center">
                      <h1>Data POA TAHUN</h1>
                      <h1>{item.tahun}</h1>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-col bg-yellow-300 hover:bg-green-100 p-1">
                        <h1>BARANG DAN JASA</h1>
                        <h1>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(item.totalBarangJasa)}
                        </h1>
                      </div>
                      <div className="flex-col bg-yellow-300 p-1">
                        <h1>MODAL PERALATAN DAN MESIN</h1>
                        <h1>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(item.totalModalGedungBangunan)}
                        </h1>
                      </div>
                      <div className="flex-col bg-yellow-300 p-1">
                        <h1>MODAL GEDUNG DAN BANGUNAN</h1>
                        <h1>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(item.totalModalPeralatanMesin)}
                        </h1>
                      </div>
                    </div>
                  </div>
                </Link>
                <div
                  className="text-[40px] text-red-600 cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                >
                  <IoMdCloseCircle />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DataPoa;
