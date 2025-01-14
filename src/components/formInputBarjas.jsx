import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { poaContext } from "../context/PoaContextProvider";
import { useState, useContext, useEffect } from "react";
import db from "../../firebaseConfig";
import { inputBarjasContext } from "../context/InputBarjasContextProvider";

const FormInputBarjas = ({ activeMonth }) => {
  const { dataPoa } = useContext(poaContext);
  const { dataInputBarjas } = useContext(inputBarjasContext);
  const [thr, setThr] = useState({
    keteranganThr: "",
    jmlThr: "",
    createAt: "",
  });
  const [result, setResult] = useState(null); // State untuk menyimpan hasil pengurangan THR

  // Fungsi untuk mengambil data terbaru dari poa_data
  const fetchPoaData = async () => {
    try {
      const q = query(
        collection(db, "poa_data"),
        where("tahun", "==", dataPoa?.[0]?.tahun)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const poaData = querySnapshot.docs[0].data();
        setResult(poaData.thrNonPns); // Set hasil pengurangan dari thrNonPns terbaru
      } else {
        alert("Data POA tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error fetching POA data: ", error);
      alert("Gagal mengambil data POA.");
    }
  };

  // Ambil data POA setiap kali komponen dimuat
  useEffect(() => {
    fetchPoaData();
  }, [dataPoa, dataInputBarjas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setThr({ ...thr, [name]: value });
  };

  const handleSave = async () => {
    if (!thr.keteranganThr || !thr.jmlThr) {
      alert("Mohon lengkapi semua data THR.");
      return;
    }

    try {
      // Ambil data dari poa_data berdasarkan tahun
      const q = query(
        collection(db, "poa_data"),
        where("tahun", "==", dataPoa?.[0]?.tahun)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Data POA tidak ditemukan.");
        return;
      }

      // Ambil dokumen POA
      const poaDoc = querySnapshot.docs[0];
      const poaData = poaDoc.data();

      // Kurangi thrNonPns dengan jumlahThr
      const newThrNonPns = poaData.thrNonPns - parseInt(thr.jmlThr, 10);
      if (newThrNonPns < 0) {
        alert("Nilai THR melebihi THR Non-PNS yang tersedia.");
        return;
      }

      // Kurangi totalBarangJasa dengan jumlahThr
      const newTotalBarangJasa =
        poaData.totalBarangJasa - parseInt(thr.jmlThr, 10);

      // Update thrNonPns dan totalBarangJasa di poa_data
      await updateDoc(doc(db, "poa_data", poaDoc.id), {
        thrNonPns: newThrNonPns,
        totalBarangJasa: newTotalBarangJasa,
      });

      // Simpan data ke inputBarjas
      await addDoc(collection(db, "inputBarjas"), {
        type: "THR",
        keterangan: thr.keteranganThr,
        jumlahThr: parseInt(thr.jmlThr, 10),
        tahun: dataPoa?.[0]?.tahun,
        bulan: activeMonth,
        createAt: new Date(),
      });

      alert("Data berhasil disimpan!");

      // Ambil data POA terbaru untuk memperbarui hasil pengurangan
      fetchPoaData();
    } catch (error) {
      console.error("Error processing data: ", error);
      alert("Gagal menyimpan data!");
    }
  };

  console.log("ini data input barjas", dataInputBarjas);

  return (
    <div className="mt-4 space-y-4 bg-white p-6 rounded-xl shadow-sm">
      <h4 className="font-semibold text-gray-700 mb-4">
        Input Barang dan Jasa
      </h4>
      <div>
        <label className="block text-sm font-medium text-gray-700">THR</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <input
              type="text"
              name="keteranganThr"
              value={thr.keteranganThr}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Keterangan"
            />
          </div>
          <div className="space-y-2">
            <input
              type="number"
              name="jmlThr"
              value={thr.jmlThr}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rp,..."
            />
          </div>
        </div>
        <div className="overflow-x-auto py-6">
          <table className="min-w-full bg-white shadow-lg rounded-lg border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-left">Tanggal</th>
                <th className="py-3 px-4 text-left">Keterangan</th>
                <th className="py-3 px-4 text-left">Jumlah THR</th>
              </tr>
            </thead>
            <tbody>
              {dataInputBarjas
                .filter((item) => item.bulan === activeMonth)
                .map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4 text-left">
                      {item?.createAt?.toDate().toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4 text-left">{item.keterangan}</td>
                    <td className="py-3 px-4 text-left">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.jumlahThr)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tampilkan hasil pengurangan */}
      {result !== null && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          Sisa THR Non-PNS:{" "}
          <strong>
            {result.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </strong>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default FormInputBarjas;
