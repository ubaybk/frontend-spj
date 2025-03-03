import { useState } from "react";
import DataTable from "./dataTable";
import { handleSavePeralatanMesin } from "../../poaUtilsPeralatanMesin";

const FormLaptop = ({ activeMonth, dataInputPeralatanMesin, result, dataPoa }) => {
  const [laptop, setLaptop] = useState({
    keteranganLaptop: "",
    jmlLaptop: "",
  });

  const handleInputLaptopChange = (e) => {
    const { name, value } = e.target;
    setLaptop({ ...laptop, [name]: value });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <input
            type="text"
            name="keteranganLaptop"
            value={laptop.keteranganLaptop}
            onChange={handleInputLaptopChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Keterangan"
          />
        </div>
        <div className="space-y-2">
          <input
            type="number"
            name="jmlLaptop"
            value={laptop.jmlLaptop}
            onChange={handleInputLaptopChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rp,..."
          />
        </div>
      </div>

      <DataTable 
        data={dataInputPeralatanMesin}
        activeMonth={activeMonth}
        type="LAPTOP"
      />

      {result !== null && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          Sisa Laptop:{" "}
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
          onClick={() => handleSavePeralatanMesin("LAPTOP", laptop, dataPoa, activeMonth)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default FormLaptop;