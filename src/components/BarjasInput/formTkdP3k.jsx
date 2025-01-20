// import { useState } from "react";
// import { handleSave } from "../../poaUtils";
// import DataTable from "./dataTable";

// const FormTkdP3k = ({ activeMonth, dataInputBarjas, result, dataPoa }) => {
//   const [tkdP3k, setTkdP3k] = useState({
//     keteranganTkdP3k: "",
//     jmlTkdP3k: "",
//   });

//   const handleInputTkdP3kChange = (e) => {
//     const { name, value } = e.target;
//     setTkdP3k({ ...tkdP3k, [name]: value });
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="space-y-2">
//           <input
//             type="text"
//             name="keteranganTkdP3k"
//             value={tkdP3k.keteranganTkdP3k}
//             onChange={handleInputTkdP3kChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Keterangan"
//           />
//         </div>
//         <div className="space-y-2">
//           <input
//             type="number"
//             name="jmlTkdP3k"
//             value={tkdP3k.jmlTkdP3k}
//             onChange={handleInputTkdP3kChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Rp,..."
//           />
//         </div>
//       </div>

//       <DataTable 
//         data={dataInputBarjas}
//         activeMonth={activeMonth}
//         type="TKD P3K"
//       />

// {typeof result === "number" && (
//   <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
//     Sisa TKD PPPK:{" "}
//     <strong>
//       {result.toLocaleString("id-ID", {
//         style: "currency",
//         currency: "IDR",
//       })}
//     </strong>
//   </div>
// )}

//       <div className="flex justify-end mt-6">
//         <button
//           onClick={() => handleSave("TKD PPPK", tkdP3k, dataPoa, activeMonth)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Simpan
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormTkdP3k;