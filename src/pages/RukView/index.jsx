import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../../../firebaseConfig";
import Header from "../../components/header";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Pengadaan from "../Pengadaan";
import Verifikator from "../Verifikator";
import KapusKaTu from "../KapusKaTu";
import Scann from "../Scann";
import Bendahara from "../Bendahara";
import SPJDone from "../SPJDone";


const RukView = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [rukData, setRukData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    tempatTugas: "",
    pokja: "",
    kegiatan: "",
    subKegiatan: "",
    aktivitas: "",
    tujuan: "",
    sasaran: "",
    targetSasaran: "",
    pj: "",
    kebutuhanSumberDaya: "",
    mitraKerja: "",
    waktuPelaksanaan: "",
    komponen: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        setUserEmail(email);

        // Ambil data pengguna dari Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        } else {
          console.error("User document not found in Firestore.");
        }

        // Ambil semua data RUK dari Firestore untuk pengguna ini
        try {
          let rukQuery;
          if (email === "admin@gmail.com") {
            rukQuery = collection(db, "ruk_data");
          } else {
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

  const navigate = useNavigate();

//   const handleEdit = (id, currentData) => {
//     navigate(`/updateruk/${id}`), { state: currentData };
  
//   };

  const handleUpdate = async (id) => {
    try {
      const rukDocRef = doc(db, "ruk_data", id);
      await updateDoc(rukDocRef, editForm);
      setRukData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...editForm } : item))
      );
      setEditingId(null);
      setEditForm({
        tempatTugas: "",
        pokja: "",
        kegiatan: "",
        subKegiatan: "",
        aktivitas: "",
        tujuan: "",
        sasaran: "",
        targetSasaran: "",
        pj: "",
        kebutuhanSumberDaya: "",
        mitraKerja: "",
        waktuPelaksanaan: "",
        komponen: "",
      });
    } catch (error) {
      console.error("Error updating RUK data: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const rukDocRef = doc(db, "ruk_data", id);
      await deleteDoc(rukDocRef);
      setRukData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting RUK data: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      
       
        <div className="">
          

          <div className="flex">
            <div className="  flex flex-col">
              
              {rukData && rukData.length > 0 ? (
                rukData.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-100 p-4 h-[600px] rounded shadow mb-4"
                  >
                    {editingId === item.id ? (
                      <div>
                        <input
                          type="text"
                          value={editForm.tempatTugas}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              tempatTugas: e.target.value,
                            })
                          }
                          placeholder="Edit Tempat Tugas"
                          className="border p-2 rounded mb-2 w-full"
                        />

                        <input
                          type="text"
                          value={editForm.pokja}
                          onChange={(e) =>
                            setEditForm({ ...editForm, pokja: e.target.value })
                          }
                          placeholder="Edit pokja"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.kegiatan}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              kegiatan: e.target.value,
                            })
                          }
                          placeholder="Edit kegiatan"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.subKegiatan}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              subKegiatan: e.target.value,
                            })
                          }
                          placeholder="Edit subKegiatan"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.aktivitas}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              aktivitas: e.target.value,
                            })
                          }
                          placeholder="Edit aktivitas"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.tujuan}
                          onChange={(e) =>
                            setEditForm({ ...editForm, tujuan: e.target.value })
                          }
                          placeholder="Edit tujuan"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.sasaran}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              sasaran: e.target.value,
                            })
                          }
                          placeholder="Edit sasaran"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.targetSasaran}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              targetSasaran: e.target.value,
                            })
                          }
                          placeholder="Edit targetSasaran"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.pj}
                          onChange={(e) =>
                            setEditForm({ ...editForm, pj: e.target.value })
                          }
                          placeholder="Edit pj"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.kebutuhanSumberDaya}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              kebutuhanSumberDaya: e.target.value,
                            })
                          }
                          placeholder="Edit kebutuhanSumberDaya"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.mitraKerja}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              mitraKerja: e.target.value,
                            })
                          }
                          placeholder="Edit mitraKerja"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.waktuPelaksanaan}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              waktuPelaksanaan: e.target.value,
                            })
                          }
                          placeholder="Edit waktuPelaksanaan"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                          type="text"
                          value={editForm.komponen}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              komponen: e.target.value,
                            })
                          }
                          placeholder="Edit komponen"
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <button
                          onClick={() => handleUpdate(item.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p>
                          <strong>Tempat Tugas:</strong> {item.tempatTugas}
                        </p>
                        <p>
                          <strong>Pokja:</strong> {item.pokja}
                        </p>
                        <p>
                          <strong>Kegiatan:</strong> {item.kegiatan}
                        </p>
                        <p>
                          <strong>Sub Kegiatan:</strong> {item.subKegiatan}
                        </p>
                        <p>
                          <strong>Aktivitas:</strong> {item.aktivitas}
                        </p>
                        <p>
                          <strong>Tujuan:</strong> {item.tujuan}
                        </p>
                        <p>
                          <strong>Sasaran:</strong> {item.sasaran}
                        </p>
                        <p>
                          <strong>Target Sasaran:</strong> {item.targetSasaran}
                        </p>
                        <p>
                          <strong>PJ:</strong> {item.pj}
                        </p>
                        <p>
                          <strong>Kebutuhan Sumber Daya:</strong>{" "}
                          {item.kebutuhanSumberDaya}
                        </p>
                        <p>
                          <strong>Mitra Kerja:</strong> {item.mitraKerja}
                        </p>
                        <p>
                          <strong>Waktu Pelaksanaan:</strong>{" "}
                          {item.waktuPelaksanaan}
                        </p>
                        <p>
                          <strong>Komponen:</strong> {item.komponen}
                        </p>
                        <div>
                          <strong>Kebutuhan Anggaran:</strong>
                          <p>{item.kebutuhanDalamOrang}</p>
                        </div>
                        <p>
                          <strong>Dibuat Oleh:</strong> {item.createdBy}
                        </p>
                        <p>
                          <strong>Dibuat Pada:</strong>{" "}
                          {item.createdAt
                            ? new Date(
                                item.createdAt.seconds * 1000
                              ).toLocaleString()
                            : "N/A"}
                        </p>
                        <button
                          onClick={() => handleEdit(item.id, item)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>Data RUK tidak tersedia.</p>
              )}
            </div>
          </div>
        </div>
      
    </>
  );
};

export default RukView;
