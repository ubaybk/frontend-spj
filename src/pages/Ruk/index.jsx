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
import { Link } from "react-router-dom";


const Ruk = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [rukData, setRukData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ tempatTugas: "", pjProgram: "" });
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
          if (email === "admin@gmail.com"){
            rukQuery = collection(db,"ruk_data")
          } else{
            
             rukQuery = query(collection(db, "ruk_data"), where("userId", "==", user.uid));
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

  const handleEdit = (id, currentData) => {
    setEditingId(id);
    setEditForm({ tempatTugas: currentData.tempatTugas, pjProgram: currentData.pjProgram });
  };

  const handleUpdate = async (id) => {
    try {
      const rukDocRef = doc(db, "ruk_data", id);
      await updateDoc(rukDocRef, editForm);
      setRukData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...editForm } : item))
      );
      setEditingId(null);
      setEditForm({ tempatTugas: "", pjProgram: "" });
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
      <div className="flex">
        <Header />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
         <Link to={'/addruk'}>
          <div className=" flex items-center cursor-pointer hover:underline">
            <IoIosAddCircle className="text-[25px]" />
            <h1>Tambah Data Perencanaan</h1>
          </div>
         </Link>
          {userName ? (
            <>
              <p>Selamat datang, {userName}!</p>
              <p>Email Anda: {userEmail}</p>
            </>
          ) : (
            <p>Data pengguna tidak tersedia.</p>
          )}

          <h2 className="text-xl font-semibold mt-4">Data Perencanaan (RUK):</h2>
          {rukData && rukData.length > 0 ? (
            rukData.map((item) => (
              <div key={item.id} className="bg-gray-100 p-4 rounded shadow mb-4">
                {editingId === item.id ? (
                  <div>
                    <input
                      type="text"
                      value={editForm.tempatTugas}
                      onChange={(e) => setEditForm({ ...editForm, tempatTugas: e.target.value })}
                      placeholder="Edit Tempat Tugas"
                      className="border p-2 rounded mb-2 w-full"
                    />
                    <input
                      type="text"
                      value={editForm.pjProgram}
                      onChange={(e) => setEditForm({ ...editForm, pjProgram: e.target.value })}
                      placeholder="Edit PJ Program"
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
                    <p><strong>Tempat Tugas:</strong> {item.tempatTugas}</p>
                    <p><strong>PJ Program:</strong> {item.pjProgram}</p>
                    <p><strong>Dibuat Oleh:</strong> {item.createdBy}</p>
                    <p>
                      <strong>Dibuat Pada:</strong>{" "}
                      {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleString() : "N/A"}
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
    </>
  );
};

export default Ruk;
