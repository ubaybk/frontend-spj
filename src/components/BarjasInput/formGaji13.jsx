import { useState } from "react";
import { handleSave } from "../../poaUtils";
import DataTable from "./dataTable";

const FormGaji13 = ({ activeMonth, dataInputBarjas, result, dataPoa }) => {
  const [gaji13, setGaji13] = useState({
    keteranganGaji13: "",
    jmlGaji13: "",
  });

  const handleInputGaji13Change = (e) => {
    const { name, value } = e.target;
    setGaji13({ ...gaji13, [name]: value });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <input
            type="text"
            name="keteranganGaji13"
            value={gaji13.keteranganGaji13}
            onChange={handleInputGaji13Change}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Keterangan"
          />
        </div>
        <div className="space-y-2">
          <input
            type="number"
            name="jmlGaji13"
            value={gaji13.jmlGaji13}
            onChange={handleInputGaji13Change}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rp,..."
          />
        </div>
      </div>

      <DataTable 
        data={dataInputBarjas}
        activeMonth={activeMonth}
        type="Gaji 13"
      />

      {result !== null && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          Sisa GAJI 13:{" "}
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
          onClick={() => handleSave("Gaji 13", gaji13, dataPoa, activeMonth)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default FormGaji13;