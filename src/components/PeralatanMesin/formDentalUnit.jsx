import { useState } from "react";
import DataTable from "./dataTable";
import { handleSavePeralatanMesin } from "../../poaUtilsPeralatanMesin";

const FormDentalUnit = ({ activeMonth, dataInputPeralatanMesin, result, dataPoa }) => {
  const [dentalUnit, setDentalUnit] = useState({
    keteranganDentalUnit: "",
    jmlDentalUnit: "",
  });

  const handleInputDentalUnitChange = (e) => {
    const { name, value } = e.target;
    setDentalUnit({ ...dentalUnit, [name]: value });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <input
            type="text"
            name="keteranganDentalUnit"
            value={dentalUnit.keteranganDentalUnit}
            onChange={handleInputDentalUnitChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Keterangan"
          />
        </div>
        <div className="space-y-2">
          <input
            type="number"
            name="jmlDentalUnit"
            value={dentalUnit.jmlDentalUnit}
            onChange={handleInputDentalUnitChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rp,..."
          />
        </div>
      </div>

      <DataTable 
        data={dataInputPeralatanMesin}
        activeMonth={activeMonth}
        type="DENTALUNIT"
      />

      {result !== null && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          Sisa DentalUnit:{" "}
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
          onClick={() => handleSavePeralatanMesin("DENTALUNIT", dentalUnit, dataPoa, activeMonth)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default FormDentalUnit;